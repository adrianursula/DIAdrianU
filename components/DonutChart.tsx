import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, Platform, Dimensions, Text } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ChartData {
    key: string;
    value: number;
    color: string;
    percentage: number;
}

interface DonutChartProps {
    data: ChartData[];
    size?: number;
    strokeWidth?: number;
}

export default function DonutChart({ data, size = 200, strokeWidth = 20 }: DonutChartProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;

    // Animation value (0 to 1)
    const animationValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true, // Use native driver for transform/opacity, but we might animate strokeDashoffset which is prop
        }).start();
    }, [data]);

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Filter out zero values and sort by value desc (optional)
    const activeData = data.filter(d => d.value > 0).sort((a, b) => b.value - a.value);

    // Check if empty
    if (activeData.length === 0) {
        return (
            <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
                <Svg width={size} height={size}>
                    <G rotation="-90" origin={`${center}, ${center}`}>
                        <Circle
                            cx={center}
                            cy={center}
                            r={radius}
                            stroke="#334155" // Slate 700 empty state
                            strokeWidth={strokeWidth}
                            fill="transparent"
                        />
                    </G>
                </Svg>
                <View style={{ position: 'absolute', alignItems: 'center' }}>
                    <Text style={{ color: '#94a3b8', fontSize: 14 }}>Sin gastos</Text>
                </View>
            </View>
        );
    }

    let startAngle = 0;

    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size}>
                <G rotation="-90" origin={`${center}, ${center}`}>
                    {activeData.map((item, index) => {
                        const percentage = item.value / total;
                        const strokeDasharray = `${circumference * percentage} ${circumference}`;
                        const angle = startAngle;

                        // Update start angle for next segment (in degrees for rotation)
                        // Actually, with strokeDashoffset we can just accumulate connected segments
                        // But simpler approach: Rotate each circle to start where previous ended.
                        // startAngle is 0 to 360

                        const rotation = startAngle * 360;
                        startAngle += percentage;

                        return (
                            <Circle
                                key={item.key}
                                cx={center}
                                cy={center}
                                r={radius}
                                stroke={item.color}
                                strokeWidth={strokeWidth}
                                fill="transparent"
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={0}
                                rotation={rotation}
                                origin={`${center}, ${center}`}
                                strokeLinecap="round" // Rounded ends look premium
                            />
                        );
                    })}
                </G>
            </Svg>

            {/* Center Text */}
            <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#94a3b8', fontSize: 14, marginBottom: 4 }}>Total Gastos</Text>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                    ${total.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </Text>
            </View>
        </View>
    );
}

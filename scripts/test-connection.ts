// Test script to verify Supabase connection
// Run this with: npx ts-node scripts/test-connection.ts
// Or create a temporary test in your app

import { supabase } from '../lib/supabase';

async function testConnection() {
    console.log('🔍 Testing Supabase connection...\n');

    // Test 1: Check categories table
    console.log('1️⃣ Fetching categories...');
    const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('*')
        .limit(5);

    if (catError) {
        console.error('❌ Error fetching categories:', catError.message);
    } else {
        console.log(`✅ Categories found: ${categories?.length || 0}`);
        if (categories && categories.length > 0) {
            console.log('   Sample category:', categories[0].name);
        }
    }

    // Test 2: Check transactions table (will be empty initially)
    console.log('\n2️⃣ Checking transactions table...');
    const { data: transactions, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .limit(1);

    if (txError) {
        console.error('❌ Error accessing transactions:', txError.message);
    } else {
        console.log(`✅ Transactions table accessible (${transactions?.length || 0} found)`);
    }

    // Test 3: Check authentication
    console.log('\n3️⃣ Checking session...');
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        console.log('✅ User authenticated:', session.user.email);
    } else {
        console.log('ℹ️  No user session (login required)');
    }

    console.log('\n🎉 Connection test complete!');
}

testConnection().catch(console.error);

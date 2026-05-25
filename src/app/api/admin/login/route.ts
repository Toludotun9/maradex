import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
    }

    // Call database RPC to verify admin using pgcrypto crypt
    const { data: isValid, error: rpcError } = await supabase.rpc('verify_admin', {
      input_username: username,
      input_password: password
    });

    if (rpcError) {
      console.error('RPC Error verifying admin:', rpcError);
      return NextResponse.json({ error: 'Database error during verification' }, { status: 500 });
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Create a new session in the database
    const { data: session, error: sessionError } = await supabase
      .from('admin_sessions')
      .insert([{ username }])
      .select('token, expires_at')
      .single();

    if (sessionError || !session) {
      console.error('Session generation error:', sessionError);
      return NextResponse.json({ error: 'Failed to establish admin session' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      token: session.token,
      expiresAt: session.expires_at,
      username: username 
    });

  } catch (error: any) {
    console.error('Exception in admin login API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

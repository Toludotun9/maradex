import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper function to authenticate admin requests
export async function authenticateAdmin(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  if (!token) return null;

  try {
    const { data: session, error } = await supabase
      .from('admin_sessions')
      .select('username, expires_at')
      .eq('token', token)
      .single();

    if (error || !session) return null;

    // Check expiration
    const expiry = new Date(session.expires_at).getTime();
    const now = new Date().getTime();
    if (now > expiry) {
      // Clean up expired session
      await supabase.from('admin_sessions').delete().eq('token', token);
      return null;
    }

    return session.username;
  } catch (err) {
    console.error('Error authenticating admin:', err);
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const adminUsername = await authenticateAdmin(request);
    if (!adminUsername) {
      return NextResponse.json({ error: 'Unauthorized admin session' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let query = supabase
      .from('loans')
      .select('*')
      .order('updated_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (search && search.trim() !== '') {
      const term = `%${search.trim()}%`;
      query = query.or(`first_name.ilike.${term},last_name.ilike.${term},email.ilike.${term}`);
    }

    const { data: applications, error } = await query;

    if (error) {
      console.error('Error fetching applications:', error);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: applications });

  } catch (error: any) {
    console.error('Exception listing admin applications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

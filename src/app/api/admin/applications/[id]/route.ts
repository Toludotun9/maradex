import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { authenticateAdmin } from '../route';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminUsername = await authenticateAdmin(request);
    if (!adminUsername) {
      return NextResponse.json({ error: 'Unauthorized admin session' }, { status: 401 });
    }

    const { id } = await params;
    const { status, adminNotes } = await request.json();

    if (!status) {
      return NextResponse.json({ error: 'Missing status parameter' }, { status: 400 });
    }

    const allowedStatuses = ['draft', 'submitted', 'pending', 'approved', 'rejected'];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    // Update the application status and notes
    const { error } = await supabase
      .from('loans')
      .update({
        status,
        admin_notes: adminNotes
      })
      .eq('id', id);

    if (error) {
      console.error(`Error updating application ${id}:`, error);
      return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: `Application status updated to ${status}` });

  } catch (error: any) {
    console.error('Exception updating application:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

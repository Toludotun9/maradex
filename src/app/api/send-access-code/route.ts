import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, accessCode } = await request.json();

    if (!email || !accessCode) {
      return NextResponse.json({ error: 'Missing email or accessCode parameter' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    // Log diagnostic copy to server console so the access code is easily readable even if external mail API keys are not supplied yet
    console.log(`\n==================================================`);
    console.log(`✉️ [LIVE EMAIL DISPATCH] Preparing Application Code`);
    console.log(`==================================================`);
    console.log(`To:          ${email}`);
    console.log(`Access Code: ${accessCode}`);
    console.log(`==================================================\n`);

    if (!apiKey) {
      console.log('ℹ️ Server running in simulation mode (RESEND_API_KEY unassigned). Email simulation completed successfully.');
      return NextResponse.json({ 
        success: true, 
        simulated: true,
        message: 'Email successfully logged to console simulation.',
        accessCode: accessCode
      }, { status: 200 });
    }

    // Dispatch real email via official Resend REST API natively
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Maradex Onboarding <onboarding@resend.dev>', // Resend sandbox testing domain
        to: email,
        subject: 'Your Maradex Application Access Code',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 20px; color: #1f2937; line-height: 1.6;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #1e3a8a; font-size: 28px; margin: 0;">Maradex</h1>
              <p style="color: #6b7280; font-size: 14px; margin-top: 4px;">Student Loan Onboarding</p>
            </div>
            
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
              <h2 style="color: #111827; font-size: 20px; margin-top: 0;">Resume your application</h2>
              <p style="color: #4b5563; font-size: 15px;">
                Hello,
              </p>
              <p style="color: #4b5563; font-size: 15px;">
                Thank you for saving your progress. You can securely restore your draft application at any time using your unique session access code below:
              </p>
              
              <div style="background-color: #f3f4f6; border: 2px dashed #d1d5db; border-radius: 8px; padding: 20px; text-align: center; margin: 28px 0;">
                <span style="font-family: monospace; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #1e3a8a;">
                  ${accessCode}
                </span>
              </div>
              
              <p style="color: #4b5563; font-size: 15px; margin-bottom: 0;">
                Simply return to our site, click <strong>"Continue where you left off"</strong>, and enter this code along with your email address to pick up exactly where you paused.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 32px; border-top: 1px solid #f3f4f6; padding-top: 20px;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                Secure Passwordless Verification Service &bull; If you did not initiate this application, please safely ignore this email.
              </p>
            </div>
          </div>
        `
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Live Resend API dispatch rejected:', responseData);
      return NextResponse.json({ 
        success: false, 
        error: responseData.message || 'Email delivery provider failed to transmit the message.' 
      }, { status: response.status });
    }

    console.log(`✅ Live email delivered successfully to ${email} (Message ID: ${responseData.id})`);
    return NextResponse.json({ success: true, id: responseData.id });
  } catch (error: any) {
    console.error('Exception during live email transmission API execution:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

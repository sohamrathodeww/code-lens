import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, message, recaptchaToken } = await req.json();

    if (!recaptchaToken) {
      return NextResponse.json({ success: false, message: "reCAPTCHA token is missing" }, { status: 400 });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY || '6Le3VcwtAAAAAEadgC-FJwnYOebruuXpInyhor7i';
    
    // Verify the reCAPTCHA token with Google
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
    
    const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return NextResponse.json({ success: false, message: "reCAPTCHA verification failed" }, { status: 400 });
    }

    // Here you would typically send an email, save to database, etc.
    // For now, we will simulate a successful submission.
    
    return NextResponse.json({ 
      success: true, 
      message: "Form submitted successfully" 
    }, { status: 200 });

  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Initialize nodemailer transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // Need environment variables configured
        pass: process.env.SMTP_PASS,
      },
    });

    // Send the email to rsoham00@gmail.com
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"CodeLens Contact Form" <${process.env.SMTP_USER}>`,
        to: "rsoham00@gmail.com", // The receiver email requested by the user
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`,
        html: `
          <h3>New Message via CodeLens Contact Form</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });
    } else {
      console.log(`[Email Simulation] Email would have been sent to rsoham00@gmail.com from ${email}: ${message}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Form submitted successfully" 
    }, { status: 200 });

  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

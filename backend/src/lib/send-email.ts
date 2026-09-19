import { Resend } from 'resend';
import { env } from './utils.ts';

const resend = new Resend(env.RESEND_API_KEY);

export function sendEmail({ to, subject, html, text }: { to: string, subject: string, html: string, text: string}) {
    const mailOptions = {
        from: env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: "eric.nguyenblank@gmail.com",
        subject: subject,
        html: html,
        text: text
    };
    return resend.emails.send(mailOptions);
}


interface EmailData {
    user: {
        name: string,
        email: string
    },
    url: string
}

export async function sendEmailVerificationEmail({ user, url }: EmailData) {
    const parsedUrl = new URL(url);
    const token = parsedUrl.searchParams.get("token");
    const verificationBridgeURL = `${env.FRONTEND_URL || "http://localhost:5173"}/verify-email-bridge?token=${token}`;

    await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Verify Your Email</h2>
            <p>Hello ${user.name},</p>
            <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
            <a href="${verificationBridgeURL}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">Verify Email</a>
            <p>If you didn't create an account, please ignore this email.</p>
            <p>This link will expire in 24 hours.</p>
            <p>Best regards,<br>Your App Team</p>
        </div>
        `,
        text: `Hello ${user.name},\n\nThank you for signing up! Please verify your email address by clicking this link: ${url}\n\nIf you didn't create an account, please ignore this email.\n\nThis link will expire in 24 hours.\n\nBest regards,\nYour App Team`,
    });
}

export function sendPasswordResetEmail({ user, url }: EmailData) {
    return sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Reset Your Password</h2>
            <p>Hello ${user.name},</p>
            <p>You requested to reset your password. Click the button below to reset it:</p>
            <a href="${url}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">Reset Password</a>
            <p>If you didn't request this, please ignore this email.</p>
            <p>This link will expire in 24 hours.</p>
            <p>Best regards,<br>Your App Team</p>
        </div>
        `,
        text: `Hello ${user.name},\n\nYou requested to reset your password. Click this link to reset it: ${url}\n\nIf you didn't request this, please ignore this email.\n\nThis link will expire in 24 hours.\n\nBest regards,\nYour App Team`,
    });
}

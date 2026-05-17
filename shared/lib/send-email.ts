import { Resend } from 'resend';
import React from 'react'; 

export const sendEmail = async (to: string, subject: string, template: any) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to,
            subject,
            react: template, 
        });

        if (error) {
            // Вместо жесткого падения просто выводим ошибку в консоль Vercel для инфы
            console.error("Resend заблокировал отправку на чужую почту:", error);
            return null;
        }

        return data;
    } catch (e) {
        // Ловим любые другие сетевые ошибки Resend, чтобы бэкенд не падал
        console.error("Сетевая ошибка почты:", e);
        return null;
    }
};
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);



const sendEmail = async (to, subject, html) => { 
    try {
        const { data, error } = await resend.emails.send({
            from: 'Blinkit <onboarding@resend.dev>',
            to: to,
            subject: subject,
            html: html,
          });
          if (error) {
            return console.error({ error });
          }

        return data;
    } catch (error) {
        console.log(error);
    }
} 

export default sendEmail;
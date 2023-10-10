import { createTransport } from 'nodemailer';

export async function POST ( req ) {
  const { email } = await req.json();

  try {
    const transporter = createTransport( {
      service: "SMTP",
      host: "aions.co",
      port: 465,
      auth: {
        user: "chat@aions.co",
        pass: process.env.SMTP_PASS
      }
    } );

    const res = await transporter.sendMail( {
      from: 'aions.co <chat@aions.co>',
      to: email,
      subject: 'Early Access Signup Confirmation',
      text: 'Thank you for signing up for early access!',
    } );

    return new Response( JSON.stringify( { response: res } ), { status: 200 } );

  } catch ( e ) {
    console.log( e );
    return new Response( JSON.stringify( { error: e } ), { status: 500 } );
  }
}
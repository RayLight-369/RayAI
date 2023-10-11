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
      html: `<!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
              .header {
                  background-color: #0073e6;
                  color: #fff;
                  text-align: center;
                  padding: 20px;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .services {
                  padding: 20px;
              }
              .services h2{
                  color: black;
              }
              .service {
                  margin-bottom: 20px;
              }
              .service h3 {
                  color: #0073e6;
              }
              .service p {
                  line-height: 1.6;
                  color: #333;
              }
              .contact {
                  text-align: center;
                  margin-top: 20px;
              }
              .thanks {
                  text-align: center;
                  background-color: #0073e6;
                  color: #fff;
                  padding: 10px;
              }
          </style>
      </head>
      <body>
          <div class="header">
              <h1>AIONS (Animated Interactive Objects and Neural Software)</h1>
              <p>Revolutionizing animation with the power of AI</p>
          </div>
          <div class="container">
              <div class="services">
                  <h2>Our Services</h2>
                  <div class="service">
                      <h3>PreBytes</h3>
                      <p>We specialize in developing games that push the boundaries of innovation and entertainment. Our team of experienced game developers and AI engineers collaborate to create immersive gaming experiences that adapt and learn from player behavior. From procedural generation and intelligent NPCs to adaptive difficulty and real-time decision-making, our AI game development services will take your gaming experience to the next level.</p>
                  </div>
                  <div class="service">
                      <h3>Chaperone</h3>
                      <p>An Android app connecting users with companions for enjoyable activities and conversations. Personalized and convenient, it's the platform for meaningful connections and memorable experiences.</p>
                  </div>
                  <div class="service">
                      <h3>Valora</h3>
                      <p>Valora is a pioneering software company specializing in HR Management services. With a focus on modernizing and streamlining human resources processes, Valora offers innovative solutions to optimize talent acquisition, employee onboarding, performance management, and more. Through its cutting-edge technology, Valora empowers businesses to enhance workforce efficiency, engagement, and overall organizational success. With a commitment to delivering user-friendly and scalable HR solutions, Valora is reshaping the future of human resource management for companies across various industries.</p>
                  </div>
                  <div class="service">
                      <h3>Neural Softwares</h3>
                      <p>Neural Softwares is a pioneering AI company at the forefront of developing a diverse range of cutting-edge AI tools. Leveraging advanced neural network architectures and machine learning techniques, Neural Softwares creates innovative solutions tailored to address various industries' unique challenges. From natural language processing and computer vision to predictive analytics and automation, their AI tools empower businesses with intelligent insights and streamlined processes, unlocking new levels of efficiency and productivity.</p>
                  </div>
                  <div class="thanks">
                      <p>Thank you for signing up for early access</p>
                  </div>
                  <div class="contact">
                      <p>Contact: <a href="mailto:hr@aions.co">hr@aions.co</a></p>
                  </div>
              </div>
          </div>
      </body>
      </html>
      `
    } );

    return new Response( JSON.stringify( { response: res } ), { status: 200 } );

  } catch ( e ) {
    console.log( e );
    return new Response( JSON.stringify( { error: e } ), { status: 500 } );
  }
}
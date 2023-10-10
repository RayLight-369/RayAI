import Provider from '@/Provider/Provider.jsx';


import "../globals.css";

export const metadata = {
  title: 'RayAI API',
  description: 'RayAI: Your Personal AI , Now use as API.',

};

export default function RootLayout ( { children } ) {

  return (
    <html lang="en">
      <body>
        <Provider >

          { children }

        </Provider>
      </body>
    </html>
  );
}

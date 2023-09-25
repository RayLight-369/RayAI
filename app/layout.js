import Provider from '@/Provider/Provider.jsx';

import "./globals.css";

export const metadata = {
  title: 'RayAI',
  description: 'RayAI: Your Personal AI',
  // icons: {
  //   icon: "favicon.ico"
  // }
};

export default function RootLayout ( { children } ) {
  return (
    <html lang="en">
      <body>
        <Provider >
          <main>
            <div className='bg1'></div>
            <div className='bg2'></div>
            <div className='bg3'></div>
            <div className='bg4'></div>
            <div className='bg5'></div>
            { children }
          </main>
        </Provider>
      </body>
    </html>
  );
}

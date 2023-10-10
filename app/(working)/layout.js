import Provider from '@/Provider/Provider.jsx';
import ThemeProvider from '../Contexts/ThemeContext/ThemeContext';
import MessagesProvider from '../Contexts/MessagesContext/MessagesContext';
import ChildLayout from './ChildLayout';
import IsMobileProvider, { ToggleNavProvider } from '../Contexts/IsMobileContext/IsMobileContext';


import "../globals.css";

export const metadata = {
  title: 'RayAI',
  description: 'RayAI: Your Personal AI',

};

export default function RootLayout ( { children } ) {

  return (
    <html lang="en">
      <body>
        <Provider >
          <ThemeProvider>
            <main>
              <div className='bg1'></div>
              <div className='bg2'></div>
              <div className='bg3'></div>
              <div className='bg4'></div>
              <div className='bg5'></div>
              <MessagesProvider>
                <IsMobileProvider>
                  <ToggleNavProvider>
                    <ChildLayout>
                      { children }
                    </ChildLayout>
                  </ToggleNavProvider>
                </IsMobileProvider>
              </MessagesProvider>
            </main>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}

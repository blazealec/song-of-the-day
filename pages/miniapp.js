import Head from 'next/head';
import React, { useEffect } from 'react';
import App from '../src/App';

export default function MiniAppPage() {
  useEffect(() => {
    import('@farcaster/frame-sdk').then(({ sdk }) => {
      if (sdk && sdk.actions && sdk.actions.ready) {
        sdk.actions.ready();
      }
    });
  }, []);

  return (
    <>
      <Head>
        <meta property="fc:frame" content='{"version":"next","imageUrl":"https://song-of-the-day-sepia.vercel.app/og-image.png","button":{"title":"Start Quiz","action":{"type":"launch_frame","name":"Song of the Day","url":"https://song-of-the-day-sepia.vercel.app/miniapp","splashImageUrl":"https://song-of-the-day-sepia.vercel.app/splash.png","splashBackgroundColor":"#000000"}}}' />
      </Head>
      <App />
    </>
  );
} 
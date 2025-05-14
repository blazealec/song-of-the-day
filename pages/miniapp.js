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

  return <App />;
} 
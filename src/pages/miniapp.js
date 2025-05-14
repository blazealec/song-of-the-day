import React, { useEffect } from 'react';
import App from '../App';

const MiniApp = () => {
  useEffect(() => {
    // Only run on client
    import('@farcaster/frame-sdk').then(({ sdk }) => {
      if (sdk && sdk.actions && sdk.actions.ready) {
        sdk.actions.ready();
      }
    });
  }, []);

  return <App />;
};

export default MiniApp; 
import React, { useEffect } from 'react';

const MiniApp = () => {
  useEffect(() => {
    // Only run on client
    import('@farcaster/frame-sdk').then(({ sdk }) => {
      if (sdk && sdk.actions && sdk.actions.ready) {
        alert('SDK loaded, calling ready()');
        sdk.actions.ready();
      } else {
        alert('SDK not loaded or ready() not available');
      }
    }).catch(() => {
      alert('Failed to import Farcaster SDK');
    });
  }, []);

  return <div style={{ color: 'white', background: 'black', padding: 40, fontSize: 24 }}>Mini App SDK Test</div>;
};

export default MiniApp; 
import React, { useEffect } from 'react';

const MiniApp = () => {
  useEffect(() => {
    // Only run on client
    import('@farcaster/frame-sdk').then(({ sdk }) => {
      if (sdk && sdk.actions && sdk.actions.ready) {
        sdk.actions.ready();
      }
    });
  }, []);

  return <div style={{ color: 'white', background: 'black', padding: 40, fontSize: 24 }}>Hello from Mini App!</div>;
};

export default MiniApp; 
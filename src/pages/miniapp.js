import React, { useEffect } from 'react';
import { sdk } from '@farcaster/frame-sdk';
import App from '../App';

export default function MiniApp() {
  useEffect(() => {
    if (sdk && sdk.actions && sdk.actions.ready) {
      sdk.actions.ready();
    }
  }, []);

  return <App />;
} 
import { Button } from '@/components/ui/button';
import {
  Tldraw,
  createTLStore,
  defaultShapeUtils,
  throttle,
} from '@tldraw/tldraw';
import React, { useLayoutEffect, useState } from 'react';

const PERSISTENCE_KEY = 'example-3';

export default function Board() {
  const [store] = useState(() =>
    createTLStore({ shapeUtils: defaultShapeUtils })
  );
  const [loadingState, setLoadingState] = useState({
    status: 'loading',
  });

  useLayoutEffect(() => {
    setLoadingState({ status: 'loading' });

    const persistedSnapshot = localStorage.getItem(PERSISTENCE_KEY);

    if (persistedSnapshot) {
      try {
        const snapshot = JSON.parse(persistedSnapshot);
        store.loadSnapshot(snapshot);
        setLoadingState({ status: 'ready' });
      } catch (error) {
        setLoadingState({ status: 'error', error: error.message });
      }
    } else {
      setLoadingState({ status: 'ready' });
    }

    const cleanupFn = store.listen(
      throttle(() => {
        const snapshot = store.getSnapshot();
        localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(snapshot));
      }, 500)
    );

    return () => {
      cleanupFn();
    };
  }, [store]);

  const handleExportClick = () => {
    const snapshot = store.getSnapshot();
    const json = JSON.stringify(snapshot, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tldraw_snapshot.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log(json);
  };

  if (loadingState.status === 'loading') {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (loadingState.status === 'error') {
    return (
      <div style={{ position: 'fixed', inset: 0 }}>
        <h2>Error!</h2>
        <p>{loadingState.error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="absolute right-2 top-[100px] z-10 bg-transparent">
        <Button onClick={handleExportClick}>
          Export
        </Button>
      </div>
      <div style={{ position: 'fixed', width:'95%', height:'85%', insetInline:80}}>
        <Tldraw store={store}></Tldraw>
      </div>
    </div>
  );
}

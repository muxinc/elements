import Link from "next/link";
import Head from 'next/head';
import { useRef, useState } from "react";
import MuxPlayer, { MuxPlayerProps } from "@mux/mux-player-react";
import type MuxPlayerElement from "@mux/mux-player";

type CuePoint = { time: number; value: any; };

function addCuePointsToPlayer(playerEl: MuxPlayerElement) {
  const cuePoints: CuePoint[] = [
    { time: 1, value: 'Simple Value' },
    { time: 3, value: { complex: 'Complex Object', duration: 2 } },
    { time: 10, value: true },
    { time: 15, value: { anything: 'That can be serialized to JSON and makes sense for your use case' } }
  ];

  playerEl.addCuePoints(cuePoints);
}

function MuxPlayerPage() {
  const [activeCuePoint, setActiveCuePoint] = useState<CuePoint>(undefined)
  return (
    <>
      <Head>
        <title>&lt;MuxPlayer/&gt; (CuePoints) Demo</title>
      </Head>

      <MuxPlayer
        playbackId="23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I"
        preload="auto"
        onLoadedMetadata={({ target }) => {
          addCuePointsToPlayer(target as MuxPlayerElement);
        }}
        onCuePointChange={({ target }) => {
          setActiveCuePoint((target as MuxPlayerElement).activeCuePoint);
        }}
        onCuePointsChange={({ target }) => {
          setActiveCuePoint((target as MuxPlayerElement).activeCuePoint);
        }}
      />
      <div>
        <b>Active CuePoint:</b>
        <pre style={{
          backgroundColor: 'lightgray',
          padding: '10px'
        }}>
          {activeCuePoint?.value ? JSON.stringify(activeCuePoint?.value, null, 2) : 'Unset'}
        </pre>
      </div>
    </>
  );
}

export default MuxPlayerPage;

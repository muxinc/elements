import Link from "next/link";
import Head from 'next/head';
import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import type MuxPlayerElement from "@mux/mux-player";

type Chapter = { startTime: number; endTime: number; value: string; };
const chapters: Chapter[] = [
  { startTime: 0, endTime: 3, value: 'Chapter 1' },
  { startTime: 3, endTime: 6, value: 'Chapter 2' },
  { startTime: 6, endTime: 9, value: 'Chapter 3' }
];


function MuxPlayerPage() {
  const [activeChapter, setActiveChapter] = useState<Chapter>(undefined);

  function addChaptersToPlayer(playerEl: MuxPlayerElement) {
	playerEl.addChapters(chapters);
  }

  return (
    <>
      <Head>
        <title>&lt;MuxPlayer/&gt; (CuePoints) Demo</title>
      </Head>

      <MuxPlayer
        playbackId="23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I"
        preload="auto"
        onLoadedMetadata={({ target }) => {
          addChaptersToPlayer(target as MuxPlayerElement);
        }}
        onChapterChange={({ target }) => {
          setActiveChapter((target as MuxPlayerElement).activeChapter);
        }}
      />
      <div>
        <b>Active chapter:</b>
        <pre style={{
          backgroundColor: '#888',
          padding: '10px',
		  color: '#fff'
        }}>
          {activeChapter?.value ?? 'Unset'}
        </pre>
      </div>
      <br />
      <Link href="/">Browse Elements</Link>
    </>
  );
}

export default MuxPlayerPage;

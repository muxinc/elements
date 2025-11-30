import Link from "next/link";
import Head from 'next/head';
import { useCallback, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import type MuxPlayerElement from "@mux/mux-player";

type Chapter = { startTime: number; endTime: number; value: string; };
const exampleChapters: Chapter[] = [
  { startTime: 0, endTime: 3, value: 'A beginning chapter' },
  { startTime: 3, endTime: 6, value: 'In the middle' },
  { startTime: 6, endTime: 9, value: 'Is this the end? (No)' }
];


function MuxPlayerPage({ chapters = exampleChapters }: { chapters: Chapter[] }) {
  const [activeChapter, setActiveChapter] = useState<Chapter>(undefined);

  const addChaptersToPlayer = useCallback((playerEl: MuxPlayerElement) => {
    // Not ready for chapters yet!
    if (!playerEl || !playerEl.readyState) return;
    // Already added chapters!
    if (!!playerEl.chapters?.length) return;
    playerEl.addChapters(chapters);
  }, [chapters]);

  return (
    <>
      <Head>
        <title>&lt;MuxPlayer/&gt; (Chapters) Demo</title>
      </Head>

      <MuxPlayer
        key="23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I"
        ref={addChaptersToPlayer}
        playbackId="23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I"
        // Using native playback
        preferPlayback="mse"
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

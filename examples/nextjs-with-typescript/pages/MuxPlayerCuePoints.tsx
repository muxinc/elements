import Link from "next/link";
import Head from "next/head";
import Script from 'next/script';
import MuxPlayer, { MuxPlayerProps } from "@mux/mux-player-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import type MuxPlayerElement from "@mux/mux-player";
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { formatTime } from "media-chrome/dist/utils/time";

const notes = [
  { 
    time: 5, 
    value: {
      type: 'note',
      id: 1,
      user: 'cjpillsbury',
      text: 'This is a note I took!'
    }
  },
  { 
    time: 20, 
    value: {
      type: 'note',
      id: 2,
      user: 'cjpillsbury',
      text: 'This is another note I took!'
    }
  },
  { 
    time: 40, 
    value: {
      type: 'note',
      id: 3,
      user: 'cjpillsbury',
      text: 'This is yet another note I took!'
    }
  },
  { 
    time: 240, 
    value: {
      type: 'note',
      id: 4,
      user: 'cjpillsbury',
      text: 'This is a late note'
    }
  },
];

const NoteTimelineRenderer = ({ note, duration, current = false, onClick = ((_note) => {}) }) => {
  const percent = Math.round((note.time / duration) * 100);
  return (
    <>
    <Tooltip title={<>
      <div>{formatTime(note.time, 0)}</div>
      <div>{note.value.text}</div>
      </>
    }>
      <img 
        id={note.value.id}
        onClick={() => {
          onClick(note);
        }} 
        src="https://img.icons8.com/ios-glyphs/1x/note.png" 
        style={{ left: `calc(${percent}% - 10px)`, position: 'absolute', width: 20, backgroundColor: current ? 'lightblue' : 'white' }}
      >
      </img>
    </Tooltip>
    </>
  )
};

const NotesTimelineRenderer = ({ notes, currentNote, duration, onNoteSelected = ((_note) => {}), onAddNote = ((_note) => {}) }) => {
  const [newNoteTime, setNewNoteTime] = useState(0);
  const [newNoteText, setNewNoteText] = useState('');
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  return (
    <>
    <div style={{ position: "relative", backgroundColor: 'white' }}>
      <Tooltip 
        followCursor
        placement="top"
        title={!showNewNoteForm ? <div>Add Note @ {formatTime(newNoteTime, 0)}</div> : null}
      >
        <div 
          onMouseMove={(evt) => {
            if (showNewNoteForm) return;
            const rangeRect = (evt.target as HTMLElement).getBoundingClientRect();
            let mouseRatio = (evt.clientX - rangeRect.left) / rangeRect.width;
            // Lock between 0 and 1
            mouseRatio = Math.max(0, Math.min(1, mouseRatio));
            const time = Math.round(mouseRatio * duration);
            setNewNoteTime(time);
          }}
          onClick={() => { 
            setShowNewNoteForm(true);
          }}
          style={{ 
            position: 'absolute', 
            top: 12, 
            bottom: 12, 
            left: 0, 
            right: 0, 
            cursor: !showNewNoteForm ? 'copy' : 'default', 
            backgroundColor: 'lightgrey' 
          }}></div>
      </Tooltip>
      { notes
        .map(note => (
          <NoteTimelineRenderer 
            key={note.value.id}
            current={currentNote?.value?.id === note.value.id} 
            note={note} 
            duration={duration}
            onClick={onNoteSelected}
          />
        ))
      }
    </div>
    { showNewNoteForm
      ? <Stack spacing={2}>
          <div>Time: {formatTime(newNoteTime, 0)}</div>
          <TextField
              id="outlined-textarea"
              label="Note Text"
              placeholder="Example Note Text"
              multiline
              value={newNoteText}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNewNoteText(event.target.value)}
          />
          <div>
            <button 
              onClick={() => {
                onAddNote({ time: newNoteTime, value: { type: 'note', text: newNoteText, id: notes.length + 1, user: 'cjpillsbury' }});
                setNewNoteTime(0);
                setNewNoteText('');
                setShowNewNoteForm(false);
              }}
            >
              Add
            </button>
            <button
              onClick={() => {
                setNewNoteTime(0);
                setNewNoteText('');
                setShowNewNoteForm(false);
              }}
            >
              Cancel</button>
          </div>
        </Stack>
        : null
      }
    </>
  );
};

function MuxPlayerThemePage() {
  const mediaElRef = useRef(null);
  const [activeCuePoint, setActiveCuePoint] = useState(undefined);
  const [cuePoints, setCuePoints] = useState([]);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    mediaElRef.current.addEventListener('cuepointchange', () => {
      setActiveCuePoint(mediaElRef.current.activeCuePoint);
    })
  }, [mediaElRef]);

  useEffect(() => { console.log('activeCuePoint', activeCuePoint, 'cuePoints', cuePoints)}, [activeCuePoint, cuePoints]);

  return (
    <>
      <Head>
        <title>&lt;MuxPlayer/&gt; Demo</title>
      </Head>

      <Script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
      <MuxPlayer ref={mediaElRef}
        title={"Notes"}
        playbackId={"Uf6thKhjQkHZfH00tdxhj1RTnFWffpq663vTYhJiJh6g"}
        placeholder={"data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASACADASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAABAADBQb/xAAhEAACAgICAQUAAAAAAAAAAAAAAQIDBBEFEjITMTNBkf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhEDEQA/AMrL9oDZk+m9nQvpUYgYUxts0wRUcxHeur/B8OS7L2ZvjcXU0n1Ql8dXH6QSBZXgwGN8xEFj0eL4o2mRAf/Z"}
        streamType={"on-demand"}
        onDurationChange={({ target }) => setDuration((target as MuxPlayerElement).duration) }
        onLoadedMetadata={async ({ target }) => {
          const muxPlayerEl = target as MuxPlayerElement;
          await muxPlayerEl.addCuePoints(notes);
          setCuePoints(muxPlayerEl.cuePoints);
        }}
      />

      <div className="options">
        <div>
          { activeCuePoint?.value?.type === 'note' 
            ? <div>Current Note: {activeCuePoint.value.text}</div> 
            : null
          }
        </div>
        { cuePoints.length && duration 
          ? <NotesTimelineRenderer
              notes={cuePoints} 
              currentNote={activeCuePoint}
              duration={duration} 
              onNoteSelected={(cuePoint) => {
                // mediaElRef.current.currentTime = cuePoint.time;
                // HACK: Something weird with the timeline?? (CJP)
                mediaElRef.current.currentTime = cuePoint.time + 4;
              }}
              onAddNote={async (note) => {
                console.log('add a note!', note);
                const muxPlayerEl = mediaElRef.current;
                await muxPlayerEl.addCuePoints([note]);
                setCuePoints(muxPlayerEl.cuePoints);
              }}
            /> 
          : null
        }
      </div>

      <br/>
      <Link href="/"><a>Browse Elements</a></Link>
    </>
  );
}

export default MuxPlayerThemePage;

import Link from "next/link";
import Head from 'next/head';
import Image from "next/image";
import { useReducer, useRef, useState, useEffect } from "react";
import type { CSSProperties } from "react";
import MuxPlayer from "@mux/mux-player-react";
import type MuxPlayerElement from "@mux/mux-player";

const formatTime = (seconds: number | undefined) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeString = date.toISOString().substring(11, 19);
  return timeString;
};

const noop = (..._values: any[]): void => { };

const isNil = (value: any): value is null | undefined => {
  return value == null;
};

type CuePointValue = {
  type?: any;
  description: string;
  skip?: boolean;
};

type AbbreviableCuePointValue = CuePointValue & {
  type: 'abbreviable';
  duration?: number;
};

type CuePoint = { time: number; value: CuePointValue | AbbreviableCuePointValue; };

const initialCuePoints: CuePoint[] = [
  {
    time: 0,
    value: {
      skip: true,
      description: "Pre-meditation (discuss research, etc.)"
    }
  },
  {
    time: 60 * 6 + 2,
    value: {
      description: "Preparing to begin meditation practice"
    }
  },
  {
    time: 60 * 8 + 20,
    value: {
      description: "Meditation practice begins"
    }
  },
  {
    time: 60 * 16 + 47,
    value: {
      description: "Preparing for silent self-practice"
    }
  },
  {
    time: 60 * 17 + 14,
    value: {
      type: "abbreviable",
      description: "Silent self practice",
      duration: 10,
    }
  },
  {
    time: 60 * 27 + 36,
    value: {
      description: "Preparing to end meditation practice"
    }
  },
  {
    time: 60 * 29 + 49,
    value: {
      skip: true,
      description: "Beginning of post-meditation discussion"
    }
  }
];

const CuePointRenderer = ({
  cuePoint,
  active = false,
  disableUpdates = false,
  onCuePointSelected = noop,
  onCuePointChange = noop,
}: {
  cuePoint: CuePoint;
  active?: boolean;
  disableUpdates?: boolean;
  onCuePointSelected?: ((cuePoint: CuePoint) => void);
  onCuePointChange?: ((cuePoint: CuePoint) => void);
}) => {
  const { time, value } = cuePoint;
  const { description, skip = false } = value;
  const skipInputId = `cuepoint-skip-${time}`;
  const activeStyle: CSSProperties = active ? { backgroundColor: 'lightgreen' } : {};
  return (<>
    <button
      style={activeStyle}
      onClick={() => onCuePointSelected(cuePoint)}
      disabled={skip}
    >
      {formatTime(time)}
    </button>
    <div>{description}</div>
    <div>
      <input
        id={skipInputId}
        type={"checkbox"}
        defaultChecked={skip}
        disabled={disableUpdates}
        onChange={({ target }) => {
          const skip = target.checked;
          onCuePointChange({ time, value: { ...value, skip } });
        }}
      />
      <label htmlFor={skipInputId}>Skip</label>
    </div>
  </>);
};

const CuePointsList = ({
  cuePoints = [],
  activeCuePoint,
  disableUpdates = false,
  onCuePointSelected = noop,
  onCuePointChange = noop,
}: {
  cuePoints: CuePoint[];
  activeCuePoint?: CuePoint;
  disableUpdates?: boolean;
  onCuePointSelected?: ((cuePoint: CuePoint) => void);
  onCuePointChange?: (cuePoint: CuePoint) => void;
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '20% 70% 10%',
        gridAutoRows: '1fr',
        gridGap: '10px'
      }}
    >
      {cuePoints.map((cuePoint, i) => {
        return (
          <CuePointRenderer
            key={cuePoint.time}
            cuePoint={cuePoint}
            disableUpdates={disableUpdates}
            active={activeCuePoint?.time === cuePoint.time}
            onCuePointChange={onCuePointChange}
            onCuePointSelected={onCuePointSelected}
          />
        );
      })}
    </div>
  );
}

const addCuePointsToPlayer = (cuePoints: CuePoint[], playerEl: MuxPlayerElement) => {
  const actualCuePoints = cuePoints.reduce((cuePoints, cuePoint) => {
    if (cuePoint.value.type === 'abbreviable') {
      const value: AbbreviableCuePointValue = cuePoint.value as AbbreviableCuePointValue;
      if (!isNil(value.duration)) {
        const duration: number = value.duration;
        const insertedSkipCuePoint = {
          time: cuePoint.time + duration,
          value: {
            description: '(Skipped silent self practice)',
            skip: true,
          }
        };
        return [...cuePoints, cuePoint, insertedSkipCuePoint];
      }
    }
    return [...cuePoints, cuePoint];
  }, []);
  playerEl.addCuePoints(actualCuePoints);
};

const setCurrentTimeOnPlayer = (time: number, playerEl?: MuxPlayerElement) => {
  if (!playerEl || playerEl.currentTime === time) return;
  playerEl.currentTime = time;
};

type ActionType = 'UPDATE';
const reducer = (cuePoints: CuePoint[], action: { type: ActionType, value: CuePoint }) => {
  if (action.type === 'UPDATE') {
    const cuePointIdx = cuePoints.findIndex(cuePoint => cuePoint.time === action.value.time);
    return [
      ...cuePoints.slice(0, cuePointIdx),
      action.value,
      ...cuePoints.slice(cuePointIdx + 1),
    ];
  }
  return cuePoints;
};

const UCLAHeader = () => {
  return (
    <header style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', padding: '0em .9em' }}>
      <Link href="https://www.uclahealth.org/">
        <a>
          <Image width="200" height="50" src="/images/ucla-health-logo.svg" alt="UCLA Health logo" />
        </a>
      </Link>
      <Link href="https://www.uclahealth.org/programs/marc">
        <a>
          <h2>Mindful Awareness Research Center (MARC)</h2>
        </a>
      </Link>
    </header>
  );
};

const DurationList = ({
  values = [],
  selectedValue,
  disableUpdates = false,
  onSelected = noop
}: {
  values: number[];
  selectedValue?: number,
  disableUpdates?: boolean
  onSelected?: (duration: number) => void;
}) => {
  return (
    <div style={{ display: "flex", justifyContent: 'space-evenly'}}>
      {values.map(duration => {
        const selectedStyle: CSSProperties = duration === selectedValue ? { backgroundColor: 'lightgreen' } : {};
        return (
          <button
            disabled={disableUpdates}
            style={selectedStyle}
            key={duration}
            onClick={() => {
              onSelected(duration);
            }}
          >
            {Math.round(duration / 60)} min
          </button>
        );
      })}
    </div>
  );
}

function MuxPlayerPage() {
  const [cuePoints, dispatch] = useReducer(reducer, initialCuePoints);
  const [abbreviableCuePointIndex, setAbbreviableCuePoint] = useState<number>(undefined);
  const playerElRef = useRef(null);
  const [activeCuePoint, setActiveCuePoint] = useState<CuePoint>(undefined);
  const [startTime, setStartTime] = useState<number>(undefined);
  const [cuePointsAdded, setCuePointsAdded] = useState(false);

  useEffect(() => {
    const nextStartTime = cuePoints.find(cuePoint => !(cuePoint.value.skip))?.time;
    if (nextStartTime === startTime) return;
    setStartTime(nextStartTime);
  }, [cuePoints, startTime]);

  useEffect(() => {
    const idx = cuePoints.findIndex(({ value: { type }}) => type === 'abbreviable');
    if (idx === abbreviableCuePointIndex) return;
    setAbbreviableCuePoint(idx);
  }, [cuePoints, abbreviableCuePointIndex]);

  useEffect(() => {
    setCurrentTimeOnPlayer(startTime ?? 0, playerElRef.current);
  }, [startTime]);

  return (
    <>
      <Head>
        <title>&lt;MuxPlayer/&gt; (CuePoints) Demo</title>
      </Head>
      <UCLAHeader/>
      <section style={{ padding: '0em .9em'}}>
        <h1>About this App</h1>
        <h4>
          MARC provides fantastic, free guided meditations, but wouldn't it be nice if you could just dive right into the meditation practice?
          Wouldn't it be even better if you could adjust how long the silent self-practice was based on your level of comfort or available time?
          That's exactly what this application lets you do!
        </h4>
      </section>
      <section>
      <MuxPlayer
        ref={playerElRef}
        style={{ background: 'black' }}
        audio
        stream-type="on-demand"
        title="Drop-In Mediations Back to the Basics (UCLA MARC, Jan 26, 2023)"
        startTime={startTime}
        playbackId="UwsB8i59qz54R2yX91rnUJqmxSG6eHHt4g66YQ5eUFE"
        preload="metadata"
        onPlay={({ target }) => {
          const muxPlayerEl = target as MuxPlayerElement;
          addCuePointsToPlayer(cuePoints, muxPlayerEl);
          setCuePointsAdded(true);
        }}
        onCuePointChange={({ target }) => {
          const muxPlayerEl = target as MuxPlayerElement;
          const activeCuePoint = muxPlayerEl.activeCuePoint;
          setActiveCuePoint(activeCuePoint);
          // If we're playing through and the activeCuePoint is one that
          // should be skipped, skip it.
          if (!muxPlayerEl.paused && activeCuePoint.value.skip) {
            const cuePoints = muxPlayerEl.cuePoints;
            // Find the next CuePoint that shouldn't be skipped
            const nextCuePointToPlay = cuePoints.find(({ time, value: { skip } }) => time > activeCuePoint.time && !skip);
            // Seek to the time of the next unskipped CuePoint (or to the end of the content if there are none)
            setCurrentTimeOnPlayer(
              nextCuePointToPlay
                ? nextCuePointToPlay.time
                : muxPlayerEl.duration,
              muxPlayerEl
            );
          }
        }}
        onEnded={() => {
          setActiveCuePoint(undefined);
        }}
      />
      <div>
        <DurationList
          values={[1 * 60, 2 * 60, 5 * 60, 10 * 60]}
          selectedValue={(cuePoints[abbreviableCuePointIndex]?.value as AbbreviableCuePointValue)?.duration}
          disableUpdates={cuePointsAdded}
          onSelected={(duration) => {
            if (abbreviableCuePointIndex >= 0) {
              const cuePoint = {
                time: cuePoints[abbreviableCuePointIndex].time,
                value: {
                  ...cuePoints[abbreviableCuePointIndex].value,
                  duration
                }
              }
              dispatch({ type: 'UPDATE', value: cuePoint });
            }
          }}
        />
      </div>
      <CuePointsList
        cuePoints={cuePoints}
        activeCuePoint={activeCuePoint}
        disableUpdates={cuePointsAdded}
        onCuePointSelected={({ time }) => {
          setCurrentTimeOnPlayer(time, playerElRef.current)
        }}
        onCuePointChange={(cuePoint) => {
          dispatch({ type: 'UPDATE', value: cuePoint });
        }}
      />
      </section>
      <footer>
        <p>
          <span>This content is part of UCLA MARC's "Drop in Meditations" series, graciously provided under a Creative Commons License. You may find a list of all Drop in meditations </span>
          <Link href="https://www.uclahealth.org/programs/marc/free-guided-meditations/drop-meditations-hammer-podcast">
            <a>here</a>
          </Link>
          <span>.</span>
        </p>

        <p>“Drop-in Meditations” created by Diana Winston and others (see above) for the UCLA Mindful Awareness Research Center (MARC), ©2011- 2021 The Regents of the University of California (The UC Regents).</p>
        <p>Drop-in Meditations are licensed under a Creative Commons Attribution, NonCommercial, NoDerivatives 4.0 International License.</p>
      </footer>
      <Link href="/"><a>Browse Elements</a></Link>
    </>
  );
}

export default MuxPlayerPage;

export async function getServerSideProps(context) {
  return {
    props: {
      hideDefaultHeader: true
    }
  };
}

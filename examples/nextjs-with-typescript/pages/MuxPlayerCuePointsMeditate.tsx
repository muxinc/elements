import Link from "next/link";
import Head from 'next/head';
import { useReducer, useRef, useState, useEffect } from "react";
import type { CSSProperties } from "react";
import MuxPlayer, { MuxPlayerProps } from "@mux/mux-player-react";
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
  apply?: boolean;
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
    time: 60 * 6 + 7,
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
      duration: undefined,
      apply: false,
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

const AbbreviateCuePointRenderer = ({
  time,
  maxDuration = Number.POSITIVE_INFINITY,
  value,
  onDurationChange = noop,
  onApplyChange = noop,
}: {
  time: number;
  maxDuration?: number;
  value: AbbreviableCuePointValue;
  onDurationChange?: ((duration: number) => void);
  onApplyChange?: ((apply: boolean) => void);
}) => {
  const abbreviateInputId = `cuepoint-abbreviate-${maxDuration}`;
  const applyAbbrevInputId = `cuepoint-apply-abbreviate-${maxDuration}`;
  console.log('value.apply', value.apply);
  return (<>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor={abbreviateInputId}>Duration (minutes)</label>
      <input
        id={abbreviateInputId}
        type="number"
        min={0}
        max={maxDuration / 60}
        step={1}
        onInput={({ target }) => {
          onDurationChange(+(target as HTMLInputElement).value * 60);
        }}
      />
    </div>
    <div>Choose how long you would like for silent self-practice</div>
    <div>
      <input
        id={applyAbbrevInputId}
        type={"checkbox"}
        checked={value.apply}
        onChange={({ target }) => {
          onApplyChange(target.checked);
        }}
      />
      <label htmlFor={applyAbbrevInputId}>Apply</label>
    </div>
  </>);
};

const CuePointRenderer = ({
  time,
  value,
  active = false,
  onSelected = noop,
  onSkipChange = noop,
}: {
  time: number;
  value: CuePoint['value'];
  active?: boolean;
  onSelected?: ((time: number) => void);
  onSkipChange?: ((skip: boolean) => void);
}) => {
  const { description, skip = false } = value;
  const skipInputId = `cuepoint-skip-${time}`;
  const activeStyle: CSSProperties = active ? { backgroundColor: 'lightgreen' } : {};
  return (<>
    <button
      style={activeStyle}
      onClick={() => onSelected(time)}
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
        onChange={({ target }) => onSkipChange(target.checked)}
      />
      <label htmlFor={skipInputId}>Skip</label>
    </div>
  </>);
};

const CuePointsList = ({
  cuePoints = [],
  activeCuePoint,
  onCuePointSelected = noop,
  onCuePointChange = noop,
}: {
  cuePoints: CuePoint[];
  activeCuePoint?: CuePoint;
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
        return (<>
          <CuePointRenderer
            key={cuePoint.time}
            time={cuePoint.time}
            value={cuePoint.value}
            active={activeCuePoint?.time === cuePoint.time}
            onSelected={(_time: number) => {
              onCuePointSelected(cuePoint);
            }}
            onSkipChange={(skip) => {
              onCuePointChange({ time: cuePoint.time, value: { ...cuePoint.value, skip } });
            }}
          />
          {(cuePoint.value.type === "abbreviable") &&
            <AbbreviateCuePointRenderer
              key={`abbreviate-${cuePoint.time}`}
              time={cuePoint.time}
              value={cuePoint.value as AbbreviableCuePointValue}
              maxDuration={((cuePoints[i + 1]?.time ?? Number.POSITIVE_INFINITY) - cuePoint.time)}
              onApplyChange={(apply) => {
                console.log('apply change!', apply);
                onCuePointChange({ time: cuePoint.time, value: { ...cuePoint.value, apply } });
              }}
              onDurationChange={(duration) => {
                onCuePointChange({ time: cuePoint.time, value: { ...cuePoint.value, duration, apply: true } });
              }}
            />
          }
        </>);
      })}
    </div>
  );
}

const addCuePointsToPlayer = (cuePoints: CuePoint[], playerEl: MuxPlayerElement) => {
  const actualCuePoints = cuePoints.reduce((cuePoints, cuePoint) => {
    if (cuePoint.value.type === 'abbreviable') {
      const value: AbbreviableCuePointValue = cuePoint.value as AbbreviableCuePointValue;
      if (value.apply && !isNil(value.duration)) {
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
    console.log('next CuePoint value', action.value);
    return [
      ...cuePoints.slice(0, cuePointIdx),
      action.value,
      ...cuePoints.slice(cuePointIdx + 1),
    ];
  }
  return cuePoints;
};

function MuxPlayerPage() {
  const playerElRef = useRef(null);
  const [activeCuePoint, setActiveCuePoint] = useState<CuePoint>(undefined);
  const [cuePoints, dispatch] = useReducer(reducer, initialCuePoints);
  const [startTime, setStartTime] = useState<number>(undefined);

  useEffect(() => {
    const nextStartTime = cuePoints.find(cuePoint => !(cuePoint.value.skip))?.time;
    if (nextStartTime === startTime) return;
    setStartTime(nextStartTime);
  }, [cuePoints, startTime]);

  useEffect(() => {
    setCurrentTimeOnPlayer(startTime ?? 0, playerElRef.current);
  }, [startTime]);

  useEffect(() => {
    // console.log(...cuePoints);
    console.log(cuePoints.find(cuePoint => cuePoint.value.type === 'abbreviable'));
  }, [cuePoints]);

  return (
    <>
      <Head>
        <title>&lt;MuxPlayer/&gt; (CuePoints) Demo</title>
      </Head>
      <MuxPlayer
        ref={playerElRef}
        style={{ background: 'black' }}
        audio
        stream-type="on-demand"
        title="Drop-In Mediations Back to the Basics (UCLA Hammer, Jan 26, 2023)"
        startTime={startTime}
        playbackId="UwsB8i59qz54R2yX91rnUJqmxSG6eHHt4g66YQ5eUFE"
        preload="metadata"
        onPlay={({ target }) => {
          const muxPlayerEl = target as MuxPlayerElement;
          addCuePointsToPlayer(cuePoints, muxPlayerEl);
        }}
        onCuePointChange={({ target }) => {
          const muxPlayerEl = target as MuxPlayerElement;
          const activeCuePoint = muxPlayerEl.activeCuePoint;
          setActiveCuePoint(activeCuePoint);
          if (!muxPlayerEl.paused && activeCuePoint.value.skip) {
            const cuePoints = muxPlayerEl.cuePoints;
            const nextCuePointToPlay = cuePoints.find(({ time, value: { skip } }) => time > activeCuePoint.time && !skip);
            setCurrentTimeOnPlayer(nextCuePointToPlay?.time ?? muxPlayerEl.duration, muxPlayerEl);
          }
        }}
        onCuePointsChange={({ target }) => {
          const muxPlayerEl = target as MuxPlayerElement;
          const activeCuePoint = muxPlayerEl.activeCuePoint;
          setActiveCuePoint(activeCuePoint);
        }}
        // onSeeked={({ target }) => {
        //   const muxPlayerEl = target as MuxPlayerElement;
        //   const activeCuePoint = muxPlayerEl.activeCuePoint;
        //   setActiveCuePoint(activeCuePoint);
        // }}
      />
      <CuePointsList
        cuePoints={cuePoints}
        activeCuePoint={activeCuePoint}
        onCuePointSelected={({ time }) => {
          setCurrentTimeOnPlayer(time, playerElRef.current)
        }}
        onCuePointChange={(cuePoint) => {
          dispatch({ type: 'UPDATE', value: cuePoint });
        }}
      />
      <br />
      <Link href="/"><a>Browse Elements</a></Link>
    </>
  );
}

export default MuxPlayerPage;

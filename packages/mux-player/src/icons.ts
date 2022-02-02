import { html } from "./utils";

export const Airplay = (props: any) => html`
  <svg viewBox="0 0 20 18" slot="${props.slot}">
    <title>${props.title}</title>
    <path
      d="M10.19 11.22a.25.25 0 0 0-.38 0l-5.46 6.37a.25.25 0 0 0 .19.41h10.92a.25.25 0 0 0 .19-.41Z"
    />
    <path
      d="M19 0H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h2.94L5 13.75H1.25V1.25h17.5v12.5H15L16.06 15H19a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1Z"
    />
  </svg>
`;

export const CaptionsOff = (props: any) => html`
  <svg viewBox="0 0 20 18" slot="${props.slot}">
    <title>${props.title}</title>
    <path
      d="M19.83 2.68a2.58 2.58 0 0 0-2.3-2.5C15.72.06 12.86 0 10 0S4.28.06 2.47.18a2.58 2.58 0 0 0-2.3 2.5 115.86 115.86 0 0 0 0 12.64 2.58 2.58 0 0 0 2.3 2.5c1.81.12 4.67.18 7.53.18s5.72-.06 7.53-.18a2.58 2.58 0 0 0 2.3-2.5 115.86 115.86 0 0 0 0-12.64Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18s-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11 122.5 122.5 0 0 1 0-12.42 1.11 1.11 0 0 1 .91-1.11C4.24 1.57 7 1.5 10 1.5s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11 122.5 122.5 0 0 1 0 12.42ZM7.84 11a1.55 1.55 0 0 1-.76.18 1.57 1.57 0 0 1-.71-.18 1.69 1.69 0 0 1-.57-.42 2.1 2.1 0 0 1-.38-.58 2.47 2.47 0 0 1 0-1.64 2 2 0 0 1 .39-.66 1.73 1.73 0 0 1 .58-.42 1.81 1.81 0 0 1 .73-.16 1.68 1.68 0 0 1 .7.14 1.39 1.39 0 0 1 .51.39l1.08-.89a2.18 2.18 0 0 0-.47-.44A2.81 2.81 0 0 0 8.4 6a2.91 2.91 0 0 0-.58-.15 2.71 2.71 0 0 0-.56 0A4.08 4.08 0 0 0 5.88 6a3.27 3.27 0 0 0-1.09.67 3.14 3.14 0 0 0-.71 1.06 3.62 3.62 0 0 0-.26 1.39 3.57 3.57 0 0 0 .26 1.38 3 3 0 0 0 .71 1.06 3.27 3.27 0 0 0 1.09.67 3.85 3.85 0 0 0 1.38.23 3.2 3.2 0 0 0 1.28-.27 2.49 2.49 0 0 0 1-.83l-1.17-.88a1.42 1.42 0 0 1-.53.52Zm6.62 0a1.58 1.58 0 0 1-.76.18A1.54 1.54 0 0 1 13 11a1.69 1.69 0 0 1-.57-.42A2.12 2.12 0 0 1 12 10a2.29 2.29 0 0 1 .39-2.3 1.84 1.84 0 0 1 1.32-.58 1.71 1.71 0 0 1 .7.14 1.39 1.39 0 0 1 .51.39L16 6.73a2.43 2.43 0 0 0-.47-.44A3.22 3.22 0 0 0 15 6a3 3 0 0 0-.57-.15 2.87 2.87 0 0 0-.57 0A4.06 4.06 0 0 0 12.5 6a3.17 3.17 0 0 0-1.09.67 3 3 0 0 0-.72 1.06 3.62 3.62 0 0 0-.25 1.39 3.57 3.57 0 0 0 .25 1.38 2.93 2.93 0 0 0 .72 1.06 3.17 3.17 0 0 0 1.09.67 3.83 3.83 0 0 0 1.37.23 3.16 3.16 0 0 0 1.28-.27 2.45 2.45 0 0 0 1-.83L15 10.51a1.49 1.49 0 0 1-.54.49Z"
    />
  </svg>
`;

export const CaptionsOn = (props: any) => html`
  <svg viewBox="0 0 20 18" slot="${props.slot}">
    <title>${props.title}</title>
    <path
      d="M19.83 2.68a2.58 2.58 0 0 0-2.3-2.5C13.91-.06 6.09-.06 2.47.18a2.58 2.58 0 0 0-2.3 2.5 115.86 115.86 0 0 0 0 12.64 2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5 115.86 115.86 0 0 0 0-12.64ZM8.42 12.78a3.63 3.63 0 0 1-1.51.32 4.76 4.76 0 0 1-1.63-.27A4 4 0 0 1 4 12a3.67 3.67 0 0 1-.84-1.26 4.23 4.23 0 0 1-.3-1.63 4.28 4.28 0 0 1 .3-1.64A3.53 3.53 0 0 1 4 6.26a3.89 3.89 0 0 1 1.29-.8 4.76 4.76 0 0 1 1.63-.27 4.06 4.06 0 0 1 .67.06 4.57 4.57 0 0 1 .68.18 3.59 3.59 0 0 1 .64.34 2.7 2.7 0 0 1 .55.52l-1.27 1a1.79 1.79 0 0 0-.6-.46 2 2 0 0 0-.83-.16 2 2 0 0 0-1.56.69 2.35 2.35 0 0 0-.46.77 2.78 2.78 0 0 0-.16 1 2.74 2.74 0 0 0 .16 1 2.39 2.39 0 0 0 .46.77 2.07 2.07 0 0 0 .67.5 2 2 0 0 0 .84.18 1.87 1.87 0 0 0 .9-.21 1.78 1.78 0 0 0 .65-.6l1.38 1a2.88 2.88 0 0 1-1.22 1.01Zm7.52 0a3.63 3.63 0 0 1-1.51.32 4.76 4.76 0 0 1-1.63-.27 3.89 3.89 0 0 1-1.28-.83 3.55 3.55 0 0 1-.85-1.26 4.23 4.23 0 0 1-.3-1.63 4.28 4.28 0 0 1 .3-1.64 3.43 3.43 0 0 1 .85-1.25 3.75 3.75 0 0 1 1.28-.8 4.76 4.76 0 0 1 1.63-.27 4 4 0 0 1 .67.06 4.27 4.27 0 0 1 .68.18 3.59 3.59 0 0 1 .64.34 2.46 2.46 0 0 1 .55.52l-1.27 1a1.79 1.79 0 0 0-.6-.46 2 2 0 0 0-.83-.16 2 2 0 0 0-1.56.69 2.35 2.35 0 0 0-.46.77 3 3 0 0 0-.16 1 3 3 0 0 0 .16 1 2.58 2.58 0 0 0 .46.77 2.07 2.07 0 0 0 .67.5 2 2 0 0 0 .84.18 1.87 1.87 0 0 0 .9-.21 1.78 1.78 0 0 0 .65-.6l1.38 1a2.82 2.82 0 0 1-1.21 1.05Z"
    />
  </svg>
`;

export const FullscreenExit = (props: any) => html`
  <svg viewBox="0 0 18 18" slot="${props.slot}">
    <title>${props.title}</title>
    <path
      d="M17.25 11.5h-5a.76.76 0 0 0-.75.75v5a.75.75 0 0 0 1.5 0V13h4.25a.75.75 0 0 0 0-1.5Zm-5-5h5a.75.75 0 0 0 0-1.5H13V.75a.75.75 0 0 0-1.5 0v5a.76.76 0 0 0 .75.75Zm-6.5 5h-5a.75.75 0 0 0 0 1.5H5v4.25a.75.75 0 0 0 1.5 0v-5a.76.76 0 0 0-.75-.75Zm0-11.5A.76.76 0 0 0 5 .75V5H.75a.75.75 0 0 0 0 1.5h5a.76.76 0 0 0 .75-.75v-5A.76.76 0 0 0 5.75 0Z"
    />
  </svg>
`;

export const FullscreenEnter = (props: any) => html`
  <svg viewBox="0 0 18 18" slot="${props.slot}">
    <title>${props.title}</title>
    <path
      d="M17.25 11.5a.76.76 0 0 0-.75.75v4.25h-4.25a.75.75 0 0 0 0 1.5h5a.76.76 0 0 0 .75-.75v-5a.76.76 0 0 0-.75-.75Zm0-11.5h-5a.76.76 0 0 0-.75.75.76.76 0 0 0 .75.75h4.25v4.25a.75.75 0 0 0 1.5 0v-5a.76.76 0 0 0-.75-.75ZM5.75 16.5H1.5v-4.25a.76.76 0 0 0-.75-.75.76.76 0 0 0-.75.75v5a.76.76 0 0 0 .75.75h5a.75.75 0 0 0 0-1.5Zm0-16.5h-5A.76.76 0 0 0 0 .75v5a.76.76 0 0 0 .75.75.76.76 0 0 0 .75-.75V1.5h4.25A.76.76 0 0 0 6.5.75.76.76 0 0 0 5.75 0Z"
    />
  </svg>
`;

export const Pause = (props: any) => html`
  <svg viewBox="0 0 18 18" slot="${props.slot}">
    <title>${props.title}</title>
    <path
      d="M3 16.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v15ZM11.5 1a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5h-3Z"
    />
  </svg>
`;

export const Play = (props: any) => html`
  <svg viewBox="0 0 18 18" slot="${props.slot}">
    <title>${props.title}</title>
    <path
      d="m3.73 17.93 14.05-8.54a.46.46 0 0 0 0-.78L3.73.07A.48.48 0 0 0 3 .46v17.07a.48.48 0 0 0 .73.4Z"
    />
  </svg>
`;

export const Pip = (props: any) => html`
  <svg viewBox="0 0 20 18" slot="${props.slot}">
    <title>${props.title}</title>
    <path
      d="M19 0H1a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h6.75v-1.25h-6.5V1.25h17.5v6.5H20V1a1 1 0 0 0-1-1Zm0 10h-8a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1Zm-.5 6.5h-7v-5h7Z"
    />
  </svg>
`;

export const SeekBackward = (props: any) => html`
  <svg viewBox="0 0 16 18" slot="${props.slot}">
    <title>${props.title}</title>
    <path
      d="M8.75 3.42H4.68l2.14-2.14A.75.75 0 0 0 5.76.22L2.22 3.75a.77.77 0 0 0 0 1.07l3.54 3.53a.75.75 0 0 0 1.06 0 .75.75 0 0 0 0-1.06L4.45 4.92h4.3A5.75 5.75 0 0 1 11 16a.75.75 0 0 0 .29 1.44.72.72 0 0 0 .29-.06A7.25 7.25 0 0 0 8.75 3.42Z"
    />
    <text
      transform="translate(.6 17.8)"
      style="font-size: 8; font-family: 'ArialMT', 'Arial'"
    >
      30
    </text>
    <path style="fill: none" d="M0 0h16v18H0z" />
  </svg>
`;

export const SeekForward = (props: any) => html`
  <svg viewBox="0 0 16 18" slot="${props.slot}">
    <title>${props.title}</title>
    <path
      d="M7.25 3.42h4.07L9.18 1.28A.75.75 0 0 1 10.24.22l3.54 3.53a.77.77 0 0 1 0 1.07l-3.54 3.53a.75.75 0 0 1-1.06 0 .75.75 0 0 1 0-1.06l2.37-2.37h-4.3A5.75 5.75 0 0 0 5 16a.75.75 0 0 1-.29 1.44.72.72 0 0 1-.29-.06A7.25 7.25 0 0 1 7.25 3.42Z"
    />
    <text
      transform="translate(6.5 17.8)"
      style="font-size: 8; font-family: 'ArialMT', 'Arial'"
    >
      30
    </text>
    <path style="fill: none" d="M0 0h16v18H0z" />
  </svg>
`;

export const VolumeHigh = (props: any) => html`
  <svg viewBox="0 0 18 18" slot="${props.slot}">
    <title>${props.title}</title>
    <path
      d="m8.14 1.86-4 4a.49.49 0 0 1-.35.14H.25a.25.25 0 0 0-.25.25v5.5a.25.25 0 0 0 .25.25h3.54a.49.49 0 0 1 .36.15l4 4a.5.5 0 0 0 .85-.36V2.21a.5.5 0 0 0-.86-.35ZM10.88.3v1.52A7.52 7.52 0 0 1 16.47 9a7.52 7.52 0 0 1-5.59 7.18v1.52A9 9 0 0 0 18 9 9 9 0 0 0 10.88.3ZM14.44 9a5.49 5.49 0 0 0-3.56-5.1v1.66a3.93 3.93 0 0 1 0 6.88v1.66A5.49 5.49 0 0 0 14.44 9Z"
    />
    <path style="fill: none" d="M0 0h18v18H0z" />
  </svg>
`;

export const VolumeLow = (props: any) => html`
  <svg viewBox="0 0 18 18" slot="${props.slot}">
    <title>${props.title}</title>
    <path
      d="m8.14 1.86-4 4a.49.49 0 0 1-.35.14H.25a.25.25 0 0 0-.25.25v5.5a.25.25 0 0 0 .25.25h3.54a.49.49 0 0 1 .36.15l4 4a.5.5 0 0 0 .85-.36V2.21a.5.5 0 0 0-.86-.35ZM14.44 9a5.49 5.49 0 0 0-3.56-5.1v1.66a3.93 3.93 0 0 1 0 6.88v1.66A5.49 5.49 0 0 0 14.44 9Z"
    />
    <path style="fill: none" d="M0 0h18v18H0z" />
  </svg>
`;

export const VolumeOff = (props: any) => html`
  <svg viewBox="0 0 18 18" slot="${props.slot}">
    <title>${props.title}</title>
    <path
      d="m0 1.05 4.48 4.47-.33.33a.49.49 0 0 1-.36.15H.25a.25.25 0 0 0-.25.25v5.5a.25.25 0 0 0 .25.25h3.54a.49.49 0 0 1 .36.15l4 4a.48.48 0 0 0 .36.15.5.5 0 0 0 .5-.5v-5.75l4.67 4.66a7.71 7.71 0 0 1-2.79 1.47v1.52a9.32 9.32 0 0 0 3.87-1.91L17 18l1-1L1.06 0Zm5.36 5.36L7.75 8.8V14L5 11.26a1.74 1.74 0 0 0-1.24-.51H1.25v-3.5h2.54A1.74 1.74 0 0 0 5 6.74ZM16.47 9a7.19 7.19 0 0 1-.89 3.47l1.11 1.1A8.64 8.64 0 0 0 18 9 9 9 0 0 0 10.88.3v1.52A7.52 7.52 0 0 1 16.47 9ZM9 5.88V2.21a.5.5 0 0 0-.5-.5.48.48 0 0 0-.36.15L6.56 3.44ZM12.91 9a4.28 4.28 0 0 1-.07.72l1.22 1.22A5.2 5.2 0 0 0 14.44 9a5.49 5.49 0 0 0-3.56-5.1v1.66A4 4 0 0 1 12.91 9Z"
    />
    <path style="fill: none" d="M0 0h18v18H0z" />
  </svg>
`;

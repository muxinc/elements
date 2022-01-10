import React from "react";
const ButtonPressedKeys = ["Enter", " "];
const AirPlayButton = ({
  onClick = () => {},
}: {
  onClick?: React.MouseEventHandler;
}) => {
  const onKeyPress: React.KeyboardEventHandler = (evt) => {
    const { key } = evt;
    if (!ButtonPressedKeys.includes(key)) return;
    onClick(evt as unknown as React.MouseEvent);
  };
  return (
    <div
      role="button"
      aria-label="AirPlay"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onKeyPress}
      style={{ display: "inline-block", verticalAlign: "center" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 125 125"
        fill="#eee"
        height="100%"
        width="42px"
      >
        <defs>
          <path
            id="prefix__a"
            d="M81 88.8c.4.5.4 1.3-.1 1.7-.2.2-.5.3-.8.3H44.9c-.7 0-1.2-.5-1.2-1.2 0-.3.1-.6.3-.8l17.5-20.1c.5-.6 1.3-.6 1.9-.1l.1.1L81 88.8zm-4.1-11.1l-2.8-3.3h10.5c.9.1 1.7-.1 2.5-.4.5-.3 1-.7 1.2-1.2.4-.8.5-1.7.4-2.5V45.8c.1-.9-.1-1.7-.4-2.5-.3-.5-.7-1-1.2-1.2-.8-.4-1.7-.5-2.5-.4h-44c-.9-.1-1.7.1-2.5.4-.5.3-1 .7-1.2 1.2-.4.8-.5 1.7-.4 2.5v24.4c-.1.9.1 1.7.4 2.5.3.5.7 1 1.2 1.2.8.4 1.7.5 2.5.4h10.5l-2.8 3.3h-6.7c-3 0-4-.3-5-.9-1.1-.6-1.9-1.4-2.5-2.5-.6-1.1-.9-2.1-.9-5V46.7c0-3 .3-4 .9-5.1.6-1.1 1.4-1.9 2.5-2.5 1.1-.6 2.1-.9 5-.9h42.2c3 0 4 .3 5.1.9 1.1.6 1.9 1.4 2.5 2.5.6 1.1.9 2.1.9 5.1v22.5c0 3-.3 4-.9 5-.6 1.1-1.4 1.9-2.5 2.5-1.1.6-2.1.9-5.1.9l-6.9.1z"
          />
        </defs>
        <clipPath id="prefix__b">
          <use xlinkHref="#prefix__a" overflow="visible" />
        </clipPath>
        <g clipPath="url(#prefix__b)">
          <defs>
            <path id="prefix__c" d="M10.1 10.5H115v104.9H10.1z" />
          </defs>
          <clipPath id="prefix__d">
            <use xlinkHref="#prefix__c" overflow="visible" />
          </clipPath>
          <g clipPath="url(#prefix__d)">
            <path d="M24.8 30.1h75.4v68.8H24.8z" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default AirPlayButton;

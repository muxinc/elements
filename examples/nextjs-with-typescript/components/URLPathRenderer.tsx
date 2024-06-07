const URLPathRenderer = ({
  state,
  location: { origin, pathname } = {
    origin: '',
    pathname: './'
  },
}: { state: Record<string, any>; location?: Pick<Location, 'origin' | 'pathname'>; }) => {
  const stateEntries = Object.entries(state).filter(([,value]) => value != undefined);
  const urlSearchParamsStr = stateEntries.length
    ? `?${new URLSearchParams(Object.fromEntries(stateEntries.map(([k, v]) => [k, JSON.stringify(v)]))).toString()}`
    : ''
  const urlStr = `${origin}${pathname}${urlSearchParamsStr}`;
  const copyToClipboard = () => {
    navigator.clipboard?.writeText(urlStr);
  };
  return (
    <div className="url-renderer">
      <a href={urlStr} target="_blank">{urlStr}</a>
      <button onClick={copyToClipboard}>Copy URL</button>
    </div>
  );
};

export default URLPathRenderer;
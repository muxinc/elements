import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Link from 'next/link';

const URLPathRenderer = ({
  state,
  location: { origin, pathname } = {
    origin: '',
    pathname: './',
  },
}: {
  state: Record<string, any>;
  location?: Pick<Location, 'origin' | 'pathname'>;
}) => {
  const stateEntries = Object.entries(state).filter(([, value]) => value != undefined);
  const urlSearchParamsStr = stateEntries.length
    ? `?${new URLSearchParams(Object.fromEntries(stateEntries.map(([k, v]) => [k, JSON.stringify(v)]))).toString()}`
    : '';
  const urlStr = `${origin}${pathname}${urlSearchParamsStr}`;
  const copyToClipboard = () => {
    navigator.clipboard?.writeText(urlStr);
  };
  return (
    <Box style={{ display: 'flex', alignItems: 'center', textOverflow: 'ellipsis' }}>
      <Tooltip title={urlStr}>
        <Link href={urlStr} style={{ minWidth: 0 }} target="_blank">
          <Typography noWrap>{urlStr}</Typography>
        </Link>
      </Tooltip>
      <Tooltip title={'Copy to clipboard'}>
        <IconButton onClick={copyToClipboard}>
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default URLPathRenderer;

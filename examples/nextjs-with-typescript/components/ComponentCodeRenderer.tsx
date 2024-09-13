import { Box, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const toValueString = (value: any) => {
  if (['boolean', 'number', 'string'].includes(typeof value)) return `${JSON.stringify(value)}`;
  if (Array.isArray(value)) return `[${value.map(toValueString).join(', ')}]`;
  if (typeof value === 'object')
    return `{ ${Object.entries(value)
      .map(([key, entryValue]) => `${key}: ${toValueString(entryValue)}`)
      .join(', ')} }`;
  return value;
};

const ComponentCodeRenderer = ({
  state,
  component = 'MuxPlayer',
}: {
  state: Record<string, any>;
  component?: string;
}) => {
  const stateEntries = Object.entries(state).filter(([, value]) => value != undefined);
  const propsStr = stateEntries.length
    ? `\n${stateEntries.map(([key, value]) => `  ${key}={${toValueString(value)}}`).join('\n')}\n`
    : '';
  const codeStr = `<${component}${propsStr}/>`;
  const copyToClipboard = () => {
    navigator.clipboard?.writeText(codeStr);
  };
  return (
    <Box style={{ position: 'relative' }}>
      <Tooltip title={'Copy to clipboard'}>
        <IconButton style={{ position: 'absolute', top: 0, right: 0 }} onClick={copyToClipboard}>
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
      <pre>
        <code>{codeStr}</code>
      </pre>
    </Box>
  );
};

export default ComponentCodeRenderer;

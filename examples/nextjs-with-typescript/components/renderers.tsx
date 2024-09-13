import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  NativeSelect,
  TextField,
  Chip,
  OutlinedInput,
  MenuItem,
  Select,
  Container,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTheme } from '@mui/material/styles';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { ReactNode } from 'react';
import type { Theme } from '@mui/material/styles';

export const toWordsFromKeyName = (string: string) => {
  if (string.includes('.')) {
    return string.split('.').map(toWordsFromKeyName).join(': ');
  }
  if (string.includes('_')) {
    return string.split('_').map(toWordsFromKeyName).join(' ');
  }
  const first = string[0].toUpperCase();
  const rest = string.slice(1);
  return `${first}${rest.replace(/[A-Z]/g, (match) => ` ${match}`)}`;
};

export const BooleanRenderer = ({
  name,
  value,
  label,
  removeFalse = true,
  onChange,
}: {
  name: string;
  value: boolean | undefined;
  label?: string;
  removeFalse?: boolean;
  onChange: (obj: any) => void;
}) => {
  const labelStr = label ?? toWordsFromKeyName(name);
  return (
    <Container sx={{ p: 1, flexGrow: 1, flexShrink: 0, flexBasis: 0, border: '1px dashed grey' }}>
      <FormControlLabel
        control={
          <Checkbox
            id={`${name}-control`}
            defaultChecked={value}
            onChange={({ target: { checked } }) => {
              const changeValue = removeFalse && !checked ? undefined : checked;
              onChange(toChangeObject(name, changeValue));
            }}
          />
        }
        label={labelStr}
      />
    </Container>
  );
};

export const NumberRenderer = ({
  name,
  value,
  label,
  onChange,
  min,
  max,
  step,
  placeholder,
}: {
  name: string;
  value: number | undefined;
  label?: string;
  onChange: (obj: any) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}) => {
  const labelStr = label ?? toWordsFromKeyName(name);
  return (
    <Container sx={{ p: 1, flexGrow: 1, flexShrink: 0, flexBasis: 0, border: '1px dashed grey' }}>
      <TextField
        sx={{ width: 1, display: 'inline-block' }}
        id={`${name}-control`}
        type="number"
        label={labelStr}
        defaultValue={value}
        placeholder={placeholder}
        slotProps={{
          htmlInput: {
            min,
            max,
            step,
          },
        }}
        onChange={({ target: { value } }) => {
          const changeValue = value ? +value : undefined;
          onChange(toChangeObject(name, changeValue));
        }}
      />
    </Container>
  );
};

export const TextRenderer = ({
  name,
  value,
  label,
  onChange,
  placeholder,
}: {
  name: string;
  value: string | undefined;
  label?: string;
  onChange: (obj: any) => void;
  placeholder?: string;
}) => {
  const labelStr = label ?? toWordsFromKeyName(name);
  return (
    <Container sx={{ p: 1, flexGrow: 1, flexShrink: 0, flexBasis: 0, border: '1px dashed grey' }}>
      <TextField
        id={`${name}-control`}
        type="text"
        label={labelStr}
        defaultValue={value}
        placeholder={placeholder}
        onChange={({ target: { value } }) => {
          const changeValue = value ? value : undefined;
          onChange(toChangeObject(name, changeValue));
        }}
      />
    </Container>
  );
};

export const URLRenderer = ({
  name,
  value,
  label,
  onChange,
  placeholder,
}: {
  name: string;
  value: string | undefined;
  label?: string;
  onChange: (obj: any) => void;
  placeholder?: string;
}) => {
  const labelStr = label ?? toWordsFromKeyName(name);
  return (
    <Container sx={{ p: 1, flexGrow: 1, flexShrink: 0, flexBasis: 0, border: '1px dashed grey' }}>
      <TextField
        id={`${name}-control`}
        type="url"
        label={labelStr}
        defaultValue={value}
        placeholder={placeholder}
        onChange={({ target: { value } }) => {
          const changeValue = value ? value : undefined;
          onChange(toChangeObject(name, changeValue));
        }}
      />
    </Container>
  );
};

export const ColorRenderer = ({
  name,
  value,
  label,
  onChange,
}: {
  name: string;
  value: string | undefined;
  label?: string;
  onChange: (obj: any) => void;
}) => {
  const labelStr = label ?? toWordsFromKeyName(name);
  return (
    <Container sx={{ p: 1, flexGrow: 1, flexShrink: 0, flexBasis: 0, border: '1px dashed grey' }}>
      <TextField
        id={`${name}-control`}
        type="color"
        style={{ minWidth: 100 }}
        label={labelStr}
        defaultValue={value ?? '#000000'}
        onChange={({ target: { value } }) => {
          const changeValue = value ? value : undefined;
          onChange(toChangeObject(name, changeValue));
        }}
      />
    </Container>
  );
};

/** @TODO Consider refactoring to an actual react (functional) component (CJP) */
export const DefaultEnumFormatter = (enumValue) => {
  let renderValue = JSON.stringify(enumValue);
  if (renderValue === 'null' && enumValue !== null) {
    renderValue = enumValue?.toString();
  }
  return <code>{renderValue}</code>;
};

export const EnumRenderer = ({
  name,
  value,
  label,
  onChange,
  values,
  formatter = DefaultEnumFormatter,
}: {
  name: string;
  value: any | undefined;
  label?: string;
  onChange: (obj: any) => void;
  values: any[];
  formatter?: (enumValue: any) => ReactNode;
}) => {
  const labelStr = label ?? toWordsFromKeyName(name);
  return (
    <Container sx={{ p: 1, flexGrow: 1, flexShrink: 0, flexBasis: 0, border: '1px dashed grey' }}>
      <FormControl>
        <InputLabel variant="standard" htmlFor={`${name}-uncontrolled-native`} shrink>
          {labelStr}
        </InputLabel>
        <NativeSelect
          inputProps={{
            name,
            id: `${name}-uncontrolled-native`,
          }}
          defaultValue={value ?? ''}
          onChange={({ target: { value } }) => {
            const changeValue = value ? value : undefined;
            onChange(toChangeObject(name, changeValue));
          }}
        >
          <option id={`${name}-none-control`} value="">
            (None)
          </option>
          {values.map((enumValue) => {
            return (
              <option key={`${name}-${enumValue}`} id={`${name}-${enumValue}-control`} value={enumValue}>
                {formatter(enumValue)}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
    </Container>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export const EnumMultiSelectRenderer = ({
  name,
  value = [],
  label,
  onChange,
  values,
}: {
  name: string;
  value: any[] | undefined;
  label?: string;
  onChange: (obj: any) => void;
  values: any[];
}) => {
  const labelStr = label ?? toWordsFromKeyName(name);
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<any[]>) => {
    const {
      target: { value },
    } = event;
    let changeValue = typeof value === 'string' ? value.split(',') : value;
    if (Array.isArray(changeValue)) {
      changeValue = changeValue.filter((x) => !!x);
      if (!changeValue.length) {
        changeValue = undefined;
      }
    }
    onChange(toChangeObject(name, changeValue));
  };

  return (
    <Container sx={{ p: 1, flexGrow: 1, flexShrink: 0, flexBasis: 0, border: '1px dashed grey' }}>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{labelStr}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => {
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected
                  .filter((x) => !!x)
                  .map((selectedEnumValue) => (
                    <Chip
                      key={selectedEnumValue}
                      label={selectedEnumValue}
                      deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
                      onDelete={() => {
                        const changeValue = value.filter((enumValue) => enumValue != selectedEnumValue);
                        onChange(toChangeObject(name, changeValue.length ? changeValue : undefined));
                      }}
                    />
                  ))}
              </Box>
            );
          }}
          MenuProps={MenuProps}
        >
          {values.map((enumValue) => (
            <MenuItem key={`${name}-${enumValue}-option`} value={enumValue} style={getStyles(enumValue, value, theme)}>
              {`${enumValue}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
};

// NOTE: Placing this function at the bottom bc generic syntax messes up code highlighting in VSCode. This at least keeps the jank narrow. (CJP)
export const toChangeObject = <T = undefined,>(name: string, value: T) => {
  // NOTE: Currently only support depth=1
  if (name.includes('.')) {
    const [name1, name2] = name.split('.');
    return { [name1]: { [name2]: value } };
  }
  return { [name]: value };
};

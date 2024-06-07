import { Fragment, ReactNode } from 'react';

export const toWordsFromCamel = (string: string) => {
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
  const labelStr = label ?? toWordsFromCamel(name);
  return (
    <div>
      <label htmlFor={`${name}-control`}>
        {labelStr} (<code>{name}</code>)
      </label>
      <input
        id={`${name}-control`}
        type="checkbox"
        onChange={({ target: { checked } }) => onChange({ [name]: removeFalse && !checked ? undefined : checked })}
        checked={value ?? false}
      />
    </div>
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
}: {
  name: string;
  value: number | undefined;
  label?: string;
  onChange: (obj: any) => void;
  min?: number;
  max?: number;
  step?: number;
}) => {
  const labelStr = label ?? toWordsFromCamel(name);
  return (
    <div>
      <label htmlFor={`${name}-control`}>
        {labelStr} (<code>{name}</code>)
      </label>
      <input
        id={`${name}-control`}
        type="number"
        min={min}
        max={max}
        step={step}
        onChange={({ target: { value } }) => onChange({ [name]: value ? +value : undefined })}
        value={value ?? ''}
      />
    </div>
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
  const labelStr = label ?? toWordsFromCamel(name);
  return (
    <div>
      <label htmlFor={`${name}-control`}>
        {labelStr} (<code>{name}</code>)
      </label>
      <input
        id={`${name}-control`}
        type="text"
        onChange={({ target: { value } }) => onChange({ [name]: value ? value : undefined })}
        value={value ?? ''}
        placeholder={placeholder}
      />
    </div>
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
  const labelStr = label ?? toWordsFromCamel(name);
  return (
    <div>
      <label htmlFor={`${name}-control`}>
        {labelStr} (<code>{name}</code>)
      </label>
      <input
        id={`${name}-control`}
        type="url"
        onChange={({ target: { value } }) => onChange({ [name]: value ? value : undefined })}
        value={value ?? ''}
        placeholder={placeholder}
      />
    </div>
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
  const labelStr = label ?? toWordsFromCamel(name);
  return (
    <div>
      <label htmlFor={`${name}-control`}>
        {labelStr} (<code>{name}</code>)
      </label>
      <input
        id={`${name}-control`}
        type="color"
        onChange={({ target: { value } }) => onChange({ [name]: value ? value : undefined })}
        value={value ?? '#000000'}
      />
    </div>
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
  const labelStr = label ?? toWordsFromCamel(name);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <label>
        {labelStr} (<code>{name}</code>)
      </label>
      <div>
        <input
          id={`${name}-none-control`}
          type="radio"
          onChange={() => onChange({ [name]: undefined })}
          value=""
          checked={value == undefined}
        />
        <label htmlFor={`${name}-none-control`}>None</label>
        {values.map((enumValue, i) => {
          return (
            <Fragment key={`${name}-${enumValue}`}>
              <input
                id={`${name}-${enumValue}-control`}
                type="radio"
                onChange={() => onChange({ [name]: values[i] })}
                value={typeof enumValue === 'string' ? enumValue : enumValue?.toString()}
                checked={value === enumValue}
              />
              <label htmlFor={`${name}-${enumValue}-control`}>{formatter(enumValue)}</label>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export const EnumMultiSelectRenderer = ({
  name,
  value,
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
  const labelStr = label ?? toWordsFromCamel(name);
  return (
    <div>
      <label htmlFor={`${name}-control`}>
        {labelStr} (<code>{name}</code>)
      </label>
      <select
        id={`${name}-control`}
        multiple
        size={values.length}
        defaultValue={value ?? []}
        onChange={({ target: { selectedOptions } }) => {
          const currentValues = selectedOptions?.length
            ? Array.from(selectedOptions, ({ value }) => values.find((enumValue) => enumValue.toString() === value))
            : undefined;
          onChange({ [name]: currentValues });
        }}
      >
        {values.map((enumValue) => {
          return (
            <option key={`${name}-${enumValue}-option`} value={enumValue}>
              {`${enumValue}`}
            </option>
          );
        })}
      </select>
    </div>
  );
};

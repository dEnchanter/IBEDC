import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import InputMask from 'react-input-mask';
import AsyncSelect from 'react-select/async';
import ReactSelect from 'react-select';
import { formatDate } from '../util/common';
import { Button, IconButton } from './buttons';
import { DatePickerIcon, Loading } from './icons';

export const TextInputUnit = forwardRef(({ label, onChange, name }, ref) => {
  const [hasFocus, setHasFocus] = useState(false);
  const inputRef = useRef();

  // Make external ref proxies to inputRef. Libraries like react-hook-form need this to work well
  // NOTE: We use create ref internally to be able to focus on input when any part of the
  // input container is clicked.
  useImperativeHandle(ref, () => inputRef.current);

  function handleFocus() {
    setHasFocus(true);
  }

  function handleBlur() {
    setHasFocus(false);
  }

  return (
    <div
      onClick={() => inputRef.current.focus()}
      className={`ring-1 ${
        hasFocus ? 'ring-gray-400 ring-opacity-50' : 'ring-gray-200 ring-opacity-80'
      } rounded px-2`}
    >
      <span className="w-full text-xs text-gray-400 leading-1" htmlFor={name}>
        {label}
      </span>
      <input
        onChange={onChange}
        ref={inputRef}
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full text-gray-700 focus:outline-none appearance-none ring-opacity-50 rounded text-sm bg-transparent pb-1"
        type="text"
      />
    </div>
  );
});

export const SmartSelect = forwardRef(({ loading, options, onChange, ...rest }, ref) => {
  return (
    <ReactSelect
      ref={ref}
      instanceId="smart-select"
      {...rest}
      options={options}
      isLoading={loading}
      onChange={onChange}
    />
  );
});

export function TextInput({
  width = 'w-full',
  padding = 'px-2 py-2 ',
  bg = 'bg-gray-50',
  color = 'text-gray-700',
  height = 'h-auto',
  margin = '',
  register,
  innerRef,
  ...rest
}) {
  return (
    <input
      className={`${width} ${padding} ${margin} ${bg} ${color} ${height} focus:outline-none appearance-none ring-1 ring-gray-300 ring-opacity-50 focus:ring-1 focus:ring-gray-400 focus:ring-opacity-80 rounded text-sm`}
      type="text"
      ref={innerRef || register} // InnerRef will eventually replace register
      {...rest}
    />
  );
}

export function Select({
  width = 'w-full',
  padding = 'px-2 py-2 ',
  bg = 'bg-gray-50',
  color = 'text-gray-700',
  height = 'h-auto',
  margin = '',
  register,
  children,
  ...rest
}) {
  return (
    <select
      className={`${width} ${padding} ${margin} ${bg} ${color} ${height} focus:outline-none ring-1 ring-gray-300 ring-opacity-50 focus:ring-1 focus:ring-gray-400 focus:ring-opacity-80 rounded text-sm`}
      ref={register}
      {...rest}
    >
      {children}
    </select>
  );
}

export function Label({
  children,
  font = 'text-sm',
  margin = 'mb-1',
  className,
  required,
  ...rest
}) {
  return (
    <label className={`${font} text-gray-700 block ${margin} opacity-80`} {...rest}>
      <span>{children}</span>
      {required && <span className="italic text-gray-500 text-sm ml-2">(Required)</span>}
    </label>
  );
}

function TextInputGroup({ label, name, children, ...rest }) {
  return (
    <div className="">
      <label htmlFor={name}>{label}</label>
      <Input name={name} />
    </div>
  );
}

export function FieldError({ children }) {
  return <small className="text-yellow-600 opacity-80 italic">{children}</small>;
}

export const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, toggleAllPageRowsSelected, onChange, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    function onChangeHandler(e) {
      toggleAllPageRowsSelected(false);
      onChange(e);
    }

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" onChange={onChangeHandler} ref={resolvedRef} {...rest} />
      </>
    );
  }
);

export function CustomSelect({
  onChange,
  placeholder = 'Select',
  getLabel,
  getValue,
  defaultInputValue,
  defaultValue,
  fetchAsyncOptions,
  filterPredicate,
  onLoadError,
}) {
  const [options, setOptions] = useState(null);

  const customStyles = {
    control: (provided, state) => {
      // console.log(state);
      return {
        ...provided,
        minHeight: false,
        borderColor: false,
        borderStyle: false,
        borderWidth: false,
        borderRadius: false,
        backgroundColor: false,
        boxShadow: false,
      };
    },
  };

  async function loadOptions(input) {
    let _options;
    // cache is new or empty
    if (!options || options.length < 1) {
      try {
        _options = await fetchAsyncOptions();
        // cache
        setOptions(_options || []);
      } catch (error) {
        console.error(error);
        onLoadError && onLoadError(error);
        return;
      }
    } else {
      _options = options;
    }
    // filter and map
    return _options.reduce((acc, opt) => {
      if (filterPredicate(input, opt)) {
        acc.push({ value: getValue(opt), label: getLabel(opt) });
      }
      return acc;
    }, []);
  }

  return (
    <AsyncSelect
      styles={customStyles}
      className="focus:outline-none ring-2 ring-gray-200 ring-opacity-50 focus:ring-2 focus:ring-gray-300 focus:ring-opacity-80 rounded-sm text-sm bg-gray-50 text-gray-700"
      classNamePrefix="react-select"
      placeholder={placeholder}
      defaultValue={defaultValue}
      defaultOptions
      defaultInputValue={defaultInputValue}
      loadOptions={loadOptions}
      onChange={(data) => onChange(data.value)}
    />
  );
}

function DateInput({
  width = 'w-full',
  padding = 'px-2 py-2 ',
  bg = 'bg-gray-50',
  color = 'text-gray-700',
  margin = '',
  grouped,
  groupedPadding = 'p-0',
  groupedBg = '',
  ...rest
}) {
  return (
    <TextInput
      readOnly
      className={`${width} ${margin} ${bg} ${color} p-0 text-sm focus:outline-none appearance-none `}
      {...rest}
    />
  );
}

export function DateRange({ register, required, initDate, onSelect }) {
  const [startDate, setStartDate] = useState(initDate);
  const [endDate, setEndDate] = useState(initDate);

  function onChange(dates) {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onSelect && onSelect({ startDate: start, endDate: end });
  }

  const Picker = forwardRef(({ value, onClick }, ref) => (
    <IconButton
      bg="bg-none"
      font="text-purple-600"
      onClick={onClick}
      innerRef={ref}
      icon={DatePickerIcon}
      padding="p-0"
    />
  ));
  return (
    <div className="flex justify-between items-center border border-gray-300 rounded px-2 py-1 h-12">
      <div className="w-24">
        <Label font="text-xs" margin="m-0">
          From
        </Label>
        <DateInput
          name="startDate"
          innerRef={register && register({ required: required })}
          value={formatDate(startDate) || ''}
        />
      </div>
      <div className="w-24">
        <Label font="text-xs" margin="m-0">
          To
        </Label>
        <DateInput
          name="endDate"
          innerRef={register && register({ required: required })}
          value={formatDate(endDate) || ''}
        />
      </div>
      <div className="self-end">
        <ReactDatePicker
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          customInput={<Picker />}
          onChange={onChange}
          selectsRange
        />
      </div>
    </div>
  );
}

export function DatePickerInput({ onChange, register, initDate = new Date() }) {
  const [date, setDate] = useState(initDate);

  useEffect(() => {
    onChange && onChange(date);
  }, [date]);

  function handleOnChange(date) {
    setDate(date);
  }

  const Picker = forwardRef(({ value, onClick }, ref) => (
    <IconButton
      bg="bg-none"
      font="text-purple-600"
      onClick={onClick}
      innerRef={ref}
      icon={DatePickerIcon}
      padding="p-0"
    />
  ));
  return (
    <div className="flex justify-between items-center border border-gray-300 rounded px-2 py-1 h-12">
      <div className="">
        <ReactDatePicker
          selected={date}
          startDate={date}
          customInput={<Picker />}
          onChange={handleOnChange}
        />
      </div>
      <div className="w-24">
        <DateInput
          name="date"
          innerRef={register && register({ required: required })}
          value={formatDate(date) || ''}
        />
      </div>
    </div>
  );
}

export function SubmitButton({ label, loading, onClick, disabled }) {
  const stateClass = loading || disabled ? 'opacity-80 cursor-not-allowed' : '';
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`bg-ibedc-brand-orange ${stateClass} px-3 py-3 rounded text-gray-50 text-sm relative w-full`}
      disabled={loading || disabled}
    >
      {label}
      {loading && (
        <span className="ml-2 ">
          <Loading h="w-4" />
        </span>
      )}
    </button>
  );
}

export function AddAccount({ label, loading, onClick, disabled }) {
  const stateClass = loading || disabled ? 'opacity-80 cursor-not-allowed' : '';
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`bg-ibedc-brand-orange ${stateClass} px-3 py-3 rounded text-gray-50 text-sm relative w-1/2`}
      disabled={loading || disabled}
    >
      {label}
      {loading && (
        <span className="ml-2 ">
          <Loading h="w-4" />
        </span>
      )}
    </button>
  );
}

export const Input = forwardRef(({ placeholder, small, type = 'text', ...rest }, ref) => {
  const padding = small ? 'py-2 md:py-2' : 'py-3 md:py-3';
  return (
    <input
      {...rest}
      type={type}
      ref={ref}
      className={`w-full rounded-lg border-opacity-40 focus-visible:outline-none border border-ibedc-brand-orange text-sm focus:ring-ibedc-brand-orange focus:ring-1 focus:ring-opacity-40 mt-1 px-2 ${padding}`}
      placeholder={placeholder}
    />
  );
});

{
  /* export function SubmitButton({ label, margin, ...rest }) {
  return (
    <button
      type="submit"
      className={`bg-ibedc-brand-orange px-3 py-5 md:py-4 rounded text-white ${margin} font-medium tracking-wide w-full`}
      {...rest}
    >
      {label}
    </button>
  );
} */
}

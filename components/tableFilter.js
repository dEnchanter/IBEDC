import { useEffect, useReducer, useState } from "react";
import { formatDate } from "../util/common";
import { HollowButton, IconButton } from "./buttons";
import { DateRange, Label, Select, TextInput } from "./forms";
import { PlusIcon, DeleteIcon } from "./icons";

export function TableFilter({ initialDate, searchKeys, onFilter }) {
  const [state, dispatch] = useReducer(filterReducer, {
    startDate: initialDate,
    endDate: initialDate,
    activeParameter: { key: null, value: "" },
    parameters: {},
    searchKeys,
    remainingKeys: searchKeys,
    canFilter: false,
  });

  useEffect(() => {
    let firstKey = searchKeys[0];
    if (firstKey) {
      dispatch({ type: "active_param_update", payload: firstKey.name });
      dispatch({ type: "remaining_keys_update" });
    }
  }, []);

  useEffect(() => {
    if (state.canFilter) {
      handleOnFilter();
      dispatch({ type: "filter_end" });
    }
  }, [state.canFilter]);

  function handleOnFilter() {
    let filters = Object.keys(state.parameters).map((key) => ({
      id: key,
      value: state.parameters[key].value,
    }));
    filters.push({ id: "startDate", value: formatDate(state.startDate) });
    filters.push({ id: "endDate", value: formatDate(state.endDate) });

    onFilter(filters);
  }

  function handleDelete(name) {
    dispatch({ type: "parameters_remove", payload: name });
    dispatch({ type: "active_param_update", payload: name });
    dispatch({ type: "active_param_value_update", payload: "" });
    dispatch({ type: "remaining_keys_update" });
  }

  function handleClick({ name, value }) {
    dispatch({ type: "active_param_update", payload: name });
    dispatch({ type: "active_param_value_update", payload: value });
    dispatch({ type: "remaining_keys_update" });
  }

  return (
    <div className="ml-5">
      <div className="flex mb-3">
        <div className="w-full flex-grow flex justify-end flex-wrap">
          {Object.keys(state.parameters).map((keyName) => (
            <SearchParameterPill
              {...state.parameters[keyName]}
              key={keyName}
              onDelete={handleDelete}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <div className="w-60 mr-4">
          <Label>Select date range</Label>
          <DateRange
            required
            initDate={initialDate}
            onSelect={({ startDate, endDate }) =>
              dispatch({
                type: "date_range_update",
                payload: { startDate, endDate },
              })
            }
          />
        </div>
        <div className="w-32 mr-1">
          <Label>Search column</Label>
          <Select
            name="column"
            padding="px-2 py-3"
            height="h-12"
            value={state.activeParameter?.key?.name}
            onChange={(e) => {
              dispatch({
                type: "active_param_update",
                payload: e.target.value,
              });
              dispatch({ type: "remaining_keys_update" });
            }}
          >
            <option
              key={state.activeParameter?.key?.name}
              value={state.activeParameter?.key?.name}
            >
              {state.activeParameter?.key?.label}
            </option>
            {state.remainingKeys.map((field) => (
              <option key={field.name} value={field.name}>
                {field.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="mr-4 flex">
          <div className="w-56">
            <Label>Search value</Label>
            <TextInput
              name="search"
              disabled={!state.activeParameter}
              value={state.activeParameter.value}
              onChange={(e) =>
                dispatch({
                  type: "active_param_value_update",
                  payload: e.target.value,
                })
              }
              height="h-12"
              placeholder="Enter search value"
            />
          </div>
          <div className="self-end ml-1">
            <IconButton
              height="h-12"
              padding="p-3 rounded"
              icon={PlusIcon}
              look="brandPurple"
              onClick={() => {
                dispatch({ type: "parameters_add" });
                dispatch({ type: "remaining_keys_update" });
              }}
            />
          </div>
        </div>
        <div className="w-24 self-end">
          <HollowButton
            type="submit"
            padding="px-2 py-3"
            width="w-full"
            height="h-12"
            onClick={() => {
              dispatch({ type: "parameters_add" });
              dispatch({ type: "remaining_keys_update" });
              dispatch({ type: "filter_start" });
            }}
          >
            Filter
          </HollowButton>
        </div>
      </div>
    </div>
  );
}

export function SearchParameterPill({ name, label, value, onDelete, onClick }) {
  const [isHovering, setIsHovering] = useState(false);

  const labelHoverStyle = isHovering ? "bg-purple-600" : "bg-purple-500";
  const valueHoverStyle = isHovering ? "bg-gray-300" : "bg-gray-200";

  return (
    <div
      className="text-sm text-gray-800 flex rounded ml-2 mb-2 cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onClick({ name, value })}
    >
      <span
        className={`px-1 py-1 self-baseline rounded-l ${
          isHovering ? "visible" : "invisible"
        }`}
      >
        <IconButton
          icon={() => <DeleteIcon h="h-4" />}
          padding="p-0"
          round
          bg="bg-none"
          font="text-red-500 text-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(name);
          }}
        />
      </span>
      <span
        className={`px-2 py-1 inline-block rounded-l text-gray-50 ${labelHoverStyle}`}
      >
        {label}
      </span>
      <span className={`px-2 py-1 inline-block rounded-r ${valueHoverStyle}`}>
        {value}
      </span>
    </div>
  );
}

export function filterReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "date_range_update":
      return {
        ...state,
        startDate: payload.startDate,
        endDate: payload.endDate,
      };
    case "active_param_update":
      let key = state.searchKeys.find((sk) => sk.name === payload);
      return {
        ...state,
        activeParameter: {
          key,
          value: state.activeParameter.value || "",
        },
      };
    case "remaining_keys_update":
      return {
        ...state,
        remainingKeys: state.searchKeys.filter(
          ({ name }) =>
            !state.parameters[name] && name !== state.activeParameter.key.name
        ),
      };
    case "active_param_value_update":
      return {
        ...state,
        activeParameter: { ...state.activeParameter, value: payload },
      };
    case "parameters_add":
      let { key: keyName, value } = state.activeParameter;
      return state.activeParameter.value?.trim()
        ? {
            ...state,
            parameters: {
              ...state.parameters,
              [keyName.name]: { ...keyName, value },
            },
          }
        : state;
    case "parameters_remove":
      let updatedParameters = {};
      for (const name in state.parameters) {
        if (name !== payload) {
          updatedParameters[name] = state.parameters[name];
        }
      }
      return {
        ...state,
        parameters: updatedParameters,
      };
    case "filter_start":
      return { ...state, canFilter: true };
    case "filter_end":
      return { ...state, canFilter: false };
    default:
      return state;
  }
}

"use client";

import React, { useState } from "react";
import DateIcon from "../icons/date";
import { dropdownOptions } from "../constants";
import Plus from "../icons/plus";
import { v4 as uuidv4 } from "uuid";
import { DataType } from "./Card/card";
import useDataStore from "../store";
import { usePathname } from "next/navigation";

interface ShortAnswerProps {
  type?: "number" | "url" | "text";
  item: DataType;
}

export const ShortAnswerField: React.FC<ShortAnswerProps> = ({
  type,
  item,
}) => {
  const { updateData } = useDataStore();

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    if (type === "number") {
      event.currentTarget.value = event?.currentTarget.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*?)\..*/g, "$1")
        .replace(/^0[^.]/, "0");
    } else {
      return;
    }
  };
  return (
    <input
      onInput={(e) => {
        handleInput(e);
      }}
      onChange={(e) =>
        updateData({
          ...item,
          value: e?.target?.value?.trim(),
          hasError: false,
        })
      }
      value={item?.value}
      className={`border px-2 type border-gray-200 min-h-8 rounded-lg shadow-soft   w-full`}
    />
  );
};

export const LongAnswerField = ({ item }: { item: DataType }) => {
  const { updateData } = useDataStore();

  return (
    <textarea
      onChange={(e) =>
        updateData({
          ...item,
          value: e?.target?.value?.trim(),
          hasError: false,
        })
      }
      value={item?.value}
      className="border min-h-20 px-2 resize-none border-gray-200 rounded-lg shadow-soft   w-full"
    />
  );
};

export const DatePicker = ({ item }: { item: DataType }) => {
  const { updateData } = useDataStore();

  // Keep track of value changes for replacing placeholder
  const [inputValue, setInputValue] = useState<string | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event?.target?.value?.split("-")?.toReversed()?.join("-"));
    updateData({
      ...item,
      value: event?.target?.value?.split("-")?.toReversed()?.join("-"),
      hasError: false,
    });
  };

  return (
    <div className="relative h-max ">
      <input
        type="date"
        value={item?.value}
        onChange={(e) => handleChange(e)}
        className="border px-2  border-gray-200  min-h-8 rounded-lg shadow-soft opacity-0  cursor-pointer! w-full"
      />
      <div className="absolute top-0 flex justify-between items-center px-2 w-full z-10 text-sm pointer-events-none   text-gray-400 min-h-8 border  border-gray-200  rounded-lg shadow-soft   ">
        {inputValue ? inputValue : "MM-DD-YYYY"}
        <DateIcon />
      </div>
    </div>
  );
};

export const InputTypesDropdown = ({
  handleDropDownChange,
  position,
}: {
  handleDropDownChange: (value: string) => void;
  position?: string;
}) => {
  return (
    <ul
      className={` absolute ${
        position?.length
          ? position
          : `top-[calc(100%+0.50rem)] left-1/2 -translate-x-1/2`
      }    bg-white rounded-2xl 
      p-1 min-w-64 duration-150 flex flex-col border z-50 border-gray-300  `}
    >
      <li
        key={"Input types"}
        className="list-none capitalize py-2 px-4 flex gap-3 rounded-lg text-gray-500 justify-start items-center bg-gray-50"
      >
        Input Types
      </li>
      {dropdownOptions?.map((choices) => {
        return (
          <li
            onClick={() => handleDropDownChange(choices?.option)}
            key={choices?.option}
            className="list-none flex gap-3 p-2 justify-start items-center  font-medium text-gray-1000 hover:bg-gray-200"
          >
            {choices?.icon} {choices?.option}
          </li>
        );
      })}
    </ul>
  );
};

interface RadioGroupProps {
  name: string; // Name attribute for the group
  selectedValue: string; // Currently selected value

  item: DataType;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ name, item }) => {
  const { updateData } = useDataStore();
  const emptyRadio = { label: "", value: "", id: "" };
  const [options, setOptions] = useState(
    item?.options?.length
      ? item?.options
      : [{ ...emptyRadio, label: "", value: "", id: uuidv4() }]
  );
  const addNewRadio = () => {
    const copyoptions = [
      ...options,
      {
        ...emptyRadio,
        label: "",
        value: "",
        id: uuidv4(),
      },
    ];
    updateOptions(copyoptions);
    setOptions(copyoptions);
  };

  const handleRadioChange = (option: string) => {
    const copyItem = { ...item, value: option, hasError: false };
    updateData(copyItem);
  };

  const updateOptions = (newOptions: typeof options) => {
    const copyItem = { ...item, options: newOptions };
    updateData(copyItem);
  };
  const optionsLength = options?.length;

  const handleLableUpdate = (value: string, id: string) => {
    const indexOfItemtoBeEdited = options?.findIndex((node) => node?.id === id);
    const copyOptions = [...options];
    copyOptions[indexOfItemtoBeEdited] = {
      ...copyOptions[indexOfItemtoBeEdited],
      value: value,
      label: value,
    };
    setOptions(copyOptions);
    updateOptions(copyOptions);
  };
  const router = usePathname();
  const isPublishMode = router?.includes("edit");

  return (
    <div className="flex flex-col space-y-2 ">
      {options?.map((option, index) => (
        <label
          key={option?.id}
          className="flex items-center space-x-2 text-gray-700"
        >
          <input
            type="radio"
            name={name}
            value={option?.value}
            checked={item?.value === option?.value}
            onChange={() => handleRadioChange(option?.value)}
            className="h-4 w-4  border-gray-300 "
          />
          {isPublishMode ? (
            <span>{option.label}</span>
          ) : optionsLength - 1 === index || optionsLength === 0 ? (
            <div className="w-full flex items-center gap-2">
              <input
                onChange={(e) =>
                  handleLableUpdate(e?.target?.value, option?.id)
                }
                value={option?.label}
                className="border px-2 type border-gray-200 min-h-8 rounded-lg shadow-soft basis-full  "
              />
              <button onClick={addNewRadio}>
                <Plus />
              </button>
            </div>
          ) : (
            <input
              onChange={(e) => handleLableUpdate(e?.target?.value, option?.id)}
              value={option?.label}
              className="border px-2 type border-gray-200 min-h-8 rounded-lg shadow-soft basis-full  "
            />
          )}
        </label>
      ))}
    </div>
  );
};

// "use client";

import React, { useState } from "react";
import DateIcon from "../icons/date";
import LongAnswer from "../icons/longAnswer";
import Select from "../icons/select";
import ShortAnswer from "../icons/shortAnswer";
import URL from "../icons/url";
import Number from "../icons/number";

interface ShortAnswerProps {
  type?: "number" | "url" | "text";
}

export const ShortAnswerField: React.FC<ShortAnswerProps> = ({ type }) => {
  // bg-gray-200
  console.log(type);

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
      className="border px-2 type border-gray-200 min-h-8 rounded-lg shadow-soft   w-full"
    />
  );
};

export const LongAnswerField = () => {
  return (
    <textarea className="border min-h-20 px-2 resize-none border-gray-200 rounded-lg shadow-soft   w-full" />
  );
};

export const DatePicker = () => {
  // Keep track of value changes for replacing placeholder
  const [inputValue, setInputValue] = useState<string | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event?.target?.value?.split("-")?.toReversed()?.join("-"));
  };

  return (
    <div className="relative h-max ">
      <input
        type="date"
        onChange={(e) => handleChange(e)}
        className="border px-2  border-gray-200  min-h-8 rounded-lg shadow-soft opacity-0   w-full"
      />
      <div className="absolute top-0 flex justify-between items-center px-2 w-full z-10 text-sm pointer-events-none  text-gray-400 min-h-8 border  border-gray-200  rounded-lg shadow-soft   ">
        {inputValue ? inputValue : "MM-DD-YYYY"}
        <DateIcon />
      </div>
    </div>
  );
};

const InputTypesDropdown = () => {
  return (
    <ul
      className={` absolute top-[calc(100%+0.50rem)] z-30 bg-white rounded-2xl p-1 min-w-64 left-1/2 flex flex-col border border-gray-300  -translate-x-1/2 `}
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

export default InputTypesDropdown;

export const dropdownOptions = [
  {
    icon: <ShortAnswer />,
    option: "Short Answer",
  },
  {
    icon: <LongAnswer />,
    option: "Long Answer",
  },
  {
    icon: <Select />,
    option: "Single Select",
  },
  {
    icon: <URL />,
    option: "URL",
  },
  {
    icon: <Number />,
    option: "Number",
  },
  {
    icon: <DateIcon />,
    option: "Date",
  },
];

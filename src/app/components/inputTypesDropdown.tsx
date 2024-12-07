import React from "react";
import ShortAnswer from "../icons/shortAnswer";
import LongAnswer from "../icons/longAnswer";
import Select from "../icons/select";
import URL from "../icons/url";
import DateIcon from "../icons/date";

const options = [
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
    icon: <DateIcon />,
    option: "Date",
  },
];
const InputTypesDropdown = () => {
  return (
    <ul
      className={` absolute top-[calc(100%+0.50rem)]  rounded-2xl p-1 min-w-64 left-1/2 flex flex-col border border-gray-300  -translate-x-1/2 `}
    >
      <li
        key={"Input types"}
        className="list-none capitalize py-2 px-4 flex gap-3 rounded-lg text-gray-500 justify-start items-center bg-gray-50"
      >
        Input Types
      </li>
      {options?.map((choices) => {
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

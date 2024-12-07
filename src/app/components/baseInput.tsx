import React from "react";
import DragHandle from "../icons/dragHandle";
import DateIcon from "../icons/date";
// import DateIcon from "../icons/date";

const BaseInput = () => {
  return (
    <div className="border border-gray-200 hover:bg-gray-50 duration-150 rounded-2xl flex flex-col gap-2 p-4 w-[500px]">
      <div className="w-full flex flex-col items-center justify-start font-medium ">
        <div className="flex justify-between  items-center w-full">
          <span>Write a question</span>
          <div>
            <DragHandle />
          </div>
        </div>
        <div className="text-sm mr-auto">
          Which front-end framework do you prefer working with?
        </div>
      </div>

      <input className="border border-gray-200 min-h-8 rounded-lg shadow-soft  bg-gray-200  w-full" />
      <div className="relative h-max ">
        <input
          type="date"
          className="border  border-gray-200  min-h-8 rounded-lg shadow-soft opacity-0 bg-gray-200  w-full"
        />
        <div className="absolute top-0 flex justify-between items-center px-2 w-full z-10 text-sm pointer-events-none  text-gray-400 min-h-8 border  border-gray-200  rounded-lg shadow-soft  bg-gray-200 ">
          MM-DD-YYYY
          <DateIcon />
        </div>
      </div>
      {/* <DateIcon /> */}

      <input
        type="number"
        className="border border-gray-200 min-h-8 rounded-lg shadow-soft  bg-gray-200  w-full"
      />

      <textarea className="border min-h-20 resize-none border-gray-200 rounded-lg shadow-soft  bg-gray-200  w-full" />
    </div>
  );
};

export default BaseInput;

import React from "react";
import Plus from "../icons/plus";
import Arrow from "../icons/arrow";
import Save from "../icons/save";
import Check from "../icons/check";
// import InputTypesDropdown from "./inputTypesDropdown";

interface ButtonProps {
  text: string;
  iconType?: "add" | "save" | "arrow" | "check";
  status: "disabled" | "active";
  iconPosition?: "left" | "right";
}

const icons = {
  add: <Plus />,
  arrow: <Arrow />,
  save: <Save />,
  check: <Check />,
};

const CoreButton: React.FC<ButtonProps> = ({
  text,
  iconType,
  iconPosition,
}) => {
  return (
    <button
      className={`border group relative ${
        iconPosition === "left" ? "flex-row" : "flex-row-reverse"
      } flex items-center font-semibold shadow-soft text-gray-1000/40 text-base  gap-2 mt-6 rounded-xl py-[0.375rem] px-4`}
    >
      {iconType && icons[iconType]} {text}
      {/* <InputTypesDropdown /> */}
    </button>
  );
};

export default CoreButton;

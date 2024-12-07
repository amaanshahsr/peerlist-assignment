import React from "react";
import Plus from "../icons/plus";
import Arrow from "../icons/arrow";
import Save from "../icons/save";
import Check from "../icons/check";
// import InputTypesDropdown from "./inputs";

interface ButtonProps {
  text: string;
  icon?: "add" | "save" | "arrow" | "check";
  status: "disabled" | "active" | "loading";
  iconPosition?: "left" | "right";
}

const iconSet = {
  add: <Plus />,
  arrow: <Arrow />,
  save: <Save />,
  check: <Check />,
};

const CoreButton: React.FC<ButtonProps> = ({ text, icon, iconPosition }) => {
  return (
    <button
      className={`border group relative ${
        iconPosition === "left" ? "flex-row" : "flex-row-reverse"
      } flex items-center font-semibold shadow-soft text-gray-1000/40 text-base  gap-2 mt-6 rounded-xl py-[0.375rem] px-4`}
    >
      {icon && iconSet[icon as keyof typeof iconSet]} {text}
      {/* <InputTypesDropdown /> */}
    </button>
  );
};

export default CoreButton;

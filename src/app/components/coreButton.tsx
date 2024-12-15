"use client";
import React, { useRef, useState } from "react";
import Plus from "../icons/plus";
import Arrow from "../icons/arrow";
import Save from "../icons/save";
import Check from "../icons/check";
import { InputTypesDropdown } from "./inputs";
import { useOutsideClick } from "./hooks/useOutsideClick";
import Link from "next/link";

interface ButtonProps {
  text: string;
  icon?: "add" | "save" | "arrow" | "check";
  status: "disabled" | "active" | "loading";
  iconPosition?: "left" | "right";
  handleClick?: () => void;
  handleDropDownChange?: (value: string) => void;
  styles?: string;
  route?: string;
}

const iconSet = {
  add: <Plus />,
  arrow: <Arrow />,
  save: <Save />,
  check: <Check />,
};

const CoreButton: React.FC<ButtonProps> = ({
  text,
  icon,
  iconPosition,
  handleClick,
  handleDropDownChange,
  route,
  styles,
}) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [position, setPosition] = useState<string>("");

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleDropDownClick = () => {
    if (buttonRef.current) {
      // Get the button's position relative to the viewport
      const rect = buttonRef.current.getBoundingClientRect();

      // Calculate the distance from the bottom of the viewport
      const distanceFromBottom = window.innerHeight - rect.bottom;

      console.log(`Distance from bottom: ${distanceFromBottom}px`);

      // Check if the button is 250px above the bottom
      if (distanceFromBottom >= 400) {
        console.log(
          "The button is at least 250px above the bottom of the page."
        );
      } else {
        console.log(
          "The button is closer than 250px to the bottom of the page."
        );
        setPosition("bottom-[calc(100%+0.50rem)] left-1/2 -translate-x-1/2");
      }
    }

    setDropDownOpen(!dropDownOpen);
  };

  useOutsideClick(
    buttonRef,
    () => {
      setDropDownOpen(false);
    },
    []
  );

  return route ? (
    <Link href={route}>
      <button
        ref={buttonRef}
        onClick={handleClick ?? handleDropDownClick}
        className={`border group w-max relative whitespace-nowrap ${
          iconPosition === "left" ? "flex-row" : "flex-row-reverse"
        } ${
          styles ?? `bg-white text-gray-1000/40`
        } flex items-center font-semibold shadow-soft hover:scale-105 z-50 duration-150  text-base  gap-2  rounded-xl py-[0.375rem] px-4`}
      >
        {icon && iconSet[icon as keyof typeof iconSet]} {text}
        {dropDownOpen && handleDropDownChange && (
          <InputTypesDropdown
            position={position}
            handleDropDownChange={handleDropDownChange}
          />
        )}
      </button>
    </Link>
  ) : (
    <button
      ref={buttonRef}
      onClick={handleClick ?? handleDropDownClick}
      className={`border group w-max relative whitespace-nowrap ${
        iconPosition === "left" ? "flex-row" : "flex-row-reverse"
      } ${
        styles ?? `bg-white text-gray-1000/40`
      } flex items-center font-semibold shadow-soft hover:scale-105 z-50 duration-150  text-base  gap-2  rounded-xl py-[0.375rem] px-4`}
    >
      {icon && iconSet[icon as keyof typeof iconSet]} {text}
      {dropDownOpen && handleDropDownChange && (
        <InputTypesDropdown
          position={position}
          handleDropDownChange={handleDropDownChange}
        />
      )}
    </button>
  );
};

export default CoreButton;

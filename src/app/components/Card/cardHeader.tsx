"use client";

import { dropdownOptions } from "@/app/constants";
import DragHandle from "@/app/icons/dragHandle";
import DropDownArrow from "@/app/icons/dropDownArrow";
import useDataStore, { DataItem, DataType, title } from "@/app/store";
import { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { InputTypesDropdown } from "../inputs";
import { Actions } from "./card";
import Edit from "@/app/icons/edit";
import Save from "@/app/icons/save";
interface CardHeaderProps {
  item: DataType;
}
import { usePathname } from "next/navigation";
export const CardHeader: React.FC<CardHeaderProps> = ({ item }) => {
  const router = usePathname();
  const isEditMode = router?.includes("create");

  console.log("iseditmode", isEditMode);
  const { title, helperText, inputType } = item;

  const { updateData } = useDataStore();
  const CardIcon = dropdownOptions?.filter((choices) => {
    return (
      choices?.option?.toLowerCase()?.trim()?.replaceAll(" ", "") ===
      inputType?.toLowerCase()?.trim()
    );
  })[0]?.icon;

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const handleDropDownChange = (value: string) => {
    const copyItem = {
      ...item,
      inputType: value
        ?.trim()
        ?.toLowerCase()
        ?.replaceAll(" ", "") as DataType["inputType"],
    };

    updateData(copyItem);
  };

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState("");
  const handleDropDownClick = () => {
    if (buttonRef.current) {
      // Get the button's position relative to the viewport
      const rect = buttonRef.current.getBoundingClientRect();

      // Calculate the distance from the bottom of the viewport
      const distanceFromBottom = window.innerHeight - rect.bottom;

      console.log(`Distance from bottom: ${distanceFromBottom}px`);

      // Check if the button is 400px above the bottom
      if (distanceFromBottom >= 400) {
        console.log(
          "The button is at least 400px above the bottom of the page."
        );
        setPosition("right-0 lg:right-0 top-[calc(100%+0.50rem)] ");
      } else {
        console.log(
          "The button is closer than 400px to the bottom of the page."
        );
        setPosition("right-0  bottom-[calc(100%+0.50rem)] ");
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

  return (
    <div className="w-full flex flex-col gap-1 items-center justify-start font-medium ">
      <div className="flex justify-between  items-center w-full">
        <EditableLabel
          labelType="title"
          item={item}
          updateData={updateData}
          key={`title${item?.id}`}
          label={title}
        />
        {isEditMode && (
          <Actions>
            <button
              ref={buttonRef}
              onClick={(e) => {
                e.preventDefault();
                handleDropDownClick();
              }}
              className="flex items-center gap-1 relative"
            >
              {CardIcon ?? ""}
              <span className="inline-block ">
                <DropDownArrow />
                {dropDownOpen && (
                  <InputTypesDropdown
                    position={position}
                    handleDropDownChange={handleDropDownChange}
                  />
                )}
              </span>
            </button>
            <DragHandle />
          </Actions>
        )}
      </div>
      <div className="text-sm mr-auto font-normal flex items-center gap-2">
        <EditableLabel
          updateData={updateData}
          labelType="helperText"
          item={item}
          key={`helpertext${item?.id}`}
          label={helperText ?? "none"}
        />
      </div>
    </div>
  );
};

export const EditableLabel = ({
  label: defaultLabel,
  item,
  labelType,
  labelStyles,
  updateData,
  placeholder,
}: {
  label: string;
  labelType: "title" | "helperText";
  item: DataType;
  placeholder?: string;
  labelStyles?: string;
  updateData: (updatedFields: DataItem | title) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(defaultLabel);
  const router = usePathname();

  console.log("ajbdkabskdbakhbdska", label);
  const isEditMode = router?.includes("create");
  const isPublishMode = router?.includes("edit");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copyItem = { ...item, [labelType]: e?.target?.value?.trim() };
    updateData(copyItem);

    setLabel(e?.target?.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    } else if (e.key === "Escape") {
      setLabel(defaultLabel); // Reset to default on cancel
      setIsEditing(false);
    }
  };
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const inputRef = useRef<HTMLInputElement>(null);
  return isEditing ? (
    <div className="flex gap-2 items-center">
      <input
        ref={inputRef}
        onKeyDown={(e) => handleKeyDown(e)}
        onBlur={() => setIsEditing(false)}
        value={label}
        onChange={(e) => {
          handleChange(e);
        }}
        className="border px-2  border-gray-200 min-h-7 rounded-lg shadow-soft  "
      />
      {isEditMode && (
        <button
          onClick={() => {
            setIsEditing(false);
          }}
          className="md:hidden block group-hover:block cursor-pointer"
        >
          {<Save />}
        </button>
      )}
    </div>
  ) : isPublishMode ? (
    <label
      className={` ${
        labelStyles ??
        `    ${
          item?.hasError && labelType === "title"
            ? "text-red-500"
            : "text-gray-1000"
        } flex items-center gap-1`
      }`}
    >
      {label}
      {isEditMode && (
        <button
          onClick={() => {
            inputRef?.current?.focus();
            setIsEditing(true);
          }}
          className="md:hidden block group-hover:block cursor-pointer"
        >
          {<Edit />}
        </button>
      )}
    </label>
  ) : (
    <label
      className={` ${
        labelStyles ??
        `    ${
          item?.hasError && labelType === "title"
            ? "text-red-300"
            : "text-gray-1000"
        } flex items-center gap-1`
      }`}
    >
      {label?.length
        ? label
        : placeholder
        ? placeholder
        : labelType === "title"
        ? `Write a question`
        : "Write a help text or caption (leave empty if not needed)."}

      {isEditMode && (
        <button
          onClick={() => {
            inputRef?.current?.focus();
            setIsEditing(true);
          }}
          className="md:hidden block group-hover:block cursor-pointer"
        >
          {<Edit />}
        </button>
      )}
    </label>
  );
};

import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Edit from "../icons/edit";
import Save from "../icons/save";
import { DataType, DataItem, title } from "../store";

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
  const searchParams = useSearchParams();
  const isTypeDraft = searchParams?.get("type") === "drafts";
  console.log("helloLabel", label);
  const isEditMode = router?.includes("create") || isTypeDraft;
  const isPublishMode = router?.includes("edit");

  useEffect(() => {
    setLabel(defaultLabel);
  }, [defaultLabel]);

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
        } flex items-center gap-1 `
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
        } flex items-center  gap-1`
      }`}
    >
      {label?.length
        ? label
        : placeholder
        ? `placeholder`
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

export default EditableLabel;

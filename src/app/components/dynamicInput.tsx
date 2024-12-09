import { DataType } from "./Card/card";
import {
  ShortAnswerField,
  DatePicker,
  LongAnswerField,
  RadioGroup,
} from "./inputs";

interface DynamicInputProps {
  item: DataType;
}

const DynamicInput: React.FC<DynamicInputProps> = ({ item }) => {
  return (
    <>
      {item.inputType === "shortanswer" ? (
        <ShortAnswerField item={item} />
      ) : item.inputType === "date" ? (
        <DatePicker item={item} />
      ) : item.inputType === "longanswer" ? (
        <LongAnswerField item={item} />
      ) : item.inputType === "url" ? (
        <ShortAnswerField item={item} />
      ) : item.inputType === "number" ? (
        <ShortAnswerField type="number" item={item} />
      ) : item.inputType === "singleselect" ? (
        <RadioGroup item={item} name={item.title} selectedValue={item.value} />
      ) : null}
    </>
  );
};

export default DynamicInput;

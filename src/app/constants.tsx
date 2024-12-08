import DateIcon from "./icons/date";
import LongAnswer from "./icons/longAnswer";
import NumberIcon from "./icons/number";
import Select from "./icons/select";
import ShortAnswer from "./icons/shortAnswer";
import URLIcon from "./icons/url";

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
    icon: <URLIcon />,
    option: "URL",
  },
  {
    icon: <NumberIcon />,
    option: "Number",
  },
  {
    icon: <DateIcon />,
    option: "Date",
  },
];

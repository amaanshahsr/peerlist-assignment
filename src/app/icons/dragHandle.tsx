import * as React from "react";

const DragHandle = () => (
  <svg
    className="cursor-grab"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      stroke="#0D0D0D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M4.515 3h.005m-.005 5h.005m-.005 5h.005m6.656-10h.005m-.005 5h.005m-.005 5h.005"
    ></path>
  </svg>
);

export default DragHandle;

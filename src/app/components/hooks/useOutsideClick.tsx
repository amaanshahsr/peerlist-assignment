"use client";
import { useEffect } from "react";

export function useOutsideClick(
  ref: React.RefObject<HTMLButtonElement | null>, // Make the ref type-safe
  onClickOut: () => void,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (ref?.current && !ref?.current.contains(event.target as Node)) {
        onClickOut();
      }
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, deps); // Spread deps into the dependency array
}

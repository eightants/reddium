import { zipObject } from "lodash";
import React, { useState } from "react";
import {
  POPULAR_PARAM_KEY,
  POPULAR_PARAM_VALUES
} from "../../functions/constants";
import { DropdownProps, Props } from "../../interfaces";

export const MidContainer = ({ children }: Props) => (
  <div className="mid-container px-4">{children}</div>
);

export const Dropdown = ({ id, dataObj, updateParams }: DropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="w-full main-black">
      <button
        className="main-border mt-4 px-5 py-2 flex justify-between items-center w-48 max-w-full"
        onClick={() => setShowDropdown(!showDropdown)}
      >
          <div className="w-full flex flex-row justify-between items-center">
        <div>{dataObj[id]}</div><div><img className="ml-3" src="down_arrow.svg"/></div> </div>
      </button>
      {showDropdown ? (
        <div className="dropdown-select w-48 max-w-full">
          {zipObject(POPULAR_PARAM_KEY, POPULAR_PARAM_VALUES)[id].map(
            (value: string, ind) => (
              <div
                className="my-1 mx-3 p-2 cursor-pointer"
                key={ind}
                onClick={() => updateParams({ ...dataObj, [id]: value })}
              >
                {value}
              </div>
            )
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

import React, { useState } from "react";
import downArrow from "../../../../../assets/icons/downArrow.svg";

const Select = ({ value, onChange, options, multiple }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlitedIndex, setHighlitedIndex] = useState(0);

  function selectoption(option) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function isOptionSelected(option) {
    // console.log("option", option, "value", value);
    // console.log("check", option == value);
    return multiple ? value.includes(option) : option === value;
  }

  console.log("selectValue", value);

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      //   onMouseEnter={() => setIsOpen(true)}
      //   onMouseLeave={() => setIsOpen(false)}
      className={`container  ${
        isOpen ? " ring-offset focus:ring-2 focus:ring-[#43345661]" : ""
      } relative min-h-[1.8em] border border-[#22182b] ${
        value?.operator_id ? "w-[50px]" : "w-[210px]"
      } flex items-center p-[.25em] outline-none cursor-pointer select-none`}
    >
      <span className="flex-grow flex flex-wrap gap-[.25em]">
        {multiple
          ? value?.map((v,i) => (
              <button
                className="border min-w-[5em] group border-[#381e50] rounded-sm flex items-center gap-[.25em] px-[.25em] pt-[.15em] cursor-pointer hover:bg-[#D7C9FF] justify-between"
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  selectoption(v);
                }}
              >
                {v?.name}
                <span className="hidden group-hover:block">&times;</span>
              </button>
            ))
          : value?.name || value?.full_phone || "Loading..."}
      </span>
      <div className="caret pr-2">
        <img className="" src={downArrow} alt="downArrow" />
      </div>
      {value && (
        <ul
          className={`options  ${
            isOpen ? "block" : "hidden"
          } m-0 p-0 absolute left-0 top-[calc(100%+.25em)] bg-white border border-[#381e50] w-full max-h-[220px] overflow-y-auto z-10`}
        >
          {options?.map((option, index) => (
            <li
              key={
                option.phone_id ||
                option.voice_id ||
                option.operator_id ||
                option.conversion_id ||
                option.agent_id ||
                index
              }
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                selectoption(option);
              }}
              onMouseEnter={() => setHighlitedIndex(index)}
              className={`p-[.25em] ${
                isOptionSelected(option) ? "bg-[#D7C9FF] text-[#381e50]" : ""
              } ${
                index === highlitedIndex
                  ? "hover:bg-[#381e50e9] hover:text-white"
                  : ""
              } cursor-pointer select-none`}
            >
              {option.name || option.full_phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;

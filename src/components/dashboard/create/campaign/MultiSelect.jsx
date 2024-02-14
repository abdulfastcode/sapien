import React, { useEffect, useState } from "react";
import downArrow from "../../../../assets/icons/downArrow.svg";

const MultiSelect = ({
  width,
  options,
  optWidth,
  defaultOption,
  editOpt,
  create,
  renderParentComponent,
  sendSelectedVal,
}) => {
  const [dropDown, setDropDown] = useState(false);
  const [selectedVal, setSelectedVal] = useState({
    name: options[0]?.name || options[0]?.full_phone,
    id: [],
  });
  console.log(selectedVal.id);
  const toggleOption = (option) => {
    const isSelected = selectedVal.id.includes(option.audience_id);
    if (isSelected) {
      setSelectedVal({
        ...selectedVal,
        name: option?.name,
        id: selectedVal.id.filter((id) => id !== option.audience_id),
      });
    } else {
      setSelectedVal({
        ...selectedVal,
        name: option?.name,
        id: [...selectedVal.id, option.audience_id],
      });
    }
  };
  useEffect(() => {
    // console.log("selectedVal", selectedVal);
    sendSelectedVal(selectedVal);
    setDropDown(false);
  }, [selectedVal]);

  console.log("selectedVal.name", selectedVal.name);
  return (
    <div className={`relative select-none ${dropDown === false ? "group" : ""}`}>
      <div
        onClick={() => setDropDown(!dropDown)}
        className={`border border-[#381E50] cursor-pointer w-[${width.w}] sm:w-[${width.sm}] md:w-[${width.md}] lg:[${width.lg}] h-[26px] flex justify-between items-center px-1 select-none`}
      >
        <div>
          {selectedVal.name
            ? selectedVal.id.length + " Selected"
            : defaultOption}
        </div>
        <div>
          <img src={downArrow} alt="downArrow" />
        </div>
      </div>

      <div
        className={`w-full hidden select-none group-hover:block absolute top-0 cursor-pointer z-10  border border-[#381E50] bg-white`}
      >
        {options.map((e, i) => {
          return (
            <div
              key={e?.audience_id}
              onClick={() => {
                setDropDown(true);
                // setSelectedVal({
                //   name: e?.name || e?.full_phone,
                //   id: [...selectedVal.id,e?.audience_id],
                // });
                toggleOption(e);
              }}
              className={`select-none cursor-pointer border-[0.5px] border-b-[#381e5029]  hover:bg-[#d7c9ff] px-1 w-[${optWidth}] sm:w-[${optWidth}] ${
                selectedVal.id.some((id) => id === e?.audience_id)
                  ? "bg-[#d7c9ff]"
                  : "bg-white"
              }`}
            >
              {e?.name || e?.full_phone}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelect;

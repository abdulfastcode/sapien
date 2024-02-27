import React, { useEffect, useMemo, useState } from "react";
import downArrow from "../../../../../assets/icons/downArrow.svg";
import deleteIcon from "../../../../../assets/icons/deleIcon.svg";
import { baseUrl } from "../../../../../utils/baseUrl";
import { toast } from "react-toastify";

const Select = ({
  value,
  onChange,
  options,
  multiple,
  create,
  editOpt,
  renderParentComponent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlitedIndex, setHighlitedIndex] = useState(0);

  const [showCustConversion, setShowCustConversion] = useState(false);
  const [createConversion, setCreateConversion] = useState(false);
  const [editConversion, setEditConversion] = useState(false);

  const [createConversionOptions, setCreateConversionOptions] = useState({
    name: "",
    description: "",
  });
  const [editConversionOptions, setEditConversionOptions] = useState({
    name: "",
    description: "",
    conversion_id: "",
  });

  async function saveUserOptions(url, method, body) {
    renderParentComponent(false);
    try {
      let token = localStorage.getItem("auth_token");
      let post = await fetch(`${baseUrl}/conversions/${url}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      let res = await post.json();
      if (res.message) {
        toast.success(res.message);
      }
      if (res.error) {
        toast.error(res.error);
      }
      // setUpdateDefaultName(true)
      console.log("resEdit-", res);
      // console.log("selectedVal", selectedVal);
      renderParentComponent(true);
    } catch (e) {
      toast.error("Failed to Create Conversion");
      console.error(e);
    } finally {
      setShowCustConversion(false);
      setCreateConversionOptions({
        name: "",
        description: "",
      });
      setCreateConversion(false);
      setEditConversion(false);
      setEditConversionOptions({
        name: "",
        description: "",
        conversion_id: "",
      });
    }
  }

  async function deleteUser(url, method, id) {
    console.log("dekete user", id);
    renderParentComponent(false);

    try {
      let token = localStorage.getItem("auth_token");
      let post = await fetch(
        `${baseUrl}/conversions/${url}?conversion_id=${id}`,
        {
          method: method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // query: JSON.stringify({ conversion_id: [id] }),
        }
      );
      let res = await post.json();
      if (res.message) {
        toast.success(res.message);
      }
      if (res.error) {
        toast.error(res.error);
      }
      console.log("res-", res);
      renderParentComponent(true);
      // console.log("options", options);
    } catch (e) {
      console.error(e);
      toast.error("Failed to Delete");
    } finally {
      setShowCustConversion(false);
      setCreateConversionOptions({
        name: "",
        description: "",
      });
      setCreateConversion(false);
      setEditConversion(false);
      setEditConversionOptions({
        name: "",
        description: "",
        conversion_id: "",
      });
    }
  }
  function handleSave() {
    if (createConversion) {
      saveUserOptions("create_conversion", "POST", createConversionOptions);
    }
    if (editConversion) {
      console.log("editConversion");
      // saveUserOptions("update_conversion", "PUT", editConversionOptions);
      saveUserOptions("update_conversion", "PUT", editConversionOptions);
    }
  }

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
    return multiple ? value.includes(option) : option === value;
  }

  console.log("selectValue", value);
  // console.log("options", options);
  // console.log("isOpen", isOpen);
  
  console.log("editConversionOptions", editConversionOptions);
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
        value?.operator_id ? "w-[59px]" : "w-[210px]"
      } flex items-center p-[.25em] outline-none cursor-pointer select-none`}
    >
      <span className="flex-grow flex flex-wrap gap-[.25em]">
        {multiple
          ? value?.map((v, i) => (
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
          : value?.name || value?.full_phone || "No Value Selected"}
      </span>
      <div className="caret pr-2">
        <img className="" src={downArrow} alt="downArrow" />
      </div>
      {value && (
        <ul
          className={`options  ${
            isOpen ? "block" : "hidden"
          } m-0 p-0 absolute left-0 top-[calc(100%+.25em)] bg-white border border-[#381e50] w-full max-h-[220px] overflow-y-auto z-10 `}
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
                setEditConversionOptions({
                  ...editConversionOptions,
                  name: option?.name,
                  conversion_id: option?.conversion_id,
                });
              }}
              onMouseEnter={() => setHighlitedIndex(index)}
              className={`p-[.25em] ${
                isOptionSelected(option) ? "bg-[#D7C9FF]  text-[#381e50]" : ""
              } ${
                index === highlitedIndex
                  ? "hover:bg-[#381e50e9] hover:text-white"
                  : ""
              } cursor-pointer select-none`}
            >
              {option.name || option.full_phone}
              {editOpt && (
                <span
                  className="text-[10px] float-right mt-2 pr-2 pl-[8px] hover:text-blue-700"
                  onClick={() => {
                    setEditConversion(true);
                    setShowCustConversion(true);
                  }}
                >
                  Edit
                </span>
              )}
            </li>
          ))}
          {/* CREATE */}
          <li
            className={`sticky bottom-0 bg-white cursor-pointer border-[0.5px] border-b-[#381e5029] py-1 hover:bg-[#d7c9ff] px-1 ] `}
            onClick={() => {
              setShowCustConversion(true);
              setCreateConversion(true);
            }}
          >
            {create}
          </li>
        </ul>
      )}
      {/* POP-UP */}
      {showCustConversion && (
        <div className="w-full h-full flex items-center justify-center bg-[#878b9266] overflow-y-auto overflow-x-hidden fixed top-0 right-0 z-20">
          <div className="p-[20px] bg-white left-0 z-50 justify-center items-center w-[95%] sm:w-[70%] md:w-[50%] md:inset-0 ">
            {/* HEADER - CONTROLS */}
            <div className="flex items-center justify-between">
              <div className="text-[#381E50] font-bold">Custom Conversion</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  className=" py-[3px] px-[25px] items-center bg-[#381E50] text-white  text-md font-bold"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    deleteUser(
                      "delete_conversion",
                      "DELETE",
                      editConversionOptions.conversion_id
                    );
                  }}
                >
                  <img src={deleteIcon} alt="deleteIcon" />
                </button>
                <div
                  className="text-[#381E50] cursor-pointer font-bold"
                  onClick={() => {
                    setShowCustConversion(false);
                    setCreateConversion(false);
                    setEditConversion(false);
                  }}
                >
                  X
                </div>
              </div>
            </div>
            {/* OPTIONS */}
            <div className="flex flex-col gap-[5px] mt-[18px]">
              <div className="flex flex-wrap gap-3 ">
                <div>Name</div>
                <div>
                  <input
                    type="text"
                    // ref={agentName}
                    value={
                      createConversion
                        ? createConversionOptions.name
                        : editConversionOptions?.name
                    }
                    onChange={(e) => {
                      if (createConversion) {
                        setCreateConversionOptions({
                          ...createConversionOptions,
                          name: e.target.value,
                        });
                      }
                      if (editConversion) {
                        // setSelecedVal({
                        //   ...selectedVal,
                        //   name: e.target.value,
                        // });

                        setEditConversionOptions({
                          ...editConversionOptions,
                          name: e.target.value,
                        });
                      }
                    }}
                    className="border px-[6px] border-black w-[210px] "
                  />
                </div>
              </div>
              <p className="text-[#7B777E] text-[12px] font-normal">
                Explain the condition in words
              </p>
              <textarea
                className="border border-[#433456] text-[#7B777E] p-[10px] w-full"
                name="description"
                id=""
                value={
                  editConversion
                    ? editConversionOptions.description
                    : "" || createConversion
                    ? createConversionOptions.description
                    : ""
                }
                placeholder="Type Something..."
                rows="5"
                onChange={(e) => {
                  if (editConversion) {
                    setEditConversionOptions({
                      ...editConversionOptions,
                      description: e.target.value,
                    });
                  }
                  if (createConversion) {
                    setCreateConversionOptions({
                      ...createConversionOptions,
                      description: e.target.value,
                    });
                  }
                }}
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;

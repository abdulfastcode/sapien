import React, { useEffect,useRef, useState } from "react";
import downArrow from "../../../../assets/icons/downArrow.svg";
import deleteIcon from "../../../../assets/icons/deleIcon.svg";
import { baseUrl } from "../../../../utils/baseUrl";

const SelectOpt = ({
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
  // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@options", options);
  // States for Edit And Create Conversion
  const [showCustConversion, setShowCustConversion] = useState(false);
  const [createConversion, setCreateConversion] = useState(false);
  const [editConversion, setEditConversion] = useState(false);

  const [selectedVal, setSelecedVal] = useState({
    name: options[0]?.name || options[0]?.full_phone,
    id:
      options[0]?.conversion_id ||
      options[0]?.voice_id ||
      options[0]?.phone_id ||
      options[0]?.agent_id,
  });

  const [createConversionOptions, setCreateConversionOptions] = useState({
    name: "",
    description: "",
  });
  const [editConversionOptions, setEditConversionOptions] = useState({
    name: "",
    description: "",
    conversion_id: "",
  });

  //   const optionWidth = parseFloat(width) - 1 + "px";
  //   console.log("showCustConversion", showCustConversion);
  // console.log(" selectedVal############", selectedVal);
  //   console.log("createConversionOptions", createConversionOptions);
  //   console.log("editConversionOptions", editConversionOptions);
  //   console.log("createConversion", createConversion);
  //   console.log("editConversion", editConversion);
  sendSelectedVal(selectedVal);

  useEffect(() => {
    // console.log("selectedVal", selectedVal);
    sendSelectedVal(selectedVal);
    setDropDown(false);
  }, [selectedVal]);

  async function saveUserOptions(url, method, body) {
    renderParentComponent(false);
    try {
    let token = localStorage.getItem("auth_token");
      let post = await fetch(`${baseUrl}/conversions/${url}`, {
        method: method,
        headers: {
          Authorization:
            `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      let res = await post.json();

      console.log("res-", res);

      renderParentComponent(true);
    } catch (e) {
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
    // console.log("dekete user");
    renderParentComponent(false);

    try {
    let token = localStorage.getItem("auth_token");
      let post = await fetch(
        `${baseUrl}/conversions/${url}?conversion_id=${id}`,
        {
          method: method,
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // query: JSON.stringify({ conversion_id: [id] }),
        }
      );
      let res = await post.json();

      renderParentComponent(true);
      console.log("res-", res);
      // console.log("options", options);
    } catch (e) {
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
  function handleSave() {
    if (createConversion) {
      saveUserOptions("create_conversion", "POST", createConversionOptions);
    }
    if (editConversion) {
      saveUserOptions("update_conversion", "PUT", editConversionOptions);
    }
  }
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    if (dropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDown]);

  return (
    <div className={`relative ${dropDown === false ? "group" : ""}`}>
      <div
        onClick={() => setDropDown(!dropDown)}
        className={`border select-none border-[#381E50] cursor-pointer w-[${width.w}] sm:w-[${width.sm}] md:w-[${width.md}] lg:[${width.lg}] h-[26px] flex justify-between items-center px-1`}
      >
        <div>{selectedVal.name ? selectedVal.name : defaultOption}</div>
        <div>
          <img src={downArrow} alt="downArrow" />
        </div>
      </div>

      <div
      ref={dropdownRef}
        className={`w-full select-none ${
          dropDown ? "block" : "hidden"
        } lg:hidden lg:group-hover:block absolute top-0 cursor-pointer z-10  border border-[#381E50] bg-white`}
      >
        {options?.map((e, i) => {
          return (
            <div
              key={
                e?.conversion_id || e?.voice_id || e?.phone_id || e?.agent_id
              }
              onClick={() => {
                setDropDown(true);
                setSelecedVal({
                  name: e?.name || e?.full_phone,
                  id:
                    e?.conversion_id ||
                    e?.voice_id ||
                    e?.phone_id || 
                    e?.agent_id,
                });
                setEditConversionOptions({
                  ...editConversionOptions,
                  name: e?.name,
                  conversion_id: e?.conversion_id,
                });
              }}
              className={`select-none cursor-pointer border-[0.5px] border-b-[#381e5029]  hover:bg-[#d7c9ff] px-1 w-[${optWidth}] sm:w-[${optWidth}] ${
                selectedVal.id ===
                (e?.conversion_id || e?.voice_id || e?.phone_id || e?.agent_id)
                  ? "bg-[#d7c9ff]"
                  : "bg-white"
              }`}
            >
              {e?.name || e?.full_phone}
              {editOpt && (
                <span
                  className="text-[10px] pl-[8px] hover:text-blue-700"
                  onClick={() => {
                    setEditConversion(true);
                    setShowCustConversion(true);
                  }}
                >
                  Edit
                </span>
              )}
            </div>
          );
        })}
        {/* CREATE */}
        <div
          className={` cursor-pointer border-[0.5px] border-b-[#381e5029]  hover:bg-[#d7c9ff] px-1 w-[${optWidth}] sm:w-[${optWidth}] `}
          onClick={() => {
            setShowCustConversion(true);
            setCreateConversion(true);
          }}
        >
          {create}
        </div>
      </div>
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
                        : selectedVal.name
                    }
                    onChange={(e) => {
                      if (createConversion) {
                        setCreateConversionOptions({
                          ...createConversionOptions,
                          name: e.target.value,
                        });
                      }
                      if (editConversion) {
                        setSelecedVal({
                          ...selectedVal,
                          name: e.target.value,
                        });
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

export default SelectOpt;

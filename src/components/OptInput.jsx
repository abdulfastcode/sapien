import React, { useEffect, useRef, useState } from "react";

const OptInput = ({ length = 6, onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  //   if (inputRefs.current[0]) {
  //     inputRefs.current[0].focus();
  //   }
  console.log("inputRefs", inputRefs);

  const onChangeHanlder = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combineOtp = newOtp.join("");
    // console.log(combineOtp);
    if (combineOtp.length === length) {
      onOtpSubmit(combineOtp);
    }

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (e, index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    const value = e.taget.value;
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      //   inputRefs.current[otp.indexOf("")].focus();
      //   inputRefs.current[index + 1].focus();
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      (e.key === "Backspace" || e.keyCode === 8) &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      console.log("esBack", e);
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            className="border border-black m-1 w-9 h-9 text-center outline-[#381E50] rounded-md ring-[#381e504f] ring-offset-1 focus:ring-2  "
            type="text"
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => onChangeHanlder(index, e)}
            onClick={(e) => handleClick(e, index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        );
      })}
    </>
  );
};

export default OptInput;

// import React from 'react'
import deleteIcon from "../../assets/icons/deleIcon.svg";

const Action = () => {
  return (
    <div className="w-full flex px-[24px] py-[20px] h-[20px] items-center justify-between ]">
      <div>Action</div>
      <div className="cursor-pointer">
        <img src={deleteIcon} alt="deleteIcon" />
      </div>
    </div>
  );
};

export default Action;

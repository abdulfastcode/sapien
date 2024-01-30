// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import deleteIcon from "../../assets/icons/deleIcon.svg";
import { removeData } from "../../utils/dashboardSlice";

const Action = () => {
  let checkbox = useSelector((state) => state.dashboard.checkBox);

  let dispatch = useDispatch();
  function deleteHandler() {
    dispatch(removeData(checkbox));
  }
  return (
    <div className="w-full flex px-[24px] py-[20px] h-[20px] items-center justify-between ]">
      <div>Action</div>
      <div className="cursor-pointer">
        <img onClick={deleteHandler} src={deleteIcon} alt="deleteIcon" />
      </div>
    </div>
  );
};

export default Action;

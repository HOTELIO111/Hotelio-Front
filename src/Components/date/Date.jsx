import React, { useRef } from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import style from "./Date.module.css";

const Dates = () => {
  dayjs.extend(customParseFormat);
  const { RangePicker } = DatePicker;




  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };
  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        bordered={false}
        format="DD-MM-YYYY"
        disabledDate={disabledDate}
        popupClassName={style.popup}
        placeholder={["Check In", "Check Out"]}
        inputPrefixCls={style.placeholder}
        required={true}
      // ref={datePickerRef}
      />
    </Space>
  );
};
export default Dates;

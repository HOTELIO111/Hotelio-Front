import React, { useState } from "react"; // Removed unnecessary 'useRef' import
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import style from "./Date.module.css";

const Dates = ({ setCheckInCheckOut, checkInCheckOut }) => {
  dayjs.extend(customParseFormat);
  const { RangePicker } = DatePicker;

  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const dateFormat = "YYYY/MM/DD";

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        bordered={false}
        disabledDate={disabledDate}
        popupClassName={style.popup}
        format={dateFormat}
        placeholder={["Check In", "Check Out"]}
        inputPrefixCls={style.placeholder}
        value={checkInCheckOut}
        required={true}
        onChange={(value, newValue) => setCheckInCheckOut(value)}
      />
    </Space>
  );
};

export default Dates;

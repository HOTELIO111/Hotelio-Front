import React, { useState } from "react"; // Removed unnecessary 'useRef' import
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import style from "./Date.module.css";

const Dates = ({ setCheckInCheckOut, checkInCheckOut }) => {
  const [selectedData, setSelectedDate] = useState(checkInCheckOut); // Initialize selectedData with the value from props
  dayjs.extend(customParseFormat);
  const { RangePicker } = DatePicker;

  const handleDateValue = (dates, nedDates) => {
    // console.log(nedDates);
    const dateObjects = nedDates.map((dateString) => {
      const [day, month, year] = dateString.split("-").map(Number);
      const date = new Date(Date.UTC(year, month - 1, day, 11, 0, 0, 0)); // Month is 0-based
      return date.toISOString();
    });
    setCheckInCheckOut(dateObjects);
    setSelectedDate(dates);
  };

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
        value={checkInCheckOut}
        required={true}
        onChange={(value, newValue) => setCheckInCheckOut(value)}
      />
    </Space>
  );
};

export default Dates;

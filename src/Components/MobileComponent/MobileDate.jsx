import React, { useRef, useState } from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import style from "../../Components/date/Date.module.css";

const MobileDate = ({
  datedate,
  name,
  setCheckInCheckOut,
  checkInCheckOut,
}) => {
  dayjs.extend(customParseFormat);
  const { RangePicker } = DatePicker;

  const [selectedData, setSelectedDate] = useState(checkInCheckOut);

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

  const Stylelabel = {
    fontSize: "12px",
    lineHeight: "1.4375em",
    color: "rgba(0, 0, 0, 0.6)",
    marginBottom: "-17px",
    paddingBottom: "0px",
    fontWeight: "normal",
    position: "relative",
    top: "-6px",
    left: "1%",
    textAlign: "left",
  };

  const placeholderStyle = {
    fontSize: "12px",
    fontWeight: "600",
  };

  return (
    <>
      <Space direction="vertical" size={12}>
        <label style={Stylelabel} className="labelfordatepicker">
          {name ? name : "Date"}
        </label>
        <RangePicker
          className="pb-3"
          style={{ paddingTop: "0.1rem" }}
          bordered={false}
          format="DD-MM-YYYY"
          disabledDate={disabledDate}
          popupClassName={style.popup}
          placeholder={["From", "To"]}
          value={checkInCheckOut}
          inputPrefixCls={placeholderStyle}
          required={true}
          onChange={(value, newValue) => setCheckInCheckOut(value)}
        />
      </Space>
      <hr style={{ marginTop: "-8px", color: "black" }} />
    </>
  );
};
export default MobileDate;

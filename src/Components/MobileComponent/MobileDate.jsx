import React, { useRef } from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import style from "../../Components/date/Date.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const MobileDate = ({ datedate }) => {
    dayjs.extend(customParseFormat);
    const { RangePicker } = DatePicker;
    const dispatch = useDispatch();



    const disabledDate = (current) => {
        return current && current < dayjs().endOf("day");
    };

    const Stylelabel = {
        fontSize: '12px',
        lineHeight: '1.4375em',
        color: 'rgba(0, 0, 0, 0.6)',
        marginBottom: '-17px',
        paddingBottom: '0px',
        fontWeight: 'normal'
    };


    return (
        <>
            <Space direction="vertical" size={12}>
                <label style={Stylelabel} className="labelfordatepicker">Date</label>
                <RangePicker
                    className="pb-4"
                    bordered={false}
                    format="DD-MM-YYYY"
                    disabledDate={disabledDate}
                    popupClassName={style.popup}
                    placeholder={["From", "To"]}
                    inputPrefixCls={style.placeholder}
                    onChange={(val) => {
                        dispatch({
                            type: "SET_DATE",
                            payload: val.map((v) => v.format("DD-MM-YYYY")),
                        });
                    }}
                    onClick={() => {
                        dispatch({
                            type: "ALERTDATE",
                            payload: false,
                        });
                    }}
                    required={true}
                // ref={datePickerRef}
                />
            </Space>
            <hr style={{ marginTop: '-8px', color: 'black' }} />
        </>
    );
};
export default MobileDate;

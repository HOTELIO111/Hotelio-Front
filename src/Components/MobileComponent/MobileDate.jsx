import React, { useRef } from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import style from "../../Components/date/Date.module.css";

const MobileDate = ({ datedate }) => {
    dayjs.extend(customParseFormat);
    const { RangePicker } = DatePicker;




    const disabledDate = (current) => {
        return current && current < dayjs().endOf("day");
    };

    const Stylelabel = {
        fontSize: '12px',
        lineHeight: '1.4375em',
        color: 'rgba(0, 0, 0, 0.6)',
        marginBottom: '-17px',
        paddingBottom: '0px',
        fontWeight: 'normal',
        position: 'relative',
        top: '-6px',
        left: '1%',
        textAlign: 'left'
    };

    const placeholderStyle = {
        fontSize: '12px',
        fontWeight: '600'
    }


    return (
        <>
            <Space direction="vertical" size={12}>
                <label style={Stylelabel} className="labelfordatepicker">Date</label>
                <RangePicker
                    className="pb-3"
                    style={{ paddingTop: '0.1rem'}}
                    bordered={false}
                    format="D MMM"
                    disabledDate={disabledDate}
                    popupClassName={style.popup}
                    placeholder={["From", "To"]}
                    inputPrefixCls={placeholderStyle}
                    required={true}
                // ref={datePickerRef}
                />
            </Space>
            <hr style={{ marginTop: '-8px', color: 'black' }} />
        </>
    );
};
export default MobileDate;

import React from "react";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Dropdown = ({ name, citites, setSlectedCity }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  if (!citites || citites.length === 0) {
    // If cities are not available yet, you can render a loading state or return null
    return <div>Select City</div>; // Replace this with your desired loading state
  }

  return (
    <Select
      showSearch
      allowClear={false}
      bordered={false}
      style={{ width: "100%", backgroundColor: "white" }}
      placeholder={"Select the city"}
      optionFilterProp="children"
      filterOption={(input, option) =>
        option?.label.toLowerCase().slice(0, input.length) ===
        input.toLowerCase()
      }
      filterSort={(optionA, optionB) =>
        optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())
      }
      suffixIcon={<ExpandMoreIcon />} // Set the custom icon here
      options={citites.map((city) => ({
        value: city,
        label: city,
        key: city, // Add a unique key for each option
      }))}
      onChange={(value) => {
        setSlectedCity(value);
      }}
    />
  );
};

export default Dropdown;

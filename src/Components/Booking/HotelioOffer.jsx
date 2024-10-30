import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useCollections } from "../../context/useStateManager";
import { useAuthContext } from "../../context/userAuthContext";

const HotelioOffer = () => {
  const offerData = useSelector((state) => state.GetBookingOffersReducers);
  const {
    applicableOffer,
    setApplicableOffer,
    addWalletOffer,
    setAddWalletOffer,
  } = useCollections();
  const handleOfferChange = (event) => {
    let value = event.target.value;
    if (value !== "null") {
      let offer = offerData?.data?.find((item) => item._id === value);
      setApplicableOffer(offer);
    }
  };
  const { currentUser } = useAuthContext();

  return (
    <Card
      style={{
        border: "2px solid #ee2e24",
        background: applicableOffer ? "#CDFADB" : "initial",
      }}
      className="w-100 my-1"
    >
      <CardContent>
        <FormControl>
          <Typography
            sx={{ mb: 1.5 }}
            color="text-dark"
            fontWeight={700}
            id="demo-radio-buttons-group-label"
          >
            Hotelio Offers
          </Typography>
          {offerData?.data ? (
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              sx={{ ml: 1 }}
              value={applicableOffer?._id}
              onChange={handleOfferChange}
            >
              <FormControlLabel control={<Radio />} label="None" value={null} />
              {offerData.data.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item?._id}
                  control={<Radio />}
                  label={item.code}
                />
              ))}
            </RadioGroup>
          ) : (
            "Don't have any offer to apply"
          )}
        </FormControl>
        <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700}>
          Wallet Offers
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={addWalletOffer}
              sx={{
                color: "#ee2e24",
                "&.Mui-checked": {
                  color: "#ee2e24",
                },
              }}
              onChange={() => setAddWalletOffer((prev) => !prev)}
            />
          }
          sx={{ ml: 0 }}
          label={`Wallet Offer (Balance - ₹${
            addWalletOffer === true && currentUser?.wallet.amount > 100
              ? currentUser?.wallet.amount - 100
              : currentUser?.wallet.amount
          })`}
        />
      </CardContent>
    </Card>
  );
};

export default HotelioOffer;

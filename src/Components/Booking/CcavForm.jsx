import React from "react";
import { API_URL } from "../../config";
import { useBooking } from "../../context/useBooking";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "../../context/userAuthContext";
import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Skeleton from "react-loading-skeleton";

function CcavForm({ BOOKINGDATA, BILL, roomData, DATAA, actualPricetoPay }) {
  const inputStyle = {
    border: "none",
    borderBottom: "0px solid #000", // Optional: Add a bottom border for better visibility
    outline: "none", // Remove the default focus outline
    color: "#ee2e24",
    textTransform: "capitalize",
  };

  const searchQuery = new URLSearchParams(document.location.search);
  const { currentUser } = useAuthContext();
  const currentSearchParam = Object.fromEntries(searchQuery?.entries());
  const checkIn = currentSearchParam.checkIn;
  const checkOut = currentSearchParam.checkOut;
  const qunatityRooms = currentSearchParam.totalRooms;
  const totalGuest = currentSearchParam.totalGuest;
  const priceOfaRoom = roomData?.price;
  const { userBookingDetails, BillingCalculate, CreatePreBooking } =
    useBooking();
  const calculate = BillingCalculate(
    priceOfaRoom,
    null,
    qunatityRooms,
    12,
    checkIn,
    checkOut,
    currentUser
  );

  const HandleCheckOutPayment = async (BOOKINGDATA, BILL, DATAA) => {
    const formData = {
      room: BOOKINGDATA?.room?._id,
      hotel: BOOKINGDATA?.hotel?._id,
      billing_address: DATAA?.address,
      billing_city: DATAA?.city,
      billing_state: DATAA?.state,
      billing_zip: DATAA?.zip,
      billing_country: DATAA?.country,
      merchant_param1: document.querySelector('input[name="merchant_param1"]').value || 'Part Pay',
      guest: {
        name: BOOKINGDATA?.guest?.name,
        email: BOOKINGDATA?.guest?.email,
        mobileNo: BOOKINGDATA?.guest?.mobileNo,
      },
      bookingDate: {
        checkIn: BOOKINGDATA?.bookingDate?.checkIn,
        checkOut: BOOKINGDATA?.bookingDate?.checkOut,
      },
      amount: BILL?._totalAmountToPaid?.value,
      dateOfBooking: BOOKINGDATA?.dateOfBooking,
      additionalCharges: {
        gst: BILL?.gstAmount,
        serviceFee: BILL?.serviceFee,
      },
      promoCode: BILL?.CouponName,
      discountInfo: [
        BILL?._totalDiscount?.sub?.map((item) => ({
          type: item.head,
          rate: item.value,
        })),
      ],
      numberOfGuests: {
        adults: parseInt(BOOKINGDATA?.numberOfGuests?.adults),
      },
      numberOfRooms: BOOKINGDATA?.numberOfRooms,
      bookingSource: "Website",
      customer: BOOKINGDATA?.customer?._id,
    };

    const PreBookingResponse = await CreatePreBooking(formData);
    ////----- - - - -- - - - Prebooking api check krke booking id genreate then yaha aao  ----------------------------
  };

  return (
    <div>
      <Box>
        <Card sx={{ p: 2, borderRadius: 2, border: "2px solid #ee2e24", background: 'linear-gradient(338deg, rgba(243,200,198,1) 35%, rgba(255,255,255,1) 100%)' }}>
          <form
            method="POST"
            name="customerData"
            action={`${API_URL}/ccav/ccavRequestHandler`}
          >
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                lg={4}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  borderBottom: "1px solid #ee2e24",
                }}
              >
                <Typography variant="h6">
                  Billing Name <span className="text-danger">*</span>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={8}
                sx={{ borderBottom: "1px solid #ee2e24" }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  name="billing_name"
                  value={BOOKINGDATA?.guest?.name}
                  placeholder="Billing Name"
                  readOnly
                />
              </Grid>

              <Grid
                item
                xs={12}
                lg={4}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  borderBottom: "1px solid #ee2e24",
                }}
              >
                <Typography variant="h6">Billing Address:</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={8}
                sx={{ borderBottom: "1px solid #ee2e24" }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  margin="normal"
                  name="billing_address"
                  value={DATAA?.address}
                  placeholder="Enter Billing Address"
                  readOnly
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={4}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  borderBottom: "1px solid #ee2e24",
                }}
              >
                <Typography variant="h6">Promo Code:</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={8}
                sx={{ borderBottom: "1px solid #ee2e24" }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  margin="normal"
                  name="promo_code"
                  value=""
                  placeholder="Promo code"
                  readOnly
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={4}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  borderBottom: "1px solid #ee2e24",
                }}
              >
                <Typography variant="h6">Customer Id:</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={8}
                sx={{ borderBottom: "1px solid #ee2e24" }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  margin="normal"
                  name="customer_identifier"
                  value={BOOKINGDATA?.customer}
                  placeholder="Customer Id:"
                  readOnly
                />
              </Grid>
              <Box sx={{ display: "none" }}>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  sx={{
                    display: "grid",
                    alignItems: "center",
                    visibility: "hidden",
                  }}
                >
                  <Typography variant="h6">Merchant Id</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    sx={{ width: "100%", visibility: "hidden" }}
                    variant="standard"
                    margin="normal"
                    name="merchant_id"
                    id="merchant_id"
                    value="2779245"
                    placeholder="Merchant Id"
                    required
                  />
                </Grid>
              </Box>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  borderBottom: "1px solid #ee2e24",
                }}
              >
                <Typography variant="h6">Order Id</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{ borderBottom: "1px solid #ee2e24" }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  name="order_id"
                  value={BOOKINGDATA?.bookingId}
                  placeholder="Order Id"
                  readOnly
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  borderBottom: "1px solid #ee2e24",
                }}
              >
                <Typography variant="h6">Currency</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{ borderBottom: "1px solid #ee2e24" }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  name="currency"
                  value="INR"
                  placeholder="Currency"
                  readOnly
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  borderBottom: "1px solid #ee2e24",
                }}
              >
                <Typography variant="h6">Amount</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{ borderBottom: "1px solid #ee2e24" }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  name="amount"
                  value={"1"}
                  // value={actualPricetoPay}
                  placeholder="Amount"
                  readOnly
                />
              </Grid>
              <Box sx={{ display: "none" }}>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  sx={{
                    display: "grid",
                    alignItems: "center",
                    visibility: "hidden",
                  }}
                >
                  <Typography variant="h6">Redirect Url</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <input
                    type="text"
                    style={inputStyle}
                    name="redirect_url"
                    value={`${API_URL}/ccav/ccavResponseHandler`}
                    placeholder="Redirect Url"
                    readOnly
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  sx={{
                    display: "grid",
                    alignItems: "center",
                    visibility: "hidden",
                  }}
                >
                  <Typography variant="h6">Cancel Url</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <input
                    type="text"
                    style={inputStyle}
                    name="cancel_url"
                    value={`${API_URL}/ccav/ccavResponseHandler`}
                    placeholder="Cancel Url"
                    readOnly
                  />
                </Grid>
              </Box>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  borderBottom: "1px solid #ee2e24",
                }}
              >
                <Typography variant="h6">Language</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{ borderBottom: "1px solid #ee2e24" }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  name="language"
                  id="language"
                  value="EN"
                  placeholder="Language"
                  readOnly
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  borderBottom: "1px solid #ee2e24",
                }}
              >
                <Typography variant="h6">Billing City:</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{ borderBottom: "1px solid #ee2e24" }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  margin="normal"
                  name="billing_city"
                  placeholder="Enter Billing City"
                  value={DATAA?.city}
                  readOnly
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  borderBottom: "1px solid #ee2e24",
                }}
              >
                <Typography variant="h6">Billing State:</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{ borderBottom: "1px solid #ee2e24" }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  margin="normal"
                  name="billing_state"
                  value={DATAA?.state}
                  placeholder="Enter Billing State"
                  readOnly
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  borderBottom: "1px solid #ee2e24",
                }}
              >
                <Typography variant="h6">Billing Zip:</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{ borderBottom: "1px solid #ee2e24" }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  margin="normal"
                  name="billing_zip"
                  value={DATAA?.zip}
                  placeholder="Enter Billing Zip"
                  readOnly
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  borderBottom: "1px solid #ee2e24",
                }}
              >
                <Typography variant="h6">Billing Country:</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{ borderBottom: "1px solid #ee2e24" }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  margin="normal"
                  name="billing_country"
                  value={DATAA?.country}
                  placeholder="Enter Billing Country"
                  readOnly
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  borderBottom: "1px solid #ee2e24",
                }}
              >
                <Typography variant="h6">
                  Billing Mobile No.<span className="text-danger">*</span>:
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{ borderBottom: "1px solid #ee2e24" }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  margin="normal"
                  name="billing_tel"
                  value={BOOKINGDATA?.guest?.mobileNo}
                  placeholder="Enter Mobile No."
                  readOnly
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  borderBottom: "1px solid #ee2e24",
                }}
              >
                <Typography variant="h6">
                  Billing Email<span className="text-danger">*</span>:
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{ borderBottom: "1px solid #ee2e24" }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  margin="normal"
                  name="billing_email"
                  placeholder="Billing Email:"
                  value={BOOKINGDATA?.guest?.email}
                />
              </Grid>

              <Grid item xs={12} lg={6} p={1}>
                <input
                  type="submit"
                  name="merchant_param1"
                  value="Part Pay"
                  style={{ padding: "1rem 0rem", borderRadius: "27px", margin: '1px' }}
                />
              </Grid>
              <Grid item xs={12} lg={6} p={1}>
                <LoadingButton
                  fullWidth
                  // loading={true}
                  id="FormfillDone"
                  type="submit"
                  onClick={() =>
                    HandleCheckOutPayment(userBookingDetails, calculate)
                  }
                  color="error"
                  sx={{ padding: "1rem 0rem", borderRadius: "27px", margin: 1 }}
                  variant="contained"
                >
                  CheckOut
                </LoadingButton>
              </Grid>
            </Grid>
            <input
              type="text"
              name="merchant_param1"
              value="Part Pay"
              style={{ visibility: 'hidden', display: 'none' }}
            />

            {/* <table width="100%" height="100" border="1" align="center">
              <tr>
                <td>Parameter Name:</td>
                <td>Parameter Value:</td>
              </tr>
              <tr>
                <td colspan="2">Compulsory information</td>
              </tr>
              <tr>
                <td>Merchant Id</td>
                <td>
                  <input
                    type="text"
                    name="merchant_id"
                    id="merchant_id"
                    value="2779245"
                  />
                </td>
              </tr>
              <tr>
                <td>Order Id</td>
                <td>
                  <input type="text" name="order_id" value="1234" />
                </td>
              </tr>
              <tr>
                <td>Currency</td>
                <td>
                  <input type="text" name="currency" value="INR" />
                </td>
              </tr>
              <tr>
                <td>Amount</td>
                <td>
                  <input type="text" name="amount" value="1.00" />
                </td>
              </tr>
              <tr>
                <td>Redirect URL</td>
                <td>
                  <input
                    type="text"
                    name="redirect_url"
                    value={`${API_URL}/ccav/ccavResponseHandler`}
                  />
                </td>
              </tr>
              <tr>
                <td>Cancel URL</td>
                <td>
                  <input
                    type="text"
                    name="cancel_url"
                    value={`${API_URL}/ccav/ccavResponseHandler`}
                  />
                </td>
              </tr>
              <tr>
                <td>Language</td>
                <td>
                  <input type="text" name="language" id="language" value="EN" />
                </td>
              </tr>
              <tr>
                <td colspan="2">Billing information(optional):</td>
              </tr>
              <tr>
                <td>Billing Name</td>
                <td>
                  <input
                    type="text"
                    name="billing_name"
                    value={BOOKINGDATA?.guest?.name}
                  />
                </td>
              </tr>
              <tr>
                <td>Billing Address:</td>
                <td>
                  <input
                    type="text"
                    name="billing_address"
                    value={BOOKINGDATA?.hotel?.address}
                  />
                </td>
              </tr>
              <tr>
                <td>Billing City:</td>
                <td>
                  <input
                    type="text"
                    name="billing_city"
                    value={BOOKINGDATA?.hotel?.city}
                  />
                </td>
              </tr>
              <tr>
                <td>Billing State:</td>
                <td>
                  <input
                    type="text"
                    name="billing_state"
                    value={BOOKINGDATA?.hotel?.state}
                  />
                </td>
              </tr>
              <tr>
                <td>Billing Zip:</td>
                <td>
                  <input
                    type="text"
                    name="billing_zip"
                    value={BOOKINGDATA?.hotel?.zipCode}
                  />
                </td>
              </tr>
              <tr>
                <td>Billing Country:</td>
                <td>
                  <input
                    type="text"
                    name="billing_country"
                    value={BOOKINGDATA?.hotel?.country}
                  />
                </td>
              </tr>
              <tr>
                <td>Billing Tel:</td>
                <td>
                  <input
                    type="text"
                    name="billing_tel"
                    value={BOOKINGDATA?.customer?.mobileNo}
                  />
                </td>
              </tr>
              <tr>
                <td>Billing Email:</td>
                <td>
                  <input
                    type="text"
                    name="billing_email"
                    value={BOOKINGDATA?.customer?.email}
                  />
                </td>
              </tr>
              <tr>
                <td colspan="2">Shipping information(optional):</td>
              </tr>
              <tr>
                <td>Shipping Name</td>
                <td>
                  <input type="text" name="delivery_name" value="Sam" />
                </td>
              </tr>
              <tr>
                <td>Shipping Address:</td>
                <td>
                  <input type="text" name="delivery_address" value="Vile Parle" />
                </td>
              </tr>
              <tr>
                <td>Shipping City:</td>
                <td>
                  <input type="text" name="delivery_city" value="Mumbai" />
                </td>
              </tr>
              <tr>
                <td>Shipping State:</td>
                <td>
                  <input type="text" name="delivery_state" value="Maharashtra" />
                </td>
              </tr>
              <tr>
                <td>Shipping Zip:</td>
                <td>
                  <input type="text" name="delivery_zip" value="400038" />
                </td>
              </tr>
              <tr>
                <td>Shipping Country:</td>
                <td>
                  <input type="text" name="delivery_country" value="India" />
                </td>
              </tr>
              <tr>
                <td>Shipping Tel:</td>
                <td>
                  <input type="text" name="delivery_tel" value="0123456789" />
                </td>
              </tr>
              <tr>
                <td>Merchant Param1</td>
                <td>
                  <input
                    type="text"
                    name="merchant_param1"
                    value="additional Info."
                  />
                </td>
              </tr>
              <tr>
                <td>Merchant Param2</td>
                <td>
                  <input
                    type="text"
                    name="merchant_param2"
                    value="additional Info."
                  />
                </td>
              </tr>
              <tr>
                <td>Merchant Param3</td>
                <td>
                  <input
                    type="text"
                    name="merchant_param3"
                    value="additional Info."
                  />
                </td>
              </tr>
              <tr>
                <td>Merchant Param4</td>
                <td>
                  <input
                    type="text"
                    name="merchant_param4"
                    value="additional Info."
                  />
                </td>
              </tr>
              <tr>
                <td>Merchant Param5</td>
                <td>
                  <input
                    type="text"
                    name="merchant_param5"
                    value="additional Info."
                  />
                </td>
              </tr>
              <tr>
                <td>Promo Code:</td>
                <td>
                  <input type="text" name="promo_code" value="" />
                </td>
              </tr>
              <tr>
                <td>Customer Id:</td>
                <td>
                  <input
                    type="text"
                    name="customer_identifier"
                    value={BOOKINGDATA?.customer?._id}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input type="submit" value="Checkout" />
                </td>
              </tr>
            </table> */}
          </form>
        </Card>
      </Box>
    </div>
  );
}

export default CcavForm;

// Merchant Id ( Hidden)
// Order Id ( Show After OnClick )
// Currency
// Amount
// RedirectUrl ( Hidden)
// Cancel Url ( Hidden )
// Language

// Billing

// - Name
// Address ( Optional )
// Tel
// Email

// Marchent all ( Hidden )
// Promocode
// CustomerId

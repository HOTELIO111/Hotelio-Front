import React from "react";
import { API_URL } from "../../config";
import { useBooking } from "../../context/useBooking";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "../../context/userAuthContext";
import { Box, Card, Grid, InputLabel, TextField, Typography } from "@mui/material";
import Skeleton from "react-loading-skeleton";

function CcavForm({ BOOKINGDATA, BILL, roomData }) {
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

  const HandleCheckOutPayment = async (BOOKINGDATA, BILL) => {
    const formData = {
      room: BOOKINGDATA?.room?._id,
      hotel: BOOKINGDATA?.hotel?._id,
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
        <Card sx={{ p: 2, borderRadius: 2, border: '2px solid #ee2e24' }}>
          <form
            method="POST"
            name="customerData"
            action={`${API_URL}/ccav/ccavRequestHandler`}
          >

            <Grid container spacing={1}>
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: 'hidden' }} >
                <Typography>Merchant Id</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: 'hidden' }}
                  variant="outlined"
                  margin="normal"
                  name="merchant_id"
                  id="merchant_id"
                  value="2779245"
                  placeholder="Merchant Id"
                  required
                />
              </Grid>
              <Skeleton animation="wave" duration={1} variant="rectangular" height={16} width="100%" />
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: '' }} >
                <Typography>Order Id</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: '' }}
                  variant="outlined"
                  margin="normal"
                  name="order_id"
                  // disabled
                  value="12345"
                  placeholder="Order Id"
                  required
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Skeleton animation="wave" duration={1} variant="rectangular" height={16} width="100%" />
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: '' }} >
                <Typography>Currency</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: '' }}
                  variant="outlined"
                  margin="normal"
                  name="currency"
                  // disabled
                  value="INR"
                  placeholder="Currency"
                  required
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: '' }} >
                <Typography>Amount</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: '' }}
                  variant="outlined"
                  margin="normal"
                  name="amount"
                  // disabled
                  value="1.00"
                  placeholder="Amount"
                  required
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: 'hidden' }} >
                <Typography>Redirect Url</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: 'hidden' }}
                  variant="outlined"
                  margin="normal"
                  name="redirect_url"
                  value={`${API_URL}/ccav/ccavResponseHandler`}
                  placeholder="Redirect Url"
                  required
                />
              </Grid>
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: 'hidden' }} >
                <Typography>Cancel Url</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: 'hidden' }}
                  variant="outlined"
                  margin="normal"
                  name="cancel_url"
                  value={`${API_URL}/ccav/ccavResponseHandler`}
                  placeholder="Cancel Url"
                  required
                />
              </Grid>
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: '' }} >
                <Typography>Language</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: '' }}
                  variant="outlined"
                  margin="normal"
                  name="language"
                  id="language"
                  value="EN"
                  placeholder="Language"
                  required
                />
              </Grid>
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: '' }} >
                <Typography>Billing Name <span className="text-danger">*</span></Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: '' }}
                  variant="outlined"
                  margin="normal"
                  name="billing_name"
                  value={BOOKINGDATA?.guest?.name}
                  placeholder="Billing Name"
                  required
                />
              </Grid>
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: '' }} >
                <Typography>Billing Address:</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: '' }}
                  variant="outlined"
                  margin="normal"
                  name="billing_address"
                  value={BOOKINGDATA?.hotel?.address}
                  placeholder="Billing Address:"
                />
              </Grid>
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: '' }} >
                <Typography>Billing City:</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: '' }}
                  variant="outlined"
                  margin="normal"
                  name="billing_city"
                  value={BOOKINGDATA?.hotel?.city}
                  placeholder="Billing City:"
                />
              </Grid>
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: '' }} >
                <Typography>Billing State:</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: '' }}
                  variant="outlined"
                  margin="normal"
                  name="billing_state"
                  value={BOOKINGDATA?.hotel?.state}
                  placeholder="Billing State:"
                />
              </Grid>
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: '' }} >
                <Typography>Billing Zip:</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: '' }}
                  variant="outlined"
                  margin="normal"
                  name="billing_zip"
                    value={BOOKINGDATA?.hotel?.zipCode}
                  placeholder="Billing Zip:"
                />
              </Grid>
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: '' }} >
                <Typography>Billing Country:</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: '' }}
                  variant="outlined"
                  margin="normal"
                  name="billing_country"
                  value={BOOKINGDATA?.hotel?.country}
                  placeholder="Billing Country:"
                />
              </Grid>
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: '' }} >
                <Typography>Billing Tel<span className="text-danger">*</span>:</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: '' }}
                  variant="outlined"
                  margin="normal"
                  name="billing_tel"
                  value={BOOKINGDATA?.customer?.mobileNo}
                  placeholder="Billing Tel:"
                  required
                />
              </Grid>
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: '' }} >
                <Typography>Billing Email<span className="text-danger">*</span>:</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: '' }}
                  variant="outlined"
                  margin="normal"
                  name="billing_email"
                  value={BOOKINGDATA?.customer?.email}
                  placeholder="Billing Email:"
                  required
                />
              </Grid>
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: '' }} >
                <Typography>Promo Code:</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: '' }}
                  variant="outlined"
                  margin="normal"
                  name="promo_code"
                  value=""
                  placeholder="Promo code"
                />
              </Grid>
              <Grid item lg={4} sx={{ display: 'grid', alignItems: 'center', visibility: '' }} >
                <Typography>Customer Id:</Typography>
              </Grid>
              <Grid item lg={8}>
                <TextField
                  sx={{ width: '100%', visibility: '' }}
                  variant="outlined"
                  margin="normal"
                  disabled
                  name="customer_identifier"
                  value={BOOKINGDATA?.customer?._id}
                  placeholder="Customer Id:"
                  required
                />
              </Grid>
            </Grid>

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
            <LoadingButton
              fullWidth
              // loading={true}
              type="submit"
              onClick={() => HandleCheckOutPayment(userBookingDetails, calculate)}
              color="error"
              sx={{ padding: "1rem 0rem", borderRadius: '27px' }}
              variant="contained"
            >
              CheckOut
            </LoadingButton>
          </form>
        </Card>
      </Box>
    </div>
  );
}

export default CcavForm;

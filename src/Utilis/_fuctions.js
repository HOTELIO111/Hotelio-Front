export function validateInput(number) {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(number);
  const isMobileNumber = /^[0-9]{10}$/.test(number);

  if (isEmail) {
    return "email";
  } else if (isMobileNumber) {
    return "mobileNo";
  } else {
    return "Invalid Input";
  }
}

export function buildQueryString(data) {
  const queryString = Object.keys(data)
    .filter((key) => data[key] !== undefined && data[key] !== null)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");

  return queryString;
}

// localStorageManagement

// localStorageManagement
export const ManageStorage = ({ storageName, Data, storage, get }) => {
  if (Array.isArray(storage)) {
    if (storage.includes("local")) {
      window.localStorage.setItem(storageName, JSON.stringify(Data));
    }
    if (storage.includes("session")) {
      window.sessionStorage.setItem(storageName, JSON.stringify(Data));
    }
  } else if (storage === "session") {
    window.sessionStorage.setItem(storageName, JSON.stringify(Data));
  } else if (storage === "local") {
    window.localStorage.setItem(storageName, JSON.stringify(Data));
  } else if (get === true) {
    if (Array.isArray(storage)) {
      // Attempt to retrieve data from both local and session storage
      let sessionData = null;
      let localData = null;

      if (storage.includes("session")) {
        sessionData = JSON.parse(window.sessionStorage.getItem(storageName));
      }

      if (storage.includes("local")) {
        localData = JSON.parse(window.localStorage.getItem(storageName));
      }

      // Return an object with both session and local data
      return {
        session: sessionData,
        local: localData,
      };
    } else {
      // Handle the case when storage is not an array
      if (storage === "session") {
        return JSON.parse(window.sessionStorage.getItem(storageName));
      } else if (storage === "local") {
        return JSON.parse(window.localStorage.getItem(storageName));
      } else {
        return null; // Handle the case when storage type is not specified
      }
    }
  }
};

export const totalLengthOfStay = (checkIn, checkOut) => {
  const newCheckIn = new Date(checkIn);
  const newCheckOut = new Date(checkOut);
  const timeDifference = newCheckOut.getTime() - newCheckIn.getTime();
  const totalDays = timeDifference / (1000 * 3600 * 24);
  return totalDays;
};

export const calculateDiscount = (
  originalAmount,
  discountPercent,
  currentSearchParam
) => {
  const newOrignalAmount =
    originalAmount *
    totalLengthOfStay(currentSearchParam.checkIn, currentSearchParam.checkOut);
  const discountAmount = (originalAmount * discountPercent) / 100;
  const discountedAmount =
    (originalAmount - discountAmount) *
    totalLengthOfStay(currentSearchParam.checkIn, currentSearchParam.checkOut);

  return {
    originalAmount: newOrignalAmount,
    discountAmount: discountAmount,
    discountedAmount: discountedAmount,
  };
};

// calculate the selected hotelprice
export const calculateThePrice = (
  currentSearchParam,
  quantity,
  price,
  day,
  discounts,
  gst
) => {
  const GrossAmount = quantity * price * day;
  const discountAmount = GrossAmount * discounts;
  const NetAmount = GrossAmount - discountAmount;
  const GstAmount = (NetAmount * 18) / 100;
  const AmountWithGst = NetAmount + GstAmount;

  return {
    GrossAmount,
    discountAmount,
    NetAmount,
    totalRooms: quantity,
    price,
    GstAmount,
    AmountWithGst,
  };
};

export function validateInput(number) {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(number);
    const isMobileNumber = /^[0-9]{10}$/.test(number);

    if (isEmail) {
        return "email";
    } else if (isMobileNumber) {
        return "mobile";
    } else {
        return "Invalid Input";
    }
}


export function buildQueryString(data) {
    const queryString = Object.keys(data)
        .filter(key => data[key] !== undefined && data[key] !== null)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join("&");

    return queryString;
}

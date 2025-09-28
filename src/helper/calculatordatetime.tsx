export const CalculaDatetime = (datetime: string | "") => {
  let date = "";
  if (datetime === "") {
    date = new Date() + "1000";
  } else {
    date = datetime;
  }
  let dateconver = new Date(date);
  let datenow = new Date().getTime();
  let dateend = new Date(dateconver?.getTime()).getTime();
  // how can change to second
  let timezone = dateend - datenow;
  if (timezone > 0) {
    return timezone;
  } else {
    return 0;
  }
};

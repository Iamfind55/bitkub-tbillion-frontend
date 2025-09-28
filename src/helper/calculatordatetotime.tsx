export const CalculaDateToTime = (starttime: any | "", endtime: any | "") => {
  // Check if starttime and endtime are provided and are not empty strings
  if (starttime && endtime) {
    let start = new Date(starttime).getTime();
    let end = new Date(endtime).getTime();
    // Calculate the timezone difference
    let timezone = (end - start) / 1000;
    // Return the timezone difference if it's positive, otherwise return 0
    return timezone > 0 ? timezone : 0;
  } else {
    // Handle case where starttime or endtime is not provided or empty
    console.error("Please provide valid starttime and endtime");
    return 0;
  }
};

const useDate = () => {
  const currentDate = new Date();
  const getDateRange = () => {
    // Calculate date from seven days ago
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - 7);

    const endDateString = currentDate.toISOString().split("T")[0];
    const startDateString = startDate.toISOString().split("T")[0];

    return {
      startDate: startDateString,
      endDate: endDateString,
    };
  };

  // get monthly date
  const monthlyDates = () => {
    // Calculate date from month days ago
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - 30);

    const endDateString = currentDate.toISOString().split("T")[0];
    const startDateString = startDate.toISOString().split("T")[0];

    return {
      startDate: startDateString,
      endDate: endDateString,
    };
  };

  // yearly
  const getYearlyDates = () => {
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const endOfYear = new Date(currentDate.getFullYear(), 11, 31);

    const startOfYearString = startOfYear.toISOString().split("T")[0];
    const endOfYearString = endOfYear.toISOString().split("T")[0];

    return {
      startDate: startOfYearString,
      endDate: endOfYearString,
    };
  };

  const { startDate, endDate } = getDateRange();
  const { startDate: monthlyStartDate, endDate: monthlyEndDate } =
    monthlyDates();
  const { startDate: yearlyStartDate, endDate: yearlyEndDate } =
    getYearlyDates();

  return {
    weeklyDates: { startDate, endDate },
    monthlyDates: { startDate: monthlyStartDate, endDate: monthlyEndDate },
    yearlyDates: { startDate: yearlyStartDate, endDate: yearlyEndDate },
  };
};
export default useDate;

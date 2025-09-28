
import moment from "moment";
//  format lao date 
export const formatDate = (dateTime: any) => {
  moment.locale("lo");
  let resp = moment(dateTime).format("DD MMMM YYYY");
  if (dateTime) return resp;
  else return ""
};
// format slashdate (/)
export const formateDateSlash = (slashData: any) => {
  let resp = moment(slashData).format("DD/MM/YYYY");
  return resp;
};

// format slashdate  (/) with time
export const formateDateSlashAndTime = (slashData: any) => {
  let resp = moment(slashData).format("DD/MM/YYYY HH:mm");
  return resp;
};


// format dashDate (-)
export const formatDateDash = (dashDate: any) => {
  let resp = moment(dashDate).format("YYYY-MM-DD");
  return resp;
};

// format dashDate (-) with time
export const formatDateDashAndTime = (dashDate: any) => {
  let resp = moment(dashDate).format("YYYY-MM-DD HH:mm");
  return resp;
};

// format datetime
export const FormatDatetime = (date: any) => {
  let resp = moment(date).format("DD/MM/YYYY  HH:mm:ss");
  return resp;
};
// format date
export const FormatDate = (date: any) => {
  let resp = moment(date).format("DD/MM/YYYY");
  return resp;
};

// format time
export const FormatTime = (date: any) => {
  let resp = moment(date).format("HH:mm");
  return resp;
};

// format number
export const FormatNumber = (number: number) => {
  return new Intl.NumberFormat().format(Number(number))
}

// function calculator age
export const calculateAge=(birthdate: string)=> {
  const today = new Date();
  const birthDate = new Date(birthdate);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

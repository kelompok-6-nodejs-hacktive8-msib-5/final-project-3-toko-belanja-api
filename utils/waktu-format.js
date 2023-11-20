import moment from "moment";

export const formatWaktu = (value) => {
  moment.locale("id");

  return moment(value).format("LLLL");
};

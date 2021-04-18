import moment from "moment";

export const timestampDateFormat = (timestamp: number) => moment(timestamp).format("DD/MM/YYYY");

export const timestampDateTimeFormat = (timestamp: number) => moment(timestamp).format("HH:mm:ss DD/MM/YYYY");

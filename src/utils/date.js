export const getOnlyDate = (val) => {
  if (val) {
    return val.split("T")[0];
  }
  return "";
};

const numberWithCommas = (input, locale = "in") => {
  // TODO: Need to get back to this when product confirms the comma separation logic
  const lang = locale === "in" ? "en-IN" : "en-US";
  return Number(input).toLocaleString(lang, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export default numberWithCommas;

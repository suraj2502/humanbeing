export const splitFullName = (name) => {
  let res = {
    firstName: "",
    middleName: "",
    lastName: "",
  };
  if (!name) {
    return res;
  }
  let nameArray = name.split(" ");
  res.firstName = nameArray[0];

  if (nameArray.length > 2) {
    res.lastName = nameArray[nameArray.length - 1];
    for (let i = 1; i < nameArray.length - 1; i++) {
      if (res.middleName) {
        res.middleName = res.middleName + " " + nameArray[i];
      } else {
        res.middleName = res.middleName + nameArray[i];
      }
    }
    // res.middleName = nameArray[nameArray.length - 2];
  } else {
    res.lastName = nameArray[1] || "";
  }
  return res;
};

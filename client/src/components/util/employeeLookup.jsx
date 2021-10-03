const employeeLookup = (id, property, list) => {
  if (!list) return "";
  const result = list.find((emp) => {
    return parseInt(id) === emp.id;
  });
  return result && result.hasOwnProperty(property) ? result[property] : "";
};

export default employeeLookup;

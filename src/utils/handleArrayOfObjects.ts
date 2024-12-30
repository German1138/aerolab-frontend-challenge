const handleArrayOfObjects = (array, propertyPath: string[] = null) => {
  const result = array.map((element) => {
    if (propertyPath) {
      return element[propertyPath[0]][propertyPath[1]];
    } else {
      return element.name;
    }
  });
  return result.join(", ");
};

export default handleArrayOfObjects;

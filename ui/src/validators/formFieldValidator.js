const FormFieldValidator = (fieldName, value) => {
  switch (fieldName) {
    case "username":
      return value.trim().length > 6;
    case "password":
      return value.trim().length >= 8;
    default:
      return false;
  }
};

export default FormFieldValidator;

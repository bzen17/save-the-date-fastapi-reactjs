import FormFieldValidator from "../../validators/formFieldValidator";

const formReducer = (state, action) => {
  return {
    value: action.value,
    isValid: FormFieldValidator(action.type, action.value),
  };
};

export default formReducer;

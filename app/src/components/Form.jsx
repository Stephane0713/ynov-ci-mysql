import React, { useContext, useState } from "react";
import {
  isMajor,
  isValidDate,
  isValidEmail,
  isValidName,
  isValidZipCode,
} from "../helpers/validation";
import { ToastContext } from "./Toast";
import { calculateAge } from "../helpers/calculateAge";

/**
 * Custom hook for managing the state of a form field with validation.
 *
 * @function
 * @param {Function} validationFn - The validation function for the field's value.
 * @param {string} [initialValue=""] - The initial value for the field.
 * @returns {Object} An object containing the state and methods for the form field.
 * @property {string} value - The current value of the form field.
 * @property {Function} setValue - Function to set the value of the form field.
 * @property {boolean} hasError - A boolean indicating whether the field has a validation error.
 * @property {Function} validate - Function to trigger validation and update the error state.
 */
function useField(validationFn, initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [hasError, setError] = useState(false);

  const validate = () => {
    setError(!validationFn(value));
  };

  return { value, setValue, hasError, validate };
}

/**
 * Form Component - A simple form component using the TextField and useField hook.
 *
 * @component
 * @returns {JSX.Element} - The rendered Form component.
 */
export default function Form() {
  const fields = [
    { id: "lastName", label: "Nom", field: useField(isValidName) },
    { id: "firstName", label: "Prénom", field: useField(isValidName) },
    { id: "email", label: "Email", field: useField(isValidEmail) },
    {
      id: "birth",
      label: "Date de naissance",
      field: useField((v) => {
        try {
          const formatted = `
          ${v.substring(3, 5)}/${v.substring(0, 2)}/${v.substring(6, 10)}
          `;
          return (
            isValidDate(v) &&
            isMajor(calculateAge({ birth: new Date(formatted) }))
          );
        } catch (error) {
          console.error(error);
        }
      }),
    },
    { id: "city", label: "Ville", field: useField(isValidName) },
    { id: "zip", label: "Code postal", field: useField(isValidZipCode) },
  ];

  const canSubmit = () => {
    return (
      !fields.filter(({ field }) => {
        return field.value === "";
      }).length > 0
    );
  };

  const hasErrors = () => {
    return (
      fields.filter(({ field }) => {
        return field.hasError;
      }).length > 0
    );
  };

  const toast = useContext(ToastContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hasErrors()) {
      localStorage.setItem(
        "user",
        JSON.stringify(
          fields.reduce((acc, val) => {
            const key = val.id;
            const fieldValue = val.field.value;
            return { ...acc, [key]: fieldValue };
          }, {})
        )
      );
      fields.forEach(({ field }) => field.setValue(""));
      toast("Le compte a bien été enregistré");
      return;
    }
    toast("Une erreur s'est produite", "error");
  };

  return (
    <div className="max-w-5xl p-2 w-full">
      <h2 className="mb-8 text-2xl text-gray-900 text-center">
        Créer un compte
      </h2>
      <form
        action="."
        method="POST"
        onSubmit={handleSubmit}
        className="border-b border-gray-900/10 p-12 pb-24 shadow-sm rounded-sm  gap-4 flex flex-col"
      >
        {fields.map(({ id, label, field }) => (
          <TextField
            key={id}
            id={id}
            label={label}
            value={field.value}
            {...{
              message: field.hasError ? "Champ invalide" : "",
            }}
            onChange={(e) => {
              field.setValue(e.target.value);
            }}
            onBlur={() => field.validate()}
          />
        ))}

        <button
          disabled={!canSubmit()}
          type="submit"
          className=" disabled:bg-gray-400 enabled:bg-blue-600 enabled:hover:bg-blue-500 mt-6  text-white ease-in duration-100 text-sm font-semibold px-4 py-2 rounded-sm"
        >
          Confirmer
        </button>
      </form>
    </div>
  );
}

/**
 * Functional component for a text input field with an optional label and error message.
 *
 * @component
 * @param {Object} props - The properties of the TextField component.
 * @param {string} props.label - The label for the text input.
 * @param {string} [props.message=""] - The error message to display (if any).
 * @param {Object} inputProps - Additional properties to be spread on the input element.
 * @returns {JSX.Element} The TextField component.
 */
const TextField = ({ id, label, message = "", ...inputProps }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-semibold leading-6 text-gray-900 mb-2"
      >
        {label}
      </label>
      <input
        {...inputProps}
        data-testid={id}
        type="text"
        id={id}
        className="block w-full rounded-sm border-0 py-1.5 px-4 text-sm ring-1 ring-inset ring-gray-400"
      />
      {message !== "" && <div className="text-xs text-red-600">{message}</div>}
    </div>
  );
};

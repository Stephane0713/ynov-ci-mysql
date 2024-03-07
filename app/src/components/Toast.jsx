import React, { createContext, useState } from "react";

/**
 * Context for managing toast messages.
 *
 * @type {React.Context<Function>}
 */
export const ToastContext = createContext();

/**
 * Custom hook for managing toast messages.
 *
 * @returns {{
 *   toast: Function,
 *   type: string | undefined,
 *   isVisible: boolean | undefined,
 *   message: string | undefined
 * }} Returns an object containing the toast function and its related state.
 */
export function useToast() {
  const [type, setType] = useState();
  const [message, setMessage] = useState();
  const [isVisible, setVisible] = useState();

  const toast = (message, type = "info") => {
    setType(type);
    setMessage(message);
    setVisible(true);

    setTimeout(() => setVisible(false), 5000);
  };
  return { toast, type, isVisible, message };
}

/**
 * Provides a context for managing and displaying toast messages in the application.
 *
 * @component
 * @param {Object} props - The properties of the ToastProvider component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The ToastProvider component.
 */
export function ToastProvider({ children }) {
  const { toast, isVisible, type, message } = useToast();
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        data-testid="toast"
        className={`fixed bottom-0 right-0 left-0 z-50 transition-opacity ease-linear duration-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${type === "error" ? "bg-red-600" : "bg-blue-600"} text-white p-2`}
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}

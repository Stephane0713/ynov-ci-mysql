import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToastProvider, useToast, ToastContext } from "../components/Toast";
import { act } from "react-test-renderer";

function TestComponent() {
  const toast = React.useContext(ToastContext);

  return (
    <div>
      <button data-testid="trigger-toast" onClick={() => toast("Test Message")}>
        Trigger Toast
      </button>
    </div>
  );
}

jest.useFakeTimers();

describe("ToastProvider", () => {
  test("renders children and toast component", () => {
    render(
      <ToastProvider>
        <div data-testid="child">Child Component</div>
      </ToastProvider>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.queryByTestId("toast")).toHaveClass("opacity-0");
  });

  test("displays toast message", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    act(() => fireEvent.click(screen.getByTestId("trigger-toast")));
    expect(screen.getByTestId("toast")).toHaveTextContent("Test Message");
    expect(screen.getByTestId("toast")).toHaveClass("opacity-100");

    act(() => jest.advanceTimersByTime(5000));
    expect(screen.getByTestId("toast")).toHaveClass("opacity-0");
  });
});

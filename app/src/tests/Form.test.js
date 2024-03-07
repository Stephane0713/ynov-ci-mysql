import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("Form tests suite", () => {
  test("should have button disabled when at least a field is empty", () => {
    render(<App />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("disabled");
  });

  const formData = [
    [
      [
        "00pré",
        "Stéphane",
        "stephane@email.com",
        "01/01/1999",
        "Antibes",
        "06600",
      ],
    ],
    [
      [
        "Dupré",
        "Sté??ne",
        "stephane@email.com",
        "01/01/1999",
        "Antibes",
        "06600",
      ],
    ],
    [["Dupré", "Stéphane", "stephane.com", "01/01/1999", "Antibes", "06600"]],
    [
      [
        "Dupré",
        "Stéphane",
        "stephane@email.com",
        "10/01/2019",
        "Antibes",
        "06600",
      ],
    ],
    [["Dupré", "Stéphane", "stephane@email.com", "01/01/1999", "200", "06600"]],
    [
      [
        "Dupré",
        "Stéphane",
        "stephane@email.com",
        "01/01/1999",
        "Antibes",
        "06600AAA",
      ],
    ],
  ];
  test.each(formData)(
    "should show toast and %p field with error message",
    (f) => {
      render(<App />);

      const lastName = screen.getByTestId("lastName");
      fireEvent.change(lastName, { target: { value: f[0] } });
      fireEvent.blur(lastName);

      const firstName = screen.getByTestId("firstName");
      fireEvent.change(firstName, { target: { value: f[1] } });
      fireEvent.blur(firstName);

      const email = screen.getByTestId("email");
      fireEvent.change(email, { target: { value: f[2] } });
      fireEvent.blur(email);

      const birth = screen.getByTestId("birth");
      fireEvent.change(birth, { target: { value: f[3] } });
      fireEvent.blur(birth);

      const city = screen.getByTestId("city");
      fireEvent.change(city, { target: { value: f[4] } });
      fireEvent.blur(city);

      const zip = screen.getByTestId("zip");
      fireEvent.change(zip, { target: { value: f[5] } });
      fireEvent.blur(zip);

      const btn = screen.getByRole("button");
      fireEvent(btn, new MouseEvent("click", { bubbles: true }));
      expect(btn).not.toHaveAttribute("disabled");

      const toast = screen.getByTestId("toast");
      expect(toast).toHaveClass("bg-red-600");
      expect(toast).toHaveTextContent(/Une erreur s'est produite/);

      const message = screen.getByText(/Champ invalide/);
      expect(message).toBeInTheDocument();
    }
  );

  test("should show toast with success message", () => {
    render(<App />);

    const fieldValues = {
      lastName: "Dupré",
      firstName: "Stéphane",
      email: "stephane@email.com",
      birth: "01/01/1999",
      city: "Antibes",
      zip: "06600",
    };

    const lastName = screen.getByTestId("lastName");
    fireEvent.change(lastName, { target: { value: fieldValues.lastName } });
    fireEvent.blur(lastName);

    const firstName = screen.getByTestId("firstName");
    fireEvent.change(firstName, { target: { value: fieldValues.firstName } });
    fireEvent.blur(firstName);

    const email = screen.getByTestId("email");
    fireEvent.change(email, { target: { value: fieldValues.email } });
    fireEvent.blur(email);

    const birth = screen.getByTestId("birth");
    fireEvent.change(birth, {
      target: { value: fieldValues.birth },
    });
    fireEvent.blur(birth);

    const city = screen.getByTestId("city");
    fireEvent.change(city, { target: { value: fieldValues.city } });
    fireEvent.blur(city);

    const zip = screen.getByTestId("zip");
    fireEvent.change(zip, { target: { value: fieldValues.zip } });
    fireEvent.blur(zip);

    const btn = screen.getByRole("button");
    expect(btn).not.toHaveAttribute("disabled");

    fireEvent(btn, new MouseEvent("click", { bubbles: true }));

    const toast = screen.getByTestId("toast");
    expect(toast).toHaveClass("bg-blue-600");
    expect(toast).toHaveTextContent(/Le compte a bien été enregistré/);
    expect(JSON.parse(localStorage.getItem("user"))).toMatchObject(fieldValues);
    expect(lastName).toHaveValue("");
    expect(firstName).toHaveValue("");
    expect(email).toHaveValue("");
    expect(birth).toHaveValue("");
    expect(city).toHaveValue("");
    expect(zip).toHaveValue("");
  });
});

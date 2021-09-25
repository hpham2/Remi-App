import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("Test full application", () => {
  test("On successful log in: Sign up/Log in form is hidden, log out button and share link is displayed", async () => {
    render(<App />);
    expect(
      screen.getByText(/Let's sign up to join our network/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Share you beloved video/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Log out/i })
    ).not.toBeInTheDocument();

    const emailForm = screen.getByLabelText(/Email address/i);
    const passwordForm = screen.getByLabelText(/Password/i);
    const signinButton = screen.getByRole("button", { name: /Sign in/i });

    fireEvent.change(emailForm, {
      target: { value: "haipham@gmail.com" },
    });
    fireEvent.change(passwordForm, {
      target: { value: "123" },
    });
    fireEvent.click(signinButton);

    expect(screen.getByText(/Hello haipham@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Share you beloved video/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Log out/i })
    ).toBeInTheDocument();
  });

  test("On click share link: url should be matched to requirement", async () => {
    render(<App />);

    const emailForm = screen.getByLabelText(/Email address/i);
    const passwordForm = screen.getByLabelText(/Password/i);
    const signinButton = screen.getByRole("button", { name: /Sign in/i });

    fireEvent.change(emailForm, {
      target: { value: "haipham@gmail.com" },
    });
    fireEvent.change(passwordForm, {
      target: { value: "123" },
    });
    fireEvent.click(signinButton);

    const shareLink = screen.getByText(/Share you beloved video/i);

    let currentUrl = window.location.href;
    expect(currentUrl.includes("share")).toBeFalsy();

    fireEvent.click(shareLink);

    currentUrl = window.location.href;
    expect(currentUrl.includes("share")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /Save the video/i })
    ).toBeInTheDocument();
  });
});

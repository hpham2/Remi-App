import { fireEvent, render, screen } from "@testing-library/react";
import Homepage from "../component/Homepage";
import SignUpOrSignInForm from "../component/SignupOrSignInForm";
import { content } from "../database";

describe("Tests of Sign up form", () => {
  test("Show error for sign up - existed or invalid email", async () => {
    render(
      <SignUpOrSignInForm userList={content.users} onChange={jest.fn()} />
    );

    const emailForm = screen.getByLabelText(/Email address/i);
    const passwordForm = screen.getByLabelText(/Password/i);
    const signupButton = screen.getByRole("button", { name: /Register/i });

    fireEvent.change(emailForm, {
      target: { value: "haipham@gmail.com" },
    });
    fireEvent.click(signupButton);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Please enter your password!"
    );

    fireEvent.change(passwordForm, {
      target: { value: "111" },
    });
    fireEvent.click(signupButton);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "This user alreadys exists!"
    );

    fireEvent.change(emailForm, {
      target: { value: "" },
    });
    fireEvent.click(signupButton);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Please enter your email!"
    );
  });
  test("No error shown for sign up - if no problem with user's inputs", async () => {
    render(
      <SignUpOrSignInForm userList={content.users} onChange={jest.fn()} />
    );

    const emailForm = screen.getByLabelText(/Email address/i);
    const passwordForm = screen.getByLabelText(/Password/i);
    const signupButton = screen.getByRole("button", { name: /Register/i });

    fireEvent.change(emailForm, {
      target: { value: "haipham_new@gmail.com" },
    });
    fireEvent.change(passwordForm, {
      target: { value: "111" },
    });
    fireEvent.click(signupButton);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

describe("Tests of Log in form", () => {
  test("Show error for log in - no email found or wrong password", async () => {
    render(
      <SignUpOrSignInForm userList={content.users} onChange={jest.fn()} />
    );

    const emailForm = screen.getByLabelText(/Email address/i);
    const passwordForm = screen.getByLabelText(/Password/i);
    const signinButton = screen.getByRole("button", { name: /Sign in/i });

    fireEvent.change(emailForm, {
      target: { value: "haipham_123@gmail.com" },
    });
    fireEvent.click(signinButton);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Cannot find you in our database. Please register!"
    );

    fireEvent.change(emailForm, {
      target: { value: "haipham@gmail.com" },
    });
    fireEvent.change(passwordForm, {
      target: { value: "111" },
    });
    fireEvent.click(signinButton);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Your password is wrong. Please double check again!"
    );
  });
  test("No error shown for log in - if no problem with user's inputs", async () => {
    render(
      <SignUpOrSignInForm userList={content.users} onChange={jest.fn()} />
    );

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

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

describe("Tests of videos list", () => {
  test("Videos' description are rendered", async () => {
    render(<Homepage videoList={content.videos} />);

    expect(await screen.findByText("Vietnam - From Above")).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Ho Chi Minh City Nightlife Area, Clubs and Bars/i
      )
    ).toBeInTheDocument();
  });
});

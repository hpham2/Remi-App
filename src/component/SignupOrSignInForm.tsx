import React, { useCallback, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

export type User = {
  id: number;
  email: string;
  password: string;
};

type SignUpOrSignInFormProps = {
  userList: User[];
  onChange: (user: User) => void;
};

function SignUpOrSignInForm({ userList, onChange }: SignUpOrSignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleEmailChange = useCallback((value: any) => {
    setError("");
    setEmail(value.target.value);
  }, []);

  const handlePasswordChange = useCallback((value: any) => {
    setPassword(value.target.value);
  }, []);

  const handleSignUpSubmit = useCallback(() => {
    if (
      email !== "" &&
      userList.findIndex((user) => user.email === email) === -1
    ) {
      const newUser = {
        id: Math.random() * 10000000,
        email,
        password,
      };
      onChange(newUser);
      setError("");
    } else {
      email === ""
        ? setError("Please enter your email!")
        : setError("This user alreadys exists!");
    }
  }, [email, onChange, password, userList]);

  const handleSignInSubmit = useCallback(() => {
    const foundUser = userList.find((user) => user.email === email);
    if (foundUser) {
      setError("");
      foundUser.password === password
        ? onChange(foundUser)
        : setError("Your password is wrong. Please double check again!");
    } else {
      setError("Cannot find you in our database. Please register!");
    }
  }, [email, onChange, password, userList]);

  return (
    <div style={{ width: "40%" }}>
      {error !== "" && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={handleEmailChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <br />

      <Button
        variant="outline-primary"
        type="submit"
        onClick={handleSignInSubmit}
        style={{ marginRight: "15px" }}
      >
        Sign in
      </Button>

      <Button variant="primary" type="submit" onClick={handleSignUpSubmit}>
        Register
      </Button>
    </div>
  );
}

export default SignUpOrSignInForm;

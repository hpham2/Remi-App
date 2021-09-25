import React, { useCallback, useState } from "react";
import "./App.css";
import AddVideoForm from "./component/AddVideoForm";
import Homepage from "./component/Homepage";
import SignUpOrSignInForm, { User } from "./component/SignupOrSignInForm";
import { content } from "./database";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";

function App() {
  const [videoList, setVideoList] = useState(content.videos);
  const [userList, setUserList] = useState(content.users);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  const handleAddVideoFormChange = useCallback(
    (url: string) => {
      const newVideo = {
        id: Math.random() * 10000000,
        url,
        uploader: currentUser?.email || "",
      };
      setVideoList((oldList) => [...oldList, newVideo]);
    },
    [currentUser?.email]
  );

  const handleSignUpOrSignInChange = useCallback(
    (user: User) => {
      setCurrentUser(user);

      if (userList.findIndex((u) => u.email === user.email) === -1)
        setUserList((oldList) => [...oldList, user]);
    },
    [userList]
  );

  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/">
            <Container>
              <Row>
                {!currentUser && (
                  <>
                    <h1 style={{ paddingRight: "20px" }}>
                      Let's sign up to join our network
                    </h1>
                    <br />
                    <SignUpOrSignInForm
                      userList={userList}
                      onChange={handleSignUpOrSignInChange}
                    ></SignUpOrSignInForm>
                  </>
                )}

                {currentUser && (
                  <Container>
                    <Row>
                      <h1>Hello {currentUser.email}</h1>
                    </Row>
                    <Row>
                      <Link to="/share">Share you beloved video</Link>
                      <Button
                        style={{ marginLeft: "15px" }}
                        variant="outline-danger"
                        type="submit"
                        onClick={() => setCurrentUser(undefined)}
                      >
                        Log out
                      </Button>
                    </Row>
                  </Container>
                )}
              </Row>
              <hr />
              <Row>
                <p>
                  <strong>
                    Since this is completely a frontend app, no backend is
                    supported. <br />
                    Thus please do not refresh the app, otherwise you will lose
                    what you just added.
                  </strong>
                </p>
              </Row>
              <hr />
              <Row>
                <Homepage videoList={videoList}></Homepage>
              </Row>
            </Container>
          </Route>

          <Route path="/Remi_App">
            <Container>
              <Row>
                {!currentUser && (
                  <>
                    <h1 style={{ paddingRight: "20px" }}>
                      Let's sign up to join our network
                    </h1>
                    <br />
                    <SignUpOrSignInForm
                      userList={userList}
                      onChange={handleSignUpOrSignInChange}
                    ></SignUpOrSignInForm>
                  </>
                )}

                {currentUser && (
                  <Container>
                    <Row>
                      <h1>Hello {currentUser.email}</h1>
                    </Row>
                    <Row>
                      <Link to="/share">Share you beloved video</Link>
                      <Button
                        style={{ marginLeft: "15px" }}
                        variant="outline-danger"
                        type="submit"
                        onClick={() => setCurrentUser(undefined)}
                      >
                        Log out
                      </Button>
                    </Row>
                  </Container>
                )}
              </Row>
              <hr />
              <Row>
                <p>
                  <strong>
                    Since this is completely a frontend app, no backend is
                    supported. <br />
                    Thus please do not refresh the app, otherwise you will lose
                    what you just added.
                  </strong>
                </p>
              </Row>
              <hr />
              <Row>
                <Homepage videoList={videoList}></Homepage>
              </Row>
            </Container>
          </Route>

          <Route path="/share">
            <Container>
              <AddVideoForm onChange={handleAddVideoFormChange}></AddVideoForm>
            </Container>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

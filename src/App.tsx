import React, { useCallback, useState } from "react";
import "./App.css";
import AddVideoForm from "./component/AddVideoForm";
import Homepage from "./component/Homepage";
import SignUpOrSignInForm, { User } from "./component/SignupOrSignInForm";
import { content } from "./database";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function App() {
  const [videoList, setVideoList] = useState(content.videos);
  const [userList, setUserList] = useState(content.users);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  const handleAddVideoFormChange = useCallback((url: string) => {
    const newVideo = {
      id: Math.random() * 10000000,
      url,
      uploader: "Suprised",
    };
    setVideoList((oldList) => [...oldList, newVideo]);
  }, []);

  const handleSignUpOrSignInChange = useCallback(
    (user: User) => {
      setCurrentUser(user);

      if (userList.findIndex((u) => u.email === user.email) === -1)
        setUserList((oldList) => [...oldList, user]);
    },
    [userList]
  );

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            {!currentUser && (
              <SignUpOrSignInForm
                userList={userList}
                onChange={handleSignUpOrSignInChange}
              ></SignUpOrSignInForm>
            )}

            {currentUser && (
              <>
                <Button
                  variant="outline-primary"
                  style={{ marginRight: "15px" }}
                >
                  <Link to="/share">Share</Link>
                </Button>
                <Button
                  variant="danger"
                  type="submit"
                  onClick={() => setCurrentUser(undefined)}
                >
                  Log out
                </Button>
              </>
            )}

            <Homepage videoList={videoList}></Homepage>
          </Route>

          <Route path="/share">
            <AddVideoForm onChange={handleAddVideoFormChange}></AddVideoForm>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

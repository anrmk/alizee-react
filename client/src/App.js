import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import SignIn from "./components/SignIn";
import AuthRoute from "./components/AuthRoute";

import CreateRoom from "./pages/CreateRoom";
import Meeting from "./pages/Meeting";
import Room from "./pages/Room";
import Chat from "./pages/Chat";
import Feed from "./pages/Feed";


import axios from "axios";
import { useStateValue } from "./components/StateProvider";

function App() {
  const [token, setToken] = useState("");
  const[{user}, dispatch] = useStateValue();

  // function onLoginSubmit(form, userName, userPwd, history) {
  //   axios
  //     .post("https://localhost:44341/api/account/Authenticate", {
  //       email: userName,
  //       password: userPwd,
  //     })
  //     .then((res) => {
  //       this.setToken(res.data.token);
  //       console.log("UserName: " + userName);
  //     });
  // }

  return (
    <Router>
      <Header />
      <div className="py-4">
        <Switch>
          <Route exact path="/" component={Feed} />
          <Route path="/meet" component={Meeting} />
          <Route path="/chat" component={Chat} />
            {/* <SignIn onLoginSubmit={() => {}} /> */}
          {/* <Route exact path="/chat" component={Chat} /> */}
          <Route exact path="/room" component={CreateRoom} />
          <Route path="/room/:roomID" component={Room} />
          <Route path="/signin" component={SignIn} type="guest" />

        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

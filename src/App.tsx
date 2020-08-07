import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import { UserList, EditUser } from "./Users";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <AppBar position="static">
        <Toolbar>The User List App</Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Router>
          <Switch>
            <Route path="/users/:userId" component={EditUser} />
            <Route path="/" component={UserList} />
          </Switch>
        </Router>
      </Container>
    </Provider>
  );
};

export default App;

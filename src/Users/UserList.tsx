import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, User } from "../types";
import * as actions from "./actions";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const UserList = ({ classes }: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: actions.USER_LIST });
  }, [dispatch]);
  const users = useSelector<RootState, User[] | undefined>(
    (state) => state.userReducer.users
  );

  if (!users) return <div />;

  return (
    <div>
      {users.map((user) => (
        <Grid container className={classes.grid} key={user.id}>
          <Grid item xs={12} sm={3}>
            <Avatar alt={user.first_name} src={user.avatar} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link to={`/users/${user.id}`}>
              {user.first_name} {user.last_name}
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            {user.email}
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

const styles = () => ({
  grid: {
    padding: "10px",
  },
});

interface Props {
  classes: {
    grid: string;
  };
}

export default withStyles(styles)(UserList);

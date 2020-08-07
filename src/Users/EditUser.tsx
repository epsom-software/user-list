import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { RootState, User } from "../types";

const EditUser = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "USERS/EDIT_USER", data: props.match.params.userId });
  }, [dispatch, props.match.params.userId]);
  const updateUser = useCallback(
    (user: User) => dispatch({ type: "USERS/UPDATE_USER", data: user }),
    [dispatch]
  );

  const user = useSelector<RootState, User | undefined>(
    (state) => state.userReducer.user
  );
  const isSubmitting = useSelector<RootState, boolean>(
    (state) => state.userReducer.isSubmitting
  );

  if (!user) return <div />;

  return (
    <div>
      <Formik
        initialValues={user}
        onSubmit={async (values) => updateUser(values)}
      >
        {(props) => {
          const { values, handleChange, handleBlur } = props;
          return (
            <Form>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="first_name"
                label="First Name"
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
              />

              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

interface Props {
  match: {
    params: {
      userId: string;
    };
  };
}

export default EditUser;

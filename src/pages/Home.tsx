import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import { Grid, TextField, Button } from "@material-ui/core";
import HomeSecond from "./HomeSecond";

const validationSchema = yup.object({
  friends: yup.array(
    yup.object({
      name: yup.string().required("Please enter name"),
      email: yup
        .string()
        .required("Please enter email")
        .email("Please enter valid email"),
      password: yup.string().required("Please enter Password"),
    })
  ),
  email: yup
    .string()
    .required("Please enter email")
    .email("Please enter valid email"),
});

const initialValues = {
  friends: [
    {
      name: "Yes yes",
      email: "",
      password: "",
    },
  ],
  email: "",
};

interface Props {
  setErrorHandler: any;
}

const Home = ({ setErrorHandler }: Props) => {
  const [initialErrors, setInitialErrors] = useState({
    friends: [{ name: "Name First" }],
  });

  const handleSubmit = async (values: any, { setErrors }: any) => {
    // const newError=values.friends.map((item)=>item);

    setErrorHandler(values, setErrors);
  };

  return (
    <div>
      <h1>Invite friends</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialErrors={initialErrors}
      >
        {({ values, errors, handleChange }) => {
          console.log("Errors", errors);
          console.log("Values", values);
          const friendsError = errors.friends || ([] as any);
          return (
            <Form>
              <TextField
                placeholder="Please Enter Email"
                name={`email`}
                type="text"
                error={errors?.email ? true : false}
                helperText={errors?.email}
                value={values?.email}
                onChange={handleChange}
              />
              <FieldArray name="friends">
                {({ insert, remove, push }: any) => (
                  <Grid container spacing={10}>
                    {values.friends.length > 0 &&
                      values.friends.map((friend, index) => (
                        <Grid item>
                          <TextField
                            placeholder="Please Enter Email"
                            name={`friends.${index}.email`}
                            type="text"
                            error={friendsError[index]?.email}
                            helperText={friendsError[index]?.email}
                            value={friend.email}
                            onChange={handleChange}
                          />
                          <br />
                          <br />
                          <TextField
                            placeholder="Please Enter Name"
                            name={`friends.${index}.name`}
                            type="text"
                            error={friendsError[index]?.name}
                            helperText={friendsError[index]?.name}
                            value={friend.name}
                            onChange={handleChange}
                          />
                          <br />
                          <br />
                          <TextField
                            placeholder="Please Enter Password"
                            name={`friends.${index}.password`}
                            type="text"
                            error={friendsError[index]?.password}
                            helperText={friendsError[index]?.password}
                            value={friend.password}
                            onChange={handleChange}
                          />
                          <br />
                          <br />
                          <Button
                            onClick={() => remove(index)}
                            variant="outlined"
                          >
                            Remove
                          </Button>
                          {values.friends?.length - 1 === index && (
                            <Button
                              onClick={() =>
                                push({ name: "", email: "", password: "" })
                              }
                            >
                              Add Friend
                            </Button>
                          )}
                        </Grid>
                      ))}
                    <br />
                    <br />
                    <br />
                  </Grid>
                )}
              </FieldArray>
              <br />
              <br />
              <br />
              <Button variant="contained" type="submit">
                Invite
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Home;

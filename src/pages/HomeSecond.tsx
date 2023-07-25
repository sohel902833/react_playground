import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import { Grid, TextField, Button } from "@material-ui/core";

const validationSchema = yup.object({
  friends: yup.array(
    yup.object({
      name: yup.string().required("Please enter name"),
      email: yup
        .string()
        .required("Please enter email")
        .email("Please enter valid email"),
      password: yup.boolean().required("Please enter Password"),
    })
  ),
});

const initialValues = {
  friends: [
    {
      name: "",
      email: "",
      password: "",
    },
  ],
};

const HomeSecond = () => (
  <div>
    <h1>Invite friends</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
      validationSchema={validationSchema}
    >
      {({ values, errors, handleChange }) => {
        console.log("Values", values);
        console.log("Errors", errors);
        return (
          <Form>
            <FieldArray name="friends">
              {({ insert, remove, push }: any) => (
                <div>
                  {values.friends.length > 0 &&
                    values.friends.map((friend, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <label htmlFor={`friends.${index}.name`}>Name</label>
                          <Field
                            name={`friends.${index}.name`}
                            placeholder="Jane Doe"
                            type="text"
                          />
                          <ErrorMessage
                            name={`friends.${index}.name`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor={`friends.${index}.email`}>
                            Email
                          </label>
                          <Field
                            name={`friends.${index}.email`}
                            placeholder="jane@acme.com"
                            type="email"
                          />
                          <ErrorMessage
                            name={`friends.${index}.name`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => push({ name: "", email: "" })}
                  >
                    Add Friend
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit">Invite</button>
          </Form>
        );
      }}
    </Formik>
  </div>
);

export default HomeSecond;

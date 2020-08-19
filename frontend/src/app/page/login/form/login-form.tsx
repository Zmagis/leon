import React from "react";
import { Field, Form, Formik, FormikConfig } from "formik";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { InputField, PasswordInputField, CheckBoxField } from "app/components/inputs";
import { FormButton, SubmitButton } from "app/components/buttons";
import { FormErrors } from "app/model/form-errors";

import { InputIcon } from "./input-icon";

export interface LoginValues {
  username: string;
  password: string;
  checkbox: boolean;
}

export type LoginErrors = FormErrors<LoginValues>;

type Props = FormikConfig<LoginValues>;

const LoginForm: React.FC<Props> = (props: Props) => {
  const { initialValues, onSubmit, validate } = props;

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
      {() => (
        <Form>
          <label>Username</label>
          <Field component={InputField} name="username" placeholder="username" prefix={<InputIcon component={UserOutlined} />} />
          <label>Password</label>
          <Field component={PasswordInputField} name="password" placeholder="*********" prefix={<InputIcon component={LockOutlined} />} />
          <div className="block">
            <Field type="checkbox" name="checkbox" prefix={<InputIcon component={LockOutlined} />} />

            <label>Remember me</label>
          </div>
          <FormButton component={SubmitButton}>Sign In</FormButton>
        </Form>
      )}
    </Formik>
  );
};

export { LoginForm };

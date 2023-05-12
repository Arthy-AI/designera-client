import * as React from "react";
import {ReactProps} from "../../interfaces/ReactProps";

interface FormikError extends ReactProps {
  touched?: boolean;
  error?: string;
}

export const FormikError = ({touched, error}: FormikError) => {
  if (error) {
    return <div className="text-xs Font-Regular">{error}</div>;
  }
  return <div/>;
};


import * as React from "react";
import {ReactProps} from "../../interfaces/ReactProps";

interface FormikError extends ReactProps {
  touched?: boolean;
  error?: string;
}

export const FormikError = ({touched, error}: FormikError) => {
  if (error) {
    return (error.length > 0 ? <div className="text-xs Font-Regular" >{error}</div> : <div className={'hidden'}></div>);
  } else {
    return <div className={'hidden'}></div>
  }
};


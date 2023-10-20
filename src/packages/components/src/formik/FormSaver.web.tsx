import * as React from "react";

const FormSaver: React.FC<any> = ({ children, saveField, ...rest }) => {
  console.log("Rest", rest.values);
  React.useEffect(() => {
    localStorage.setItem(saveField, JSON.stringify(rest.values));
  }, [rest?.values]);

  return <>{children(rest)}</>;
};

export default FormSaver;

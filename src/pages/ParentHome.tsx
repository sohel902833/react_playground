import Home from "./Home";

const ParentHome = () => {
  const setErrorHandler = (values: any, setErrors: any) => {
    setErrors({ friends: values.friends, email: "hur" });
  };
  return (
    <div>
      <Home setErrorHandler={setErrorHandler} />
    </div>
  );
};

export default ParentHome;

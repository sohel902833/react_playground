import { Button } from "@material-ui/core";
import { useState } from "react";

const Check = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const handleSubmit = () => {
    console.log(phoneNumber);
  };
  return (
    <div>
      <input
        type="number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default Check;

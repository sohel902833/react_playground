import { LinkedIn } from "../components/LInkedin/LinkedIn";

const Signup = () => {
  return (
    // hell
    <div>
      <LinkedIn
        clientId="86vhj2q7ukf83q"
        redirectUri={`${window.location.origin}/linkedin`}
        onSuccess={(code) => {
          console.log(code);
        }}
        onError={(error) => {
          console.log(error);
        }}
      >
        {({ linkedInLogin }) => (
          <img
            onClick={linkedInLogin}
            // src={linkedin}
            alt="Sign in with Linked In"
            style={{ maxWidth: "180px", cursor: "pointer" }}
          />
        )}
      </LinkedIn>
    </div>
  );
};

export default Signup;

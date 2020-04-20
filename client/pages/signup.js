import React, { Fragment, useState } from "react";
import LandingHeader from "../components/LandingHeader";
import { useStoreActions } from "easy-peasy";
import { navigate } from "@reach/router";

function Signup() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const createUser = useStoreActions((actions) => actions.app.signup);
  const onSuccess = () => navigate("/");

  return (
    <Fragment>
      <LandingHeader />
      <h3>signup:</h3>
      <input
        type="text"
        onChange={(e) => setMail(e.target.value)}
        value={mail}
        placeholder="mail"
      />
      <br />
      <input
        type="text"
        onChange={(e) => setPass(e.target.value)}
        value={pass}
        placeholder="pass"
      />
      <br />
      <button onClick={() => createUser({ mail, pass, onSuccess })}>
        send
      </button>
    </Fragment>
  );
}

export default Signup;

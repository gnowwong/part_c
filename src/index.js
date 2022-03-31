import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

import "./index.css";
import { ClientService } from "./service";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    if (!!errors) {
      setLoading(true);
      setResponse("");
      const _response = await ClientService.GetClientRelationship(data);
      setResponse(_response);
      setLoading(false);
    }
  };
  
  React.useEffect(() => {
    const subscription = watch(() => setResponse(""));
    return () => subscription.unsubscribe();
  }, [watch]);

  const defaultRule = {
    required: {
      value: true,
      message: "This field is required!"
    },
    pattern: {
      value: /^\d{6,6}$/,
      message: "Entered value must be 6 numerical digits!"
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("login", defaultRule)} />
        {errors.login && <p>{errors.login.message}</p>}

        <input {...register("agent", defaultRule)} />
        {errors.agent && <p>{errors.agent.message}</p>}

        <input type="submit" />
        {response && <p>{JSON.stringify(response)}</p>}
        {loading && <p>we are processing clients’ request…</p>}
      </form>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

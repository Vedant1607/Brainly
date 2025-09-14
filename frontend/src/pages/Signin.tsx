import { useRef } from "react";
import Button from "../components/Button";
import { InputComponent } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/auth/signin`, {
        username,
        password,
      });

      alert(res.data.message || "You have signed in");
      const jwt = res.data.token;
      localStorage.setItem("token", jwt);
      console.log(res.data, jwt);

      // redirect the user to the dashboard
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Signin error:", err);

      // Handle backend validation errors
      if (err.response?.data?.errors) {
        alert(err.response.data.errors.join("\n"));
      }
      // Handle other backend messages
      else if (err.response?.data?.message) {
        alert(err.response.data.message);
      }
      // Fallback
      else {
        alert("Signin failed. Please try again.");
      }
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded flex flex-col justify-center items-center p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent page reload
            signin();
          }}
          className="flex flex-col w-full"
        >
          <InputComponent ref={usernameRef} placeholder="Username" />
          <InputComponent
            ref={passwordRef}
            placeholder="Password"
            type="password"
          />

          <Button
            variant="primary"
            text="Signin"
            fullWidth={true}
            loading={false}
          />
        </form>
      </div>
    </div>
  );
}

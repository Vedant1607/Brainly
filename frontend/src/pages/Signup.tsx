import { useRef } from "react";
import Button from "../components/Button";
import { InputComponent } from "../components/Input";
import axios from 'axios';
import { BACKEND_URL } from "../config";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()

  async function signup() {
    const username = usernameRef.current?.value;
    const password = usernameRef.current?.value;
    await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, {
      data: {
        username,
        password
      }
    });
    console.log(usernameRef, passwordRef)
    alert("You have signed up");
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded flex flex-col justify-center items-center p-8">
        <InputComponent ref={usernameRef} placeholder="Username" />
        <InputComponent ref={passwordRef} placeholder="Password" />

        <Button
          variant="primary"
          text="Signup"
          fullWidth={true}
          loading={false}
          onClick={signup}
        />
      </div>
    </div>
  );
}

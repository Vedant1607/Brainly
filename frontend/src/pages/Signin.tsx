import Button from "../components/Button";
import { InputComponent } from "../components/Input";

export function Signin() {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded flex flex-col justify-center items-center p-8">
        <InputComponent placeholder="Username" />
        <InputComponent placeholder="Password" />

        <Button
          variant="primary"
          text="Signin"
          fullWidth={true}
          loading={false}
        />
      </div>
    </div>
  );
}

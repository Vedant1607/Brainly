import { XIcon } from "../icons/XIcon";
import Button from "./Button";

export function CreateContentModal({ open, onClose }:{open:boolean, onClose:() => void}) {
  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-700 fixed top-0 left-0 opacity-60 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 rounded p-4">
              <div className="flex justify-end cursor-pointer" onClick={onClose}>
                <XIcon/>
              </div>
              <div>
                <InputComponent placeholder="title" onChange={() => {}} />
                <InputComponent placeholder="url" onChange={() => {}} />
              </div>
              <div className="flex justify-center">
                <Button variant="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function InputComponent({onChange, placeholder}:{onChange: () => void, placeholder:string}) {
  return  (
    <div>
      <input placeholder={placeholder} type="text" className="px-4 py-2 border rounded m-2" onChange={onChange}/>
    </div>
  )
}
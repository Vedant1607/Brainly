import { useRef, useState } from "react";
import { XIcon } from "../icons/XIcon";
import Button from "./Button";
import { InputComponent } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  YouTube = "youtube",
  Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }:{open:boolean, onClose:() => void}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.YouTube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(`${BACKEND_URL}/api/v1/content`, {
      link, title, type
    }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
  }

  return (
    <div>
      {open && (<div>
        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
            
        </div>
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
          <div className="flex flex-col justify-center">
              <span className="bg-white opacity-100 rounded p-4 fixed">
                <div className="flex justify-end cursor-pointer" onClick={onClose}>
                  <XIcon/>
                </div>
                <div>
                  <InputComponent ref={titleRef} placeholder="title" onChange={() => {}} />
                  <InputComponent ref={linkRef} placeholder="url" onChange={() => {}} />
                </div>
                <div>
                  <h1>Type</h1>
                  <div className="flex gap-1 p-4 justify-center pb-4">
                    <Button text="YouTube" variant={type === ContentType.YouTube ? "primary" : "secondary"}
                      onClick={() => {
                        setType(ContentType.YouTube);
                      }}></Button>
                    <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"}
                      onClick={() => {
                        setType(ContentType.Twitter);
                      }}></Button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button onClick={addContent} variant="primary" text="Submit" />
                </div>
              </span>
          </div>
        </div>
      </div>)}
    </div>
  );
}
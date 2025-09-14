import { useState } from "react";

import Button from "../components/Button";
import Card from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();
  return (
    <div className="">
      <Sidebar/>
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
          
        <div className="flex justify-end gap-4">
          <Button onClick={() => setModalOpen(true)} variant="primary" text="Add Content" startIcon={<PlusIcon/>}></Button>
          <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>} onClick={async () => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
              share:true
            },{
              headers:{
                Authorization:localStorage.getItem("token")
              }
            });
            const shareUrl = `${BACKEND_URL}/api/v1/brain/${response.data.hash}`;
            alert(shareUrl);
          }}></Button>
        </div>

        <div className="flex flex-wrap gap-4 mt-5 items-start">
          {contents.map(({type, link, title}) => <Card key={link} title={title} url={link}/>)}
        </div>
      </div>
    </div>
  );
}
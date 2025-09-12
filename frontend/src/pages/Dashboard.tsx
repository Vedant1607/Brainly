import { useState } from "react";

import Button from "../components/Button";
import Card from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="">
      <Sidebar/>
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
          
        <div className="flex justify-end gap-4">
          <Button onClick={() => setModalOpen(true)} variant="primary" text="Add Content" startIcon={<PlusIcon/>}></Button>
          <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}></Button>
        </div>

        <div className="flex gap-4 mt-5">
          <Card title="YouTube video player" url="https://www.youtube.com/embed/1ap0WN0FxxU?si=FgwNl5bPwa4jF8zQ"/>
          <Card title="X" url="https://x.com/Vedant_Sinha_/status/1959367068681191728"/>
        </div>
      </div>
    </div>
  );
}
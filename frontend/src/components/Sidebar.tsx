import { BrainIcon } from "../icons/BrainIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YouTubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <div className="h-screen bg-white border-r w-72 fixed top-0 left-0 pl-6">
      <div className="flex text-2xl pt-8 items-center">
        <div className="pr-2"><BrainIcon/></div>
        Brainly
      </div>
      <div className="pt-8 pl-4">
        <SidebarItem text="Twitter" icon={<TwitterIcon/>}/>
        <SidebarItem text="YouTube" icon={<YouTubeIcon/>}/>
      </div>
    </div>
  );
}

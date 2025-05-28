// components/Sidebar/SidebarProfile.jsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const SidebarProfile = ({ isOpen }) => (
  <div className="flex flex-col items-center mx-auto gap-4">
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        className="border-2 border-black rounded-full"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    {isOpen && (
      <div className="text-center">
        <h3 className="text-xl font-semibold">Utsab Adhikari</h3>
        <Badge variant="outline" className="bg-violet-600">Fullstack Developer</Badge>
      </div>
    )}
  </div>
);

export default SidebarProfile;

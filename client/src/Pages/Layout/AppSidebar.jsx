import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { IoDocumentTextOutline, IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { FaBlog } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { GoDot } from "react-icons/go";
import { FcAbout } from "react-icons/fc";
import { GrProjects } from "react-icons/gr";
import { RouteAdminSignin, RouteDocs, RouteIndex, RouteNews } from "@/helpers/RouteNames";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IoIosLogIn } from "react-icons/io";
import { FaRegNewspaper } from "react-icons/fa";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white transition-transform duration-300 ease-in-out">
        <SidebarHeader className="flex flex-row justify-between items-center">
          <Link to={RouteAdminSignin}>
            <Button variant="ghost" size="icon">
              <IoIosLogIn />
            </Button>
          </Link>
          <SidebarTrigger className="md:hidden" />
        </SidebarHeader>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="w-full flex flex-col justify-center items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1>Utsab Adhikari</h1>
            </SidebarMenuItem>
            <Link to={RouteIndex}>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <IoHomeOutline className="cursor-pointer" />
                  <p className="cursor-pointer w-full">Home</p>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FaBlog /> <Link>Blogs</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <GrProjects />
                <Link>Projects</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BiCategoryAlt /> <Link>Categories</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FiUsers />
                <Link>Users</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <GoDot />
                <Link>new cate</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <Link to={RouteNews}>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaRegNewspaper className="cursor-pointer" />
                  <p className="cursor-pointer w-full">Stay Updated</p>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <IoDocumentTextOutline />
                <Link to={RouteDocs}>Documentation</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

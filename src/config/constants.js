import { BiDuplicate } from "react-icons/bi"; 
import { BiImageAdd } from "react-icons/bi"; 
import { BiImage } from "react-icons/bi"; 
import { RxCardStackPlus } from "react-icons/rx"; 
import { CgMenuCake } from "react-icons/cg"; 
import { RiMenuAddFill } from "react-icons/ri"; 
import { MdRestaurantMenu } from "react-icons/md"; 
import { BiCategory } from "react-icons/bi"; 


export const SidebarMenusButton  = [
    {id: "1", path: "/Admin", icon: BiCategory, label: "Categories"},
    {id: "2", path: "/Admin/create-categories", icon: BiDuplicate, label: "Create Categories"},
    {id: "3", path: "/Admin/menus", icon: MdRestaurantMenu, label: "Menus"},
    {id: "4", path: "/Admin/create-menus", icon: RiMenuAddFill, label: "Create Menus"},
    {id: "5", path: "/Admin/subcategories", icon: CgMenuCake, label: "Subcategories"},
    {id: "6", path: "/Admin/create-subcategories", icon: RxCardStackPlus, label: "Create Subcategories"},
    {id: "7", path: "/Admin/images", icon: BiImage, label: "Images"},
    {id: "8", path: "/Admin/create-images", icon: BiImageAdd, label: "Create Images"}

]
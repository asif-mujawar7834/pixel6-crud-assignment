import { useEffect, useState } from "react";
import { FaAngleLeft, FaAppleAlt } from "react-icons/fa";
import { sidebarMenus } from "../constants";
import { Link, useLocation } from "react-router-dom";
import { useScreenSize } from "../hooks/useScreenSize";

export const Sidebar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const screenSize = useScreenSize();

  useEffect(() => {
    if (screenSize.width <= 800) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [screenSize.width <= 800]);

  return (
    <div
      className={`${
        open ? "w-20" : "w-full sm:w-72"
      } h-screen bg-[#ffffff] relative duration-300 p-5 border-r-2 border-r-gray-100`}
    >
      <button
        className={`absolute z-30 duration-300 -right-3 top-9 bg-[#081225] text-white rounded-full p-2 ${
          !open ? "rotate-0" : "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      >
        <FaAngleLeft />
      </button>
      <div className="flex gap-x-4 items-center text-black font-medium text-xl">
        <button className="border text-white p-2 rounded-md bg-red-500">
          <FaAppleAlt />
        </button>
        <h1
          className={`origin-left text-nowrap duration-300 ${
            open && "scale-0"
          }`}
        >
          Pixel Studio
        </h1>
      </div>
      <hr className="w-full h-0.5 bg-[#e2e7eb] my-8" />
      <ul className="flex flex-col gap-3">
        {sidebarMenus.map((menu) => (
          <Link to={menu.path} key={menu.id}>
            <li
              key={menu.id}
              className={`flex items-center gap-x-4 text-md cursor-pointer py-2 px-3 hover:bg-[#081225] hover:text-white rounded-md font-medium ${
                pathname === menu.path && "bg-[#081225] text-white"
              }`}
            >
              <button>{menu.icon}</button>

              <span
                className={`origin-left duration-300 text-nowrap ${
                  open && "scale-0"
                }`}
              >
                {menu.label}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

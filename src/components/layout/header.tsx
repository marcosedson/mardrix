"use client";

import React from "react";
import Link from "next/link";
import DarkModeSwitcher from "./dark-mode-switcher";
import { Search, Bell, MessageSquare, ChevronDown } from "lucide-react";

export const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-40 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none border-b border-stroke dark:border-strokedark">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-50 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-400"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <div className="font-bold text-xl text-primary">MARDRIX</div>
          </Link>
        </div>

        <div className="hidden sm:block">
          <form action="#" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <Search size={20} className="fill-body hover:fill-primary dark:fill-bodydark" />
              </button>

              <input
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <li className="relative">
                <Link
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                href="#"
                >
                <Bell size={18} />
                <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-meta-3 opacity-75"></span>
                </span>
                </Link>
            </li>
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Message Area --> */}
            <li className="relative">
                <Link
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                href="#"
                >
                <MessageSquare size={18} />
                <span className="absolute -top-0.5 right-0.5 z-1 h-2 w-2 rounded-full bg-meta-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-meta-3 opacity-75"></span>
                </span>
                </Link>
            </li>
            {/* <!-- Chat Message Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <div className="relative flex items-center gap-4">
              <span className="hidden text-right lg:block">
                <span className="block text-sm font-medium text-black dark:text-white">
                  Usuário Mardrix
                </span>
                <span className="block text-xs">Owner</span>
              </span>

              <span className="h-12 w-12 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
                <div className="font-bold text-primary">M</div>
              </span>
              <ChevronDown size={16} className="hidden sm:block" />
          </div>
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

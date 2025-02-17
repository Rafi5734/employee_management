import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import { Link } from "react-router-dom";

export default function NavbarMain() {
  return (
    <nav className="bg-white border border-[#dcdfe2] inter">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://www.brotecs.com/wp-content/uploads/2020/02/BroTecs-Logo_noSlogan.png"
            className="h-8"
            alt="Flowbite Logo"
          />
        </Link>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold inter">Signed in as</p>
              <p className="font-semibold inter">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings" className="inter">My Settings</DropdownItem>
            <DropdownItem key="team_settings" className="inter">Team Settings</DropdownItem>
            <DropdownItem key="analytics" className="inter">Analytics</DropdownItem>
            <DropdownItem key="system" className="inter">System</DropdownItem>
            <DropdownItem key="configurations" className="inter">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback" className="inter">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" className="inter">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
}

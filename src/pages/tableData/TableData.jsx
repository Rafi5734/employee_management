import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import AddIcon from "../../assets/icons/AddIcon";
import { Select, SelectItem } from "@heroui/react";
import { useDisclosure } from "@heroui/react";
import CreateEmployeeModal from "./createEmployeeModal/CreateEmployeeModal";
import { Tooltip } from "@heroui/tooltip";
import EditIcon from "../../assets/icons/EditIcon";
import DeleteIcon from "../../assets/icons/DeleteIcon";

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

export default function TableData() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [value, setValue] = React.useState(new Set([]));

  return (
    <div className="inter ps-4 pe-4">
      <p className="inter text-center font-bold text-3xl mt-10 mb-5 underline">
        Employee Data Management
      </p>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4 mb-5">
        <Input label="Search an employee" type="text" />
        <div></div>
        <div className="flex justify-end gap-3">
          <Tooltip content="Create an employee">
            <Button
              onPress={onOpen}
              size="lg"
              isIconOnly
              startContent={<AddIcon />}
              color="primary"
            ></Button>
          </Tooltip>

          <CreateEmployeeModal isOpen={isOpen} onOpenChange={onOpenChange} />

          <Select
            className="max-w-xs"
            label="Filter by status"
            size="sm"
            selectedKeys={value}
            variant="bordered"
            onSelectionChange={setValue}
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Profile Picture
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>

              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <Tooltip content="Edit" color="success">
                  <Button
                    onPress={onOpen}
                    size="sm"
                    isIconOnly
                    startContent={<EditIcon />}
                    color="success"
                    className="me-3"
                  ></Button>
                </Tooltip>
                <Tooltip content="Delete" color="danger">
                  <Button
                    onPress={onOpen}
                    size="sm"
                    isIconOnly
                    startContent={<DeleteIcon />}
                    color="danger"
                  ></Button>
                </Tooltip>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
export default function CreateEmployeeModal({ isOpen, onOpenChange }) {
  return (
    <div>
      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="outside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-3xl font-bold">
                Create an employee account
              </ModalHeader>
              <ModalBody>
                <form className="max-w-full">
                  <div className="mb-5">
                    <label
                      htmlFor="profile_pictire"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee profile picture
                    </label>
                    <input
                      type="text"
                      id="profile_pictire"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Profile picture image link"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter the employee name"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@email.com"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="phone_number"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee phone number
                    </label>
                    <input
                      type="text"
                      id="phone_number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter the employee phone number"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="deparment"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee department
                    </label>
                    <input
                      type="text"
                      id="department"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter the employee phone number"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee status
                    </label>
                    <Select
                      className="max-w-full"
                      label="Select a status"
                      size="sm"
                      // selectedKeys={value}
                      variant="bordered"
                      // onSelectionChange={setValue}
                    >
                      <SelectItem key="pending">Pending</SelectItem>
                    </Select>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee address
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write employee full address"
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button type="submit" color="primary">
                      Action
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

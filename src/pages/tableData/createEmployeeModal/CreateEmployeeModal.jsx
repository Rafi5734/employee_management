import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { useCreateEmployeeMutation } from "../../../slices/EmployeeSlice";
import Swal from "sweetalert2";
export default function CreateEmployeeModal({ isOpen, onOpenChange }) {
  const [employeeData, setEmployeeData] = useState({
    employeeName: "",
    employeeEmail: "",
    employeePhoneNumber: "",
    employeeStatus: "",
    employeeDepartment: "",
    employeeAddress: "",
    employeeProfilePicture: "",
    employeeCoverImage: "",
  });

  const [createEmployee, { isLoading: employeeCreateLoader }] =
    useCreateEmployeeMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createEmployee(employeeData);
      console.log(result.error?.data?.message);
      if (result?.data) {
        Swal.fire({
          title: "Success",
          text: "Employee Account Created!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: result.error?.data?.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      });
    }
    console.log("employeeData", employeeData);
  };
  return (
    <div>
      <Modal
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-3xl font-bold">
                Create an employee account
              </ModalHeader>
              <ModalBody>
                <form className="max-w-full" onSubmit={handleFormSubmit}>
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
                      name="employeeProfilePicture"
                      value={employeeData?.employeeProfilePicture}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Profile picture image link"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="employeeCoverImage"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee cover picture
                    </label>
                    <input
                      type="text"
                      id="employeeCoverImage"
                      name="employeeCoverImage"
                      value={employeeData?.employeeCoverImage}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Profile picture image link"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="employeeName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee name
                    </label>
                    <input
                      type="text"
                      id="employeeName"
                      name="employeeName"
                      value={employeeData?.employeeName}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter the employee name"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="employeeEmail"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee email
                    </label>
                    <input
                      type="employeeEmail"
                      id="email"
                      name="employeeEmail"
                      value={employeeData?.employeeEmail}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@email.com"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="employeePhoneNumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee phone number
                    </label>
                    <input
                      type="text"
                      id="employeePhoneNumber"
                      name="employeePhoneNumber"
                      value={employeeData?.employeePhoneNumber}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter the employee phone number"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="employeeDepartment"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee department
                    </label>
                    <input
                      type="text"
                      id="employeeDepartment"
                      name="employeeDepartment"
                      value={employeeData?.employeeDepartment}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter the employee phone number"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="employeeStatus"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee status
                    </label>
                    <Select
                      className="max-w-full"
                      label="Select a status"
                      size="sm"
                      name="employeeStatus"
                      value={employeeData?.employeeStatus}
                      variant="bordered"
                      onChange={handleInputChange}
                    >
                      <SelectItem key="Active">Active</SelectItem>
                      <SelectItem key="Inactive">Inactive</SelectItem>
                      <SelectItem key="Vacation">Vacation</SelectItem>
                    </Select>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="employeeAddress"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee address
                    </label>
                    <textarea
                      id="employeeAddress"
                      rows="4"
                      name="employeeAddress"
                      value={employeeData?.employeeAddress}
                      onChange={handleInputChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write employee full address"
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button type="submit" color="primary">
                      Create
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

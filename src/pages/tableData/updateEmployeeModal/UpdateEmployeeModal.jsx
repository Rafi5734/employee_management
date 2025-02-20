import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  useGetSingleEmployeeQuery,
  useUpdateEmployeeMutation,
} from "../../../slices/EmployeeSlice";
import Swal from "sweetalert2";

export const statusOptions = [
  { key: "Active", label: "Active" },
  { key: "Inactive", label: "Inactive" },
  { key: "Vacation", label: "Vacation" },
];

const initialFormState = {
  employeeName: "",
  employeeEmail: "",
  employeePhoneNumber: "",
  employeeStatus: "",
  employeeDepartment: "",
  employeeAddress: "",
  employeeProfilePicture: "",
  employeeCoverImage: "",
};

export default function UpdateEmployeeModal({
  employeeId,
  updateEmployeeOnOpenChange,
  updateEmployeeModalOpen,
}) {
  // API Hooks
  const { data: getAnEmployeeData } = useGetSingleEmployeeQuery(employeeId);
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  // State Management
  const [formData, setFormData] = useState(initialFormState);
  const [selectedStatus, setSelectedStatus] = useState(new Set());

  // Effects
  useEffect(() => {
    if (getAnEmployeeData?.employee) {
      const { employee } = getAnEmployeeData;
      setFormData({
        employeeName: employee.employeeName,
        employeeEmail: employee.employeeEmail,
        employeePhoneNumber: employee.employeePhoneNumber,
        employeeStatus: employee.employeeStatus,
        employeeDepartment: employee.employeeDepartment,
        employeeAddress: employee.employeeAddress,
        employeeProfilePicture: employee.employeeProfilePicture,
        employeeCoverImage: employee.employeeCoverImage,
      });
      setSelectedStatus(new Set([employee.employeeStatus]));
    }
  }, [getAnEmployeeData]);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (keys) => {
    setSelectedStatus(keys);
    setFormData((prev) => ({
      ...prev,
      employeeStatus: Array.from(keys).join(""),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateEmployee({ formData, employeeId });
      if (result?.data) {
        Swal.fire({
          title: "Success",
          text: "Employee Information Updated!",
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
    console.log("Submitting:", formData);
  };

  // Helper Components
  const renderInputField = (fieldConfig) => (
    <div className="mb-5">
      <label
        htmlFor={fieldConfig.id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {fieldConfig.label}
      </label>
      <input
        {...fieldConfig.inputProps}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleInputChange}
      />
    </div>
  );

  return (
    <Modal
      size="xl"
      isOpen={updateEmployeeModalOpen}
      onOpenChange={updateEmployeeOnOpenChange}
      scrollBehavior="outside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center text-3xl font-bold">
              Update Employee Information
            </ModalHeader>

            <ModalBody>
              <form className="max-w-full" onSubmit={handleSubmit}>
                {renderInputField({
                  id: "profile_pictire",
                  label: "Employee profile picture",
                  inputProps: {
                    type: "text",
                    name: "employeeProfilePicture",
                    value: formData.employeeProfilePicture,
                    placeholder: "Profile picture image link",
                    required: true,
                  },
                })}

                {renderInputField({
                  id: "employeeCoverImage",
                  label: "Employee cover picture",
                  inputProps: {
                    type: "text",
                    name: "employeeCoverImage",
                    value: formData.employeeCoverImage,
                    placeholder: "Cover image link",
                    required: true,
                  },
                })}

                {renderInputField({
                  id: "employeeName",
                  label: "Employee name",
                  inputProps: {
                    type: "text",
                    name: "employeeName",
                    value: formData.employeeName,
                    placeholder: "Enter the employee name",
                    required: true,
                  },
                })}

                {renderInputField({
                  id: "email",
                  label: "Employee email",
                  inputProps: {
                    type: "email",
                    name: "employeeEmail",
                    value: formData.employeeEmail,
                    placeholder: "name@email.com",
                    required: true,
                  },
                })}

                {renderInputField({
                  id: "employeePhoneNumber",
                  label: "Employee phone number",
                  inputProps: {
                    type: "text",
                    name: "employeePhoneNumber",
                    value: formData.employeePhoneNumber,
                    placeholder: "Enter phone number",
                    required: true,
                  },
                })}

                {renderInputField({
                  id: "employeeDepartment",
                  label: "Employee department",
                  inputProps: {
                    type: "text",
                    name: "employeeDepartment",
                    value: formData.employeeDepartment,
                    placeholder: "Enter department",
                    required: true,
                  },
                })}

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
                    selectedKeys={selectedStatus}
                    onSelectionChange={handleStatusChange}
                    variant="bordered"
                  >
                    {statusOptions.map((status) => (
                      <SelectItem key={status.key}>{status.label}</SelectItem>
                    ))}
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
                    value={formData.employeeAddress}
                    onChange={handleInputChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write employee full address"
                  />
                </div>

                <div className="flex flex-row justify-end gap-3 pb-4">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  {isLoading ? (
                    <Button isLoading color="primary">
                      Loading
                    </Button>
                  ) : (
                    <Button type="submit" color="primary">
                      Update
                    </Button>
                  )}
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

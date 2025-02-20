import React, { useState, useMemo, useEffect } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import AddIcon from "../../assets/icons/AddIcon";
import { Chip, Image, Select, SelectItem } from "@heroui/react";
import { useDisclosure } from "@heroui/react";
import CreateEmployeeModal from "./createEmployeeModal/CreateEmployeeModal";
import { Tooltip } from "@heroui/tooltip";
import EditIcon from "../../assets/icons/EditIcon";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import {
  useDeleteEmployeeMutation,
  useGetAllemployeeQuery,
} from "../../slices/EmployeeSlice";
import Loader from "../../utils/loader/Loader";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import UpdateEmployeeModal from "./updateEmployeeModal/UpdateEmployeeModal";

export const statusOptions = [
  { key: "All", label: "All" },
  { key: "Active", label: "Active" },
  { key: "Inactive", label: "Inactive" },
  { key: "Vacation", label: "Vacation" },
];

export default function TableData() {
  const [employeeId, setEmployeeId] = useState();
  //triggered for create employee modal.

  const {
    isOpen: createEmployeeModalOpen,
    onOpen: createEmployeeOnOpen,
    onOpenChange: createEmployeeOnOpenChange,
  } = useDisclosure();

  //triggered for update employee modal.
  const {
    isOpen: updateEmployeeModalOpen,
    onOpen: updateEmployeeOnOpen,
    onOpenChange: updateEmployeeOnOpenChange,
  } = useDisclosure();

  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const { data: getAllEmployeeData, isLoading: employeeDataLoader } =
    useGetAllemployeeQuery();
  const [deleteEmployee, { isLoading: deleteEmployeeLoader }] =
    useDeleteEmployeeMutation();

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = debounce((value) => {
      setDebouncedSearch(value);
    }, 500);

    handler(searchValue);
    return () => handler.cancel();
  }, [searchValue]);

  const filteredEmployees = useMemo(() => {
    if (!getAllEmployeeData?.employees) return [];

    return getAllEmployeeData.employees
      .filter((employee) => {
        const searchMatch =
          debouncedSearch === "" ||
          employee?.employeeName
            ?.toLowerCase()
            .includes(debouncedSearch.toLowerCase()) ||
          employee?.employeeEmail
            ?.toLowerCase()
            .includes(debouncedSearch.toLowerCase());

        const statusMatch =
          statusFilter === "All" || employee?.employeeStatus === statusFilter;

        return searchMatch && statusMatch;
      })
      .reverse();
  }, [getAllEmployeeData, debouncedSearch, statusFilter]);

  const handleDeleteEmployee = async (employeeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await deleteEmployee(employeeId);
          if (result?.data) {
            Swal.fire({
              title: "Deleted!",
              text: "Employee account has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: result.error?.data?.message || "Failed to delete employee.",
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Something went wrong. Try again.",
            icon: "error",
          });
        }
      }
    });
  };

  if (employeeDataLoader) return <Loader />;

  return (
    <div className="inter ps-4 pe-4">
      <p className="inter text-center font-bold text-3xl mt-5 mb-5 underline">
        Employee Data Management
      </p>

      {/* 🔍 Search & Filter */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4 mb-5 mt-10">
        <Input
          label="Search an employee"
          type="text"
          value={searchValue}
          size="sm"
          onValueChange={setSearchValue} // Updates the search term
        />
        <div></div>
        <div className="flex justify-end gap-3">
          <Tooltip content="Create an employee">
            <Button
              onPress={createEmployeeOnOpen}
              size="lg"
              isIconOnly
              startContent={<AddIcon />}
              color="primary"
            ></Button>
          </Tooltip>
          <CreateEmployeeModal
            createEmployeeModalOpen={createEmployeeModalOpen}
            createEmployeeOnOpenChange={createEmployeeOnOpenChange}
          />

          <Select
            className="max-w-xs"
            label="Filter by status"
            size="sm"
            selectedKeys={new Set([statusFilter])}
            variant="bordered"
            onSelectionChange={(keys) => setStatusFilter([...keys][0])}
          >
            {statusOptions.map((status) => (
              <SelectItem key={status.key}>{status.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Employee Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Profile Picture</th>
              <th className="px-6 py-3">Cover Picture</th>
              <th className="px-6 py-3">Employee Name</th>
              <th className="px-6 py-3">Phone Number</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr
                key={employee._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">
                  <Image
                    className="object-cover w-32 h-32"
                    src={
                      employee?.employeeProfilePicture || "default-image.jpg"
                    }
                    alt="Profile"
                  />
                </td>
                <td className="px-6 py-4">
                  <Image
                    className="object-cover w-32 h-32"
                    src={employee?.employeeCoverImage || "default-image.jpg"}
                    alt="Cover"
                  />
                </td>
                <td className="px-6 py-4">{employee?.employeeName}</td>
                <td className="px-6 py-4">{employee?.employeePhoneNumber}</td>
                <td className="px-6 py-4">{employee?.employeeEmail}</td>
                <td className="px-6 py-4">{employee?.employeeDepartment}</td>
                <td className="px-6 py-4">{employee?.employeeAddress}</td>
                <td className="px-6 py-4">
                  <Chip
                    color={
                      employee?.employeeStatus === "Active"
                        ? "success"
                        : employee?.employeeStatus === "Inactive"
                        ? "danger"
                        : "warning"
                    }
                  >
                    {employee?.employeeStatus}
                  </Chip>
                </td>
                <td className="px-1 py-1">
                  <Tooltip content="Edit" color="success">
                    <Button
                      size="sm"
                      onPress={updateEmployeeOnOpen}
                      isIconOnly
                      onClick={() => setEmployeeId(employee?._id)}
                      startContent={<EditIcon />}
                      color="success"
                    ></Button>
                  </Tooltip>
                  {deleteEmployeeLoader ? (
                    <Button isLoading color="primary">
                      Loading
                    </Button>
                  ) : (
                    <Tooltip content="Delete" color="danger">
                      <Button
                        onClick={() => handleDeleteEmployee(employee._id)}
                        size="sm"
                        isIconOnly
                        startContent={<DeleteIcon />}
                        color="danger"
                        className="ms-1"
                      ></Button>
                    </Tooltip>
                  )}
                </td>
              </tr>
            ))}
            <UpdateEmployeeModal
              employeeId={employeeId}
              updateEmployeeOnOpenChange={updateEmployeeOnOpenChange}
              updateEmployeeModalOpen={updateEmployeeModalOpen}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

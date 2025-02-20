import React, { useState, useMemo, useEffect } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import AddIcon from "../../assets/icons/AddIcon";
import { Chip, Image, Select, SelectItem, Pagination } from "@heroui/react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [employeeId, setEmployeeId] = useState();

  // Modal controls
  const {
    isOpen: createEmployeeModalOpen,
    onOpen: createEmployeeOnOpen,
    onOpenChange: createEmployeeOnOpenChange,
  } = useDisclosure();

  const {
    isOpen: updateEmployeeModalOpen,
    onOpen: updateEmployeeOnOpen,
    onOpenChange: updateEmployeeOnOpenChange,
  } = useDisclosure();

  // Search and filter states
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // API hooks
  const { data: getAllEmployeeData, isLoading: employeeDataLoader } =
    useGetAllemployeeQuery();
  const [deleteEmployee, { isLoading: deleteEmployeeLoader }] =
    useDeleteEmployeeMutation();

  // Debounce search input
  useEffect(() => {
    const handler = debounce((value) => {
      setDebouncedSearch(value);
      setCurrentPage(1); // Reset to first page on search change
    }, 500);

    handler(searchValue);
    return () => handler.cancel();
  }, [searchValue]);

  // Filter employees
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

  // Pagination calculations
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredEmployees.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, itemsPerPage]);

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

      {/* Search & Filter Section */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4 mb-5 mt-10">
        <Input
          label="Search an employee"
          type="text"
          value={searchValue}
          size="sm"
          onValueChange={setSearchValue}
        />

        <div className="flex justify-end gap-3 col-span-2">
          <Tooltip content="Create an employee">
            <Button
              onPress={createEmployeeOnOpen}
              size="lg"
              isIconOnly
              startContent={<AddIcon />}
              color="primary"
            />
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
            {currentItems.map((employee) => (
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
                    />
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
                      />
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

      {/* Pagination Controls */}
      <div className="flex flex-col justify-center items-center mt-10 mb-10 gap-5">
        <div className="flex items-center gap-3">
          <span className="text-small">Items per page:</span>
          <Select
            className="w-20"
            size="sm"
            selectedKeys={new Set([itemsPerPage.toString()])}
            onSelectionChange={(keys) => {
              setItemsPerPage(Number([...keys][0]));
            }}
          >
            {[1, 5, 10, 20, 50].map((size) => (
              <SelectItem key={size.toString()} value={size}>
                {size.toString()}
              </SelectItem>
            ))}
          </Select>
        </div>

        <Pagination
          color="secondary"
          page={currentPage}
          total={totalPages}
          onChange={setCurrentPage}
        />

        <div className="flex gap-2">
          <Button
            color="secondary"
            size="sm"
            variant="flat"
            onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            color="secondary"
            size="sm"
            variant="flat"
            onPress={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            isDisabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

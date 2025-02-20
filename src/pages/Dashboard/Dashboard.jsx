import { Button, Image } from "@heroui/react";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import LocationIcon from "../../assets/icons/LocationIcon";
import { useGetAllemployeeQuery } from "../../slices/EmployeeSlice";
import Loader from "../../utils/loader/Loader";

export default function Dashboard() {
  const { data: getAllEmployeeData, isLoading: employeeDataLoader } =
    useGetAllemployeeQuery();
  console.log("getAllEmployeeData", getAllEmployeeData?.employees);

  if (employeeDataLoader) {
    return <Loader />;
  }
  return (
    <div className="inter ps-4 pe-4">
      <p className="inter text-center font-bold text-3xl mt-10 underline">
        All Employee Profile
      </p>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-4">
        {getAllEmployeeData?.employees
          ?.slice()
          .reverse()
          .map((employee) => (
            <div className="w-full mx-4 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-12 bg-white shadow-xl rounded-lg text-gray-900 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
              <div className="rounded-t-lg h-32 overflow-hidden">
                <Image
                  className="object-cover object-top w-full z-30"
                  src={employee?.employeeCoverImage}
                  alt="Cover"
                />
              </div>
              <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <Image
                  className="object-cover w-full h-32 z-40"
                  src={employee?.employeeProfilePicture}
                  alt="Profile"
                />
              </div>
              <div className="text-center mt-2">
                <h2 className="font-semibold">{employee?.employeeName}</h2>
                <p className="text-gray-500">{employee?.employeeEmail}</p>
              </div>
              <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                <li className="flex flex-col items-center justify-center">
                  <PhoneIcon />
                  <div>{employee?.employeePhoneNumber}</div>
                </li>
                <li className="flex flex-col items-center justify-center">
                  <LocationIcon />
                  <div>{employee?.employeeAddress}</div>
                </li>
              </ul>
              <div className="p-4 border-t mx-8 mt-2 flex justify-center items-center">
                <Button color="primary">See Details</Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

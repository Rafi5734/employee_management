import { Button, Image } from "@heroui/react";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import LocationIcon from "../../assets/icons/LocationIcon";

export default function Dashboard() {
  return (
    <div className="inter ps-4 pe-4">
      <p className="inter text-center font-bold text-3xl mt-10 mb-5 underline">
        All Employee Profile
      </p>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-4">
        <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
          <div className="rounded-t-lg h-32 overflow-hidden">
            <Image
              className="object-cover object-top w-full z-30"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <Image
              className="object-cover object-center h-32 z-40"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Woman looking front"
            />
          </div>
          <div className="text-center mt-2">
            <h2 className="font-semibold">Sarah Smith</h2>
            <p className="text-gray-500">Freelance Web Designer</p>
          </div>
          <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
            <li className="flex flex-col items-center justify-center">
              <PhoneIcon />
              <div>+8801887830405</div>
            </li>
            <li className="flex flex-col items-center justify-center">
              <LocationIcon />
              <div>Uttara, sector:12</div>
            </li>
          </ul>
          <div className="p-4 border-t mx-8 mt-2 flex justify-center items-center">
            <Button color="primary">See Details</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

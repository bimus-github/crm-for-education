import { auth } from "../../lib/firebase/init";
import AppLayout from "src/components/shared/layout";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdHistory, MdNoteAlt } from "react-icons/md";
import { SiBitcoincash } from "react-icons/si";
import { Link } from "react-router-dom";
import { BsCalendar2Day } from "react-icons/bs";
import { FcStatistics } from "react-icons/fc";

const Home = () => {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <AppLayout>
      <div className=" w-full h-full flex flex-col p-5">
        <div className="flex flex-col items-center justify-center w-full h-full bg-white  shadow-md">
          <div className="flex items-center justify-around w-full h-full">
            <Link to={"/schedule"}>
              <div className="hover:bg-blue-200 w-[346px] h-[206px] border rounded-[5px] shadow-md flex flex-col items-center justify-center gap-2">
                <AiOutlineSchedule className=" w-[100px] h-[100px] text-blue-500" />
                <p className=" text-[24px] font-semibold font-mono">Schedule</p>
              </div>
            </Link>
            <Link to={"/notes"}>
              <div className="hover:bg-red-200 w-[346px] h-[206px] border rounded-[5px] shadow-md flex flex-col items-center justify-center gap-2">
                <MdNoteAlt className=" w-[100px] h-[100px] text-red-500" />
                <p className=" text-[24px] font-semibold font-mono">Notes</p>
              </div>
            </Link>
            <Link to={"/cash"}>
              <div className="hover:bg-green-200 w-[346px] h-[206px] border rounded-[5px] shadow-md flex flex-col items-center justify-center gap-2">
                <SiBitcoincash className=" w-[100px] h-[100px] text-green-500" />
                <p className=" text-[24px] font-semibold font-mono">Cash</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-around w-full h-full">
            <Link to={"/history"}>
              <div className="hover:bg-green-200 w-[346px] h-[206px] border rounded-[5px] shadow-md flex flex-col items-center justify-center gap-2">
                <MdHistory className=" w-[100px] h-[100px] text-green-500" />
                <p className=" text-[24px] font-semibold font-mono">History</p>
              </div>
            </Link>
            <Link to={"/statistics"}>
              <div className="hover:bg-green-200 w-[346px] h-[206px] border rounded-[5px] shadow-md flex flex-col items-center justify-center gap-2">
                <FcStatistics className=" w-[100px] h-[100px] text-green-500" />
                <p className=" text-[24px] font-semibold font-mono">
                  Statistics
                </p>
              </div>
            </Link>
            <div className="hover:bg-yellow-200 w-[346px] h-[206px] border rounded-[5px] shadow-md flex flex-col items-center justify-center gap-2">
              <BsCalendar2Day className=" w-[100px] h-[100px] text-yellow-600" />
              <p className=" text-[24px] font-semibold font-mono">Calendar</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;

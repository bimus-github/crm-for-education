import AppLayout from "src/components/shared/layout";
import ChartNumberOfStudents from "src/components/shared/charts/ChartNumberOfStudents";
import ChartofIncome from "src/components/shared/charts/ChartofIncome";
import ChartLineRealtimeNumberOfStudents from "src/components/shared/charts/ChartLineRealtimeNumberOfStudents";
import { MdDelete, MdRefresh } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { CASE, ChartLine, ROLE } from "src/models";
import { createChart, deleteChart } from "src/lib/firebase/services/chart";
import { async } from "@firebase/util";
import { ChartAction } from "src/store/features/chart";
import { ChartsSliceActions } from "src/store/features/charts";
import toast from "react-hot-toast";

function Statistics() {
  const dispatch = useAppDispatch();

  const schoolSlice = useAppSelector((s) => s.schoolSlice);

  const groupsSlice = useAppSelector((g) => g.groupsSlice);

  const usersSlices = useAppSelector((u) => u.usersSlice);

  const ChartSilices = useAppSelector((ch) => ch.chartsSlice);

  const school = Object.values(schoolSlice);

  const teachers = Object.values(usersSlices).filter(
    (teacher) => teacher.case === CASE.existent && teacher.role === ROLE.TEACHER
  );

  const students = Object.values(usersSlices).filter(
    (student) => student.case === CASE.existent && student.role === ROLE.STUDENT
  );

  let chartDatas = Object.values(ChartSilices);

  console.log(
    chartDatas.sort((a, b) => {
      return a.date - b.date;
    })[0]
  );

  const onRefresh = async () => {
    if (
      Date.now() -
        chartDatas.sort((a, b) => {
          return -a?.date + b?.date;
        })[0]?.date <
        86400000 / 2 &&
      String(students.length) ===
        chartDatas.sort((a, b) => {
          return -a?.date + b?.date;
        })[0]?.numberOfStudents
    ) {
      return toast.error("You can be updated every 12 hours, please wait!");
    }

    const data: ChartLine = {
      id: "",
      date: Date.now(),
      numberOfStudents: String(students.length),
      school: teachers[0].school,
    };
    try {
      const chartId = await createChart(data);
      dispatch(ChartAction.setChart({ ...data, id: chartId }));
      dispatch(ChartsSliceActions.addChart({ ...data, id: chartId }));
      toast.success("Success!");
    } catch (error) {
      console.log(error);
      toast.error("Error!");
    }
  };

  const onDeleteChart = () => {
    try {
      for (let i = 0; i < chartDatas.length; i++) {
        deleteChart(chartDatas[i]);
        dispatch(ChartsSliceActions.deleteChart(chartDatas[i]));
        toast.success("Success!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error!");
    }
  };

  return (
    <AppLayout>
      <div className="w-full h-full p-7">
        <div className="w-full h-full bg-white p-4 flex flex-col items-center justify-start gap-10 overflow-auto">
          <div className="w-[800px] min-h-[400px] flex flex-col items-center justify-start m-4">
            <div className=" w-full flex items-center justify-around ">
              <p className="text-xl text-black font-semibold font-serif">
                Chart Line Number Of Students to time
              </p>
              <MdRefresh
                size={24}
                className="hover:h-[30px] hover:w-[30px] hover:text-app-secondary-lighter"
                onClick={onRefresh}
              />
              <MdDelete
                onClick={onDeleteChart}
                size={24}
                className="hover:h-[30px] hover:w-[30px] hover:text-red-500"
              />
            </div>
            <ChartLineRealtimeNumberOfStudents />
          </div>
          <div className="w-[800px] min-h-[400px] flex flex-col items-center justify-start m-4">
            <p className="text-xl text-black font-semibold font-serif">
              Chart Number of Students to Teacher Name
            </p>
            <ChartNumberOfStudents />
          </div>
          <div className="w-[800px] min-h-[400px] flex flex-col items-center justify-start m-4">
            <p className="text-xl text-black font-semibold font-serif">
              Chart Income to Teacher Name
            </p>
            <ChartofIncome />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Statistics;

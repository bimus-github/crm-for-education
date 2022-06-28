import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CASE, ROLE } from "src/models";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

function ChartNumberOfStudents() {
  const dispatch = useAppDispatch();

  const schoolSlice = useAppSelector((s) => s.schoolSlice);

  const groupsSlice = useAppSelector((g) => g.groupsSlice);

  const usersSlices = useAppSelector((u) => u.usersSlice);

  const teachers = Object.values(usersSlices).filter(
    (teacher) => teacher.case === CASE.existent && teacher.role === ROLE.TEACHER
  );

  const students = Object.values(usersSlices).filter(
    (student) => student.case === CASE.existent && student.role === ROLE.STUDENT
  );

  const allStudents = Object.values(usersSlices).filter(
    (student) => student.role === ROLE.STUDENT
  );

  let data = [
    {
      name: "all",
      existent: students.length,
      nonexistent: allStudents.length - students.length,
    },
  ];

  for (let i = 0; i < teachers.length; i++) {
    data = [
      ...data,
      {
        name: teachers[i].firstName,
        existent: students.filter(
          (student) => student.teacher === teachers[i].id
        ).length,
        nonexistent:
          allStudents.filter((student) => student.teacher === teachers[i].id)
            .length -
          students.filter((student) => student.teacher === teachers[i].id)
            .length,
      },
    ];
  }
  return (
    <ResponsiveContainer className="w-full h-full">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="existent" fill="green" />
        <Bar dataKey="nonexistent" fill="red" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ChartNumberOfStudents;

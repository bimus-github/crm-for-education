import moment from "moment";
import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { CASE, ROLE } from "src/models";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

const data1 = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function ChartLineRealtimeNumberOfStudents() {
  const dispatch = useAppDispatch();

  const schoolSlice = useAppSelector((s) => s.schoolSlice);

  const groupsSlice = useAppSelector((g) => g.groupsSlice);

  const usersSlices = useAppSelector((u) => u.usersSlice);

  const ChartSilices = useAppSelector((ch) => ch.chartsSlice);

  const teachers = Object.values(usersSlices).filter(
    (teacher) => teacher.case === CASE.existent && teacher.role === ROLE.TEACHER
  );

  const students = Object.values(usersSlices).filter(
    (student) => student.case === CASE.existent && student.role === ROLE.STUDENT
  );

  const chartDatas = Object.values(ChartSilices);

  let datas = [{ date: "0", numberOfStudents: "0" }];

  for (let i = 0; i < chartDatas.length; i++) {
    datas = [
      ...datas,
      {
        date: moment(Number(chartDatas[i].date)).format("LLL"),
        numberOfStudents: chartDatas[i].numberOfStudents,
      },
    ];
  }

  datas.sort((a, b) => {
    return -Number(a.date) + Number(b.date);
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={200}
        data={datas}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="numberOfStudents"
          stroke="#0a1efc"
          fill="#397cb3"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default ChartLineRealtimeNumberOfStudents;

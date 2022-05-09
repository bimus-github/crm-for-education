import React from "react";
import { Link, matchRoutes, useLocation } from "react-router-dom";
import { ImRadioChecked, ImRadioUnchecked } from "react-icons/im";

const routes = [
  { path: "./createTeacher/*", title: "Teacher" },
  { path: "./createGroup/*", title: "Group" },
  { path: "./createStudent/*", title: "Students" },
];

const useCurrentPath = () => {
  const location = useLocation();
  const routeList = matchRoutes(routes, location);

  if (routeList?.length) {
    const route = routeList[0] && routeList[0].route;
    const route2 = routeList[1] && routeList[1].route;
    console.log(route2);
    return route.path;
  }
};

interface Props {
  children: JSX.Element;
}

const AppCreateLayout = ({ children }: Props) => {
  const currentPath = useCurrentPath();
  console.log(currentPath);
  return (
    <div className=" w-full h-full  flex  shadow-md bg-app-background ">
      <nav className=" w-[200px] p-2 h-full bg-white">
        <ul className="flex flex-col gap-2  ">
          {routes.map((route, idx) => {
            const classes = currentPath === route.path ? " font-bold" : "";
            return (
              <li
                key={idx.toString()}
                className="flex items-center justify-start gap-1"
              >
                {currentPath === route.path ? (
                  <ImRadioChecked size={18} />
                ) : (
                  <ImRadioUnchecked size={18} />
                )}
                <Link to={route.path}>
                  <p className={`${classes}`}>{route.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {children}
    </div>
  );
};

export default AppCreateLayout;

import React from "react";
import { Link, matchRoutes, useLocation } from "react-router-dom";

const routes = [
  { path: "/", title: "Home" },
  { path: "/teachers/*", title: "Teachers" },
  { path: "/groups/*", title: "Groups" },
  { path: "/students/*", title: "Students" },
];

const useCurrentPath = () => {
  const location = useLocation();
  const routeList = matchRoutes(routes, location);

  if (routeList?.length) {
    const route = routeList[0] && routeList[0].route;

    return route.path;
  }
};

interface Props {
  children: JSX.Element;
}

const AppLayout = ({ children }: Props) => {
  const currentPath = useCurrentPath();
  console.log(currentPath);
  return (
    <div className="min-h-screen w-screen bg-app-background">
      <div className="flex justify-between items-center px-16 py-5 bg-app-primary shadow-md">
        <div>Logo</div>

        <nav>
          <ul className="flex items-center space-x-5">
            {routes.map((route, idx) => {
              const classes =
                currentPath === route.path ? "text-white font-bold" : "";

              return (
                <li key={idx.toString()}>
                  <Link to={route.path}>
                    <p className={`${classes}`}>{route.title}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {children}
    </div>
  );
};

export default AppLayout;

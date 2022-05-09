import React from 'react';
import { Link, matchRoutes, useLocation } from 'react-router-dom';
import { ImRadioChecked, ImRadioUnchecked } from 'react-icons/im';

const routes = [
  { path: '/create/teacher', title: 'Teacher' },
  { path: '/create/group', title: 'Group' },
  { path: '/create/student', title: 'Students' },
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

const AppCreateLayout = ({ children }: Props) => {
  const currentPath = useCurrentPath();

  return (
    <div className='w-full h-full flex'>
      <nav className='w-[200px] p-2 bg-white shadow-md py-5 h-full'>
        <ul className='space-y-2'>
          {routes.map((route, idx) => {
            const classes =
              currentPath === route.path ? ' font-bold text-app-secondary' : '';
            return (
              <li
                key={idx.toString()}
                className='flex items-center justify-start gap-1 mb-2'
              >
                {currentPath === route.path ? (
                  <div className='w-[20px] h-[20px] flex justify-center items-center shadow-md rounded-[99px] border-2 border-app-secondary'>
                    <div className='w-[12px] h-[12px] rounded-[99px] bg-app-secondary'></div>
                  </div>
                ) : (
                  <div className='w-[20px] h-[20px] flex justify-center items-center shadow-md rounded-[99px] border-2 border-app-secondary'></div>
                )}
                <Link to={route.path}>
                  <p className={`${classes}`}>{route.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className='p-5 w-full h-full'>{children}</div>
    </div>
  );
};

export default AppCreateLayout;

import { Link, useLocation } from 'react-router-dom';

const routes = [
  { path: '/', title: 'Home' },
  { path: '/teachers', title: 'Teachers' },
  { path: '/groups', title: 'Groups' },
  { path: '/students', title: 'Students' },
  {
    path: '/create/teacher',
    title: 'Create',
    subPaths: ['/create/teacher', '/create/student', '/create/group'],
  },
];

interface Props {
  children: JSX.Element;
}

const AppLayout = ({ children }: Props) => {
  const location = useLocation();

  return (
    <div className='min-h-screen bg-app-background'>
      <div className='flex absolute justify-between items-center px-16 h-[70px] w-full bg-app-primary shadow-md'>
        <div>Logo</div>

        <nav>
          <ul className='flex items-center space-x-5'>
            {routes.map((route, idx) => {
              const classes =
                location.pathname === route.path ||
                route.subPaths?.includes(location.pathname)
                  ? 'text-white font-bold'
                  : '';

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

      <div className='h-screen pt-[70px]'>{children}</div>
    </div>
  );
};

export default AppLayout;

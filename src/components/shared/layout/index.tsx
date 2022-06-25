import { Link, useLocation } from "react-router-dom";
import { auth } from "src/lib/firebase/init";

const routes = [
  {
    path: "/",
    title: "Home",
    subPaths: [
      "/schedule",
      "/",
      "/calendar",
      "/cash",
      "/history",
      "/notes",
      "/statistics",
    ],
  },
  { path: "/teachers", title: "Teachers" },
  { path: "/groups", title: "Groups" },
  { path: "/students", title: "Students" },
  {
    path: "/create/teacher",
    title: "Create",
    subPaths: ["/create/teacher", "/create/student", "/create/group"],
  },
];

interface Props {
  children: JSX.Element;
}

const AppLayout = ({ children }: Props) => {
  const location = useLocation();

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className="min-h-screen bg-app-background">
      <div className="flex absolute justify-between items-center pr-16 pl-8 h-[70px] w-full bg-app-primary shadow-md">
        <div className=" flex gap-10">
          <div
            className="hover:text-red-500 hover:font-serif hover:relative"
            onClick={handleSignOut}
          >
            SingOut
          </div>
          <div>Logo</div>
        </div>

        <nav>
          <ul className="flex items-center space-x-10">
            {routes.map((route, idx) => {
              const classes =
                location.pathname === route.path ||
                route.subPaths?.includes(location.pathname)
                  ? "text-white font-bold"
                  : "";

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

      <div className="h-screen pt-[70px]">{children}</div>
    </div>
  );
};

export default AppLayout;

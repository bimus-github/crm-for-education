import Home from "./pages/home";

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/onboarding/Login";
import SignUp from "./pages/onboarding/SignUp";
import TeachersPage from "./pages/teachers";
import StudentsPage from "./pages/students";
import GroupsPage from "./pages/groups";
import CreateTeacher from "./components/CreateContanier/CreateTeacher";
import CreateGroup from "./components/CreateContanier/CreateGroup";
import CreateStudent from "./components/CreateContanier/CreateStudent";
import { Loader } from "./components/shared/loader";
import { useAppDispatch } from "./store/hooks";
import { useEffect, useState } from "react";
import { getAllUsers, getCurrentUser } from "./lib/firebase/services/user";
import { auth } from "./lib/firebase/init";
import { getSchool } from "./lib/firebase/services/school";
import { UserActions } from "./store/features/user";
import { UserSliceActions } from "./store/features/users";
import { SchoolSliceActions } from "./store/features/school";
import { User } from "firebase/auth";
import { getAllGroups } from "./lib/firebase/services/group";
import { GroupsSliceActions } from "./store/features/groups";
import Calendar from "./pages/calendar";
import Cash from "./pages/cash";
import HistoryStudents from "./pages/history/students";
import Notes from "./pages/notes";
import Schedule from "./pages/schedule";
import { NotesSliceActions } from "./store/features/messages";
import { getAllNotes } from "./lib/firebase/services/message";

function App() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);

    try {
      const unlisten = auth.onAuthStateChanged(async (authUser) => {
        if (authUser && authUser?.email) {
          setLoading(false);

          const userDoc = await getCurrentUser(authUser.email as string);
          const school = await getSchool(authUser.email);
          const users = await getAllUsers(school.id);
          const groups = await getAllGroups(school.id);
          const notes = await getAllNotes(school.id);

          console.log(notes);

          if (userDoc) {
            dispatch(UserActions.setUser(userDoc));
          }

          dispatch(SchoolSliceActions.setSchool(school));
          dispatch(UserSliceActions.addMultipleUsers(users));
          dispatch(GroupsSliceActions.addMultipleGroups(groups));
          dispatch(NotesSliceActions.addMultipleNotes(notes));

          setUser(null);
          return setUser(authUser);
        }

        // authUser ? setAuthUser(authUser) : setAuthUser(null);
        setLoading(false);
        return () => unlisten();
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {user ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/cash" element={<Cash />} />
          <Route path="/historyStudents" element={<HistoryStudents />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/create/teacher" element={<CreateTeacher />} />
          <Route path="/create/student" element={<CreateStudent />} />
          <Route path="/create/group" element={<CreateGroup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;

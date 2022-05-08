import Home from './pages/home';

import { Routes, Route, Navigate } from 'react-router-dom';
import useFirebaseAuthentication from './lib/hooks/useFirebaseAuthentication ';
import Login from './pages/onboarding/Login';
import SignUp from './pages/onboarding/SignUp';
import TeachersPage from './pages/teachers';
import StudentsPage from './pages/students';

function App() {
  const authUser = useFirebaseAuthentication();

  return (
    <>
      {authUser ? (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/teachers' element={<TeachersPage />} />
          <Route path='/students' element={<StudentsPage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
        </Routes>
      )}
    </>
  );
}

export default App;

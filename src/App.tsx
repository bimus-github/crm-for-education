import Home from './pages/home';

import { Routes, Route } from 'react-router-dom';
import useFirebaseAuthentication from './lib/hooks/useFirebaseAuthentication ';
import Login from './pages/onboarding/Login';
import SignUp from './pages/onboarding/SignUp';

function App() {
  const authUser = useFirebaseAuthentication();

  return (
    <div className='App'>
      <h1>Welcome to React Router!</h1>
      {authUser ? (
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

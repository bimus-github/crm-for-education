import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { auth } from '../../lib/firebase/init';
import AppLayout from 'src/components/shared/layout';

const Home = () => {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <AppLayout>
      <div>
        <p>Home</p>
        <Button variant='contained' color='error' onClick={handleSignOut}>
          Log Out
        </Button>
      </div>
    </AppLayout>
  );
};

export default Home;

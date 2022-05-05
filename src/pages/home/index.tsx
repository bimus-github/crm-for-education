import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { auth } from '../../lib/firebase/init';

const Home = () => {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <Container>
      <p>Home</p>
      <Button variant='contained' color='error' onClick={handleSignOut}>
        Log Out
      </Button>
    </Container>
  );
};

export default Home;

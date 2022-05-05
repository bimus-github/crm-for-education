import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../lib/firebase/init';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUpPress = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const handleLoginPress = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <Container>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id='email'
        label='Email'
        variant='outlined'
      />
      <TextField
        type={'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id='password'
        label='Password'
        variant='outlined'
      />

      <Stack spacing={2} width={200} marginY={5} direction='column'>
        <Button variant='contained' onClick={handleLoginPress}>
          Login
        </Button>
        <Link to='/signUp'>
          <Button variant='contained' onClick={handleSignUpPress}>
            Sing Up
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default Login;

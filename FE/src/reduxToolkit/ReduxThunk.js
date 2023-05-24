import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
export const signUp = createAsyncThunk('auth/signUp', async params => {
  const response = await axios.post(
    'http://192.168.1.11:3000/api/v1/auth/register',
    {
      email: params.email,
      password: params.password,
      name: params.phone,
      phone: params.phone,
    },
  );
  // .then(function (response) {
  //   const json = response.json();
  //   return json;
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
  const json = response.json();
  return json;
});

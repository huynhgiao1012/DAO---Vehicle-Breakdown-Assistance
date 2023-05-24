import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
// export const getProduct = createAsyncThunk('product/getProduct', async () => {
//   const response = await fetch('http://svcy3.myclass.vn/api/Product');
//   const json = response.json();
//   return json;
// });

// export const searchByCategory = createAsyncThunk(
//   'product/getProductByCategory',
//   async params => {
//     const response = await fetch(
//       `http://svcy3.myclass.vn/api/Product/getProductByCategory?categoryId=${params}`,
//     );
//     const json = response.json();
//     return json;
//   },
// );

export const signUp = createAsyncThunk('auth/signUp', async params => {
  // const response = await fetch('http://localhost:3000/api/v1/auth/register', {
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   credentials: 'same-origin',
  //   body: JSON.stringify({
  //     email: params.email,
  //     password: params.password,
  //     name: params.name,
  //     phone: params.phone,
  //   }),
  // });

  const body = JSON.stringify({
    email: params.email,
    password: params.password,
    name: params.name,
    phone: params.phone,
  });
  axios
    .post('http://localhost:3000/api/v1/auth/register', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      let json = response.json();
      console.log(json);
    })
    .catch(function (error) {
      console.log(error);
    });
  // return json;
});

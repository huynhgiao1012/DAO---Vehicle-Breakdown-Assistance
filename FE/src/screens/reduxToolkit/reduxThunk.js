import {createAsyncThunk} from '@reduxjs/toolkit';
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
  const response = await fetch(
    'http://localhost:3000/api/v1/auth/register',
    params,
  );
  const json = response.json();
  console.log(json);
  // return json;
});

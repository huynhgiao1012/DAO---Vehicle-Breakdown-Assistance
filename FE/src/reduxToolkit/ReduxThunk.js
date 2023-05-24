import {createAsyncThunk} from '@reduxjs/toolkit';
export const getProduct = createAsyncThunk('product/getProduct', async () => {
  const response = await fetch('http://svcy3.myclass.vn/api/Product');
  const json = response.json();
  return json;
});

export const searchByCategory = createAsyncThunk(
  'product/getProductByCategory',
  async params => {
    const response = await fetch(
      `http://svcy3.myclass.vn/api/Product/getProductByCategory?categoryId=${params}`,
    );
    const json = response.json();
    return json;
  },
);

export const signUp = createAsyncThunk('auth/signUp', async params => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/auth/register', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const json = response.json();
    console.log('Success:', json);
  } catch (error) {
    console.error('Error:', error);
  }
});

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const usersAPI = "http://localhost:9001/users";

export const getData = createAsyncThunk(
  "login/getData",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(usersAPI);
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const sendData = createAsyncThunk(
  "login/sendData",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(usersAPI, {
        method: "POST",
        body: JSON.stringify(userData), // the we we want to send
        headers: {
          "content-type": "application/json; charset=?UTF-8", // content type and
        },
      });
      const data = await res.json();
      return data;
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: { authState: "login", isLoggedIn: false, userData: null }, // try to make sure the login dont repeat
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state, action) => {
      state.isLoggedIn = false;
      state.userData = null;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.userData = null;
    });
    builder.addCase(sendData.pending, (state, action) => {
      state.isLoggedIn = false;
      state.userData = null;
    });
    builder.addCase(sendData.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    });
    builder.addCase(sendData.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.userData = null;
      return state; // Add this line to return the updated state
    });
  },
  reducers: {
    setAuthState: (state, action) => {
      state.authState = action.payload;
    },
  },
});

export const { setAuthState } = loginSlice.actions;

export default loginSlice.reducer;

/////////// login state
// user insert data
// assign the data to variable and get the data from API
// compair the inserted data and API data
// if data found in  API => login
// if data not found in  API => return msg

/////////// signin state ==> crreate new account
// user insert data
// assign the data to variable and get the data from API
// compair the inserted data and API data
// if data found in  API => login
// if data not found in  API => create new user and login

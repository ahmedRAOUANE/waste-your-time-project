import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const usersAPI = "http://localhost";

const getData = createAsyncThunk("login/getData", async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const res = await fetch(usersAPI);
        const data = await res.json();
        return data;
    } catch (err) {
        return rejectWithValue(err)
    }
})

const loginSlice = createSlice({
    name: 'login',
    initialState: {isLoggedIn: false, userData: null},
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state, action) => {
            state.isLoggedIn = false;
            state.userData = null;
        })
        builder.addCase(getData.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload;
        })
        builder.addCase(getData.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.userData = null;
        })
    }
})

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



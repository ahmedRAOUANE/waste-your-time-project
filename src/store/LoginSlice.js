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

export const compareData = (localData, serverData) => {
  const localDataObject = JSON.parse(JSON.stringify(localData));

  if (!serverData || !localDataObject) return false;
  const userExists = serverData.some(user => (
      user.userName === localDataObject.userName &&
      user.password === localDataObject.password &&
      user.number === localDataObject.number
    )
  );

  const userData = serverData.filter(user => (
      user.userName === localDataObject.userName &&
      user.password === localDataObject.password &&
      user.number === localDataObject.number
      )
  )

  return {userExists, userData};
} 

const loginSlice = createSlice({
  name: "login",
  initialState: {
    authState: "login",
    isLoggedIn: false,
    localData: null,
    serverData: null,
    userExists: false,
    userData: null, 
    notFound: false,
  }, // *try to make sure the login dont repeat
  reducers: {
    setAuthState: (state, action) => {
      state.authState = action.payload;
    },
    getUserData: (state, action) => {
      state.localData = action.payload;
    },
    setUserExists: (state, action) => {
      state.userExists = action.payload;
    },
    // loginErrore: (state, action) => {
    //   state.rejetced = 
    // }
  },
  extraReducers: (builder) => {
    // get data
    builder.addCase(getData.pending, (state, action) => {
      //state.isLoggedIn = false;
      state.serverData = null;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.serverData = action.payload;
      
      const user = compareData(state.localData, state.serverData);
      state.userExists = user.userExists;
      if (state.userExists) {
        state.userData = user.userData;
        state.isLoggedIn = true;
        state.serverData = null;
      }
    });
    builder.addCase(getData.rejected, (state, action) => {
      // state.isLoggedIn = false;
      state.serverData = null;
    });

    // send data
    builder.addCase(sendData.pending, (state, action) => {
      state.isLoggedIn = false;
      state.serverData = null;
    });
    builder.addCase(sendData.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.serverData = action.payload;
    });
    builder.addCase(sendData.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.serverData = null;
      return state; // Add this line to return the updated state
    });
  },
});

export const { setAuthState, getUserData } = loginSlice.actions;

export default loginSlice.reducer;

//todo: 
// send request form local to the api
// localData is an object containes the name, number, password => stores in local storage
// when pending the localData is empty
// when fullfiled the userData containes the api data -> for the futur we need to send the localData to server
// make compare between localData and serverData -> if true login else return a msg
// when rejected returnes a message 

//? login state
// the user inserts local data and assign it to localData state as object
// send the request..
// when pending serverData is null 
// when seccess serverData containes array of objects 
//                                                    -> loop on the array and make compare between localData and serverData
//                                                    -> if true
//                                                    -> ? isLoggedin = true, create userData state the data and fetch
//                                                    -> : isLoggedin = false, and return a msg
// when rejected return a msg

//? signun state ==> crreate new account
// user inserts  localData as an object
// send request to the server
// update the api data by add the localData with some new data
// change the isLoggedin state to true


//? other ideas...
//? signun state ==> crreate new account
// user inserts  localData as an object
// send request to the server
// when pending serverData is null
// when fullfiled serverData is an array of objects -> push the localData to the serverData and add some new data
//                                                  -> update the api and login


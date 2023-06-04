import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/auth/login', params)
        return response.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/auth/registration', params)
        return response.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/api/auth/me')
    return data
})

export const fetchUpdateMe = createAsyncThunk('auth/fetchUpdateMe', async (params, { rejectWithValue }) => {
    try {
        const response = await axios.patch('/api/auth/update', params)
        return response.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const fetchUpdateCar = createAsyncThunk('auth/fetchUpdateCar', async (params, { rejectWithValue }) => {
    try {
        const response = await axios.patch('/api/auth/update-car', params)
        return response.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})


export const fetchGetAllCars = createAsyncThunk(
    "auth/fetchGetAllCars",
    async () => {
        const { data } = await axios.get("/api/auth/all-car");
        return data;
    }
);

export const fetchGetOneCars = createAsyncThunk(
    "auth/fetchGetOneCars",
    async () => {
        const { data } = await axios.get("/api/auth/one-car");
        return data;
    }
);

export const fetchGetAllComments = createAsyncThunk("auth/fetchGetAllComments",
  async () => {
    const { data } = await axios.get("/api/order/all-comments");
    return data;
  }
);


const initialState = {
    comment: {
        items: [],
        status: "loading",
        error: "",
      },
    cars: {
        items: [],
        data: null,
        status: "loading",
        error: "",
    },
    data: null,
    status: 'loading',
    error: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            state.status = 'loaded'
        }
    },
    extraReducers: {

        [fetchGetAllComments.pending]: (state) => {
            state.comment.items = [];
            state.comment.status = "loading";
            state.comment.error = "";
          },
          [fetchGetAllComments.fulfilled]: (state, action) => {
            state.comment.status = "loaded";
            state.comment.items = action.payload;
          },
          [fetchGetAllComments.rejected]: (state, action) => {
            state.comment.items = [];
            state.comment.status = "error";
            state.comment.error = action.payload;
          },
      
        [fetchGetAllCars.pending]: (state) => {
            state.cars.items = [];
            state.cars.status = "loading";
            state.cars.error = "";
        },
        [fetchGetAllCars.fulfilled]: (state, action) => {
            state.cars.status = "loaded";
            state.cars.items = action.payload;
        },
        [fetchGetAllCars.rejected]: (state, action) => {
            state.cars.items = [];
            state.cars.status = "error";
            state.cars.error = action.payload;
        },

        [fetchGetOneCars.pending]: (state) => {
            state.cars.data = null;
            state.cars.status = "loading";
            state.cars.error = "";
        },
        [fetchGetOneCars.fulfilled]: (state, action) => {
            state.cars.status = "loaded";
            state.cars.data = action.payload;
        },
        [fetchGetOneCars.rejected]: (state, action) => {
            state.cars.data = null;
            state.cars.status = "error";
            state.cars.error = action.payload;
        },


        [fetchAuth.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuth.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },

        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },

        [fetchRegister.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload

        },
        [fetchRegister.rejected]: (state, action) => {

            state.status = 'error'
            state.error = action.payload
        },

        [fetchUpdateMe.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchUpdateMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchUpdateMe.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        }
    }
})

export const selectIsAuth = (state) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
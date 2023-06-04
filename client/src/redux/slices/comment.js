import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchCreateComment = createAsyncThunk(
    "news/fetchCreateComment",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/comment/", params);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchGetAllComments = createAsyncThunk("comment/fetchGetAllComments",
    async () => {
        const { data } = await axios.get("/api/comment/");
        return data;
    }
);

const initialState = {
    data: null,
    items: [],
    status: "loading",
    error: "",

};

const commentSlice = createSlice({

    name: "comment",
    initialState,
    reducers: {},
    extraReducers: {

        [fetchGetAllComments.pending]: (state) => {
            state.status = "loading";
            state.error = "";
        },
        [fetchGetAllComments.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.items = action.payload;
        },
        [fetchGetAllComments.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },

    }
});

export const commentReducer = commentSlice.reducer;
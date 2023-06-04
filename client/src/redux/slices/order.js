import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchCreateOrder = createAsyncThunk(
  "news/fetchCreateOrder",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/order", params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCreateComment = createAsyncThunk(
  "news/fetchCreateComment",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/order/comment", params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetAllOrders = createAsyncThunk(
  "news/fetchGetAllOrders",
  async () => {
    const { data } = await axios.get("/api/order/all");
    return data;
  }
);

export const fetchGetAllComments = createAsyncThunk("orders/fetchGetAllComments",
  async () => {
    const { data } = await axios.get("/api/order/all-comments");
    return data;
  }
);


export const fetchGetOneOrder = createAsyncThunk(
  "news/fetchGetOneOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/order/${id}`);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUpdateOrder = createAsyncThunk(
  "news/fetchUpdateOrder",
  async (params, { rejectWithValue }) => {
    try {
      console.log('id', params, 'params')
      const response = await axios.patch(`/api/order/`, params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSelectOtherDriver = createAsyncThunk(
  "news/fetchSelectOtherDriver",
  async (params, { rejectWithValue }) => {
    try {
      console.log('id', params, 'params')
      const response = await axios.patch(`/api/order/select-other-driver`, params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSetDriverPrice = createAsyncThunk(
  "news/fetchSetDriverPrice",
  async (params, { rejectWithValue }) => {
    try {
      console.log('id', params, 'params')
      const response = await axios.patch(`/api/order/set-driver-price`, params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchDeleteOrder = createAsyncThunk(
  "news/fetchDeleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/order/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStatusOrder = createAsyncThunk(
  "news/fetchStatusOrder",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/order/set-status/`, params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  comment: {
    items: [],
    status: "loading",
    error: "",
  },
  orders: {
    items: [],
    status: "loading",
    error: "",
  },
  one: {
    items: [],
    status: "loading",
    error: "",
  }
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGetAllOrders.pending]: (state) => {
      state.orders.items = [];
      state.orders.status = "loading";
      state.orders.error = "";
    },
    [fetchGetAllOrders.fulfilled]: (state, action) => {
      state.orders.status = "loaded";
      state.orders.items = action.payload;
    },
    [fetchGetAllOrders.rejected]: (state, action) => {
      state.orders.items = [];
      state.orders.status = "error";
      state.orders.error = action.payload;
    },

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

    [fetchCreateOrder.pending]: (state) => {
      state.status = "loading";
      state.orders = null;
    },
    [fetchCreateOrder.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.orders = action.payload;
    },
    [fetchCreateOrder.rejected]: (state) => {
      state.status = "error";
      state.orders = null;
    },

    [fetchUpdateOrder.pending]: (state) => {
      state.orders.status = "loading";
      state.orders.error = "";
    },
    [fetchUpdateOrder.fulfilled]: (state, action) => {
      state.orders.status = "loaded";
    },
    [fetchUpdateOrder.rejected]: (state, action) => {
      state.orders.status = "error";
    },

    [fetchGetOneOrder.pending]: (state) => {
      state.one.status = "loading";
      state.one.error = "";
    },
    [fetchGetOneOrder.fulfilled]: (state, action) => {
      state.one.status = "loaded";
      state.one.items = action.payload;
    },
    [fetchGetOneOrder.rejected]: (state, action) => {
      state.one.status = "error";
      state.one.error = action.payload;
    },

    [fetchStatusOrder.pending]: (state, action) => {
      console.log(state.orders.items)
      state.orders.items = state.orders.items.filter(
        (obj) => obj._id != action.meta.arg
      );
    },

    [fetchStatusOrder.rejected]: (state, action) => {
      state.orders.status = 'error'
      state.orders.error = action.payload
    },

    [fetchDeleteOrder.pending]: (state, action) => {
      console.log(state.orders.items)
      state.orders.items = state.orders.items.filter(
        (obj) => obj._id != action.meta.arg
      );
    },
    [fetchGetOneOrder.fulfilled]: (state, action) => {
      state.orders.status = "loaded";
      state.orders.items = action.payload;
    },
    [fetchDeleteOrder.rejected]: (state, action) => {
      state.orders.status = 'error'
      state.orders.error = action.payload
    }
  }
});

export const ordersReducer = ordersSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_KEY = "auth_user";

const API = axios.create({
  baseURL: "http://65.0.29.192:5000",
  headers: {
    "Content-Type": "application/json"
  }
});

const loadUser = () => {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const saveUser = (user) => {
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify(user)
  );
};

const clearUser = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password
      };

      console.log("SIGNUP PAYLOAD:", payload);

      const res = await API.post(
        "/api/auth/seller/signup",
        payload
      );

      console.log("SIGNUP RESPONSE:", res.data);

      return res.data;
    } catch (err) {
      console.log("SIGNUP ERROR:", err.response);

      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Signup failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("LOGIN PAYLOAD:", credentials);

      const res = await API.post(
        "/api/auth/seller/login",
        credentials
      );

      console.log("LOGIN RESPONSE:", res.data);

      return res.data;
    } catch (err) {
      console.log("LOGIN ERROR:", err.response);

      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Invalid credentials"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: loadUser(),
    loading: false,
    error: null,
    success: null
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.success = null;

      clearUser();

      localStorage.removeItem("cart");
      localStorage.removeItem("wishlist");
    },

    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    }
  },

  extraReducers: (builder) => {
    builder

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      .addCase(
        signupUser.fulfilled,
        (state, action) => {
          state.loading = false;

          console.log(
            "SIGNUP SUCCESS:",
            action.payload
          );

          state.success =
            action.payload?.message ||
            "Signup successful";
        }
      )

      .addCase(
        signupUser.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      .addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.loading = false;

          console.log(
            "LOGIN SUCCESS:",
            action.payload
          );

          const data = action.payload;

          const loggedUser =
            data.user ||
            data.seller ||
            data.data?.user ||
            data.data ||
            data;

          const userData = {
            token:
              data.token ||
              data.accessToken ||
              null,

            user: {
              username:
                loggedUser.username ||
                loggedUser.name ||
                loggedUser.firstName ||
                loggedUser.email?.split("@")[0] ||
                "User",

              firstName:
                loggedUser.firstName || "",

              lastName:
                loggedUser.lastName || "",

              email:
                loggedUser.email || ""
            }
          };

          state.user = userData;

          saveUser(userData);

          state.success =
            data.message ||
            "Login successful";
        }
      )

      .addCase(
        loginUser.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

export const {
  logout,
  clearMessages
} = authSlice.actions;

export default authSlice.reducer;
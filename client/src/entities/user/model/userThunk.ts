import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../api/userService";
import type { UserLogin, UserRegister } from "../types/schema";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const user = await UserService.refresh();
  return user;
});

export const logoutUser = createAsyncThunk("user/logoutsUser", async () => {
  await UserService.logout();
  return "Успешно вышли";
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData: UserLogin) => {
    const user = await UserService.login(formData);
    return user;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData: UserRegister) => {
    const user = await UserService.signUp(formData);
    return user;
  }
);

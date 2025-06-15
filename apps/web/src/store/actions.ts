import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { State } from "./types";
import deletePrompt from "../service/deletePrompt";

export const GET_PROMPTS = createAction("GET_PROMPTS");


export const DELETE_PROMPT = createAsyncThunk(
  "DELETE_PROMPT",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as State;
      const isLogin = !!state.user.id;
      const result = await deletePrompt(id, isLogin).delete(id);

      if (!result) {
        return rejectWithValue("删除失败");
      }

      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "删除失败"
      );
    }
  }
);

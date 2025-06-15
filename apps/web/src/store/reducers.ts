import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { GET_PROMPTS, DELETE_PROMPT } from "./actions";
import getPrompts from "../service/getPrompts";
import { State } from "./types";

const initialState: State = {
  user: {
    id: "",
    name: "",
    email: "",
  },
  prompts: [],
  loading: false,
  error: null,
};

export default createReducer(initialState, {
  [GET_PROMPTS.type]: (state, action: PayloadAction<any>) => {
    state.prompts = getPrompts();
    return state;
  },
  [DELETE_PROMPT.pending.type]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [DELETE_PROMPT.fulfilled.type]: (
    state,
    action: PayloadAction<string>
  ) => {
    state.loading = false;
    state.prompts = state.prompts.filter(
      (prompt) => prompt.id !== action.payload
    );
  },
  [DELETE_PROMPT.rejected.type]: (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  },
});

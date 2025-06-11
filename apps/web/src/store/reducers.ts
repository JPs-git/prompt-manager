import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { GET_PROMPTS } from "./actions";
import getPrompts from "../service/getPrompts";
import { State } from "./types";

const initialState: State = {
  prompts: []
}


export default createReducer(initialState, {
  [GET_PROMPTS as unknown as string]: (state, action: PayloadAction<any>) =>{
    state.prompts = getPrompts()
    return state
  }
});

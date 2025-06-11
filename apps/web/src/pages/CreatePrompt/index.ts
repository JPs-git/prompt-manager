import { connect } from "react-redux";
import { GET_PROMPTS } from "../../store/actions";
import CreatePrompt from "./CreatePrompt";
import { State } from "../../store/types";
import { Dispatch } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";


const mapStateToProps = (state: State) => {
  const { id } = useParams();

  if (id) {
    const prompt = state.prompts.find((p) => p.id === id);
    return { prompt: prompt || undefined };
  }
  return { prompt: undefined };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getPrompts: () => dispatch(GET_PROMPTS()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePrompt);

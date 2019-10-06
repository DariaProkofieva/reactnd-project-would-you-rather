import { getInitialData, saveQuestionAnswer } from "../utils/api";
import { receiveQuestions, addAnswer, addQuestion } from "../actions/questions";
import {
  receiveUsers,
  addUserAnswer,
  addQuestionToUser
} from "../actions/users";
import { setAuthedUser } from "../actions/authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveQuestion } from "../utils/api";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(null));
      dispatch(hideLoading());
    });
  };
}

export function handleAddAnswer(authedUser, qid, answer) {
  return dispatch => {
    dispatch(addUserAnswer(authedUser, qid, answer));
    dispatch(addAnswer(authedUser, qid, answer));
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then(question => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question, question.author, question.id));
      })
      .then(() => dispatch(hideLoading()));
  };
}

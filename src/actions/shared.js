import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { receiveUsers, answerUserQuestion, addUserQuestion } from './users';
import { receiveQuestions, answerQuestion, addQuestion } from './questions';
// import { setAuthedUser } from './authedUser';
import {
  getInitialData as apiGetInitialData,
  saveQuestionAnswer as apiSaveQuestionAnswer,
  saveQuestion as apiSaveQuestion
} from '../utils/api';

// const AUTHED_ID = 'tylermcginnis';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return apiGetInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        // dispatch(setAuthedUser(AUTHED_ID));
        dispatch(hideLoading());
      });
  }
}

export function handleAnswerQuestion(question, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    showLoading();
    return apiSaveQuestionAnswer({
      authedUser,
      question,
      answer
    })
      .then(({ authedUser, answer, questionId }) => {
        dispatch(answerQuestion({ authedUser, answer, questionId }));
        dispatch(answerUserQuestion({ authedUser, answer, questionId }));
      })
      .then(() => hideLoading());
  }
};

export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    showLoading();
    return apiSaveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(addUserQuestion(question));
      })
      .then(() => hideLoading());
  };
}
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const UPDATE_USER_ANSWER = 'UPDATE_USER_ANSWER';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function answerUserQuestion(answer) {
  return {
    type: UPDATE_USER_ANSWER,
    answer,
  };
}

export function addUserQuestion(question) {
  return {
    type: ADD_USER_QUESTION,
    question,
  };
}
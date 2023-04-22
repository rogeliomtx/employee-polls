import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from './_DATA';

export async function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions
  }))
}

export async function saveQuestion (question) {
  return _saveQuestion(question)
}

export async function saveQuestionAnswer ({ authedUser, question, answer }) {
  return _saveQuestionAnswer({
    authedUser,
    qid: question.id,
    answer
  }).then((saved) => {
    return { authedUser, answer, questionId: question.id }
  })
}

export async function login (id, password) {
  return _getUsers().then((users) => {
    const user = Object.values(users).find((user) => user.id === id && user.password === password);
    return user;
  })
}

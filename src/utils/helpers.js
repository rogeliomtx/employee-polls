export function formatQuestion (question, author, authedUser) {
  const { id, optionOne, optionTwo, timestamp } = question

  return {
    id,
    timestamp,
    optionOne,
    optionTwo,
    author,
    hasAnswered: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)
  }
}
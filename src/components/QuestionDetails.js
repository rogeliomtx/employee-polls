import { useSelector, useDispatch } from "react-redux";
import { useParams, Navigate } from "react-router-dom";

import { handleAnswerQuestion } from "../actions/shared";

import QuestionOption from "./QuestionOption";


const QuestionDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { authedUser, questions, users } = useSelector((state) => state);
  const { questionId } = params;
  
  // details
  const _question = questions[questionId];

  // if doesn't exist, return 404
  if (_question === undefined) {
    return <Navigate to="/questions/not-found" />
  }

  const author = users[_question.author];
  const answer = users[authedUser].answers[questionId];

  // % of votes
  const total = _question.optionOne.votes.length + _question.optionTwo.votes.length;
  let optionOnePercentage = 0;
  let optionTwoPercentage = 0;

  if (total !== 0) {
    optionOnePercentage = ((_question.optionOne.votes.length / total) * 100).toFixed();
    optionTwoPercentage = ((_question.optionTwo.votes.length / total) * 100).toFixed();
  }

  const question = {
    ..._question,
    isAnswered: answer !== undefined,
    answer,
    percentages: {
      optionOne: optionOnePercentage,
      optionTwo: optionTwoPercentage
    },
    totals: {
      optionOne: _question.optionOne.votes.length,
      optionTwo: _question.optionTwo.votes.length
    }
  };

  const handleSelect = (e) => {
    e.preventDefault();
    const answer = e.target.name;
    dispatch(handleAnswerQuestion(question, answer));
  };

  return (
    <div className="card mt-5" role="contentinfo">
    <div className="card-header text-center">Answer the question</div>
      <div className="card-body text-center">
        <img src={author.avatarURL} className="avatar rounded-circle mb-3" alt="Avatar" />
        <small className="text-secondary">By {author.name}</small>
        <h1 className="mt-5 mb-5">Would you rather...</h1>
        <div className="row row-cols-2">
          <div className="column">
            <QuestionOption
              question={question}
              handleSelect={handleSelect}
              name="optionOne"
              />
              
            </div>
          <div className="column">
            <QuestionOption
              question={question}
              handleSelect={handleSelect}
              name="optionTwo"
              />
          </div>
        </div>
      </div>
    </div>
  )
};

export default QuestionDetails;
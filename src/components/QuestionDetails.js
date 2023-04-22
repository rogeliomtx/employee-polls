import { connect } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { handleAnswerQuestion } from "../actions/shared";

import QuestionOption from "./QuestionOption";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionDetails = ({
  question,
  author,
  dispatch
}) => {
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

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { questionId } = props.router.params;
  
  // details
  const question = questions[questionId];
  const author = users[question.author];
  const answer = users[authedUser].answers[questionId];

  // % of votes
  const total = question.optionOne.votes.length + question.optionTwo.votes.length;
  let optionOnePercentage = 0;
  let optionTwoPercentage = 0;

  if (total !== 0) {
    optionOnePercentage = ((question.optionOne.votes.length / total) * 100).toFixed();
    optionTwoPercentage = ((question.optionTwo.votes.length / total) * 100).toFixed();
  }

  const formatedQuestion = {
    ...question,
    isAnswered: answer !== undefined,
    answer,
    percentages: {
      optionOne: optionOnePercentage,
      optionTwo: optionTwoPercentage
    },
    totals: {
      optionOne: question.optionOne.votes.length,
      optionTwo: question.optionTwo.votes.length
    }
  };

  return {
    question: formatedQuestion,
    author,
  }
}

export default withRouter(connect(mapStateToProps)(QuestionDetails));
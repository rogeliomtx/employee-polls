import { connect } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { handleAnswerQuestion } from "../actions/shared";

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
  author,
  question,
  isOptionOneSelected,
  isOptionTwoSelected,
  optionOnePercentage,
  optionTwoPercentage,
  dispatch
}) => {
  const navigate = useNavigate();

  const handleSelect = (e) => {
    e.preventDefault();
    const answer = e.target.name;
    dispatch(handleAnswerQuestion(question, answer));
    navigate("/");
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
              <div className={`card ${isOptionOneSelected && "border-primary"} `}>
                  <div className="card-body">
                    <p className="lead">{question.optionOne.text}</p>
                    <button className="btn btn-primary" name="optionOne" onClick={handleSelect}>
                      {isOptionOneSelected ? "Selected" : "Select"}
                    </button>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      Votes: {question.optionOne.votes.length} ~ {optionOnePercentage}%
                    </small>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className={`card ${isOptionTwoSelected && "border-primary"} `}>
                  <div className="card-body">
                    <p className="lead">{question.optionTwo.text}</p>
                    <button className="btn btn-primary" name="optionTwo" onClick={handleSelect}>
                      {isOptionTwoSelected ? "Selected" : "Select"}
                    </button> 
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      Votes: {question.optionTwo.votes.length} ~ {optionTwoPercentage}%
                    </small>
                  </div>
                </div>
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

  // selection
  const isOptionOneSelected = answer === "optionOne";
  const isOptionTwoSelected = answer === "optionTwo";

  // % of votes
  const total = question.optionOne.votes.length + question.optionTwo.votes.length;
  let optionOnePercentage = 0;
  let optionTwoPercentage = 0;

  if (total !== 0) {
    optionOnePercentage = ((question.optionOne.votes.length / total) * 100).toFixed();
    optionTwoPercentage = ((question.optionTwo.votes.length / total) * 100).toFixed();
  }

  return {
    question,
    author,
    answer,
    authedUser,
    isOptionOneSelected,
    isOptionTwoSelected,
    optionOnePercentage,
    optionTwoPercentage
  }
}

export default withRouter(connect(mapStateToProps)(QuestionDetails));
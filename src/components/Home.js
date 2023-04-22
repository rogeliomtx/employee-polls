import { connect } from "react-redux";

import Question from "./Question";
import { formatQuestion } from "../utils/helpers";

const Home = (props) => {
  return (
    <div role="contentinfo">
      <div className="card mt-5">
        <div className="card-header">Unanswered</div>
        <div className="card-body">
          <div className="row row-cols-4" data-testid="unanswered-questions">
            {
              props.questionsUnanswered &&
              props.questionsUnanswered.map((question) => (
                <div key={question.id} className="column">
                  <Question question={question} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="card mt-5 mb-5">
        <div className="card-header">Answered</div>
        <div className="card-body">
          <div className="row row-cols-4" data-testid="answered-questions">
            {
              props.questionsAnswered &&
              props.questionsAnswered.map((question) => (
                <div key={question.id} className="column">
                  <Question question={question} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (props) => {
  const formatedQuestions = Object.values(props.questions).map(
    (question) => formatQuestion(question, props.users[question.author], props.authedUser)
  );

  const questionsAnswered = formatedQuestions
    .filter((question) => question.hasAnswered)
    .sort((a, b) => b.timestamp - a.timestamp);
    
  const questionsUnanswered = formatedQuestions
    .filter((question) => !question.hasAnswered)
    .sort((a, b) => b.timestamp - a.timestamp);
  
  return {
    questionsAnswered,
    questionsUnanswered
  }
}

export default connect(mapStateToProps)(Home);
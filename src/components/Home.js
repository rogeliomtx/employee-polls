import { connect } from "react-redux";

import { formatQuestion } from "../utils/helpers";
import QuestionCategoryList from "./QuestionCategoryList";

const Home = ({ questionsUnanswered, questionsAnswered }) => {
  return (
    <div role="contentinfo">
      <QuestionCategoryList
        questionsUnanswered={questionsUnanswered}
        questionsAnswered={questionsAnswered}
      />
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
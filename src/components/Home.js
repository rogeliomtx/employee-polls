import { useSelector } from "react-redux";

import { formatQuestion } from "../utils/helpers";
import QuestionCategoryList from "./QuestionCategoryList";

const Home = () => {
  const { questions, users, authedUser } = useSelector((state) => state);

  const formatedQuestions = Object.values(questions).map(
    (question) => formatQuestion(question, users[question.author], authedUser)
  );

  const questionsAnswered = formatedQuestions
    .filter((question) => question.hasAnswered)
    .sort((a, b) => b.timestamp - a.timestamp);
    
  const questionsUnanswered = formatedQuestions
    .filter((question) => !question.hasAnswered)
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div role="contentinfo">
      <QuestionCategoryList
        questionsUnanswered={questionsUnanswered}
        questionsAnswered={questionsAnswered}
      />
    </div>
  )
}

export default Home;
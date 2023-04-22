import Question from './Question';

const QuestionCategory = ({ category, questions }) => {
  return (
    <div
      className="tab-pane fade mt-5 active show"
      id={category}
      role="tabpanel"
    >
      <div className="row row-cols-4" data-testid={category}>
        {
          questions &&
          questions.map((question) => (
            <div key={question.id} className="column">
              <Question question={question} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default QuestionCategory;
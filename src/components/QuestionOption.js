
const QuestionOption = ({
  question,
  handleSelect,
  name
}) => {
  const isSelected = question.answer === name;

  return (
    <div className={`card ${isSelected && "border-primary"} `}>
      <div className="card-body">
        <p className="lead">{question[name].text}</p>
        <button className="btn btn-primary" name={name} onClick={handleSelect}>
          {isSelected ? "Selected" : "Select"}
        </button>
      </div>
      <div className="card-footer">
        {
          question.isAnswered ? (
            <small className="text-muted">
              Votes: {question.totals[name]} ~ {question.percentages[name]}%
            </small>
          ) : (
            <small className="text-muted">
              You must vote to see the results
            </small>
          )
        }
      </div>
    </div>
  );
}

export default QuestionOption;
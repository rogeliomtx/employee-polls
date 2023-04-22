import { Link } from "react-router-dom";

import Avatar from "./Avatar";

const Question = ({ question }) => {
  return (
    <div className="card text-center mb-3" role="article">
      <div className="card-body">
        <Avatar user={question.author} />
        <h5 className="card-title mb-0">
          {question.author.name}
        </h5>
        <p className="card-text text-secondary">
          {
            new Date(question.timestamp).toLocaleString(
              'en-US', 
              { hour: 'numeric', hour12: true, month: 'long', day: 'numeric', year: 'numeric' }
            )
          }
        </p>
        <Link className="btn btn-outline-primary" to={`/questions/${question.id}`}>Show details</Link>
      </div>
    </div>
  )
};
  

export default Question;
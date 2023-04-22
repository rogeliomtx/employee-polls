import { useEffect, useState } from "react";
import { connect } from "react-redux";

import QuestionCategory from "./QuestionCategory";

const QuestionCategoryList = ({ questionsUnanswered, questionsAnswered }) => {
  const [ categorySelected, setCategorySelected ] = useState("unanswered-questions");

  const handleToggle = (e) => {
    e.preventDefault();
    setCategorySelected(e.target.id);
  };

  return (
    <div className="card mt-5 p-3">
      <ul className="nav nav-pills mt-3" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${categorySelected === "unanswered-questions" ? "active" : ""}`}
            id="unanswered-questions"
            type="button"
            role="tab"
            onClick={(e) => setCategorySelected(e.target.id)}
          >
            Unanswered Questions
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${categorySelected === "answered-questions" ? "active" : ""}`}
            id="answered-questions"
            type="button"
            role="tab"
            onClick={(e) => setCategorySelected(e.target.id)}
          >
            Answered Questions
          </button>
        </li>
      </ul>
      <div className="tab-content">
        {
          categorySelected === "unanswered-questions" ? (
            <QuestionCategory
              category="unanswered-questions"
              questions={questionsUnanswered}
          />
          ) : (
            <QuestionCategory
              category="answered-questions"
              questions={questionsAnswered}
            />
          )
        }
      </div>
    </div>
  );
};

export default connect()(QuestionCategoryList);
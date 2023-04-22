import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

import { handleAddQuestion as addQuestionAction } from "../actions/shared";

const CreateQuestion = ({ dispatch }) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleAddQuestion = (e) => {
    e.preventDefault();
    dispatch(addQuestionAction(optionOne, optionTwo));
    setOptionOne("");
    setOptionTwo("");
    navigate("/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "optionOne") {
      setOptionOne(value);
    } else if (name === "optionTwo") {
      setOptionTwo(value);
    }
  };

  return (
    <div className="card mt-5" role="contentinfo">
          <div className="card-header">Add Your Own Poll</div>
          <div className="card-body">
            <h1>Would you rather...</h1>
            <form onSubmit={handleAddQuestion}>
              <div className="form-group mt-3">
                <label className="form-label">Option 1</label>
                <input name="optionOne" onChange={handleChange} type="text" className="form-control" placeholder="Enter option one text here" />
              </div>
              <div className="form-group mt-3">
                <label className="form-label">Option 2</label>
                <input name="optionTwo" onChange={handleChange} type="text" className="form-control" placeholder="Enter option two text here" />
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
              </div>
            </form>
            </div>
        </div>
  )
}

export default connect()(CreateQuestion);
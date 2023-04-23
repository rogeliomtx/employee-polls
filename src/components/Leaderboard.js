import { useSelector } from "react-redux";

import Avatar from "./Avatar";

const Leaderboard = () => {
  const { users } = useSelector((state) => state);

  // questionsAnswered & questionsCreated by user
  const scores = Object.values(users).map((user) => {
    return {
      id: user.id,
      user: {
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
      },
      questionsAnswered: Object.keys(user.answers).length,
      questionsCreated: user.questions.length
    }
  });

  // sort by questionsAnswered + questionsCreated
  scores.sort((a, b) => {
    const aTotal = a.questionsAnswered + a.questionsCreated;
    const bTotal = b.questionsAnswered + b.questionsCreated;

    return bTotal - aTotal;
  });

  return (
    <div className="card mt-5" role="contentinfo">
        <div className="card-header">Leaderboard</div>
        <div className="card-body">
          <table className="table table-bordered leaderboard">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Answered</th>
                <th scope="col">Created</th>
              </tr>
            </thead>
            <tbody>
              {
                scores.map((score, index) => (
                  <tr key={score.id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <div className="list-group-item d-flex align-items-center">
                        <span className="mr-3 rounded-circle">
                          <Avatar user={score.user} />
                        </span>
                        <span className="mr-auto">
                          {score.user.name}<br />
                          <small className="text-secondary">{score.user.id}</small>
                        </span>
                      </div>
                    </td>
                    <td>{score.questionsAnswered}</td>
                    <td>{score.questionsCreated}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default Leaderboard;
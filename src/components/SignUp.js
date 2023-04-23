const SignUp = (props) => {
  return (
    <div className="card auth">
      <div className="card-header bg-primary text-light">
        <h1>Polls</h1>
      </div>
      <div className="card-body">
        <h5 className="card-title">Sign Up</h5>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" placeholder="Enter your username" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
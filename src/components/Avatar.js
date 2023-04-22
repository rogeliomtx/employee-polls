const Avatar = ({ user }) => {
  return <div className="avatar">
    {
      user.avatarURL === "" ? (
        <span>{user.name[0]}</span>
      ) : (
        <img src={user.avatarURL} className="avatar" alt="Avatar" />
      )
    }
  </div>
}

export default Avatar;
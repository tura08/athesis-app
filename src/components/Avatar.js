// styles
import "./Avatar.css";

const Avatar = ({ src }) => {
  return (
    <div className="avatar">
      <img src={src} alt="user avatar"></img>
    </div>
  );
};

export default Avatar;

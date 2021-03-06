import Typical from 'react-typical';
import { useSelector } from 'react-redux';

const AvatarWithMessage = ({
  avatarImage,
  avatarImageStyle,
  avatarMessageClass,
  avatarMessagedirection,
}) => {
  const avatarMessage = useSelector((state) => state.avatarMessage);
  return (
    <>
      <img className={avatarImageStyle} src={avatarImage} alt="avatar" />
      <div className={avatarMessageClass}>
        <p className={`nes-balloon from-${avatarMessagedirection}`}>
          <Typical
            steps={[avatarMessage, 2500, '']}
            // loop={Infinity}
            wrapper="span"
          />
        </p>
      </div>
    </>
  );
};

export default AvatarWithMessage;

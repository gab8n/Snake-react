import settingIcon from '../../Assets/settingsicon.png';
import styles from '../SettingIcon/SettingIcon.module.scss';
const SettingIcon = ({ onClick }) => {
  const { settingIconStyle } = styles;
  return (
    <>
      <img
        src={settingIcon}
        alt="SettingsIcon"
        className={`${settingIconStyle} nes-pointer`}
        onClick={onClick}
      />
    </>
  );
};

export default SettingIcon;

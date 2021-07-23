import RangeSlider from '../RangeSlider/RangeSlider';
import volumeUpImage from '../../../Assets/volumeUp.gif';
import volumeDownImage from '../../../Assets/volumeDown.gif';
import styles from '../VolumeSlider/VolumeSlider.module.scss';

const VolumeSlider = ({ onChange, volume }) => {
  const { volumeSliderContainer, volumeImage } = styles;
  const decreaseVolume = () => {
    volume > 0 && onChange(volume - 1);
  };
  const increaseVolume = () => {
    volume < 10 && onChange(volume + 1);
  };

  return (
    <div className={volumeSliderContainer}>
      <img
        onClick={decreaseVolume}
        src={volumeDownImage}
        alt="volumeDown"
        className={`${volumeImage} nes-pointer`}
      />
      <RangeSlider onChange={(value) => onChange(value)} {...{ volume }} />
      <img
        onClick={increaseVolume}
        src={volumeUpImage}
        alt="volumeUp"
        className={`${volumeImage} nes-pointer`}
      />
    </div>
  );
};

export default VolumeSlider;

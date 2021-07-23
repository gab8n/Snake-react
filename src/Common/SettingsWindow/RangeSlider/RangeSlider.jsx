import styles from './RangeSlider.module.scss';

const RangeSlider = ({ onChange, volume }) => {
  const { slider, sliderContainer } = styles;
  return (
    <div className={sliderContainer}>
      <input
        value={volume}
        min="0"
        max="10"
        type="range"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={`${slider} nes-pointer`}
      ></input>
    </div>
  );
};

export default RangeSlider;

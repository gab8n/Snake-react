import styles from '../CustomButton/CustomButton.module.scss';

const CustomButton = ({ label, additionalStyle, children, onClick, type }) => {
  const { pixelBorder } = styles;
  return (
    <button
      className={`${pixelBorder} ${additionalStyle ? additionalStyle : ''}`}
      onClick={onClick}
      type={type ? type : 'button'}
    >
      {label}
      {children}
    </button>
  );
};

export default CustomButton;

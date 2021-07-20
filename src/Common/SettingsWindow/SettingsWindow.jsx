import ReactModal from 'react-modal';
import { useModal } from 'react-modal-hook';
import SettingIcon from '../SettingIcon/SettingIcon';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    with: '600px',
  },
};
const SettingsWindow = () => {
  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen style={customStyles}>
      <p>Modal content</p>
      <button onClick={hideModal}>Hide modal</button>
    </ReactModal>
  ));
  return <SettingIcon onClick={showModal} />;
};

export default SettingsWindow;

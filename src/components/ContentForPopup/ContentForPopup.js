import Popup from '../Popup/Popup';

function ContentForPopup ({
  isOpen,
  setPopupOpened,
  statusMessageInPopup
}) {

  return (
    <Popup name="notify" isOpen={isOpen} setPopupOpened={setPopupOpened}>
      <h3 className="popup__notify-title">{statusMessageInPopup}</h3>
    </Popup>
  );
};

export default ContentForPopup;
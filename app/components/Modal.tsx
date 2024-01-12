import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalInterface {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalInterface) {
  console.log(isOpen ? "Open" : "Close");

  return (
    <div className={`modalContainer ${isOpen ? "active" : ""}`}>
      <div className="modal">
        <div className="modalHeader">
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className="modalContent">{children}</div>
      </div>
    </div>
  );
}

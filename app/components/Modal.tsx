import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalInterface {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  size?: number;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  size = 1,
  children,
}: ModalInterface) {
  return (
    <div className={`modalContainer ${isOpen ? "active" : ""}`}>
      <div className={`modal size${size}`}>
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

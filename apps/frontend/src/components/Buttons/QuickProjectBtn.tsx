import { FaPen } from 'react-icons/fa';
import './Buttons.css';
type QuickProjectBtnProps = {
  onClick: () => void;
  btnText?: string;
};
const QuickProjectBtn: React.FC<QuickProjectBtnProps> = ({
  onClick,
  btnText,
}) => {
  return (
    <>
      {btnText ? (
        <button onClick={onClick} className="qp-btn">
          {btnText}
        </button>
      ) : (
        <>
          <button className="qp-btn" onClick={onClick}>
            <FaPen />
          </button>
        </>
      )}
    </>
  );
};

export default QuickProjectBtn;

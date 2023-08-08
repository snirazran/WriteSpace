import { FaArrowRight } from 'react-icons/fa';
import './Buttons.css';
type CommentBtnProps = {
  onClick?: () => void;
  btnText?: string;
};
const CommentBtn: React.FC<CommentBtnProps> = ({ onClick, btnText }) => {
  return (
    <>
      <>
        <button type="submit" className="comment-btn" onClick={onClick}>
          <FaArrowRight />
        </button>
      </>
    </>
  );
};

export default CommentBtn;

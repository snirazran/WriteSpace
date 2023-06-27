import './Buttons.css';
type SecondSmallBtnProps = {
  text: string;
  onClick: () => void;
};
const SecondSmallBtn: React.FC<SecondSmallBtnProps> = ({ text, onClick }) => {
  return (
    <button className="second-small-btn" onClick={onClick}>
      {text}
    </button>
  );
};

export default SecondSmallBtn;

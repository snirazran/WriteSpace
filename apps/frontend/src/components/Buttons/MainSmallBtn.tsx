import './Buttons.css';
type MainSmallBtnProps = {
  text: string;
  onClick: () => void;
};
const MainSmallBtn: React.FC<MainSmallBtnProps> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="main-small-btn">
      {text}
    </button>
  );
};

export default MainSmallBtn;

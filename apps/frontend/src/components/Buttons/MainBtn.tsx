import './Buttons.css';
type MainBtnProps = {
  btnText: string;
  onClick: () => void;
};
const MainBtn: React.FC<MainBtnProps> = ({ btnText, onClick }) => {
  return (
    <button onClick={onClick} className="mainBtn">
      {btnText}
    </button>
  );
};

export default MainBtn;

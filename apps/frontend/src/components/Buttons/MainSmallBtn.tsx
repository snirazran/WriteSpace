import './Buttons.css';
type MainSmallBtnProps = {
  text: string;
};
const MainSmallBtn: React.FC<MainSmallBtnProps> = ({ text }) => {
  return <button className="main-small-btn">{text}</button>;
};

export default MainSmallBtn;

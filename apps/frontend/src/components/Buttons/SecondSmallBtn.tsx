import './Buttons.css';
type SecondSmallBtnProps = {
  text: string;
};
const SecondSmallBtn: React.FC<SecondSmallBtnProps> = ({ text }) => {
  return <button className="second-small-btn">{text}</button>;
};

export default SecondSmallBtn;

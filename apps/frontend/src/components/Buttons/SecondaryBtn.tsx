import './Buttons.css';
type SecondaryBtnProps = {
  btnText: string;
  onClick: () => void;
};
const SecondaryBtn: React.FC<SecondaryBtnProps> = ({ btnText, onClick }) => {
  return (
    <button onClick={onClick} className="secondaryBtn">
      {btnText}
    </button>
  );
};

export default SecondaryBtn;

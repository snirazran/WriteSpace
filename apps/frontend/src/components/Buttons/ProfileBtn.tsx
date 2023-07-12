import './Buttons.css';
type ProfileBtnProps = {
  btnText: string;
  onClick: () => void;
};
const ProfileBtn: React.FC<ProfileBtnProps> = ({ btnText, onClick }) => {
  return (
    <button onClick={onClick} className="ProfileBtn">
      {btnText}
    </button>
  );
};

export default ProfileBtn;

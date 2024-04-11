import { useNavigate } from "react-router-dom";

interface DashCardProps {
  quantity: number;
  label: string;
  Icon: JSX.Element;
  link: string;
}
const DashCard = ({ quantity, label, Icon, link }: DashCardProps) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`${link}`)}
      className="w-full card-mini bg-white p-5 rounded-[5px] shadow-md border border-gray-200"
    >
      <div className="card-body flex justify-between w-full ">
        <div className="text flex flex-col items-start">
          <h2 className="text-[23px] font-semibold text-gray-700 mb-1">
            {quantity.toLocaleString()}
          </h2>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
        <div className="w-[50px] h-[50px] bg-primary-500 rounded-xl text-white flex justify-center items-center text-2xl">
          {Icon}
        </div>
      </div>
    </button>
  );
};

export default DashCard;

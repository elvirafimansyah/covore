import { FiSearch } from "react-icons/fi";
interface NotFoundProps {
  title?: string;
  description?: string;
}
const NotFound: React.FC<NotFoundProps> = ({ title, description}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 my-3 p-5">
      <FiSearch size="40px" style={{color: "#FACC15"}} />
      <div className="text-center">
        <h1 className={`font-bold text-lg`}>{title} </h1>
        <p className="text-gray-700 text-sm md:text-base font-medium">{description}</p>
      </div>
    </div>
  );
}

export default NotFound;


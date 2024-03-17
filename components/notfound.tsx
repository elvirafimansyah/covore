import { FiSearch } from "react-icons/fi";
interface NotFoundProps {
  title?: string;
  description?: string;
  size: string;
  size_md?: string; 
}
const NotFound: React.FC<NotFoundProps> = ({ title, description, size, size_md }) => {
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


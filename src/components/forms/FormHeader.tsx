
import { FormHeaderType } from "../layouts/FormLayout";

interface PropsType {
  data: FormHeaderType;
}

const FormHeader: React.FC<PropsType> = ({ data }) => {
  return (
    <div className="w-full h-[200px] relative mb-4 md:mb-0">
      <img
        src={data.image}
        alt={data.title}
        className="w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
        <p className="text-white font-[700] text-3xl">{data.title}</p>
      </div>
    </div>
  );
};

export default FormHeader;

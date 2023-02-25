import { loader } from "../assets";

const Loader = ({ title }) => (
  <div className=" flex w-full items-center justify-center flex-col">
    <img
      src={loader}
      alt="loader"
      className="w-32 h-32 object-contain"
    />
    <h1 className="font-bold text-3xl text-white mt-2">
      {title || "Loading..."}
    </h1>
  </div>
);

export default Loader;

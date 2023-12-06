import { useContext } from "react";
import { Data_box } from "../context/Data_box";

const useData = () =>
{
  return useContext(Data_box)
};

export default useData
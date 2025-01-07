import { IPlatform } from "@/app/interfaces";

interface IHandleArrayOfObjects {
  platforms: IPlatform[];
}

const handleArrayOfObjects = ({ platforms }: IHandleArrayOfObjects) => {
  const result = platforms.map((element) => {
    return element.name;
  });
  return result.join(", ");
};

export default handleArrayOfObjects;

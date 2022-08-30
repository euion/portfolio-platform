import { v4 as uuidv4 } from "uuid";

const id = {
  type: String,
  default: () => {
    return uuidv4();
  },
  require: true,
  index: true,
};

export default id;

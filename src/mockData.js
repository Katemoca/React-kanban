//! GENERADOR DE IDs AUTOMÁTICO
import { v4 as uuidv4 } from "uuid";

const mockData = [
  {
    id: uuidv4(),
    title: "TO DO 📝",
    tasks: [
      {
        id: uuidv4(),
        title: "Study PYTHON",
      },
      {
        id: uuidv4(),
        title: "Study HTML + CSS",
      },
      {
        id: uuidv4(),
        title: "Study NODE JS",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "IN PROGRESS ✍🏼",
    tasks: [
      {
        id: uuidv4(),
        title: "Study JS",
      },
      {
        id: uuidv4(),
        title: "Study EXCEL",
      },
      {
        id: uuidv4(),
        title: "Study REACT",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "FINISHED ✅",
    tasks: [
      {
        id: uuidv4(),
        title: "Study ENGLISH",
      },
    ],
  },
];

export default mockData;

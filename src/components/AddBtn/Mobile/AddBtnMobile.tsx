import { Plus } from "lucide-react";
import styles from "./styles.module.scss";

const AddBtnMobile = ({ onClick }: any) => {
  return (
    <button className={styles.addBtn} onClick={onClick}>
      <Plus size={24} strokeWidth={2} />
    </button>
  );
};

export default AddBtnMobile;

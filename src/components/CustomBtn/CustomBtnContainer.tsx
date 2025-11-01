import type { CustomBtnInterfaceContainer } from "../../interface/CustomBtnInterfaceContainer";
import DesktopBtn from "./Desktop/DesktopBtn";

const CustomBtnContainer = ({
  value,
  icon,
  hasIicon,
  setOpenModal,
}: CustomBtnInterfaceContainer) => {
  const handleChange = () => {
    if (setOpenModal) setOpenModal(true);
  };

  return <DesktopBtn value={value} handleChange={handleChange} icon={icon} hasIicon={hasIicon} />;
};

export default CustomBtnContainer;

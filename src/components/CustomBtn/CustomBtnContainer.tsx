import type { CustomBtnInterfaceContainer } from "../../interface/CustomBtnInterfaceContainer";
import DesktopBtn from "./Desktop/DesktopBtn";

const CustomBtnContainer = ({
  value,
  icon,
  hasIcon,
  onClick,
}: CustomBtnInterfaceContainer) => {
  const handleChange = () => {
    if (onClick) onClick();
  };

  return <DesktopBtn value={value} handleChange={handleChange} icon={icon} hasIcon={hasIcon} />;
};

export default CustomBtnContainer;

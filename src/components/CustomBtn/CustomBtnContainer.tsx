import type { CustomBtnInterfaceContainer } from '../../interface/CustomBtnInterfaceContainer'
import DesktopBtn from './Desktop/DesktopBtn'

const CustomBtnContainer = ({ value, setAccessGranted, accessGranted, inputValue, setError, icon, setOpenModal }: CustomBtnInterfaceContainer) => {
  const handleChange = () => {
    if(setOpenModal) setOpenModal(true)
    if(inputValue && setAccessGranted && inputValue.length >= 3) {
      setError("")
      setAccessGranted(!accessGranted)
    } else {
      setError("Por favor, ingresa un nombre de al menos 3 letras para continuar")
    }
  }

  return (
    <DesktopBtn value={value} handleChange={handleChange} icon={icon}/>
  )
}

export default CustomBtnContainer
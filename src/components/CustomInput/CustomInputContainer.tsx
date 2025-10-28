import InptuDesktop from './Desktop/InptuDesktop'
import type { InputInterfaceContainer } from '../../interface/InputInterfaceContainer'

const CustomInputContainer = ({ placeholder, value, setValue }: InputInterfaceContainer) => {
  const handleChange = (e:any) =>{ setValue(e.target.value)}

  return (
    <InptuDesktop placeholder={placeholder} value={value} handleChange={handleChange}/>
  )
}

export default CustomInputContainer
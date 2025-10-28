import { useEffect, useState } from "react"
import WeddingAccesDesktop from "./Desktop/WeddingAccesDesktop"
import type { WeddingAccesInterfaceContainer } from "../../interface/WeddingAccessInterfaceContainer"

const WeddingAccessContainer = ({ accessGranted, setAccessGranted, inputValue, setInputValue }: WeddingAccesInterfaceContainer) => {
  const [error, setError] = useState("")
  const [showError, setShowError] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  useEffect(() => {
    if(error.length > 0) setShowError(true)
  }, [error])
  
  return (
    <WeddingAccesDesktop inputValue={inputValue} setInputValue={setInputValue} setAccessGranted={setAccessGranted} accessGranted={accessGranted} setError={setError} showError={showError} error={error} handleSubmit={handleSubmit}/>
  )
}

export default WeddingAccessContainer
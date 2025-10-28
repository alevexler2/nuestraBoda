import { useState } from 'react'
import WeddingAccessContainer from './components/WeddingAccess/WeddingAccessContainer.js'
import PhotoGalleryContainer from './components/PhotoGallery/PhotoGalleryContainer.js'

function App() {
  const [accessGranted, setAccessGranted] = useState(false)
  const [inputValue, setInputValue] = useState("")

  return (
    <>
      {accessGranted ? <PhotoGalleryContainer inputValue={inputValue}/> : <WeddingAccessContainer setAccessGranted={setAccessGranted} accessGranted={accessGranted} setInputValue={setInputValue} inputValue={inputValue}/>}
    </>
  )
}

export default App

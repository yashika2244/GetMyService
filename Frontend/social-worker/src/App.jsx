import './App.css'
import useGetSocketMessage from './context/useGetSocketMessage.js'
import Layout from './Layout/Layout'
import { ToastContainer, toast } from 'react-toastify'

function App() {
useGetSocketMessage()
  return (
    <>
    <Layout/>
    <ToastContainer/>
    </>
  )
}

export default App






















import React ,{ useState , Suspense , lazy } from 'react'
import {BrowserRouter , Routes , Route} from"react-router-dom"
import './App.css'
const Gemini =React.lazy(()=>import("./components/Gemini"))
const Models =React.lazy(()=>import("./components/Models"))
const Grook =React.lazy(()=>import("./components/Grook"))
// const ChatGPT =React.lazy(()=>import("./components/ChatGPT")) 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-[#1C1C1C]  w-full min-h-screen min-w-screen'>
     <BrowserRouter >
      <Routes>
          <Route path='/' element={<Suspense fallback={<div>Loading...</div>}><Models/></Suspense>}></Route>
          <Route path='/gemini' element={<Suspense fallback={<div>Loading...</div>}><Gemini/></Suspense>}></Route>
          <Route path='/grook' element={<Suspense fallback={<div>Loading...</div>}><Grook/></Suspense>}></Route>
          {/* <Route path='/chatGPT' element={<Suspense fallback={<div>Loading...</div>}><ChatGPT/></Suspense>}></Route> */}
      </Routes>
   </BrowserRouter>
  </div>
        
    </>
  )
}

export default App

import { useState} from 'react'
import { useNavigate } from "react-router-dom";

const Models = () => {
    const [model , setModel] =useState('')
   const navigate =useNavigate()

    function getgemini(){
        navigate('/gemini')
    }
    // function getchatGPT(){
    //     navigate('/chatGPT')
    // }
    function getGrook(){
        navigate('/grook')
    }
   

    return (
        <div className="">
            <div className="flex flex-col items-center">
                <div className="text-center py-4 text-2xl sm:text-2xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Large Language Models
                </div>
                   
            </div>
            
              <div className="m-[20vh]">
                <div className=" flex justify-center text-gray-500 text-2xl mb-[5vh]">
                    Pick an AI model to explore
                </div>
                  <div className="flex flex-wrap gap-4  justify-evenly ">
                    {/* <button onClick={getchatGPT} >
                  <div className="p-[2px] rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    <div className="bg-white rounded-lg px-4 py-2">
                        Chat GPT
                    </div>
                </div>
                </button> */}
                <button onClick={getGrook}>
                  <div className="p-[2px] rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    <div className="bg-white rounded-lg px-4 py-2">
                        Groq
                    </div>
                </div>
                </button>
                <button onClick={getgemini}>
                  <div className="p-[2px] rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    <div className="bg-white rounded-lg px-4 py-2">
                        Gemini
                    </div>
                </div>
                </button>
                
                  </div>
              </div>
        </div>
    )
}

export default Models
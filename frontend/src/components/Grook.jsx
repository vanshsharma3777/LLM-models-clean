    import { useRef, useState } from "react";
    const backendURL = import.meta.env.VITE_BACKEND_URL
    import axios from "axios";
    import { useEffect } from "react";

    const Grook = () => {
        const [prompt, setPrompt] = useState("");
        const [selectModel, setSelectedModel] = useState("llama-3.1-8b-instant");
        const [loading, setLoading] = useState(false);
        const [reply, setReply] = useState([]);
        const [hideButton, setHideButton] = useState(true);
        const autoScrollRef = useRef(null)

        useEffect(() => {
            autoScrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, [reply, loading])

       

        async function callGrook() {
            if (!prompt.trim()) return; // prevent empty sends
            setReply((prev) => [...prev, { role: "user", text: prompt }]);
            setPrompt("");
            setLoading(true);
            
            let message=[] 
             messgae =((msg)=>{
                [...msg , prompt]
            })

            try {
                const res = await axios.post(`${backendURL}/api/groq`, {
                    prompt: message,
                    model: selectModel
                });
             
                let answer=[]
                const text =
                    res.data?.choices[0]?.message?.content ||
                    "No Response";
                setReply((prev) => [...prev,
                { role: "groq", model: selectModel, text: text }
                ]);
                answer= ((msg)=>{
                    [...msg , reply]
                
                
                })
            } catch (err) {
                 console.error("Groq API error:", err.response?.data || err.message);
    setReply((prev) => [
        ...prev,
        { role: "groq", text: "Error: " + (err.response?.data?.error || err.message) },
    ])
            } finally {
                setLoading(false);
            }
        }

        return (
            <div className="bg-[#0D1117] min-h-screen flex flex-col items-center">
                {/* Container */}
                <div className="flex flex-col w-full max-w-4xl h-screen border-x border-gray-700">
                    {/* Header */}
                    <div className="text-center py-4 text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        GROQ FREE MODEL
                    </div>
                    <div key={selectModel} className="h-[2px] w-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500  animate-shrink-expand" />

                    {/* Chat Section (scrollable middle) */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
                        {reply.map((msg, i) => (
                            <div
                                key={i}
                                className={`px-4 py-2 rounded-xl max-w-[80%] whitespace-pre-line sm:max-w-[70%] md:max-w-[60%] break-words ${msg.role === "user"
                                    ? "bg-blue-500 text-white self-end"
                                    : msg.model === 'llama-3.1-8b-instant'
                                        ? "bg-gray-300 text-black self-start"
                                        : msg.model === 'llama-3.3-70b-versatile'
                                            ? "bg-gray-300 text-black self-start"
                                            : msg.model === 'meta-llama/llama-guard-4-12b'
                                                ? "bg-gray-300 text-black self-start"
                                                : msg.model === 'whisper-large-v3'
                                                    ? "bg-gray-300 text-black self-start"
                                                    : "bg-gray-300 text-black self-start"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="flex px-4 py-2 my-2">
                                <div className="max-w-[80%] sm:max-w-sm md:max-w-md p-3 rounded-2xl bg-gray-200 text-gray-700 self-start flex items-center space-x-2">
                                    <span className="text-sm sm:text-base">
                                        Hang tight, working on it...
                                    </span>
                                    <span className="flex space-x-1 ml-2">
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-400"></span>
                                    </span>
                                </div>
                            </div>
                        )}
                        <div ref={autoScrollRef}></div>
                    </div>
                    {/* different models for the user to select */}
                    <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-around ">
                        <button
                            onClick={() => setSelectedModel("llama-3.1-8b-instant")}
                            className={`px-4 py-2 rounded-lg text-sm sm:text-base 
                    transition-colors duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${selectModel === "llama-3.1-8b-instant"
                                    ? "bg-red-500 text-white hover:bg-red-600  "
                                    : "bg-gray-200 text-black"
                                }`}
                        >
                            Groq Instant
                        </button>

                        <div className="">
                            <button
                                onClick={() => setSelectedModel("llama-3.3-70b-versatile")}
                                className={`px-4 py-2 rounded-lg text-sm sm:text-base 
                        transition-colors duration-500 ease-in-out transform hover:scale-105  active:scale-95   ${selectModel === "llama-3.3-70b-versatile"
                                        ? "bg-indigo-500 text-white hover:bg-indigo-600   "
                                        : "bg-gray-200 text-black"
                                    }`}
                            >
                                Groq Versatile
                            </button>
                        </div>

                        <button
                            onClick={() => setSelectedModel("meta-llama/llama-guard-4-12b")}
                            className={`px-4 py-2 rounded-lg text-sm sm:text-base 
                    transition-colors duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${selectModel === "meta-llama/llama-guard-4-12b"
                                    ? "bg-pink-500 text-white hover:pink-600 "
                                    : "bg-gray-200 text-black"
                                }`}
                        >
                            Groq Guard
                        </button>


                        <button
                            onClick={() => setSelectedModel("deepseek-r1-distill-llama-70b")}
                            className={`px-4 py-2 rounded-lg text-sm sm:text-base 
                    transition-colors duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${selectModel === "deepseek-r1-distill-llama-70b"
                                    ? "bg-green-500 text-white hover:green-600 "
                                    : "bg-gray-200 text-black"
                                }`}
                        >
                            Deep Seek
                        </button>


                    </div>



                    {/* Input Section (always at bottom) */}
                    <div className="w-full bg-[#161B22] flex items-center px-3 py-2 gap-2 border-t border-gray-700">
                        <input
                            value={prompt}
                            onChange={(e) => {
                                setPrompt(e.target.value);
                                setHideButton(e.target.value.trim() === "");
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    if (prompt.trim()) {
                                        callGrook();
                                    }
                                }
                            }}
                            type="text"
                            placeholder="Ask me anything..."
                            className="flex-1 bg-transparent text-sm sm:text-base px-2 py-2 outline-none text-white placeholder-gray-400"
                        />
                        {!hideButton && (
                            <button
                                className="flex items-center gap-1 text-sm sm:text-base font-semibold 
                            bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
                            bg-clip-text text-transparent hover:opacity-80"
                                onClick={callGrook}
                            >
                                Send
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="blue"
                                    viewBox="0 0 22 22"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    export default Grook;

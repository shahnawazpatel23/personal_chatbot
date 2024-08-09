import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Loader from "./Loader";


const Transparent = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(
    " Hey I'm Shahnawaz's personal chat bot!!!"
  
  );
  const [loading, setLoading] = useState(false);

  const handleClickspan = (e: any) => {
    setQuestion(e.target.innerText);
  };

  const handleInputChange = (e: any) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    try {
        setLoading(true);
        console.log('entered handleSubmit');

        const res = await axios.post("http://localhost:8001/chat",{ question }  );

        console.log('response is', res);
        const data = res.data.response;
        if (!data) {
            setResponse("Error while retrieving data");
            return;
        }

        setResponse(data);
        setLoading(false);
        setQuestion("");
    } catch (error) {
        console.log("error while handling", error);
        setResponse("Error while handling request");
    }
};


  return (
    <div className="absolute bg-transparent flex justify-center items-center ">
      <div className="flex flex-col justify-center items-center text-center space-y-4 px-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
    
              <span >Portfolio Pro</span>
          
  </h2>
    

        <div
          className="w-full  lg:w-[80vw] h-[70vh]  md:h-[70vh] lg:h-[70vh] p-4 sm:p-6 text-white flex flex-col justify-end overflow-y-auto relative"
          style={{
            background: "rgba(234, 220, 220, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        >
          <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row gap-2 absolute left-3 top-3">
            <div className="flex gap-2">
              <span
                className="px-3 py-1 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 cursor-pointer"
                onClick={handleClickspan}
              >
                About
              </span>
              <span
                className="px-3 py-1 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 cursor-pointer"
                onClick={handleClickspan}
              >
                Current Learning
              </span>
            </div>
            <div className="flex gap-2">
              <span
                className="px-3 py-1 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 cursor-pointer"
                onClick={handleClickspan}
              >
                Technical Skills
              </span>
              <span
                className="px-3 py-1 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 cursor-pointer"
                onClick={handleClickspan}
              >
                Education
              </span>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center mb-auto mt-auto min-w-full">
              {" "}
              <Loader />{" "}
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto mt-12">
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),
                }}
                className="text-left p-4 pt-6 md:pt-4 mt-3 " 
              >
                {response}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <div
          className="w-full sm:w-80 md:w-96 lg:w-128 p-4 sm:p-6 text-white flex items-center"
          style={{
            background: "rgba(234, 220, 220, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        >
          <input
            type="text"
            placeholder="Type your question here"
            name="question"
            value={question}
            onChange={handleInputChange}
            className="w-full p-2 bg-transparent border-none outline-none text-white placeholder-white"
          />
          <button
            onClick={handleSubmit}
            className="ml-2 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-800 transition-colors"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transparent;

import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Loader from './Loader'


const Transparent = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(" Hey I'm Shahnawaz's personal chat bot!!!");
  const [loading,setLoading] = useState(false)

  const handleClickspan = (e:any) =>{
    console.log('inside handleclickspan function',e.target.innerText)
    setQuestion(e.target.innerText)
  }

  const handleInputChange = (e:any) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async() => {
    try {
      setLoading(true)
      
      const res = await axios.post('https://personal-chatbot-server.vercel.app/chat',{question})
      console.log('res from backend',res);
      const data = res.data.response 
      if(!data) return <p> Error while retrieving data</p>
      // console.log('data from the backend is ',data)
      setResponse(data)
      setLoading(false)
      setQuestion('');
      
      
    } catch (error) {
      console.log('error while handling',error)
    }
  };

  return (
    <div className='absolute bg-transparent flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center text-center space-y-4 px-4'>
        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-white'>Portfolio Pro</h2>
        
        <div
      className='w-full  lg:w-[80vw] h-[70vh]  md:h-[70vh] lg:h-[70vh] p-4 sm:p-6 text-white flex flex-col justify-end overflow-y-auto relative'
      style={{
        background: 'rgba(234, 220, 220, 0.2)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
      }}
    >
      <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row gap-2 absolute left-3 top-3'>
        <div className='flex gap-2'>   

        <span
          className='px-3 py-1 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 cursor-pointer'
          onClick={handleClickspan}
        >
          About
        </span>
        <span
          className='px-3 py-1 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 cursor-pointer'
          onClick={handleClickspan}
        >
          Current Learning
        </span>
        </div>
        <div className='flex gap-2' >  

        <span
          className='px-3 py-1 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 cursor-pointer'
          onClick={handleClickspan}
        >
          Technical Skills
        </span>
        <span
          className='px-3 py-1 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 cursor-pointer'
          onClick={handleClickspan}
        >
          Education
        </span>
        </div>
      </div>
      {loading ? (<div className='z-20 flex justify-center items-center mb-auto mt-auto'> <Loader/> </div>):(<div className='flex-grow overflow-y-auto mt-12'>
          <ReactMarkdown className='self-start whitespace-pre-wrap p-6 pt-8 text-left mt-20 lg:mt-12'>{response}</ReactMarkdown>
        </div>)}
        </div>
        <div
          className='w-full sm:w-80 md:w-96 lg:w-128 p-4 sm:p-6 text-white flex items-center'
          style={{
            background: 'rgba(234, 220, 220, 0.2)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          <input
            type='text'
            placeholder='Type your question here'
            name='question'
            value={question}
            onChange={handleInputChange}
            className='w-full p-2 bg-transparent border-none outline-none text-white placeholder-white'
          />
          <button
            onClick={handleSubmit}
            className='ml-2 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-800 transition-colors'
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transparent;
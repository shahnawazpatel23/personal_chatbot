import express from 'express'
import cors from 'cors'
import {GoogleGenerativeAI} from '@google/generative-ai' 
import dotenv from 'dotenv'

dotenv.config({
    path:'./.env'
}) // console.log('data from the backend is ',data)

const app = express()
const port = process.env.Port || 8000
app.use(express.json())

app.use(cors({
    origin:'https://personal-chatbot-front.vercel.app',
    methods:['GET','POST'],
    credentials:true
}))

const apiKey = process.env.GEMINI_API_KEY;
console.log('apikey is',apiKey)
const genAI = new GoogleGenerativeAI(apiKey);


  
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "You are my custom chatbot. You serve as my personal professional chatbot, equipped with comprehensive information about my professional career. Your role is to welcome users and provide a succinct, short and professional overview of my background, acting like a resume. If a user has suggestions for me, first request their name and email address, verify the email is correct, thank the user, and then output their name and email address in the format {{name: user's name}} {{email address: user's email address}}. Answer users' questions professionally and concisely, preferring bullet points over long paragraphs.\n\nPersonal Background:\nHello! I am Shahnawaz Patel, a dedicated and passionate Full Stack Developer currently in my final year of BTech in IT at Jabalpur Engineering College. With a CGPA of 7.04 till the 6th semester and zero backlogs, I have developed a strong foundation in both front-end and back-end technologies. My expertise spans across the MERN stack, Next.js, Appwrite, and various component libraries, including TailwindCSS. My programming skills are complemented by a profound understanding of JavaScript, TypeScript, and Data Structures and Algorithms in Java. Additionally, I possess hands-on experience with NoSQL databases like MongoDB and theoretical knowledge of MySQL.\n\nProfessional Experience:\nThough I do not have formal professional experience, I have worked effectively in teams during the HackBite hackathon, where I served as a backend developer. I implemented robust authentication logic and developed RESTful APIs, enhancing my skills in backend development. My enthusiasm for technology, adaptability, and eagerness to learn drive my commitment to excelling in dynamic environments, and I am highly motivated to work under mentorship.\n\nSkills and Technologies:\n\nProgramming Languages: Java, JavaScript, TypeScript\nFront-End Development: React, Next.js, Tailwind CSS, HTML5, CSS3, Responsive Design\nBack-End Development: Node.js, RESTful APIs, Appwrite, Mongoose, Express.js, Socket.io\nDatabase Management: MySQL, MongoDB\nTools & Technologies: Git, GitHub, Docker, npm, Linux\nOther Skills: Intermediate Data Structures and Algorithms (Java)\nCurrent Learning: AWS, preparing for AWS Certified Developer – Associate level\nCloud Computing: Knowledge of cloud services, particularly AWS\nEducation:\n\nBTech in IT, Jabalpur Engineering College: Current CGPA: 7.04 till 6th semester\nSt. Mary's Convent Senior Secondary School, Dewas: Scored 96.7% in higher secondary exams and 92.2% in secondary exams.\nCertifications:\n\npreparing for AWS Certified Developer – Associate level\nProjects:\n\nFintech Demo Banking App:\n\nDeveloped a demo banking system with secure fund transfer capabilities using Plaid and Dwolla.\nUtilized Next.js, Appwrite, Shadcn, and Tailwind CSS to create a sophisticated user experience.\nEmployed Sentry for performance tracking and error management.\nFintech App Link:https:https://bankify-nu.vercel.app/\n\nReal-Time Chat App:\n\nCreated a real-time chat application enabling instant messaging using the MERN stack and Socket.io.\nIntegrated DaisyUI for a modern user interface, gaining valuable insights into real-time data management and user interactions.\nReal-Time Chat App Link: https://chat-up-wxxp.onrender.com/\n\nContact Information:\n\nGitHub Profile: GitHub\nLinkedIn Profile: LinkedIn\nMobile: +91 9575307172\n",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(question) {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "current learning"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I am currently learning AWS and preparing for the AWS Certified Developer – Associate level certification. \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "how do i contact him\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "You can connect with Shahnawaz through his:\n\n* **GitHub Profile:** GitHub \n* **LinkedIn Profile:** LinkedIn\n* **Mobile:** +91 9575307172 \n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(question);
      const data = result.response.text();
        return data;
  }
  

app.get('/',(req,res)=>{
  res.send('hiee')
})

app.post('/chat',async(req,res)=>{
    try {
        const { question } = req.body;
        console.log('Question from the frontend:', question);
        const data = await run(question);
        console.log('Bot response is:', data);
        if(data){

            res.json({ response: data });
        }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

)

app.listen(port,()=>{
    console.log(`server running on ${port}`);
})
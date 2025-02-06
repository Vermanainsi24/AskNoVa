import { createContext, useState, useEffect } from "react";
import run from "../config/geminiapi";
import './context.css';
// Create Context (Correct Name)
export const Context = createContext();

const ContextProvider = (props) => {
  const [response, setResponse] = useState(""); // Store chatbot response
  const [input,setinput]=useState("");
  const [recentPrompt,setRecentPrompt]=useState("")
  const[prevPrompt,setPrevPrompt]=useState([]);
  const [showResult,setShowResult]=useState(false);
  const [loading,setloading]=useState(false);
  const [resultData,setResultData]=useState("");

  //typing effect...
  const delayPara=(index,nextWord)=>{
    setTimeout(function(){
      setResultData(prev=>prev+nextWord);

    },75*index)

  }
  const newchat=()=>{
      setloading(false);
      setShowResult(false);
  }
  

  const onSent = async (prompt) => {
    setResultData("");
    setloading(true);
    setShowResult(true);
  
    let userPrompt = prompt !== undefined ? prompt : input;
  
    if (userPrompt.trim() !== "") {
      setPrevPrompt((prev) => [...prev, userPrompt]);
    }
  
    setRecentPrompt(userPrompt);
    console.log("Sending Prompt:", userPrompt);
  
    let response = await run(userPrompt);
    response.split("**").join("<p>").split("*").join("<br>");
    // ✅ Correct Markdown Formatting
    let formattedResponse = response
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold (**text** → <strong>text</strong>)
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic (*text* → <em>text</em>)
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') // Code Blocks (```code```)
    .replace(/`([^`]+)`/g, '<code>$1</code>') // Inline Code (`code` → <code>code</code>)
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>') // Links ([text](url))
    .replace(/\n/g, "<br>"); // Line breaks

    setResultData(formattedResponse);
    setloading(false);
    setinput("");
  };
  
  
  // useEffect(() => {
  //   onSent("What is ReactJS?"); // Fetch initial data on mount
  // }, []);

  const contextValue = {
    response, // Provide response to context consumers
    onSent,   // Provide function to send new prompts
    prevPrompt,
    setPrevPrompt,
    setRecentPrompt,
    setShowResult,
    setloading,
    setResultData,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setinput,
    newchat,
    
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;

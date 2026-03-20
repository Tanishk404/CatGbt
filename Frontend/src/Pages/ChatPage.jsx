import React, { useContext, useRef } from "react";
import Layout from "../components/Layout";

import Input from "@/components/InPutChat/Input";
import CatPeeping from "@/components/CatAnimate/CatPeeping";
    
import { useState, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNavigate, useParams } from "react-router-dom";
import SearchChat from "@/components/SearchChat";
import CatLoading from "@/components/CatAnimate/CatLoading";
import { toast, ToastContainer } from "react-toastify";
import MiniDashBoard from "@/components/MiniDashBoard/MiniDashBoard";
import { ToggleContext } from "@/context/OffToggle";
import UserDash from "@/components/UserDashBoard/UserDash";

function ChatPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [messages, setMessage] = useState([]);
  const [state, ChangeState] = useState(false);
  const [isLoading, setLoading] = useState(null)
  const [exceedError, setEceedError] = useState(null)





  const [dashBoard, setDashBoard] = useState(false)

  const refDash = useContext(ToggleContext)
  useEffect(() => {
  
    const handleClickOutside = (e) => {
      setDashBoard(false)
  
    }
  
    document.addEventListener("mousedown", handleClickOutside)
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  
  }, [])
  








  

  useEffect(() => {
    if(!id) return;

    const functionMessages = async () => {
        try {
        
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/chat/${id}`)

          setMessage(response.data.message)
        } catch (error) {
          toast.error(error.response.data.message)
            console.log(error)
            navigate("/");
        }

    }

    functionMessages();
  }, [id, navigate])


  

  
  const AutoScroll = useRef(null)
  
  useEffect(() => {
    const container = AutoScroll.current;
    if(container){
      container.scrollTo({
        top : container.scrollHeight,
        behavior: 'smooth'
      })
    }
  },[messages])

  const [searchChat, setSearchChat] = useState(false)

  return (
    <Layout searchChat={searchChat} setSearchChat={setSearchChat}>

    <ToastContainer />

      <div  className="h-full flex-1 flex justify-center overflow-hidden dark:bg-[#212121]">
        
        <SearchChat searchChat={searchChat} setSearchChat={setSearchChat} />


        


    <div className="w-full flex justify-center"> 
        <div ref={AutoScroll} className="w-full flex items-center flex-1
         bg-slate-100 dark:bg-[#212121] overflow-y-scroll h-full flex-col pb-48 pt-36">
          <UserDash />

            {messages.map((v, i) => {
  
              return (
                <div
                key={v._id}
                  id=""
                  className={clsx(
                    " h-auto p-1 left-0 flex items-start text-start  w-full max-w-[50rem] gap-5",
                    v.role === "assistant" ? "justify-start" : "justify-end",
                  )}
                >
                  <div
                    className={clsx(
                      v.role === "assistant"
                        ? "bg-white dark:bg-[#212121] w-full max-w-[50rem]  h-auto mb-10 p-2 text-start"
                        : "bg-black dark:bg-[#2f2f2f] text-white w-auto h-auto rounded-tl-xl rounded-bl-xl rounded-br-xl p-2 mb-10 text-start",
                    )}
                  >
                    
                      <ReactMarkdown
  components={{
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");

      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-200 px-1 rounded">
          {children}
        </code>
      );
    },
  }}
>
  
  {v.content}
</ReactMarkdown>
                  </div>
                </div>
              );
            })}

                      {
            isLoading&&(
              <div className="h-auto rounded-tl-xl rounded-bl-xl rounded-br-xl p-2 mb-10 w-full text-start">
                  <CatLoading />
              </div>
            )
          }

            
          </div>


        </div>

        <div
        
          className="flex
               justify-center dark:bg-[#212121] bg-[#F1F5F9] flex-col gap-5 max-w-[50rem] bottom-0 items-center w-full fixed"
        >
          <div
            className="flex
               justify-center flex-col gap-5 items-center relative w-full pl-2 pr-2 "
          >
            <CatPeeping state={state} />

            <Input isLoading={isLoading} setLoading={setLoading} ChangeState={ChangeState} setMessage={setMessage} />
          </div>
          <small className="text-gray-500">
            For better AI components, check out AI Elements
          </small>

        </div>
      </div>
   
    </Layout>
  );
}

export default ChatPage;

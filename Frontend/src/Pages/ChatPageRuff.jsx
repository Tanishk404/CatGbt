import React, { useRef, useState, useEffect } from "react";
import Layout from "../components/Layout";
import Input from "@/components/InPutChat/Input";
import CatPeeping from "@/components/CatAnimate/CatPeeping";
import CatLoading from "@/components/CatAnimate/CatLoading";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";

function ChatPage() {
  const { id } = useParams();
  const [messages, setMessage] = useState([]);
  const [state, ChangeState] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const AutoScroll = useRef(null);

  // Initial Load
  useEffect(() => {
    if (!id) {
      setMessage([]); // Clear messages if it's a new chat
      return;
    }
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/chat/${id}`);
        setMessage(res.data.message);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, [id]);

  // Auto Scroll Logic
  useEffect(() => {
    if (AutoScroll.current) {
      AutoScroll.current.scrollTop = AutoScroll.current.scrollHeight;
    }
  }, [messages, isLoading]); // Scroll when messages change OR loading starts

  return (
    <Layout>
      <div className="h-dvh flex justify-center">
        <div ref={AutoScroll} className="w-full max-w-[50rem] flex flex-1 bg-slate-100 overflow-y-auto flex-col pb-48 pt-36 px-4">
          {messages.map((v) => (
            <div key={v._id || Math.random()} className={clsx("flex w-full mb-4", v.role === "assistant" ? "justify-start" : "justify-end")}>
              <div className={clsx("p-3 max-w-[80%] rounded-lg shadow-sm", v.role === "assistant" ? "bg-white text-black" : "bg-black text-white")}>
                <ReactMarkdown>{v.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && <CatLoading />}
        </div>

        <div className="fixed bottom-0 w-full max-w-[50rem] bg-[#F1F5F9] flex flex-col items-center pb-4">
          <CatPeeping state={state} />
          <Input 
            isLoading={isLoading} 
            setLoading={setLoading} 
            ChangeState={ChangeState} 
            setMessage={setMessage} // Pass the setter
          />
        </div>
      </div>
    </Layout>
  );
}
export default ChatPage;
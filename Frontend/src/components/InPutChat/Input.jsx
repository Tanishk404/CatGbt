import clsx from "clsx";
import { Paperclip, Mic, X, CircleArrowUp, Pause } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import SpeechRecognition, { 
  useSpeechRecognition,
} from "react-speech-recognition";

import { OpenImgContext } from "@/context/OpenImg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useTransition } from "react";

function Input({ ChangeState, isLoading, setLoading, setMessage }) {
  const [textval, setTextVal] = useState("");

   const {openImage, setOpenImage, mediaName, setMedia } = useContext(OpenImgContext)

  const FileInputRef = useRef(null);


  const [removeMedia, setRemoveMedia] = useState(false);

  const [prevTranscript, setPrevTranscript] = useState("");

  const navigate = useNavigate()

  const [isPending, startTransition] = useTransition()
   

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const SpeechText = transcript.substring(prevTranscript.length).trim();

  useEffect(() => {
    if (SpeechText) {
      setTextVal((prev) => prev + " " + SpeechText);
      setPrevTranscript(transcript);
    }
  }, [transcript, prevTranscript]);

  const startListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      SpeechRecognition.abortListening();
      SpeechRecognition.resetTranscript();
      setPrevTranscript("");
    } else {
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-US",
      });
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return;
  }

  const InputHandle = (e) => {
    const val = e.target.value;
    setTextVal(val);
    ChangeState(true)
  };


  const { id } = useParams()

  const HandlUserSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      setTextVal('')
      const userMsg = {
        _id: Date.now().toString(),
        role: "user",
        content: textval
      }

      setMessage((prev) => [...prev, userMsg])

      
      try {

          // const tempId = id || Date.now().toString()

          // // Navigate immediately
          // if(!id){
          //   startTransition(() => {
          //     navigate(`/chat/${tempId}`)
          //   })
          // }


        const respon = await axios.post(import.meta.env.VITE_API_URL, 
      {
        role: "user",
        content: textval,
        conversationId:id

      }
    )

   
      if(respon.data){
        const AiMsg = {
          _id: Date.now().toString(),
          role: 'assistant',
          content: respon.data.data
        }
        setMessage((prev) => [...prev, AiMsg])
      }

      if(!id && respon.data.conversationId){
        startTransition(() => {
          navigate(`/chat/${respon.data.conversationId}`)

        })
      }
        
      } catch (error) {

        console.log(error.message)

        toast.error(error.response.data.message)
        if(error.response.data.message === "Invalid token"){
          setTimeout(() => {
            navigate("/user/login")
          }, 1500);

        }


      } finally{
        setLoading(false)
      }
  }





const HandleKeyDown = (e) => {
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault()
    if(isLoading) return;

    HandlUserSubmit(e);
  }
}




  const MediaInputHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia({
        url : URL.createObjectURL(file),
        fileName : file.name,
        fileType : file.type

      });
    }
  };

  const RemoveOnClick = () => {
      setMedia(null);
      if(FileInputRef.current){
          FileInputRef.current.value = ""
        }
    };

useEffect(() => {
  if (!mediaName) return;

  return () => {
    URL.revokeObjectURL(mediaName);
  };
}, [mediaName]);

const PreviewFullImg = () => {
    setOpenImage(true)

}


  return (
    <>
    

   
      <div className="flex rounded-md flex-col justify-center w-full sticky max-w-[42rem] bottom-0 items-center focus-within:ring-1 focus-within:ring-black focus-within:border-black dark:bg-[#373737] bg-white">
        {/* This Is Media (Images, Pngs etc) Div */}
        <div
          className={clsx(

            "dark:bg-[#373737] bg-white w-full h-24 p-2 rounded-t-lg",
            mediaName ? "block" : "hidden",
          )}
        >
          <div className="rounded-lg  w-20 h-20 items-center flex justify-center hover:border-gray-100 relative">
            <small
              className={clsx(
                "bg-gray-100 -top-6 -right-6 z-50 absolute text-xs w-20",
                removeMedia && removeMedia ? "block" : "hidden",
              )}
            >
              Remove file
            </small>
            <button
              onMouseEnter={() => setRemoveMedia(true)}
              onMouseLeave={() => setRemoveMedia(false)}
              onClick={RemoveOnClick}
              className="absolute right-0 top-0 z-40 h-4 w-4 text-center items-center flex justify-center bg-white rounded-full "
            >
              <X className="h-4 w-4 shadow-lg" />
            </button>

            <div className="absolute bg-cover bg-center h-full w-full hover:bg-white opacity-25 cursor-pointer" onClick={PreviewFullImg}></div>
            {
                mediaName?.fileType.startsWith("image/") && (
                        <img
                          className="border object-cover border-gray-900 rounded-lg h-full w-full "
                          src={mediaName.url}
                          alt=""
                        /> 
                        
                        
                    )  
            }

          </div>
        </div>
    <form className="w-full">

        <textarea
          name="userinput"
          value={textval}
          onChange={InputHandle}
          onBlur={() => ChangeState(false)}
        
          onKeyDown={HandleKeyDown}
          aria-activedescendant={1}
          rows={2}
          className="text-sm dark:bg-[#373737] leading-tight resize-none w-full rounded-t-md overflow-y-auto h-20 outline-none pt-2 pl-2"
          placeholder="Type or speack your message..."
          id=""
        ></textarea>
        <div className="flex justify-between w-full h-3 pb-5 px-4 py-2 mb-1 rounded-b-md">
          <div className="flex gap-3 items-center">
            <label className="cursor-pointer" htmlFor="file_input">
              <input
                ref={FileInputRef}
                className="hidden"
                id="file_input"
                type="file"
                accept="image/*"
                onChange={MediaInputHandle}
              />

              <Paperclip className="text-gray-500 h-4" />
            </label>

            <button
            type="button"
              className={clsx(
                "h-10 w-10 flex items-center justify-center",
                listening ? "bg-gray-300 rounded-full" : "",
              )}
              onClick={startListening}
            >
              {
                listening ?           <Pause className="text-gray-500 h-4" /> : <Mic className="text-gray-500 h-4" />
              }
    
            </button>
          </div>

          <div className="flex gap-4 items-center">
            <small>Cat 1.0</small>
            <button
              type="submit"
              onClick={HandlUserSubmit}
              disabled={isLoading || !textval?.trim() 
               }
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CircleArrowUp
                strokeWidth={1.2}
                fill={textval.trim() ? "#000" : "gray"}
                className="text-white h-9 w-9 border-none outline-none font-extralight text-xs"
              />
            </button>
          </div>
        </div>
        </form>
      </div>
    </>
  );
}

export default Input;

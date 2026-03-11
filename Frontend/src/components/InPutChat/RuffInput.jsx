import React, { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Paperclip, Mic, X, CircleArrowUp } from "lucide-react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { OpenImgContext } from "@/context/OpenImg";

function Input({ ChangeState, isLoading, setLoading, setMessage }) {
  const [textval, setTextVal] = useState("");
  const { setOpenImage, mediaName, setMedia } = useContext(OpenImgContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const FileInputRef = useRef(null);
  const [removeMedia, setRemoveMedia] = useState(false);
  const [prevTranscript, setPrevTranscript] = useState("");

  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Speech to Text Logic
  useEffect(() => {
    const speechText = transcript.substring(prevTranscript.length).trim();
    if (speechText) {
      setTextVal((prev) => (prev ? prev + " " + speechText : speechText));
      setPrevTranscript(transcript);
    }
  }, [transcript, prevTranscript]);

  const startListening = (e) => {
    e.preventDefault(); // Prevent form submission
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      setPrevTranscript("");
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    }
  };

  const HandlUserSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!textval.trim() || isLoading) return;

    const currentText = textval;
    setTextVal(''); // Clear input immediately for better UX
    setLoading(true);

    // 1. ADD USER MESSAGE TO UI INSTANTLY (Optimistic Update)
    const userMsg = {
      _id: Date.now().toString(),
      role: "user",
      content: currentText
    };
    setMessage((prev) => [...prev, userMsg]);

    try {
      const respon = await axios.post(`http://localhost:3000/`, {
        role: "user",
        content: currentText,
        conversationId: id
      });

      // 2. ADD AI RESPONSE TO UI (Matches your backend res.status(200).json({ data: AiResponse }))
      if (respon.data.data) {
        const aiMsg = {
          _id: (Date.now() + 1).toString(),
          role: "assistant",
          content: respon.data.data 
        };
        setMessage((prev) => [...prev, aiMsg]);
      }

      // 3. Handle Navigation for new chats
      if (!id && respon.data.conversationId) {
        navigate(`/chat/${respon.data.conversationId}`);
      }

    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const HandleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      HandlUserSubmit();
    }
  };

  const MediaInputHandle = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia({
        url: URL.createObjectURL(file),
        fileName: file.name,
        fileType: file.type
      });
    }
  };

  const RemoveOnClick = () => {
    if (mediaName?.url) URL.revokeObjectURL(mediaName.url);
    setMedia(null);
    if (FileInputRef.current) FileInputRef.current.value = "";
  };

  if (!browserSupportsSpeechRecognition) {
    return <div className="text-red-500">Browser does not support speech recognition.</div>;
  }

  return (
    <div className="flex rounded-md flex-col justify-center w-full sticky max-w-[42rem] bottom-0 items-center focus-within:ring-1 focus-within:ring-black focus-within:border-black bg-white shadow-lg">
      
      {/* Media Preview Section */}
      {mediaName && (
        <div className="bg-white w-full h-24 p-2 rounded-t-lg border-b">
          <div className="rounded-lg w-20 h-20 items-center flex justify-center relative">
            <button
              onClick={RemoveOnClick}
              className="absolute -right-2 -top-2 z-40 h-5 w-5 bg-white border rounded-full flex items-center justify-center hover:bg-gray-100"
            >
              <X className="h-3 w-3" />
            </button>
            {mediaName.fileType.startsWith("image/") && (
              <img
                className="border object-cover border-gray-300 rounded-lg h-full w-full cursor-pointer"
                src={mediaName.url}
                alt="preview"
                onClick={() => setOpenImage(true)}
              />
            )}
          </div>
        </div>
      )}

      <form onSubmit={HandlUserSubmit} className="w-full">
        <textarea
          name="userinput"
          value={textval}
          onChange={(e) => setTextVal(e.target.value)}
          onBlur={() => ChangeState(false)}
          onFocus={() => ChangeState(true)}
          onKeyDown={HandleKeyDown}
          rows={2}
          className="text-sm leading-tight resize-none w-full rounded-t-md overflow-y-auto h-20 outline-none pt-3 px-4"
          placeholder="Type or speak your message..."
        />
        
        <div className="flex justify-between items-center px-4 py-2 mb-1">
          <div className="flex gap-1 items-center">
            <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors" htmlFor="file_input">
              <input
                ref={FileInputRef}
                className="hidden"
                id="file_input"
                type="file"
                accept="image/*"
                onChange={MediaInputHandle}
              />
              <Paperclip className="text-gray-500 h-5 w-5" />
            </label>

            <button
              type="button"
              className={clsx(
                "p-2 rounded-full transition-colors",
                listening ? "bg-red-100 text-red-600 animate-pulse" : "hover:bg-gray-100 text-gray-500"
              )}
              onClick={startListening}
            >
              <Mic className="h-5 w-5" />
            </button>
          </div>

          <div className="flex gap-4 items-center">
            <small className="text-gray-400 font-medium">Gemini 1.5 Flash</small>
            <button
              type="submit"
              disabled={!textval.trim() || isLoading}
              className="disabled:opacity-30 disabled:grayscale transition-all transform active:scale-95"
            >
              <CircleArrowUp
                strokeWidth={1.2}
                fill={textval.trim() ? "#000" : "#ccc"}
                className="text-white h-9 w-9"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Input;
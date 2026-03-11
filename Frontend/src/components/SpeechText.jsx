import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic } from 'lucide-react';
const Dictaphone = () => {
    
  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition({
    clearTranscriptOnListen: false,
  });

const toggleMic = () => {
  if (listening) {
    SpeechRecognition.stopListening()
  } else {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" })
  }
}
  

  if (!browserSupportsSpeechRecognition) {
    return null
  }

  return (
    <>
      <button onClick={toggleMic}>
        <Mic></Mic>
      </button>
        <p>{transcript}</p>
    </>
  );
};
export default Dictaphone;
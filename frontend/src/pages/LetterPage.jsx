import React, { useState, useEffect, useRef } from 'react';
import aud from '../assets/sometimes1.mp3';
import { time } from 'framer-motion';

const lyrics = [
  { time: 6, text: "I never believed in forever" },
  { time: 9, text: "Till the moment you smiled my way" },
  { time: 13, text: "You lit a fire I can't remember" },
  { time: 16, text: "Ever living without today" },
  { time: 19, text: "Every word you say feels like a sunrise" },
  { time: 22.5, text: "Every touch pulls me through the dark" },
  { time: 26, text: "You're the calm in all my chaos," },
  { time: 29, text: "The rhythm to my heart" },
  { time: 31, text: "Cause every beat says your name," },
  { time: 35, text: "Every breath feels the same" },
  { time: 37, text: "You're the wish I never knew I prayed" },
  { time: 41, text: "You're the home my heart has made" },
  { time: 44, text: "If love's a song, you're my refrain" },
  { time: 49, text: "Every beat says your name" },
  { time: 62, text: "When I close my eyes, I still see you" },
  { time: 67, text: "Dancing softly in my dreams" },
  { time: 69, text: "You turn my silence into music" },
  { time: 73, text: "And now love's all it seems" },
  { time: 76, text: "No stars can outshine you tonight" },
  { time: 79, text: "No words can hold what I feel inside" },
  { time: 83, text: "If I could paint the sky with how I love you" },
  { time: 87, text: "Every color would spell 'Be Mine'" },
  { time: 88, text: "Every beat says your name," },
  { time: 93, text: "Every breath feels the same" },
  { time: 95, text: "You're the wish I never knew I prayed" },
  { time: 98, text: "You're the home my heart has made" },
  { time: 102, text: "If love's a song, you're my refrain" },
  { time: 106, text: "Will you be mine today?" },
  { time: 121, text: "When I close my eyes, I still see you" },
  { time: 124, text: "Dancing softly in my dreams" },
  { time: 128, text: "You turn my silence into music" },
  { time: 133, text: "And now love's all it seems" },
  { time: 136, text: "If love's all it seems, and not a frayed away" },
  { time: 141, text: "Will you be mine today?" },
  {time: 143, text:"💍"}
];

function LetterPage() {
  const audioRef = useRef(null);
  const [currentLine, setCurrentLine] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [started, setStarted] = useState(false); // track playback start
  const typingRef = useRef(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setStarted(true); // trigger the lyric typing
    }
  };

  // Check audio time and update current line
  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      if (!audioRef.current) return;
      const currentTime = audioRef.current.currentTime;

      const activeLine = [...lyrics].reverse().find(line => line.time <= currentTime);
      if (activeLine && activeLine !== currentLine) {
        setCurrentLine(activeLine);
        setTypedText('');
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentLine, started]);

  // Typing effect for current line
  useEffect(() => {
    if (!currentLine) return;

    let index = 0;
    clearInterval(typingRef.current);

    typingRef.current = setInterval(() => {
      if (index <= currentLine.text.length) {
        setTypedText(currentLine.text.slice(0, index));
        index++;
      } else {
        clearInterval(typingRef.current);
      }
    }, 80);

    return () => clearInterval(typingRef.current);
  }, [currentLine]);

  return (
    <div className="w-screen min-h-screen bg-pink-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl h-[50vh] flex flex-col justify-center items-center bg-white rounded-xl shadow-lg p-6 overflow-hidden">
        <div className="text-center text-lg sm:text-xl md:text-2xl font-mono text-indigo-700">
          {typedText}
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl my-6 font-semibold">🎶 Click to Read 🎶</h1>

      <audio ref={audioRef} src={aud} />

      <button
        onClick={handlePlay}
        className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl text-lg font-medium transition-all duration-300"
      >
        📖 Read
      </button>
    </div>
  );
}

export default LetterPage;

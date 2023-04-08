import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { useRef } from "react";
import { useState } from "react"
import Picker from '@emoji-mart/react'


function input() {
    const [input,setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);// by default null
    // as soon as i select a file the image is put inside of a piece of state called selectedFile
    const [showEmojis,setShowEmojis] = useState(false)
    const filePickerRef = useRef(null)

    const addImageToPost = () => {};

    const addEmoji = (e) => {
      let sym = e.unified.split("-");
      let codesArray = [];
      sym.forEach((el) => codesArray.push("0x" + el));
      let emoji = String.fromCodePoint(...codesArray);
      setInput(input + emoji);
    };


  return (
  <div className={`border-b border-gray-700 p-3 flex space-x-3
  overflow-y-scroll`}>{/**use gap-x-3 to see how many pixels */}
      <img src="/unnamed.png"                         
    alt=""
     className='h-11 w-11 rounded-full cursor-pointer'
     />
     <div className="w-full divide-y divide-gray-700">
        {/* divide-y creates a line between the children */}
        
        {/* space increases when typing in input */}
        <div className={`${selectedFile && "pb-7"} ${input &&
        "space-y-2.5"}`}>
            <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)}//now i can type anything i want
            name="" 
            rows="2" 
            placeholder="What's happening?"
            className="bg-transparent outline-none text-[#d9d9d9]
            text-lg placeholder-gray-500 tracking-wide w-full 
            min-h-[50px]"
            />
            {/* if my selected file is there(true) then i want the code below to be there */}
            {selectedFile && (
            <div className="relative">
                <div className="absolute w-8 bg-[#15181c] 
                hover: bg-[#272c26] bg-opacity-75 rounded-full flex
                items-center justify-center top-1 left-1 
                cursor-pointer" onClick={() => setSelectedFile(null)}>
                    <XIcon className="text-white h-5"/>
                </div>
                <img src={selectedFile}
                 alt="" 
                className="rounded-2xl max-h-80 object-contain"
                />
            </div>
            )}
        </div>

            <div className="flex items-center justify-between pt-2.5">
                <div className="flex items-center ">
                    <div className="icon"
                    onClick={() => filePickerRef.
                    current.click()}>{/*the current event of when i click the icon the event occurs */}
                        <PhotographIcon className="h-[22px] text-[#1d9bf0]"/>
                        <input type="file" onChange={addImageToPost} ref=
                        {filePickerRef} hidden
                        />
                        {/* useRef hook to create references i am providing(pointing) a ref to the input field i want to have the reference basically click the icon */}
                    </div>

                    <div className="icon rotate-90">
                <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              <div className="icon" onClick={() => setShowEmojis
                (!showEmojis)}>
                <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              <div className="icon">
                <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              {showEmojis &&(
               <Picker 
                   onEmojiSelect={addEmoji}
               theme="dark"
             />
              )}
            </div>
            <button className="bg-[#1d9bf0] text-white 
            rounded-full px-4 py-1.5 font-bold 
            shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] 
            disabled:opacity-50 disabled:cursor-default"
             disabled={!input.trim() && !selectedFile}
            //  onClick={sendPost}
             >
              Tweet
            </button>
         </div>
     </div>
  </div>
  )
}

export default input
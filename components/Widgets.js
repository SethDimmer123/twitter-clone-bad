import { SearchIcon } from "@heroicons/react/outline";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";

function Widgets() {

  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
      <div className="sticky top-0 py-1.5 z-50 w-11/12 xl:w-9/12">
        <div className="flex items-center bg-[#202327] p-3 rounded-full relative">
          <SearchIcon className="text-gray-500 h-5 z-50" />
          <input
            type="text"
            className="bg-transparent placeholder-gray-500 outline-none  text-[#d9d9d9] absolute inset-0 pl-11 border-[#181212] w-full focus:border-[#1d9bf0] rounded-full focus:bg-black focus:shadow-lg"
            placeholder="Search Twitter"
          />
        </div>
      </div>

      <div className="text-[#d9d9d9] space-y-3 bg-[#ffffff] pt-2 rounded-xl w-11/12 xl:w-9/12">
        <h4 className="font-bold text-xl px-4 text-black">What's happening</h4>
        <div className="widgets">
      <div className="widgets__Container">
        <TwitterTweetEmbed tweetId="858551177860055040" />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="cleverQazi"
          options={{ height: 400 }}
        />

        <TwitterShareButton
          url={"https://facebook.com/cleverprogrammer"}
          options={{ text: "#nextjs is awesome", via: "cleverqazi" }}
        />
      </div>
    </div>
  </div>
</div>
  )
}

export default Widgets;
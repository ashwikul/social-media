import twitter from "../assets/twitter.svg";
import facebook from "../assets/facebook.svg";
import reddit from "../assets/reddit.svg";
import discord from "../assets/discord.svg";
import whatsapp from "../assets/whatsapp.svg";
import messenger from "../assets/messenger.svg";
import telegram from "../assets/telegram.svg";
import instagram from "../assets/instagram.svg";
import copy from "../assets/copy.svg";
import SocialMediaIcon from "./SocialMediaIcon";
import { useState } from "react";

const Share = ({ post, setIsPostShared }) => {
  const postUrl = `http://localhost:5173/posts/${post.id}`;
  const [copySuccess, setCopySuccess] = useState(false); // State for copy success

  // Function to handle sharing via social media

  const handleShare = (platform) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          postUrl
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          postUrl
        )}&text=${encodeURIComponent(post.caption)}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          post.caption
        )}%20${encodeURIComponent(postUrl)}`;
        break;
      case "reddit":
        shareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(
          postUrl
        )}&title=${encodeURIComponent(post.caption)}`;
        break;
      case "discord":
        shareUrl = `https://discordapp.com/channels/@me?text=${encodeURIComponent(
          postUrl
        )}`;
        break;
      case "messenger":
        shareUrl = `https://www.messenger.com/t/?link=${encodeURIComponent(
          postUrl
        )}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
          postUrl
        )}&text=${encodeURIComponent(post.caption)}`;
        break;
      case "instagram":
        // Instagram doesn't have a direct sharing URL, so we can open the Instagram app with the link
        // Note: Instagram typically does not support URL sharing in this way, so this is a workaround.
        shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(
          postUrl
        )}`;
        break;
      default:
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(postUrl)
      .then(() => {
        console.log("copy is successfull");
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(() => {
        console.error("Failed to copy the URL.");
      });
  };

  return (
    <div className="flex justify-center items-center bg-black bg-opacity-30 fixed top-0 left-0 w-full h-full">
      <div className="p-6 flex flex-col gap-6 relative bg-white rounded-lg w-full h-full overflow-scroll lg:w-1/3 lg:h-auto ">
        <header className="flex justify-between items-center">
          <p className="font-extrabold text-xl">Share post</p>
          <div
            className="bg-[#F5F5F5] rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
            onClick={() => setIsPostShared(false)}
          >
            X
          </div>
        </header>

        <div
          className="grid grid-cols-4 gap-4"
          onClick={(e) => {
            handleShare(e.target.alt);
          }}
        >
          <SocialMediaIcon
            label="Twitter"
            src={twitter}
            bgColor="rgb(240 249 255)"
          />
          <SocialMediaIcon
            label="Facebook"
            src={facebook}
            bgColor="rgb(239 246 255)"
          />
          <SocialMediaIcon
            label="Reddit"
            src={reddit}
            bgColor="rgb(255 241 242)"
          />
          <SocialMediaIcon
            label="Discord"
            src={discord}
            bgColor="rgb(238 242 255)"
          />
          <SocialMediaIcon
            label="Whatsapp"
            src={whatsapp}
            bgColor="rgb(240 253 244)"
          />
          <SocialMediaIcon
            label="Messenger"
            src={messenger}
            bgColor="rgb(239 246 255)"
          />
          <SocialMediaIcon
            label="Telegram"
            src={telegram}
            bgColor="rgb(240 249 255)"
          />
          <SocialMediaIcon
            label="Instagram"
            src={instagram}
            bgColor="rgb(253 242 248)"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold">Page Link</p>
          <div className="relative">
            <input
              type="text"
              className="bg-[#D9D9D9] w-full h-11 rounded-lg text-xs font-normal p-2"
              value={postUrl}
              readOnly
            />
            <img
              src={copy}
              alt="copy"
              width={20}
              height={20}
              className="absolute right-5 bottom-3 cursor-copy"
              onClick={handleCopy}
            />
          </div>
          {copySuccess && (
            <p className="text-xs">Link copied to clipboard!</p> // User feedback
          )}
        </div>
      </div>
    </div>
  );
};

export default Share;

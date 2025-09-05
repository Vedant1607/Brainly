import { DocumentTextIcon } from "../icons/DocumentTextIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import {
  FacebookEmbed,
  InstagramEmbed,
  PinterestEmbed,
  LinkedInEmbed,
  XEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";

type MediaType =
  | "facebook"
  | "instagram"
  | "pinterest"
  | "linkedin"
  | "x"
  | "youtube";

interface SocialPost {
  url: string;
  platform: MediaType | null;
}


function detectPlatform(url: string): MediaType | null{
  if (url.includes("facebook.com")) return "facebook";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("linkedin.com")) return "linkedin";
  if (url.includes("pinterest.com")) return "pinterest";
  if (url.includes("twitter.com") || url.includes("x.com")) return "x";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  return null;
}

const DynamicSocialEmbed = ({ url, platform }:SocialPost) => {
  switch (platform) {
    case "facebook":
      return <FacebookEmbed url={url} />;
    case "instagram":
      return <InstagramEmbed url={url} />;
    case "pinterest":
      return <PinterestEmbed url={url} />;
    case "linkedin":
      return <LinkedInEmbed url={url} />;
    case "x":
      return <XEmbed url={url} />;
    case "youtube":
      return <YouTubeEmbed url={url} width="100%" height="100%" className="w-full h-full object-contain" />;
    default:
      return null;
  }
};

interface CardProps {
  title: string;
  url: string;
}

const Card = ({ title, url }: CardProps) => {
  return (
    <div className="p-4 bg-white rounded-md border-gray-200 max-w-lg border min-w-72">
      <div className="flex justify-between">
        <div className="flex gap-1 items-center text-md">
          <DocumentTextIcon />
          {title}
        </div>
        <div className="flex gap-1 items-center">
          <a href={url} target="_blank">
            <ShareIcon />
          </a>
          <TrashIcon />
        </div>
      </div>
      <div className="pt-4 w-full">
        <DynamicSocialEmbed url={url} platform={detectPlatform(url)}></DynamicSocialEmbed>
      </div>
    </div>
  );
};

export default Card;

interface SocialMediaIconProps {
  label: string;
  src: string;
  bgColor: string;
}

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({
  label,
  src,
  bgColor,
}) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center">
      <button
        className={`rounded-full p-4 w-fit`}
        style={{ backgroundColor: bgColor }}
      >
        <img src={src} alt={label.toLowerCase()} width={24} height={24} />
      </button>
      <p className="font-normal text-xs">{label}</p>
    </div>
  );
};

export default SocialMediaIcon;

import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void
}

const variantClasses = {
  primary: "bg-[#7164c0] text-white",
  secondary: "bg-[#d9ddee] text-[#7164c0]",
};

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";

const Button = ({ variant, text, startIcon, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`${variantClasses[variant]} ${defaultStyles}`}>
      <div className="pr-2">{startIcon}</div>
      {text}
    </button>
  );
};

export default Button;

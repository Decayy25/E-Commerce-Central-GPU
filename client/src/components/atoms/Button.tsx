interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "link";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  disabled,
  onClick = () => {},
  ...props
}) => {
  const baseStyle = "transition-all duration-200 active:scale-95";
  const variants = {
    primary:
      "py-2 px-8 rounded-full bg-[#5d9a00] text-white font-semibold text-xl hover:bg-[#4d7e00] shadow-md",
    link: "text-[#5d9a00] font-bold underline hover:text-[#4d7e00] text-xs",
  };

  return (
    <button
      {...props}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
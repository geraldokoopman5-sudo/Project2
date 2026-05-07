export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: "bg-primary text-on-primary hover:shadow-lg",
    secondary: "text-secondary hover:bg-surface-container-low",
    outline: "border border-outline-variant text-primary hover:bg-surface-container-low",
    danger: "bg-error-container text-on-error-container border border-error/20 hover:bg-error hover:text-white"
  };

  return (
    <button 
      className={`font-button px-lg py-sm rounded-lg transition-all active:scale-95 duration-150 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
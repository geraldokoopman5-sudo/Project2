export const Card = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden ${className}`}
  >
    {children}
  </div>
);
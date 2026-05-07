export const Icon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`} data-icon={name}>
    {name}
  </span>
);
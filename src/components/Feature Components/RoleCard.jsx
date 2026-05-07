export const RoleCard = ({ icon, title, description, actionText }) => (
  <button className="group relative flex flex-col p-lg bg-surface-container-lowest border border-outline-variant rounded-xl text-left hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="mb-lg w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
      <Icon name={icon} className="text-[32px]" />
    </div>
    <h3 className="font-h3 text-h3 text-on-surface mb-xs">{title}</h3>
    <p className="font-body-sm text-body-sm text-secondary mb-lg">{description}</p>
    <div className="mt-auto flex items-center text-primary font-button">
      <span>{actionText}</span>
      <Icon name="arrow_forward" className="ml-xs transition-transform group-hover:translate-x-1" />
    </div>
  </button>
);
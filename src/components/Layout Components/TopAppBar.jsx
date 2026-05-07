import { Button } from "../UI Components/Button.jsx";
import { Icon } from "../UI Components/Icon.jsx";
export const TopAppBar = () => (
  <header className="bg-surface docked full-width sticky top-0 border-b border-outline-variant z-50">
    <div className="flex justify-between items-center px-lg py-sm w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-sm">
        <h1 className="font-h2 text-h2 font-bold text-primary">Vehicle Booking System</h1>
      </div>
      <div className="hidden md:flex items-center gap-xl">
        <nav className="flex gap-lg">
          {['Home', 'Manage', 'Profile'].map(item => (
            <a key={item} href="#" className="text-secondary font-button hover:bg-surface-container-low px-3 py-2 rounded-lg">{item}</a>
          ))}
        </nav>
        <Button variant="primary">Admin Mode</Button>
      </div>
    </div>
  </header>
);
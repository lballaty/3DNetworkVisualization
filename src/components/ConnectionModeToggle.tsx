import { Link } from 'lucide-react';
import { useConnectionMode } from '../hooks/useConnectionMode';

export function ConnectionModeToggle() {
  const { isActive, toggleMode } = useConnectionMode();
  
  return (
    <button
      onClick={toggleMode}
      className={`absolute bottom-4 left-4 p-2 rounded-full shadow-lg ${
        isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
      }`}
      title={isActive ? 'Exit Connection Mode' : 'Enter Connection Mode'}
    >
      <Link className="w-6 h-6" />
    </button>
  );
}
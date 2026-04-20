import { cn } from '../lib/utils';

export function DuckIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-6 h-6", className)}
    >
      <path d="M21 16C21 18.2091 19.2091 20 17 20H7C4.79086 20 3 18.2091 3 16V10.5C3 8.01472 5.01472 6 7.5 6H16.5C18.9853 6 21 8.01472 21 10.5V16Z" fillOpacity="0.1"/>
      <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 7.8 8.1 8.9 9 9.7V11C9 11.6 9.4 12 10 12H14C14.6 12 15 11.6 15 11V9.7C15.9 8.9 16.5 7.8 16.5 6.5C16.5 4 14.5 2 12 2ZM12 4C13.4 4 14.5 5.1 14.5 6.5C14.5 7.9 13.4 9 12 9C10.6 9 9.5 7.9 9.5 6.5C9.5 5.1 10.6 4 12 4Z" />
      <path d="M22 13C22 14.1 21.1 15 20 15H19V11H20C21.1 11 22 11.9 22 13Z" />
      <path d="M2 13C2 11.9 2.9 11 4 11H5V15H4C2.9 15 2 14.1 2 13Z" />
      <circle cx="10.5" cy="6" r="0.75" fill="black" />
      <circle cx="13.5" cy="6" r="0.75" fill="black" />
      <path d="M11 7.5C11 7.5 11.5 8 12 8C12.5 8 13 7.5 13 7.5" stroke="black" strokeWidth="0.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

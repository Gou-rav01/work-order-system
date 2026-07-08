'use client';

import { Search } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

interface NavbarProps {
  searchValue?: string;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

export function Navbar({
  searchValue = '',
  onSearch,
  showSearch = false,
}: NavbarProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <nav className="sticky top-0 z-40 bg-card border-b border-border">
      <div className="px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left section - search */}
        <div className="flex-1 max-w-md">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={searchValue}
                placeholder="Search work orders..."
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          )}
        </div>

        {/* Right section - date and theme toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-sm text-muted-foreground">
            {today}
          </div>
          <ThemeToggle />
          {/* Avatar placeholder */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
            T
          </div>
        </div>
      </div>
    </nav>
  );
}

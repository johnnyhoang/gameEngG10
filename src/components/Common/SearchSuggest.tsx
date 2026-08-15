import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../../hooks/useGameState';

interface SearchSuggestProps {
  placeholder: string;
  roleFilter?: 'student' | 'tutor' | 'secondary_tutor' | 'admin_board';
  onSelect: (user: { id: string; name: string; email: string; avatar_url?: string }) => void;
  className?: string;
  value?: string;
  onChange?: (val: string) => void;
}

export const SearchSuggest: React.FC<SearchSuggestProps> = ({
  placeholder,
  roleFilter,
  onSelect,
  className = '',
  value = '',
  onChange
}) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const searchUsers = useGameState(state => state.searchUsers);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<any | null>(null);
  const isUserTypingRef = useRef(false);

  // Sync state if value prop changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Click outside to close suggestion dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search query effect with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      setLoading(false); // Reset loading state
      return;
    }

    // Only search if user typed, not when value is synced
    if (!isUserTypingRef.current) {
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchUsers(query, roleFilter);
        setSuggestions(results);
        setIsOpen(true);
        setActiveIndex(-1);
      } catch (err) {
        console.error('Lỗi tìm kiếm gợi ý:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, roleFilter, searchUsers, value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        selectItem(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const selectItem = (item: any) => {
    isUserTypingRef.current = false;
    onSelect(item);
    setQuery(item.email);
    if (onChange) onChange(item.email);
    setIsOpen(false);
    setLoading(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={e => {
            const val = e.target.value;
            isUserTypingRef.current = true;
            setQuery(val);
            if (onChange) onChange(val);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full p-2.5 rounded-lg border border-white/10 bg-black/40 text-white outline-none focus:border-synth-cyan font-sans text-xs pr-8"
        />
        {loading && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <svg className="animate-spin h-4 w-4 text-synth-cyan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto rounded-xl border border-white/10 bg-synth-gray/95 backdrop-blur-md shadow-2xl p-1 divide-y divide-white/5 scrollbar-thin">
          {suggestions.map((item, index) => (
            <div
              key={item.id}
              onClick={() => selectItem(item)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors ${
                index === activeIndex ? 'bg-white/10 text-white' : 'text-slate-300'
              }`}
            >
              {item.avatar_url ? (
                <img
                  src={item.avatar_url}
                  alt={item.name}
                  className="w-6 h-6 rounded-full border border-white/10 object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-synth-cyan/10 border border-synth-cyan/30 flex items-center justify-center text-[10px] text-synth-cyan font-bold">
                  {item.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0 font-sans">
                <span className="block text-xs font-bold truncate text-white">{item.name}</span>
                <span className="block text-[10px] text-slate-400 truncate">{item.email}</span>
              </div>
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-orbitron bg-white/5 border border-white/10 text-slate-400">
                {item.role === 'tutor' || item.role === 'secondary_tutor' ? 'Giáo Viên' : 'Học Sinh'}
              </span>
            </div>
          ))}
        </div>
      )}

      {isOpen && query.trim() && query !== value && suggestions.length === 0 && !loading && (
        <div className="absolute z-50 left-0 right-0 mt-1 rounded-xl border border-white/5 bg-synth-gray/95 backdrop-blur-md shadow-2xl p-3 text-center text-xs text-slate-400">
          Không tìm thấy tài khoản nào khớp.
        </div>
      )}
    </div>
  );
};

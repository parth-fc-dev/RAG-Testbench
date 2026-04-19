"use client";

import React, { useState, useEffect } from "react";

export interface SidebarItem {
  id: string;
  label: string;
  children?: SidebarItem[];
  onClick?: () => void;
}

interface SidebarProps {
  items: SidebarItem[];
  onItemClick?: (id: string) => void;
  activeId?: string;
}

const ChevronDown = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronRight = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const MenuIcon = () => (
  <svg
    width={22}
    height={22}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg
    width={22}
    height={22}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SidebarItemComponent: React.FC<{
  item: SidebarItem;
  level: number;
  onItemClick?: (id: string) => void;
  activeId?: string;
  onClose?: () => void;
}> = ({ item, level, onItemClick, activeId, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeId === item.id;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      onClose?.();
    }
    onItemClick?.(item.id);
    item.onClick?.();
  };

  const paddingLeft = `${level * 1.5}rem`;

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full text-left px-4 py-2 flex items-center gap-2 transition-colors rounded-md ${
          isActive
            ? "bg-blue-100 text-blue-900 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        style={{ paddingLeft }}
      >
        {hasChildren && (
          <span className="flex-shrink-0">
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </span>
        )}
        {!hasChildren && <span className="w-4 flex-shrink-0" />}
        <span className="text-sm font-medium">{item.label}</span>
      </button>

      {hasChildren && isExpanded && (
        <div>
          {item.children!.map((child) => (
            <SidebarItemComponent
              key={child.id}
              item={child}
              level={level + 1}
              onItemClick={onItemClick}
              activeId={activeId}
              onClose={onClose}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SidebarContent = ({
  items,
  onItemClick,
  activeId,
  onClose,
}: {
  items: SidebarItem[];
  onItemClick?: (id: string) => void;
  activeId?: string;
  onClose?: () => void;
}) => (
  <aside className="w-full h-full bg-white border-r border-gray-200 overflow-y-auto">
    <nav className="p-4 space-y-1">
      {items.map((item) => (
        <SidebarItemComponent
          key={item.id}
          item={item}
          level={0}
          onItemClick={onItemClick}
          activeId={activeId}
          onClose={onClose}
        />
      ))}
    </nav>
  </aside>
);

export default function Sidebar({
  items,
  onItemClick,
  activeId,
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:block w-72 h-full flex-shrink-0">
        <SidebarContent
          items={items}
          onItemClick={onItemClick}
          activeId={activeId}
        />
      </div>

      {/* Mobile FAB button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all"
        aria-label="Open navigation"
      >
        <MenuIcon />
      </button>

      {mobileOpen && (
        <>
          <style>{`
            @keyframes slide-up {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .drawer-slide-up {
              animation: slide-up 0.3s cubic-bezier(0.32, 0.72, 0, 1);
            }
            .drawer-backdrop {
              animation: fade-in 0.2s ease-out;
            }
          `}</style>

          {/* Backdrop */}
          <div
            className="drawer-backdrop md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="drawer-slide-up md:hidden fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] rounded-t-2xl overflow-hidden shadow-2xl flex flex-col bg-white">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
              <span className="text-sm font-semibold text-gray-700">
                Navigation
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label="Close navigation"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Scrollable nav */}
            <div className="overflow-y-auto flex-1">
              <SidebarContent
                items={items}
                onItemClick={onItemClick}
                activeId={activeId}
                onClose={() => setMobileOpen(false)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

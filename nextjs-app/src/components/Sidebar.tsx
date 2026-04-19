"use client";

import React, { useState } from "react";

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

const SidebarItemComponent: React.FC<{
  item: SidebarItem;
  level: number;
  onItemClick?: (id: string) => void;
  activeId?: string;
}> = ({ item, level, onItemClick, activeId }) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeId === item.id;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar({
  items,
  onItemClick,
  activeId,
}: SidebarProps) {
  return (
    <aside className="w-85 bg-white border-r border-gray-200 overflow-y-auto h-full">
      <nav className="p-4 space-y-1">
        {items.map((item) => (
          <SidebarItemComponent
            key={item.id}
            item={item}
            level={0}
            onItemClick={onItemClick}
            activeId={activeId}
          />
        ))}
      </nav>
    </aside>
  );
}

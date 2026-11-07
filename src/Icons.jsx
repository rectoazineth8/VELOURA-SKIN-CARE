
import React from 'react';

const paths = {
  ArrowLeft: <><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></>,
  ArrowRight: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
  ArrowUpRight: <><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
  Check: <path d="m5 12 4 4L19 6"/>,
  ChevronDown: <><path d="m6 9 6 6 6-6"/></>,
  Heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
  Menu: <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>,
  Minus: <path d="M5 12h14"/>,
  Plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
  Search: <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>,
  ShoppingBag: <><path d="M6 7h12l1 14H5L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></>,
  Sparkles: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z"/></>,
  Star: <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3L7 14.2 2 9.3l6.9-1L12 2Z"/>,
  Trash2: <><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v5M14 11v5"/></>,
  X: <><path d="m18 6-12 12"/><path d="m6 6 12 12"/></>,
  Instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>
};

export function Icon({ name, size = 20, fill = 'none', strokeWidth = 1.8, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

export const ArrowLeft = (props) => <Icon name="ArrowLeft" {...props} />;
export const ArrowRight = (props) => <Icon name="ArrowRight" {...props} />;
export const ArrowUpRight = (props) => <Icon name="ArrowUpRight" {...props} />;
export const Check = (props) => <Icon name="Check" {...props} />;
export const ChevronDown = (props) => <Icon name="ChevronDown" {...props} />;
export const Heart = (props) => <Icon name="Heart" {...props} />;
export const Menu = (props) => <Icon name="Menu" {...props} />;
export const Minus = (props) => <Icon name="Minus" {...props} />;
export const Plus = (props) => <Icon name="Plus" {...props} />;
export const Search = (props) => <Icon name="Search" {...props} />;
export const ShoppingBag = (props) => <Icon name="ShoppingBag" {...props} />;
export const Sparkles = (props) => <Icon name="Sparkles" {...props} />;
export const Star = (props) => <Icon name="Star" {...props} />;
export const Trash2 = (props) => <Icon name="Trash2" {...props} />;
export const X = (props) => <Icon name="X" {...props} />;
export const Instagram = (props) => <Icon name="Instagram" {...props} />;

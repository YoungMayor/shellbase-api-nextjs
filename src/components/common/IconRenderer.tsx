"use client";

import type { IconSet } from '@/types';
import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react'; // Default icon

interface IconRendererProps {
  iconSet?: IconSet;
  className?: string;
}

const IconRenderer: React.FC<IconRendererProps> = ({ iconSet, className }) => {
  if (iconSet?.lucide) {
    const LucideIcon = (LucideIcons as any)[iconSet.lucide];
    if (LucideIcon) {
      return <LucideIcon className={className || "w-5 h-5"} />;
    }
  }
  
  // Fallback for SVG or other types can be added here
  // if (iconSet?.svg) {
  //   return <img src={iconSet.svg} alt="icon" className={className || "w-5 h-5"} />;
  // }

  return <HelpCircle className={className || "w-5 h-5 text-muted-foreground"} />; // Default icon
};

export default IconRenderer;

import React, { type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-surface-card rounded-xl border border-border ${className}`}
    >
      <div className="p-4 rounded-full bg-border-light text-text-muted mb-4">
        <Icon className="w-10 h-10" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-1">
        {title}
      </h3>
      <p className="text-sm text-text-secondary max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export default EmptyState;

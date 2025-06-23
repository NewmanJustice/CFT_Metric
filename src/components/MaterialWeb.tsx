import React from 'react';

export const MdFilledCard: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, ...props }) => (
  <div is="md-filled-card" {...props}>{children}</div>
);

export const MdFilledTextField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
}> = (props) => (
  <input {...props} />
);

export const MdCheckbox: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input type="checkbox" {...props} />
);

export const MdFilledButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

export const MdCircularProgress: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => (
  <span {...props} />
);

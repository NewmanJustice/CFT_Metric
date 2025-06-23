/// <reference types="vite/client" />
<<<<<<< HEAD

// Material Web custom elements for React JSX

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-filled-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'md-filled-text-field': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        label?: string;
        type?: string;
        value?: string | number;
        min?: number | string;
        max?: number | string;
        disabled?: boolean;
        onInput?: (e: React.FormEvent<HTMLElement>) => void;
      };
      'md-checkbox': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        checked?: boolean;
        value?: string;
        disabled?: boolean;
        onClick?: (e: React.MouseEvent<HTMLElement>) => void;
      };
      'md-filled-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        disabled?: boolean;
        type?: string;
        onClick?: (e: React.MouseEvent<HTMLElement>) => void;
      };
      'md-circular-progress': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        indeterminate?: boolean;
      };
    }
  }
}
export {};
=======
>>>>>>> 3778a48 (Resolve README.md merge conflict)

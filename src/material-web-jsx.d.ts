<<<<<<< HEAD
<<<<<<< HEAD
// File intentionally left blank. See custom-elements.d.ts for all Material Web JSX typings.
=======
import '@material/web/button/filled-button.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/progress/circular-progress.js';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-filled-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { disabled?: boolean, type?: string };
      'md-checkbox': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { checked?: boolean, value?: string };
      'md-filled-text-field': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { label?: string, type?: string, min?: number, max?: number, value?: number | string, onInput?: (e: Event) => void };
      'md-circular-progress': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { indeterminate?: boolean };
    }
  }
}
>>>>>>> 3778a48 (Resolve README.md merge conflict)
=======
// File intentionally left blank. See custom-elements.d.ts for all Material Web JSX typings.
>>>>>>> 2543601 (wip)

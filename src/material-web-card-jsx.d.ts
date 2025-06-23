import '@material/web/card/elevated-card.js';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-elevated-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

// Global type declarations for Ionicons web components
// React 18+ uses the React.JSX namespace for intrinsic elements

import type React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          size?: string;
          color?: string;
        },
        HTMLElement
      >;
    }
  }
}

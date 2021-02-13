declare module '*.css';
declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

declare global {
  interface Window {
    AMapUI: any;
    AMap: any;
  }
}

export {};

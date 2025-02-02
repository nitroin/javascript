declare global {
  const __DEV__: boolean;
  const __CLERKJS_VERSION__: string;

  interface Window {
    __unstable__onBeforeSetActive: () => void;
    __unstable__onAfterSetActive: () => void;
  }
}

declare module '*.svg' {
  const value: React.FC<React.SVGAttributes<SVGElement>>;
  export default value;
}

export {};

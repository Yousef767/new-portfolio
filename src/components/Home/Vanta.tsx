import { useEffect } from "react";

interface VantaEffect {
  destroy: () => void;
}

// interface VantaApi {
//   CELLS: (options: {
//     el: string;
//     mouseControls: boolean;
//     touchControls: boolean;
//     gyroControls: boolean;
//     minHeight: number;
//     minWidth: number;
//     scale: number;
//     scaleMobile: number;
//     color1: number;
//     color2: number;
//   }) => VantaEffect;
// }
interface VantaApi {
  TOPOLOGY: (options: {
    el: string;
    mouseControls: boolean;
    touchControls: boolean;
    gyroControls: boolean;
    minHeight: number;
    minWidth: number;
    scale: number;
    scaleMobile: number;
    color: number;
    backgroundColor: number;
  }) => VantaEffect;
}

declare global {
  interface Window {
    VANTA?: VantaApi;
    THREE?: unknown;
  }
}

export default function Vanta() {
  useEffect(() => {
    if (!window.VANTA || !window.THREE) {
      console.error("Vanta or Three.js hasn't loaded");
      return;
    }

    // const effect = window.VANTA.CELLS({
    //   el: "#vanta",
    //   mouseControls: true,
    //   touchControls: true,
    //   gyroControls: false,
    //   minHeight: 200,
    //   minWidth: 200,
    //   scale: 1,
    //   scaleMobile: 1,
    //   color1: 0x1a191d,
    //   color2: 0x3e3e3e,
    // });
    const effect = window.VANTA.TOPOLOGY({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xa12ef2,
      backgroundColor: 0x161616,
    });

    return () => effect?.destroy();
  }, []);

  return (
    <div
      id="vanta"
      style={{
        width: "100%",
        height: "100dvh",
        position: "absolute",
        zIndex: -1,
      }}
    />
  );
}

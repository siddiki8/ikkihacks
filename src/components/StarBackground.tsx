import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const StarBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1
        },
        background: {
          color: {
            value: "#000000",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 200,
              duration: 2,
              opacity: 0.8,
              size: 10,
            },
          },
        },
        particles: {
          color: {
            value: ["#1E0F75", "#1C1DAB", "#3785D8", "#BF8CF1", "#E893C5", "#ADC6E5"],
          },
          links: {
            color: "#3785D8",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 120,
          },
          opacity: {
            value: { min: 0.3, max: 0.7 },
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 4 },
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default StarBackground;

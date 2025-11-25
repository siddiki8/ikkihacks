import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const PwnedPage: React.FC = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: '#000'
        }}>
            <Particles
                id="tsparticles-pwned"
                init={particlesInit}
                options={{
                    fullScreen: { enable: false },
                    background: { color: "#000000" },
                    fpsLimit: 120,
                    particles: {
                        color: { value: ["#1E0F75", "#1C1DAB", "#3785D8", "#BF8CF1", "#E893C5", "#ADC6E5"] },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: "out",
                            random: true,
                            speed: 1,
                            straight: false
                        },
                        number: { value: 150 },
                        opacity: {
                            value: { min: 0.3, max: 0.8 },
                            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                        },
                        shape: { type: "circle" },
                        size: {
                            value: { min: 1, max: 4 },
                            anim: { enable: true, speed: 3, size_min: 0.1, sync: false }
                        },
                        links: {
                            enable: true,
                            distance: 120,
                            color: "#3785D8",
                            opacity: 0.3,
                            width: 1
                        }
                    }
                }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />

            <motion.h1
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{
                    fontSize: '10rem',
                    color: '#38b7e9ff',
                    fontFamily: "'Orbitron', sans-serif",
                    zIndex: 20,
                    textShadow: `
                        0px 0px 30px rgba(28, 29, 171, 1),
                        0px 0px 60px rgba(28, 29, 171, 0.8),
                        0px 0px 90px rgba(55, 133, 216, 0.6),
                        0px 0px 120px rgba(191, 140, 241, 0.5)
                    `,
                    letterSpacing: '10px',
                    margin: 0,
                    padding: '2rem',
                    background: 'radial-gradient(circle, rgba(28, 29, 171, 0.3) 0%, transparent 70%)',
                    boxShadow: `
                        0 0 40px rgba(28, 29, 171, 0.6),
                        0 0 80px rgba(55, 133, 216, 0.4),
                        0 0 120px rgba(191, 140, 241, 0.3),
                        inset 0 0 40px rgba(28, 29, 171, 0.2)
                    `,
                    borderRadius: '20px'
                }}
            >
                PWNED
            </motion.h1>
        </div>
    );
};

export default PwnedPage;

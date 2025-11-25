import React, { useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

interface JourneyTransitionProps {
    onComplete: () => void;
}

const JourneyTransition: React.FC<JourneyTransitionProps> = ({ onComplete }) => {
    const [speed, setSpeed] = useState(5);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    useEffect(() => {
        // Ramp up speed more aggressively for that "speeding up" feeling
        const interval = setInterval(() => {
            setSpeed(prev => Math.min(prev * 1.15, 100));
        }, 80);

        const timer = setTimeout(onComplete, 5000); // 5 seconds journey

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [onComplete]);

    // Create multiple emitter positions in a circular pattern to simulate tunnel walls
    const createTunnelEmitters = () => {
        const emitters = [];
        const numRings = 4; // Number of concentric rings
        const particlesPerRing = 16; // Number of emitter points per ring

        for (let ring = 0; ring < numRings; ring++) {
            const radius = 3 + (ring * 4); // Smaller rings closer to center for POV effect

            for (let i = 0; i < particlesPerRing; i++) {
                const angle = (i / particlesPerRing) * Math.PI * 2;
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;

                emitters.push({
                    direction: "none",
                    rate: {
                        quantity: ring === 0 ? 10 : 6, // More particles from inner rings
                        delay: 0.04
                    },
                    size: {
                        width: 3,
                        height: 3
                    },
                    position: {
                        x: x,
                        y: y
                    }
                });
            }
        }

        // Add central emitter for dense core particles
        emitters.push({
            direction: "none",
            rate: {
                quantity: 20,
                delay: 0.02
            },
            size: {
                width: 1,
                height: 1
            },
            position: {
                x: 50,
                y: 50
            }
        });

        return emitters;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 10,
                background: 'black',
            }}
        >
            <Particles
                id="tsparticles-wormhole"
                init={particlesInit}
                options={{
                    fullScreen: {
                        enable: true,
                        zIndex: 11
                    },
                    background: { color: "#000000" },
                    fpsLimit: 120,
                    particles: {
                        color: { value: ["#1E0F75", "#1C1DAB", "#3785D8", "#BF8CF1", "#E893C5", "#ADC6E5"] },
                        move: {
                            direction: "outside",
                            enable: true,
                            outModes: "destroy",
                            random: false,
                            speed: speed,
                            straight: true,
                            warp: true,
                        },
                        number: { value: 1200, density: { enable: true, area: 400 } },
                        opacity: {
                            value: { min: 0.3, max: 1 },
                            animation: {
                                enable: true,
                                speed: 2, // 5 flashes over 5 seconds = 1 flash per second
                                sync: true, // Sync for coordinated flashing effect
                                count: 5, // Flash exactly 5 times
                                startValue: "max"
                            }
                        },
                        shape: { type: "circle" },
                        size: {
                            value: { min: 1, max: 4 },
                            animation: {
                                enable: true,
                                speed: 10,
                                sync: false
                            }
                        },
                        life: {
                            duration: {
                                sync: false,
                                value: 10 // Increased to 10 seconds to ensure particles don't disappear during 5-second journey
                            },
                            count: 0,
                        },
                        roll: {
                            darken: {
                                enable: true,
                                value: 30
                            },
                            enable: true,
                            speed: {
                                min: 10,
                                max: 25
                            }
                        },
                        // Add trail effect for motion blur
                        stroke: {
                            width: 0
                        },
                    },
                    emitters: createTunnelEmitters()
                }}
            />
            {/* Overlay for the "zoom" feel - a radial gradient that expands */}
            <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 0.5, 0], scale: [1, 2, 5] }}
                transition={{ duration: 5, ease: "easeIn" }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 12,
                    background: 'radial-gradient(circle, transparent 20%, rgba(28, 29, 171, 0.5) 80%, rgba(30, 15, 117, 1) 100%)',
                    pointerEvents: 'none'
                }}
            />
            {/* Additional circular rings overlay for enhanced tunnel effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 5, ease: "easeInOut" }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 13,
                    background: `
                        radial-gradient(circle at 50% 50%, transparent 10%, rgba(191, 140, 241, 0.15) 10.5%, transparent 11%),
                        radial-gradient(circle at 50% 50%, transparent 20%, rgba(232, 147, 197, 0.15) 20.5%, transparent 21%),
                        radial-gradient(circle at 50% 50%, transparent 30%, rgba(55, 133, 216, 0.15) 30.5%, transparent 31%),
                        radial-gradient(circle at 50% 50%, transparent 40%, rgba(173, 198, 229, 0.15) 40.5%, transparent 41%)
                    `,
                    pointerEvents: 'none'
                }}
            />
        </motion.div>
    );
};

export default JourneyTransition;

import React from 'react';
import { motion } from 'framer-motion';

interface LandingPageProps {
    onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
        }}>
            <motion.button
                onClick={onStart}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{
                    scale: 1.1,
                    boxShadow: "0px 0px 30px rgba(191, 140, 241, 0.8), 0px 0px 60px rgba(55, 133, 216, 0.5)",
                    textShadow: "0px 0px 12px rgba(232, 147, 197, 0.9)",
                    background: "linear-gradient(135deg, rgba(28, 29, 171, 0.3), rgba(191, 140, 241, 0.3))"
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                    background: 'transparent',
                    border: '2px solid #BF8CF1',
                    color: '#E893C5',
                    padding: '1.5rem 3rem',
                    fontSize: '1.5rem',
                    fontFamily: "'Inter', sans-serif",
                    cursor: 'pointer',
                    borderRadius: '50px',
                    outline: 'none',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontWeight: 300,
                    boxShadow: '0px 0px 15px rgba(191, 140, 241, 0.4)'
                }}
            >
                Start your journey...
            </motion.button>
        </div>
    );
};

export default LandingPage;

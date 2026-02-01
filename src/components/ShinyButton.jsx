import { motion } from 'framer-motion';

const ShinyButton = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      initial={{ '--x': '100%', '--glow': '0' }}
      animate={{ '--x': '-100%', '--glow': '1' }}
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.95, y: 2 }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 1,
        type: 'spring',
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: 'spring',
          stiffness: 200,
          damping: 10,
          mass: 0.5,
        },
        y: {
          type: 'spring',
          stiffness: 200,
          damping: 10,
        },
      }}
      className={`relative rounded-full px-8 py-3 font-bold text-lg backdrop-blur-xl transition-[box-shadow,transform] duration-300 ease-in-out ${className}`}
      onClick={onClick}
      style={{
        background: `
          linear-gradient(180deg, 
            #3a9fd8 0%, 
            #2986CC 30%, 
            #1e6ba8 70%, 
            #154d7a 100%
          )
        `,
        border: '2px solid rgba(100, 200, 255, 0.5)',
        color: '#ffffff',
        borderRadius: '18px',
        boxShadow: `
          inset 0 3px 8px rgba(255,255,255,0.4),
          inset 0 -4px 8px rgba(0,0,0,0.3),
          inset 0 1px 0 rgba(255,255,255,0.6),
          0 0 10px rgba(41,134,204,0.6),
          0 0 20px rgba(0,200,255,0.3),
          0 0 30px rgba(100,180,255,0.2),
          0 8px 25px rgba(0,0,0,0.4),
          0 15px 35px rgba(0,50,100,0.3)
        `,
        transform: 'perspective(500px) rotateX(5deg)',
        transition:
          'transform .25s ease, box-shadow .25s ease, filter .25s ease',
      }}
    >
      {/* Energy ring effect */}
      <span
        className="absolute inset-0 rounded-[inherit] opacity-60"
        style={{
          background: 'transparent',
          border: '1px solid rgba(0,220,255,0.8)',
          boxShadow:
            '0 0 15px rgba(0,220,255,0.5), inset 0 0 15px rgba(0,220,255,0.1)',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />
      <span
        className="relative block h-full w-full tracking-wide z-20"
        style={{
          textShadow: '0 0 10px rgba(0,200,255,0.8), 0 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        {children}
      </span>
      {/* Shiny sweep effect */}
      <span
        style={{
          mask: 'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
          maskComposite: 'exclude',
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0.05)_calc(var(--x)+20%),rgba(0,220,255,0.6)_calc(var(--x)+25%),rgba(255,255,255,0.3)_calc(var(--x)+30%),rgba(0,150,255,0.3)_calc(var(--x)+100%))] p-px"
      ></span>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
      `}</style>
    </motion.button>
  );
};

export default ShinyButton;

import { motion } from 'framer-motion';

const ShinyButton = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      initial={{ '--x': '100%' }}
      animate={{ '--x': '-100%' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
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
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      className={`relative rounded-full px-8 py-3 font-bold text-lg backdrop-blur-xl transition-[box-shadow,transform] duration-300 ease-in-out hover:shadow-xl ${className}`}
      onClick={onClick}
      style={{
        background: '#0096e7',
        border: '3px solid #d91e18',
        color: 'white',
        boxShadow: '0 4px 0 #0078b9',
      }}
    >
      <span
        className="relative block h-full w-full tracking-wide"
        style={{
          textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        }}
      >
        <span className="mr-2">🔔</span>
        {children}
      </span>
      <span
        style={{
          mask: 'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
          maskComposite: 'exclude',
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0.1)_calc(var(--x)+20%),rgba(255,255,255,0.5)_calc(var(--x)+25%),rgba(241,196,15,0.5)_calc(var(--x)+100%))] p-px"
      ></span>
    </motion.button>
  );
};

export default ShinyButton;

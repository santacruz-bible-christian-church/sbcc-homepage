import { motion } from "framer-motion";

const pageVariants = {
    initial: { 
        opacity: 0, 
        y: 20, 
        rotate: 1 
    },
    animate: { 
        opacity: 1, 
        y: 0, 
        rotate: 0 
    },
    exit: { 
        opacity: 0, 
        y: -20, 
        rotate: -1 
    }
};

const pageTransition = {
    duration: 0.4,
    ease: "easeInOut"
};

export default function PageWrapper({ children, className = "" }) {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className={className}
        >
            {children}
        </motion.div>
    );
}

import { Button as ShadcnButton } from "@/components/ui/button";
import { motion } from "framer-motion";

const Button = ({ children, ...props }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <ShadcnButton {...props}>{children}</ShadcnButton>
    </motion.div>
  );
};

export { Button };

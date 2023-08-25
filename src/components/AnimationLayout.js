import React from "react";
import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

const AnimationLayout = () => {
  const location = useLocation();

  return (
    <motion.div
      key={location.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
    >
      <Outlet />
    </motion.div>
  );
};

export default AnimationLayout;

import { motion } from 'framer-motion';


const DashboardView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    {/* Paste your existing Dashboard UI here exactly as before */}
  </motion.div>
);

export default DashboardView;

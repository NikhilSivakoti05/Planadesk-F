import { motion } from 'framer-motion';


const UsersView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    {/* Paste your existing Users UI here exactly as before */}
  </motion.div>
);

export default UsersView;

import { motion } from "framer-motion";
import Banner from "./HomeItems/Banner";
import Newsletter from "./HomeItems/Newsletter";
import PopularCategories from "./HomeItems/PopularCategories";
import RecentBlogs from "./HomeItems/RecentBlogs";
import TrendingBlogs from "./HomeItems/TrendingBlogs";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Home | BlogSpotter</title>
      </Helmet>
      <Banner />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <RecentBlogs />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <PopularCategories />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <TrendingBlogs />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Newsletter />
      </motion.div>
    </motion.div>
  );
};

export default Home;

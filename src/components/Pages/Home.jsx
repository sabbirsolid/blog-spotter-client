import Banner from "./HomeItems/Banner";
import Newsletter from "./HomeItems/Newsletter";
import RecentBlogs from "./HomeItems/RecentBlogs";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <RecentBlogs></RecentBlogs>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;
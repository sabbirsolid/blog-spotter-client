import Banner from "./HomeItems/Banner";
import Newsletter from "./HomeItems/Newsletter";
import PopularCategories from "./HomeItems/PopularCategories";
import RecentBlogs from "./HomeItems/RecentBlogs";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <RecentBlogs></RecentBlogs>
            <PopularCategories></PopularCategories>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;
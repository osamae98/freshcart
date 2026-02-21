import Slider from "../components/Slider";
import OurCategories from "../components/OurCategories";
import DealsBanner from "../components/DealsBanner";
import FeaturedProducts from "../components/FeaturedProducts";
import NewsLetter from "../components/NewsLetter";
import FeaturesBar from "../components/FeaturesBar";

export default function HomeScreen() {
    return (
        <div>
            {/* Slider - Full width, no container */}
            <Slider/>
            
            {/* Features bar */}
            <FeaturesBar/>

            {/* Rest of content inside container */}
            <div className="container space-y-12 py-8">
                <OurCategories/>
                <DealsBanner/>
                <FeaturedProducts/>
                <NewsLetter/>
            </div>
        </div>
    );
}
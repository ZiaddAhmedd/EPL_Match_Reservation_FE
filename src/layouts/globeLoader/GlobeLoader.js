import classes from "./globeLoader.module.css";
import loaderGif from "../../assets/gifs/loader.gif";

const GlobeLoader = () => {
    return (
        <div className={classes.loader}>
            <img src={loaderGif} alt="loader" />
        </div>
    );
};

export default GlobeLoader;
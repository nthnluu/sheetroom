import {motion} from "framer-motion";
import React from "react";

const DesktopGraphic = () => {
    return (<div className="relative">

        <motion.picture className="absolute left-0 -ml-10 lg:-ml-20 top-0 lg:top-40 z-50" animate={{y: 14}}
                        transition={{
                            yoyo: Infinity,
                            ease: "anticipate",
                            duration: 2
                        }} >
            <source className="h-24 md:h-36 lg:h-64" srcSet="/landing_page/desktop/webp/Graph.webp" type="image/webp"/>
            <source className="h-24 md:h-36 lg:h-64" srcSet="/landing_page/desktop/Graph.png" type="image/png"/>
            <img className="h-24 md:h-36 lg:h-64" src="/landing_page/desktop/Graph.png"/>
        </motion.picture>

        <motion.picture className="absolute right-0 -mr-10 lg:-mr-20 top-40 lg:top-80 z-50" animate={{y: -14}}
                        transition={{
                            yoyo: Infinity,
                            ease: "anticipate",
                            duration: 2
                        }} >
            <source className="h-24 md:h-36 lg:h-64" srcSet="/landing_page/desktop/webp/Image.webp" type="image/webp"/>
            <source className="h-24 md:h-36 lg:h-64" srcSet="/landing_page/desktop/Image.png" type="image/png"/>
            <img className="h-24 md:h-36 lg:h-64" src="/landing_page/desktop/Image.png"/>
        </motion.picture>

        <motion.picture className="absolute z-40"
                        style={{opacity: 0.9, right: '23rem', bottom: '3.5rem'}} animate={{y: 14, x: -12, rotate: -10, opacity: 0.8}}
                        transition={{
                            yoyo: Infinity,
                            ease: "linear",
                            duration: 4
                        }} >
            <source className="h-24 md:h-38 lg:h-40" srcSet="/landing_page/desktop/webp/Cube.webp" type="image/webp"/>
            <source className="h-24 md:h-38 lg:h-40" srcSet="/landing_page/desktop/Cube.png" type="image/png"/>
            <img className="h-24 md:h-38 lg:h-40" src="/landing_page/desktop/Cube.png"/>
        </motion.picture>


        <motion.picture animate={{scale: 0.9}}
                        transition={{
                            yoyo: Infinity,
                            ease: "linear",
                            duration: 3
                        }}
                        className="absolute right-10 md:right-20 lg:right-40 top-5 md:top-20 z-40">
            <source className="h-16 md:h-32 lg:h-40 " srcSet="/landing_page/desktop/webp/Sphere.webp" type="image/webp"/>
            <source className="h-16 md:h-32 lg:h-40 " srcSet="/landing_page/desktop/Sphere.png" type="image/png"/>
            <img className="h-16 md:h-32 lg:h-40 " src="/landing_page/desktop/Sphere.png"/>
        </motion.picture>

        <picture className="z-30 relative">
            <source className="z-30 relative" srcSet="/landing_page/desktop/webp/Window.webp" type="image/webp"/>
            <source className=" z-30 relative" srcSet="/landing_page/desktop/Window.png" type="image/png"/>
            <img  className="z-30 relative" src="/landing_page/desktop/Window.png"/>
        </picture>


        <motion.picture animate={{scale: 1.1}}
                        transition={{
                            yoyo: Infinity,
                            ease: "anticipate",
                            duration: 3
                        }}
                        className="absolute left-0 bottom-20 z-10">
            <source className="h-24 md:h-36 lg:h-64 " srcSet="/landing_page/desktop/webp/BgSphere.webp" type="image/webp"/>
            <source className="h-24 md:h-36 lg:h-64 " srcSet="/landing_page/desktop/BgSphere.png" type="image/png"/>
            <img className="h-24 md:h-36 lg:h-64 " src="/landing_page/desktop/BgSphere.png"/>
        </motion.picture>
    </div>)
}

export default DesktopGraphic

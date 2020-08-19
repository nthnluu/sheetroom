import {motion} from "framer-motion";
import React from "react";

const DesktopGraphic = () => {
    return (<div className="relative">

        <motion.picture className="absolute left-0 sm:-ml-8 lg:-ml-20 top-0 lg:top-60 z-50" animate={{y: 14}}
                        transition={{
                            yoyo: Infinity,
                            ease: "anticipate",
                            duration: 2
                        }} >
            <source className="h-24 sm:h-45 md:h-56 lg:h-64" srcSet="/landing_page/desktop/webp/Graph.webp" type="image/webp"/>
            <source className="h-24 sm:h-45 md:h-56 lg:h-64" srcSet="/landing_page/desktop/Graph.png" type="image/png"/>
            <img className="h-24 sm:h-45 md:h-56 lg:h-64" src="/landing_page/desktop/Graph.png"/>
        </motion.picture>

        <motion.picture className="absolute right-0 -mr-4 lg:-mr-20 bottom-0 sm:top-80 z-50" animate={{y: -14}}
                        transition={{
                            yoyo: Infinity,
                            ease: "anticipate",
                            duration: 2
                        }} >
            <source className="h-24 md:h-36 lg:h-64" srcSet="/landing_page/desktop/webp/Image.webp" type="image/webp"/>
            <source className="h-24 md:h-36 lg:h-64" srcSet="/landing_page/desktop/Image.png" type="image/png"/>
            <img className="h-24 md:h-36 lg:h-64" src="/landing_page/desktop/Image.png"/>
        </motion.picture>

        <motion.picture className="absolute z-40 block sm:hidden right-0"
                        animate={{y: 14, x: -12, opacity: 0.7}}
                        transition={{
                            yoyo: Infinity,
                            ease: "linear",
                            duration: 4
                        }} >
            <source className="h-32 md:h-38 lg:h-40" srcSet="/landing_page/desktop/webp/Cube.webp" type="image/webp"/>
            <source className="h-32 md:h-38 lg:h-40" srcSet="/landing_page/desktop/Cube.png" type="image/png"/>
            <img className="h-32 md:h-38 lg:h-40" src="/landing_page/desktop/Cube.png"/>
        </motion.picture>

        <motion.picture className="absolute z-40 hidden sm:block"
                        style={{opacity: 0.9, right: '25.5rem', bottom: '4.8rem'}} animate={{y: 14, x: -12, opacity: 0.8}}
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
                        className="absolute right-10 md:right-20 lg:right-40 top-5 md:top-20 z-40 hidden sm:block">
            <source className="h-32 lg:h-40 " srcSet="/landing_page/desktop/webp/Sphere.webp" type="image/webp"/>
            <source className="h-32 lg:h-40 " srcSet="/landing_page/desktop/Sphere.png" type="image/png"/>
            <img className="h-32 lg:h-40 " src="/landing_page/desktop/Sphere.png"/>
        </motion.picture>

        <picture className="z-30 relative block sm:hidden">
            <source className="z-30 relative" srcSet="/landing_page/desktop/webp/Phone.webp" type="image/webp"/>
            <source className="z-30 relative" srcSet="/landing_page/desktop/Phone.png" type="image/png"/>
            <img  className="z-30 relative" src="/landing_page/desktop/Phone.png"/>
        </picture>

        <picture className="z-30 relative hidden sm:block">
            <source className="z-30 relative" srcSet="/landing_page/desktop/webp/Window.webp" type="image/webp"/>
            <source className="z-30 relative" srcSet="/landing_page/desktop/Window.png" type="image/png"/>
            <img  className="z-30 relative" src="/landing_page/desktop/Window.png"/>
        </picture>

        <motion.picture animate={{scale: 1.1}}
                        transition={{
                            yoyo: Infinity,
                            ease: "anticipate",
                            duration: 3
                        }}
                        className="absolute left-0 bottom-0 sm:bottom-20 z-10">
            <source className="h-32 md:h-36 lg:h-64 " srcSet="/landing_page/desktop/webp/BgSphere.webp" type="image/webp"/>
            <source className="h-32 md:h-36 lg:h-64 " srcSet="/landing_page/desktop/BgSphere.png" type="image/png"/>
            <img className="h-32 md:h-36 lg:h-64 " src="/landing_page/desktop/BgSphere.png"/>
        </motion.picture>
    </div>)
}

export default DesktopGraphic

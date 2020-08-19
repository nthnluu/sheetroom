import {Parallax, ParallaxProvider} from "react-scroll-parallax/cjs";
import {motion} from "framer-motion";
import React from "react";

const DesktopGraphic = () => {
    return <ParallaxProvider>
        <Parallax className="custom-class" y={[-20, 10]} tagOuter="figure">
            <div className="relative">

                <motion.img src="/landing_page/desktop/webp/Graph.webp" animate={{y: 14}}
                            transition={{
                                yoyo: Infinity,
                                ease: "anticipate",
                                duration: 2
                            }}
                            className="absolute h-24 md:h-36 lg:h-64 left-0 -ml-10 lg:-ml-20 top-0 lg:top-40 z-50"/>


                <motion.img src="/landing_page/desktop/webp/Image.webp" animate={{y: -14}}
                            transition={{
                                yoyo: Infinity,
                                ease: "anticipate",
                                duration: 2
                            }}
                            className="absolute h-24 md:h-36 lg:h-64 right-0 -mr-10 md:-mr-20 top-40 md:top-80 z-40"/>

                <motion.img animate={{y: 14, x: -12, opacity: 0.8}}
                            transition={{
                                yoyo: Infinity,
                                ease: "linear",
                                duration: 4
                            }} src="/landing_page/desktop/webp/Cube.webp"
                            className="absolute z-40 h-24 md:h-38 lg:h-40"
                            style={{opacity: 0.9, right: '23rem', bottom: '3.5rem'}}/>
                <motion.img src="/landing_page/desktop/Sphere.png" animate={{scale: 0.9}}
                            transition={{
                                yoyo: Infinity,
                                ease: "linear",
                                duration: 3
                            }}
                            className="absolute h-16 md:h-32 lg:h-40 right-10 md:right-20 lg:right-40 top-5 md:top-20 z-40"/>
                <img src="/landing_page/desktop/webp/Window.webp" className="z-30 relative"/>
                <motion.img animate={{scale: 1.1}}
                            transition={{
                                yoyo: Infinity,
                                ease: "anticipate",
                                duration: 3
                            }} src="/landing_page/desktop/webp/BgSphere.webp"
                            className="absolute h-24 md:h-36 lg:h-64 left-0 bottom-20 z-10"/>
            </div>
        </Parallax>
    </ParallaxProvider>
}

export default DesktopGraphic

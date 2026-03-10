import {motion} from "framer-motion";
import * as React from "react";
import InformationBar from "@/components/InformatinoBar";

type SubPageWrapperParms = {
    bgColor: string

    githubUrl: string
    githubProjectName: string

    infoButtonSubtitle: string
    infoButtonTitle: string

    infoTitle: string
    info: React.ReactNode

    children: React.ReactNode

    fadeInDelay?: number
}

export default function SubPageWrapper(
    {
        bgColor,
        githubUrl, githubProjectName,
        infoButtonSubtitle, infoButtonTitle,
        infoTitle, info,
        children,
        fadeInDelay = 0
    }: SubPageWrapperParms
) {
    return <motion.div
        className="relative flex size-full"
        initial={{
            clipPath: "circle(250vmax at 0 50%)",
        }}
        animate={{
            clipPath: "circle(250vmax at 0 50%)",
        }}
        exit={{
            clipPath: "circle(0 at 0 50%)",
            transition: { duration: 1, ease: "easeOut" }
        }}
    >
        <motion.div
            className="absolute inset-0 -z-10"
            style={{backgroundColor: bgColor}}
            initial={{opacity: 0}}
            animate={{opacity: 100}}
            transition={{duration: 1, delay: 1}}
        />

        <motion.div
            className="flex-1"
            initial={{opacity: 0}}
            animate={{opacity: 100}}
            transition={{duration: 0.3, delay: fadeInDelay + 0.2}}
        >
            {children}
        </motion.div>
        <div className="absolute w-1/3 max-w-100 min-w-50 h-full right-0">
            <InformationBar
                githubUrl={githubUrl}
                githubProjectName={githubProjectName}
                infoButtonSubtitle={infoButtonSubtitle}
                infoButtonTitle={infoButtonTitle}
                bodyTitle={infoTitle}
                withBackButton
                fadeInDelay={fadeInDelay}
            >
                {info}
            </InformationBar>
        </div>
    </motion.div>
}
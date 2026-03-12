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
        fadeInDelay = 1.5
    }: SubPageWrapperParms
) {
    return <motion.div
        className="relative flex size-full"
        initial={{
            clipPath: "circle(0 at 0 50%)",
        }}
        animate={{
            clipPath: "circle(300vmax at 0 50%)",
            transition: { duration: 1, delay: 1, ease: "easeIn" }
        }}
        style={{backgroundColor: bgColor}}
        exit={{
            clipPath: "circle(0 at 0 50%)",
            transition: { duration: 1, ease: "easeOut" }
        }}
    >
        <motion.div
            className="absolute inset-0 bg-background-secondary"
            initial={{opacity: 100}}
            animate={{opacity: 0}}
            transition={{delay: 1, duration: fadeInDelay}}
        />

        <motion.div
            className="flex-1"
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
                fadeInDelay={fadeInDelay + 0.1}
            >
                {info}
            </InformationBar>
        </div>
    </motion.div>
}
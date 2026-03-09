import ExpendableIconButton from "@/components/ExtendableIconButton"
import GithubIcon from "@/assets/github-icon.png"
import InfoIcon from "@/assets/info-icon.svg"
import {Link} from "react-router-dom";
import {Button} from "@headlessui/react";
import {useState} from "react";
import { motion } from "framer-motion";
import * as React from "react";

type InformationBarParms = {
    githubUrl: string
    projectName: string
    infoButtonSubTitle: string
    infoButtonTitle: string
    bodyTitle: string
    children: React.ReactNode
}

export default function InformationBar(
    {githubUrl, projectName, infoButtonSubTitle, infoButtonTitle, bodyTitle, children}: InformationBarParms
) {
    const [isOpen, setOpen] = useState(false)

    return <div
        className={`relative flex flex-col size-full ${isOpen ? "justify-start" : "justify-center"}`}
    >
        <motion.div
            className="absolute top-0 w-full bg-background-secondary"
            animate={{
                height: isOpen ? "100%" : "0"
            }}
            transition={{
                delay: isOpen ? 0.3 : 0,
                duration: 0.7,
                // ease: "easeInOut"
                ease: [0.48, 0.02, 0.52, 0.98]
            }}
        />

        <motion.div
            layout
            transition={{ease: "easeInOut", duration: 0.7}}
            className="relative flex flex-col p-5 gap-5"
        >
            <div className="flex w-full h-20 justify-end">
                <Link to={githubUrl} className="contents">
                    <ExpendableIconButton
                        icon={GithubIcon}
                        subtitle="Original source from"
                        title={projectName}
                    />
                </Link>
            </div>
            <div className="flex w-full h-20 justify-end">
                <Button className="contents" onClick={() => {setOpen(!isOpen)}}>
                    <ExpendableIconButton
                        icon={InfoIcon}
                        subtitle={infoButtonSubTitle}
                        title={infoButtonTitle}
                    />
                </Button>
            </div>

            <div className="h-10"/>

            <div
                className={`
                flex flex-col absolute
                top-full
                inset-x-0 flex-1
                gap-5
                ${isOpen ? "opacity-100" : "opacity-0"}
                ${isOpen ? "delay-500" : ""}
                duration-500 ease-in-out
                px-8
                `}
            >
                <hr/>
                <h1
                    className={`
                    text-2xl
                    ${isOpen ? "translate-y-0" : "translate-y-20"}
                    duration-500
                    ease-in-out
                    ${isOpen ? "delay-500" : "100"}
                    `}
                >{bodyTitle}</h1>
                <div
                    className={`
                    ${isOpen ? "translate-y-0" : "translate-y-20"}
                    duration-500
                    ease-in-out
                    ${isOpen ? "delay-550" : ""}
                    `}
                >
                    {children}
                </div>
            </div>
        </motion.div>
    </div>
}
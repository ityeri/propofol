import { motion } from "framer-motion";
import * as React from "react";
import {useEffect, useRef, useState} from "react";

type CircleSelectMenuParms = {
    elementNums: number
    elements: React.ReactNode[],
    defaultElement: React.ReactNode
    subGuides: number
    onExit: () => number | void
}

export default function CircleSelectMenu(
    {
        elementNums,
        elements,
        defaultElement,
        subGuides,
        onExit
    }: CircleSelectMenuParms
) {
    const [angleOffset, setAngleOffset] = useState(0)
    const prevAngleOffset = useRef(angleOffset)
    const scrolled = useRef(false)

    const [isFadeIn, setFadeIn] = useState(true)

    useEffect(() => {
        setTimeout(() => setFadeIn(false), 3000)
    })

    const handleScroll = (event: React.WheelEvent) => {
        const angleAmount = event.deltaY * 0.2

        setAngleOffset(prev => {
            prevAngleOffset.current = prev
            return (prev + angleAmount) % 360
        })
        scrolled.current = true
    }

    return (
        <div className="relative size-full overflow-hidden overscroll-none" onWheel={handleScroll}>

            <motion.div
                className="
                absolute
                flex
                items-center justify-center
                rounded-full
                border-0
                border-text-primary
                h-4/3
                min-h-120
                aspect-square
                right-2/3
                top-1/2 -translate-y-1/2
                "
                initial={{
                    transform: "rotate(700deg)",
                }}
                animate={{
                    transform: `rotate(${-angleOffset}deg)`,
                    transition: isFadeIn ? {
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
                        bounce: 0.3,
                        restDelta: 0.001
                    } : {duration: 0},
                }}
                style={{
                    transform: `rotate(${-angleOffset}deg)`
                }}
                exit={{
                    transform: `rotate(${onExit()}deg)`,
                    transition: {
                        duration: 0.7,
                        ease: "easeInOut"
                    }
                }}
            >
                <div className="relative flex flex-col justify-center size-full">
                    {Array.from({length: elementNums}).map((_, index) => (
                        <div
                            className={`
                            absolute
                            flex
                            flex-row
                            justify-end
                            w-full
                            h-1
                            `}
                            style={{
                                transform: `
                                rotate(${(360 / elementNums) * index}deg)
                                `
                            }}
                        >
                            <div className="w-10 h-full bg-text-primary"/>
                            <div className="relative size-0">
                                <div className="absolute left-4 -translate-y-1/2">
                                    {elements[index] !== undefined ? elements[index] : defaultElement}
                                </div>
                            </div>
                        </div>
                    ))}
                    {Array.from({length: elementNums * subGuides}).map((_, index) => (
                        <div
                            className={`
                            absolute
                            w-full
                            h-1
                            `}
                            style={{
                                transform: `
                                rotate(${(360 / (elementNums * subGuides)) * index}deg)
                                `
                            }}
                        >
                            <div className="w-2 h-full bg-text-primary"/>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
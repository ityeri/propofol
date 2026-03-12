import InformationBar from "@/components/InformatinoBar";
import CircleSelectMenu from "@/components/CircleSelectMenu/CircleSelectMenu.tsx";
import MenuElement from "@/components/MenuElement";
import {motion, usePresence} from "framer-motion";
import {useEffect, useState} from "react";
import {useScramble} from "@/useScramble.ts";

export default function Home() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [mounted, setMounted] = useState(false)

    const titleText = useScramble("Propofol", 2, 1.5, "easeInOut")
    const subtitle1 = useScramble("Form Follows Function", 2, 1.5, "easeInOut")
    const subtitle2 = useScramble("page by ityeri", 2, 2, "easeInOut")

    useEffect(() => {
        setTimeout(() => setMounted(true), 1000)
    })

    const [isPresent, safeToRemove] = usePresence();

    useEffect(() => {
        if (!isPresent) {
            const timeoutId = setTimeout(() => safeToRemove(), 2000)
            return () => clearTimeout(timeoutId)
        }
    }, [isPresent, safeToRemove])

    return (
        <motion.div
            className="fixed flex w-screen h-screen -z-10"
            initial={{backgroundColor: "var(--color-background-secondary)"}}
            animate={{backgroundColor: "var(--color-background-primary)"}}
            transition={{
                delay: 0.7,
                duration: 1
            }}
        >
            {mounted && <>
                <motion.div
                    className="relative w-1/2"
                    initial={{opacity: 0, transform: "translateX(-300px)"}}
                    animate={{opacity: 100, transform: "translateX(0)"}}
                    transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
                        bounce: 0.3,
                        restDelta: 0.001
                    }}
                >
                    <CircleSelectMenu
                        elementNums={20}
                        elements={[
                            <MenuElement
                                title="About Me"
                                subtitle="저에 대해"
                                to="/about"
                                onClick={() => setSelectedIndex(0)}
                            />,
                            <MenuElement
                                title="Rainy Day"
                                subtitle="비가온다"
                                to="/rainy"
                                onClick={() => setSelectedIndex(1)}
                            />
                        ]}
                        defaultElement={
                            <div/>
                        }
                        subGuides={5}
                        onExit={() => {
                            console.log('index: ', selectedIndex)
                            if (selectedIndex != null) {
                                return 360 / 20 * selectedIndex
                            } else {
                                return 0
                            }
                        }}
                    />
                </motion.div>

                <div className="flex flex-1 flex-col justify-center items-center">
                    <h1 className="text-6xl">{titleText}</h1>
                    <div className="h-3"/>
                    <a className="text-2xl">{subtitle1}</a>
                    <small className="text-lg">{subtitle2}</small>
                </div>

                <div className="w-1/5"/>

                <div className="absolute w-1/3 max-w-100 min-w-50 h-full right-0">
                    <InformationBar
                        githubUrl="https://github.com/ityeri/propofol"
                        githubProjectName="propofol"
                        infoButtonSubtitle="information about"
                        infoButtonTitle="This home page"
                        bodyTitle="보이지 않는걸 보이기 위한 노력"
                    >
                        <div className="flex flex-col gap-5 break-keep">
                            <p>
                                짠 코드, 만든 프로젝트는 이거저거 많아도
                                대부분이 눈으로 볼수 없는 백엔드 코드, 라이브러리 코드, 물리 실험 코드 등등..
                            </p>
                            <p>
                                이런걸 암만 잘 짜놔도 한줄한줄 정성들여 봐줄 사람은 없기에,
                                이걸 눈으로 보여줄 사이트는 하나 있어야겠다 싶었습니다
                            </p>
                            <p>
                                그래서 만든 간단한 인터랙티브 미디어 웹사이트 입니다!
                            </p>
                            <p>
                                Enjoy :)
                            </p>
                        </div>
                    </InformationBar>
                </div>
            </>}
        </motion.div>
    )
}
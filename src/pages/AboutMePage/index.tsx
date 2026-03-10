import SubPageWrapper from "@/components/SubPageWrapper";
import {motion} from "framer-motion";
import * as React from "react";
import {ProjectInfo} from "@/components/ProjectInfo";
import nodeExplanationImage from "@/assets/about/node-explanation.png"
import astroweaveImage1 from "@/assets/about/astroweave1.png"
import astroweaveImage2 from "@/assets/about/astroweave2.png"
import weaveScreenshotImage from "@/assets/about/weave-screenshot.png"
import { BlockMath } from "react-katex"
import "katex/dist/katex.min.css"

export default function AboutMePage() {

    const bodyElements: React.ReactNode[] = [
        <h1>About</h1>,
        <h1>Me</h1>,
        <div className="flex flex-col gap-5 mb-10">
            <p>
                보여줄만한 것이 없다는 고민은 꽤 전부터 들었습니다.. 적어도 눈으로 보고 눌러볼수 있는 그런것들은 많이 없는것 같습니다.
                그래도 옜날엔 개발을 하는게 누군가에게 보여주기 위한 목적은 아니였습니다.
            </p>
            <p>
                엔트리로 블록 코딩을 제일 처음 시작했을땐 코드가 돌아가는 원리를 이해하고, 작동하는 모습을 눈으로 보는게 즐거웠고,
                파이썬으로 텍스트 코딩을 시작했을땐 계산하는 데이터들을 구조화 하는게 재밌었고,
                여러 언어를 배우고 예전보다 눈이 넓어진 지금은, 시스템 자체를 추상화 하고, 나누고, 이걸 조립하여
                꼭 여러 부품을 조립하여 하나의 거대한 기계가 나오는것 마냥 프로그램을 만들어 가는데에 즐거움을 느낌니다
            </p>
            <p>
                이중 아무것도 눈에는 보이지 않습니다. 블록 코딩을 하던때는 모를까
                처음 텍스트 코딩을 접하고 내가 열심히 구조화한 데이터는 막상 실행했을땐 별 차이가 없고,
                지금에 와서 시스템 자체를 여러 단위로 바라보고,
                이걸 인터페이스화하는 것도 것 보기엔 차이가 없습니다.
            </p>
            <p>
                근데 이상하게도 눈에 보이지도 않고,
                암호같은 영어와 기호 숫자의 조합으로 표현되는 이 구조를 짜고 구축하는게 너무나도 흥미롭습니다
            </p>
            <p>
                보이는 것을 많이 만들지 못했다는 고민은 이제 별로 하지 않을려 합니다.
                어떠한 시스템이나 서비스나 앱이든, 그게 뭐가 됬든
                정말 견고하고 미려해지기 위해선 보이지 않는 곳이 가장 중요하다는 걸 약간 배웠습니다
            </p>
        </div>,

        <h1>Projects</h1>,
        <ProjectInfo
            projectName="Astroweave"
            projectUrl="https://github.com/ityeri/Astroweave/tree/develop"
            projectStatuses={{
                "latest source branch": "develop",
                "status": "paused for a while",
                "with": "kotlin",
                "since": "2025.2"
            }}
        />,
        <div className="flex flex-col gap-5 mb-10">
            <p>
                인터넷이 웹이라는 유사어로도 자주 표현되는 이유는 인터넷의 모든 요소가 서로 거미줄처럼 얽혀 연결되어 있기 때문입니다.
                이 거대한 정보의 바다의 연결성을 단적으로 표현하긴 힘들겠지만 이 프로젝트는 간단하면서도 합리적인 방법으로 이 연결과 간선을 표현합니다.
                웹페이지가 노드이고, 엣지가 리다이렉션 링크인 거대한 노드 그래프를 만드는 겁니다
            </p>
            <p>
                웹페이지 A 부터 시작해 봅시다. 이 A 에는 다른 웹페이지 B, C, D 로 이어지는 리다이렉션 링크가 들어 있습니다.
                이걸 보고 종이에 A 라는 이름의 점과  B, C, D 라는 점을 찍고 A 점을 각각 B, C, D 점에 선으로 연결합니다
            </p>
            <div className="flex justify-center h-100">
                <img src={nodeExplanationImage} className="object-contain"/>
            </div>
            <p>
                이후 같은 과정을 새로 찾은 B, C, D 에도 반복합니다.
                B 에서 새 링크를 찾아 점을찍고 선을 긋고, C 에서도 찾아 긋도, D 에도..
                이걸 재귀적으로 계속해서 반복하고, 노드간의 위치를 정리해 주면 이런 모습이 나옵니다
            </p>
            <div className="flex justify-center h-100">
                <img src={astroweaveImage1} className="object-contain"/>
            </div>
            <div className="flex justify-center h-100">
                <img src={astroweaveImage2} className="object-contain"/>
            </div>
            <p>
                처음 이 모습을 봤을땐 정말로 신기했었습니다.
                단순히 웹다이트 리다이렉션 링크를 모아 점을 찍고 연결하고를 반복했는데 여기서 우주처럼 생긴 뭔가가 나왔습니다.
            </p>
        </div>,
        <h3>기술적으로는...</h3>,
        <div className="flex flex-col gap-5 mb-10">
            <p>
                매우 극 초기에, 프로젝트 이름도 다르고 작성 언어도 python 으로 다를 시절,
                이 프로젝트는 순수한 BFS 알고리즘 형태였습니다.
                초기엔 별 생각 없이 이 BFS 알고리즘을 굴렸지만 이내 성능적, 흐름적인 문제가 생겼습니다.
            </p>
            <p>
                BFS 는 보통 계층적인 구조를 탑색하는 용도입니다.
                하지만 앞서 만든 노드 그래프는 부모 자식이 명확한 계층 구조가 아니라, 서로가 구분 없이 얽힌 형태입니다.
                순수한 계층적 발상으로 저 노드 그래프를 표현한다면, 자식 노드가 부모의 부모와 이어지는등, 구조가 매우 난잡해 집니다
                또 루프사이클이 명확한 BFS 의 특성상, 반복이 진행되면서 탐색해야될 노드의 수가 기하급수적으로 증가하고,
                메모리를 미친듯이 먹기 시작합니다
            </p>
            <p>
                프로젝트가 kotlin 으로 다시 작성되고, 대대적인 구조 변화를 하고 나선 BFS 를 살짝 비튼 형태를 사용했습니다.
                BFS 에선 여러개의 부모 노드를 처리하여 그 자식들을 뽑아내고, 또 그 자식들을 부모 노드로 취급하여 거기서 자식을 뽑아내고를 반복하는데,
                새로 작성된 프로젝트에선 이 루프 사이클의 개념을 없엤습니다.
            </p>
            <p>
                대신 대기열을 도입하여, 대기열에서 노드에 해당하는 웹페이지 하나를 뽑아 해당 사이트의 모든 리다이렉션 링크를 뽑고,
                그 링크를 하나하나 노드로써 다시 대기열에 밀어 넣는 방식입니다.
            </p>
            <p>
                이로 BFS 에서 터지는 구조 문제, 기하급수적 메모리 폭탄 문제를 해결했습니다.
                대기열을 도입하여 루프를 없엠으로써 복잡한 노드 그래프를 계층적으로 보지 않고,
                대기열에 추가되는 노드의 수는 노드를 처리할수 있는 속도에 따라 일정하게 제한됩니다.
            </p>
            <p>
                가장 큰 이점은 병렬 처리가 수월해 집니다. CPU 테스크 스케줄링처럼,
                여러개의 코루틴을 만들고, 각 코루틴이 대기열에서 노드를 뽑아와 연결된 노드를 조사하고대기열에 다시 밀어넣고를 계속 반복하는 것입니다.
                웹페이지를 가져온다는 프로젝트의 특성상 거의 대부분이 네트워크 IO 작업이며 코루틴의 특성을 제대로 활용할수 있습니다
            </p>
            <p>
                마지막 벤치마크에선 초당 30개에서 빠르면 60개의 웹사이트(노드) 데이터를 수집했습니다
            </p>
        </div>,
        <ProjectInfo
            projectName="weave"
            projectUrl="https://github.com/ityeri/weave"
            projectStatuses={{
                "latest source branch": "main",
                "status": "on developing",
                "with": "rust",
                "since": "2025.9"
            }}
        />,
        <div className="flex flex-col gap-5 mb-10">
            <p>
                아스트로위브 프로젝트의 개발이 멈춘 이유중 하나입니다.
                노드의 데이터를 긁어오는건 쉽지만, 그 노드의 위치를 깔끔하고 보기 좋게 조정하는게 굉장히 어렵습니다.
                사실 노드의 데이터를 가져오는 부분은 사실상 작업할게 없고,
                그 이후에 손댄곳은 전부 저 노드의 위치를 보기좋게 조정하는 파트입니다
            </p>
            <p>
                아스트로위브 프로젝트는 원래 노드의 위치 조정을 위해 Box2D 라는 기성 물리엔진을 사용했습니다.
                내장된 Joint 기능으로 노드 그래프의 형태를 다질수 있었지만
                Joint 수에 따라 성능이 매우 떨어지고, Joint 의 동작을 노드간 관계에 따라 직접 설정하기가 어렵습니다.
            </p>
            <p>
                weave 는 법용적인 물리엔진이 아니라, 오로지 노드 그래프를 위한 물리엔진으로써 개발되고 있습니다.
                노드 그래프라는 독특한 환경에서 적용할수 있는 다양한 최적화 기법을 써먹을수 있고,
                노드간 상호작용을 더 정밀하고 다양하게 조정할수 있습니다
            </p>
        </div>,
        <h3>기술적으로는...</h3>,
        <div className="flex flex-col gap-5 mb-10">
            <p>
                가장 기초적으론, 중력 방정식에 기반합니다
            </p>
            <BlockMath math="F = G \frac{m_1 m_2}{r^2}"/>
            <p>
                노드가 자신의 1촌 노드와 일정한 거리를 가지도록 하기 위해 거리 부분을 살짝 수정합니다
            </p>
            <BlockMath math="F = G \frac{m_1 m_2}{|r - i|^2}"/>
            <p>
                기존엔 중력장이 오로지 물체의 중심으로만 향했었지만, 이젠 중력장이 물체의 주변 i 반지름의 원을 가르킵니다.
                이렇게 하면 노드 2개가 서로 가까워지는것이 아니라 일정한 거리를 유지합니다.
            </p>
            <p>
                저 i 의 값은 설정하기 나름입니다. 노드의 들어오는 엣지수로 할수도 있고, 나가는 엣지 수로 할수도 있습니다.
                각 노드의 물리적 무게 또한 노드의 중요도를 평가할수 있는 차수 같은 값에 따라 설정할수 있습니다
            </p>
            <div className="flex justify-center h-100">
                <img src={weaveScreenshotImage}/>
            </div>
        </div>,
        <ProjectInfo
            projectName="krawen"
            projectUrl="https://github.com/ityeri/krawen/tree/develop"
            projectStatuses={{
                "latest source branch": "develop",
                "status": "on developing",
                "with": "python",
                "since": "2025.9"
            }}
        />,
        <p>API 요청을 통해 API 자체를 그대로 미러링 하는 크롤링 & 미러링 프로젝트</p>,
        <ProjectInfo
            projectName="tetris_generic"
            projectUrl="https://github.com/ityeri/tetris_generic"
            projectStatuses={{
                "latest source branch": "main",
                "status": "version released",
                "with": "python",
                "since": "2026.2"
            }}
        />,
        <p>인터페이스화 된, 곳곳에 연결이 용의한 테트리스 로직</p>,
    ]

    return <div className="fixed w-screen h-screen">
        <SubPageWrapper
            bgColor="var(--color-background-primary)"
            githubUrl="https://github.com/ityeri"
            githubProjectName="ityeri"
            infoButtonSubtitle="about..."
            infoButtonTitle="Me"
            infoTitle="나에 대한"
            info={<div className="flex flex-col gap-5 break-keep">
                <h1 className="text-lg">Wasans</h1>
            </div>}
        >
            <div className="flex justify-center size-full overflow-y-scroll">
                <div className="w-2/3 my-100 h-fit">
                    {bodyElements.map((element, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, transform: "translateY(100px)"}}
                            animate={{opacity: 100, transform: "translateY(0)"}}
                            transition={{
                                duration: 0.7,
                                delay: 1 + 0.12 * index,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                        >
                            {element}
                        </motion.div>
                    ))}
                </div>
            </div>
        </SubPageWrapper>
    </div>
}
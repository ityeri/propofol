import InformationBar from "@/components/InformatinoBar";

export default function Home() {
    return (
        <div className="flex w-screen h-screen">
            <div className="w-10">

            </div>
            <div className="flex flex-1 flex-col justify-center items-center">
                <h1 className="text-6xl">Propofol</h1>
                <div className="h-3"/>
                <a>Form Follows Function</a>
                <small className="text-xs">ityeri</small>
            </div>

            <div className="absolute w-1/3 max-w-100 min-w-65 h-full right-0">
                <InformationBar
                    githubUrl="https://github.com/ityeri/propofol"
                    projectName="propofol"
                    infoButtonSubTitle="information about"
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
        </div>
    )
}
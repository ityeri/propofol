import IconsMenu from "@/components/IconsMenu";

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

            <div className="absolute w-1/3 max-w-75 h-full right-0 pr-5">
                <IconsMenu/>
            </div>
        </div>
    )
}
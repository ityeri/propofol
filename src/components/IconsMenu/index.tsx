import ExpendableIconButton from "@/components/ExtendableIconButton"
import GithubIcon from "@/assets/github-icon.png"

export default function IconsMenu() {
    return <div className="flex flex-col size-full justify-center items-end">
        <ExpendableIconButton icon={GithubIcon} subtitle="Original source from" title="propofol" href="https://github.com/ityer/"/>
        <div className="h-5"/>
    </div>
}
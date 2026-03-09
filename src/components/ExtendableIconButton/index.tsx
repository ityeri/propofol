type ExpendableIconButtonParms = {
    icon: string
    subtitle: string
    title: string
    href: string | null
}

export default function ExpendableIconButton({icon, subtitle, title, href = null}: ExpendableIconButtonParms) {
    const textClassName =
        "overflow-hidden truncate opacity-0 group-hover:opacity-100 " +
        "translate-y-4 group-hover:translate-y-0 ease-in-out duration-500"

    return <div className="group flex size-20 bg-background-secondary rounded-full hover:w-60 ease-in-out duration-500">
        <div className="h-full p-3 aspect-square mr-2">
            <img src={icon}></img>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden justify-center mr-6">
            <p
                className={`${textClassName} text-xs`}
            >{subtitle}</p>
            {
                href ?
                <a href={href}
                    className={`${textClassName} text-2xl delay-100`}
                >{title}</a> :
                <a
                    className={`${textClassName} text-2xl delay-100`}
                >{title}</a>
            }
        </div>
    </div>
}
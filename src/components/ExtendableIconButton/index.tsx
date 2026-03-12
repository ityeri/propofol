import { motion } from 'framer-motion'

type ExpendableIconButtonParms = {
    icon: string
    subtitle: string
    title: string
}

export default function ExpendableIconButton({
    icon,
    subtitle,
    title,
}: ExpendableIconButtonParms) {
    const textClassName =
        'overflow-hidden truncate opacity-0 group-hover:opacity-100 ' +
        'translate-y-4 group-hover:translate-y-0 ease-in-out duration-500'

    return (
        <motion.div
            className="
        group overflow-hidden flex h-full aspect-square
        bg-background-secondary rounded-full shadow-md shadow-block/100
        "
            whileHover={{
                width: '100%',
            }}
            transition={{
                ease: 'easeInOut',
                duration: 0.5,
            }}
        >
            <div className="h-full p-3 aspect-square mr-2">
                <img src={icon}></img>
            </div>
            <div className="flex flex-col flex-1 overflow-hidden justify-center mr-6 text-left">
                <p className={`${textClassName} text-xs`}>{subtitle}</p>
                <a className={`${textClassName} text-2xl delay-100`}>{title}</a>
            </div>
        </motion.div>
    )
}

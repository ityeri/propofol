import {Link} from "react-router-dom";

type MenuElementParms = {
    title: string
    subtitle: string
    to: string
    onClick: () => void
}

export default function MenuElement({title, subtitle, to, onClick}: MenuElementParms) {
    return (
        <Link className="w-1000" to={to} onClick={onClick}> { /* TODO menu scroll, click hook (to component?), page transision, other page */ }
            <p className="whitespace-nowrap text-4xl">{title}</p>
            <p className="whitespace-nowrap text-xl">{subtitle}</p>
        </Link>
    )
}

import { Link } from 'react-router-dom'
import linkIcon from '@/assets/link-icon.svg'

type ProjectInfoParms = {
    projectName: string
    projectUrl: string
    projectStatuses: Record<string, string>
}

export function ProjectInfo({
    projectName,
    projectUrl,
    projectStatuses,
}: ProjectInfoParms) {
    return (
        <div className="mb-5">
            <Link to={projectUrl} className="flex gap-5">
                <h2 className="mb-1">{projectName}</h2>
                <img src={linkIcon} />
            </Link>
            <div className="flex gap-5 flex-wrap">
                {Object.keys(projectStatuses).map((statusKey) => {
                    return (
                        <div className="flex gap-2 items-center">
                            <p className="text-sm text-text-secondary text-nowrap">
                                {statusKey}
                            </p>
                            <p className="text-nowrap">
                                {projectStatuses[statusKey]}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

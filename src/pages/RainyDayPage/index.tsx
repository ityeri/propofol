import SubPageWrapper from "@/components/SubPageWrapper"
import {useEffect, useRef} from "react"

export function RainyDayPage() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const lastTimeRef = useRef<number | null>(null)

    type Vector = {x: number, y: number}
    type DropLet = {
        position: Vector
        prevPosition: Vector
        prevPositions: Vector[]
        bounces: number
    }
    const dropletListRef = useRef<DropLet[]>([])
    const maxTailLength = 10
    const dropletPerSecond = 200

    useEffect(() => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext('2d')!

        const resizeCanvas = () => {
            const { clientWidth, clientHeight } = canvas

            if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
                canvas.width = clientWidth
                canvas.height = clientHeight
            }
        }

        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas()
        })
        resizeObserver.observe(canvas)

        let requestId: number
        const render = () => {
            const currentTime = performance.now()
            if (!lastTimeRef.current) lastTimeRef.current = currentTime
            const dt = (currentTime - lastTimeRef.current!)
            lastTimeRef.current = currentTime

            let spawningDroplets = dropletPerSecond * (dt / 1000)
            spawningDroplets = spawningDroplets % 1 < Math.random()
                ? Math.ceil(spawningDroplets) : Math.floor(spawningDroplets)

            Array.from({length: spawningDroplets}).forEach(() => {
                const position: Vector = {x: Math.random() * canvas.width, y: -100}

                dropletListRef.current.push({
                    position: position,
                    prevPosition: position,
                    prevPositions: [],
                    bounces: 0
                })
            })

            dropletListRef.current = dropletListRef.current.map((droplet) => {
                const velocity: Vector = {
                    x: droplet.position.x - droplet.prevPosition.x,
                    y: droplet.position.y - droplet.prevPosition.y
                }

                const acc: Vector = {x: 0, y: 0.003}

                let newVelocity: Vector
                let bounces = droplet.bounces

                if (canvas.height - 20 < droplet.position.y && bounces === 0) {
                    const angle = Math.random() * Math.PI * 0.5 + (Math.PI + Math.PI * 0.25)
                    const force = Math.sqrt(velocity.x ** 2 + velocity.y ** 2)
                        * (0.1 + Math.random() * 0.1)
                    newVelocity = {x: Math.cos(angle) * force, y: Math.sin(angle) * force}
                    bounces++
                } else {
                    newVelocity = {x: velocity.x, y: velocity.y}
                }

                return {
                    position: {
                        x: droplet.position.x + newVelocity.x + acc.x * dt ** 2,
                        y: droplet.position.y + newVelocity.y + acc.y * dt ** 2
                    },
                    prevPosition: droplet.position,
                    prevPositions: [droplet.position, ...droplet.prevPositions].slice(0, maxTailLength),
                    bounces: bounces
                }
            })
            dropletListRef.current = dropletListRef.current.filter(
                (droplet) => droplet.position.y < canvas.height * 2
            )

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.lineWidth = 3


            dropletListRef.current.forEach((droplet) => {
                const positions = [droplet.position, ...droplet.prevPositions]
                const lastPosition = positions[0]
                positions.slice(1, positions.length).forEach((position, index) => {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - index / positions.length) * 0.1})`
                    ctx.beginPath()
                    ctx.moveTo(lastPosition.x, lastPosition.y)
                    ctx.lineTo(position.x, position.y)
                    ctx.stroke()
                })
            })

            requestId = requestAnimationFrame(render)
        }

        render()

        return () => {
            resizeObserver.disconnect()
            cancelAnimationFrame(requestId)
        }
    }, [])

    return (
        <div className="fixed w-screen h-screen">
            <SubPageWrapper
                bgColor="var(--color-background-primary)"
                githubUrl="https://github.com/ityeri/propofol"
                githubProjectName="propofol"
                infoButtonSubtitle="information about"
                infoButtonTitle="Rainy Day"
                infoTitle="비오는날"
                info={<>
                </>}
            >
                <div className="w-full h-9/10">
                    <canvas
                        ref={canvasRef}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'block'
                        }}
                    />
                </div>
            </SubPageWrapper>
        </div>
    )
}
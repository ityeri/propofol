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
    }
    const dropletListRef = useRef<DropLet[]>([
        {
            position: {x: 100, y: 10},
            prevPosition: {x: 100, y: 10},
            prevPositions: []
        }
    ])
    const maxTailLength = 10

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

            const position: Vector = {x: Math.random() * canvas.width, y: -100}

            dropletListRef.current.push({
                position: position,
                prevPosition: position,
                prevPositions: []
            })

            dropletListRef.current = dropletListRef.current.map((droplet) => {
                const velocity: Vector = {
                    x: droplet.position.x - droplet.prevPosition.x,
                    y: droplet.position.y - droplet.prevPosition.y
                }

                const acc: Vector = {x: 0, y: 0.3}

                const newVelocity: Vector = {x: velocity.x + acc.x, y: velocity.y + acc.y}

                return {
                    position: {
                        x: droplet.position.x + newVelocity.x,
                        y: droplet.position.y + newVelocity.y
                    },
                    prevPosition: droplet.position,
                    prevPositions: [droplet.position, ...droplet.prevPositions].slice(0, maxTailLength)
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
                    ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - index / positions.length) * 0.2})`
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
                <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
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
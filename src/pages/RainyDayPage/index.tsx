import SubPageWrapper from "@/components/SubPageWrapper"
import {useEffect, useRef} from "react"
import {validUnit} from "katex/src/units.ts";

export function RainyDayPage() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const lastTimeRef = useRef<number | null>(null)

    type Vector = {x: number, y: number}
    type DropLet = {
        position: Vector
        prevPosition: Vector
        prevPositions: Vector[]
        fadingOut: boolean
    }
    type Umbrella ={
        anchorPosition: Vector
        radius: number
        shakeRadius: number
        yOffset: number
        movingUp: boolean
        opacity: number
    }
    const dropletListRef = useRef<DropLet[]>([])
    const umbrellaListRef = useRef<Umbrella[]>([
        {
            anchorPosition: {x: 700, y: 900},
            radius: 30,
            shakeRadius: 5,
            yOffset: 0,
            movingUp: false,
            opacity: 0.5
        }
    ])
    const maxTailLength = 10
    const dropletPerSecond = 200
    const umbrellaSpawnTimerRef = useRef(0)
    const nextUmbrellaSpawnDelay = useRef(0)


    function updateDroplets(
        droplets: DropLet[],
        umbrellas: Umbrella[],
        dt: number, maxY: number
    ): DropLet[] {
        return droplets.map((droplet) => {
            const velocity: Vector = {
                x: droplet.position.x - droplet.prevPosition.x,
                y: droplet.position.y - droplet.prevPosition.y
            }

            const acc: Vector = {x: 0, y: 0.003}

            let newVelocity: Vector = {x: velocity.x, y: velocity.y}
            let fadingOut = droplet.fadingOut

            if (maxY - 20 < droplet.position.y && !fadingOut) {
                const angle = Math.random() * Math.PI * 0.5 + (Math.PI + Math.PI * 0.25)
                const force = Math.sqrt(velocity.x ** 2 + velocity.y ** 2)
                    * (0.1 + Math.random() * 0.1)

                newVelocity = {
                    x: Math.cos(angle) * force,
                    y: Math.sin(angle) * force
                }
                fadingOut = true
            }

            if (!fadingOut) {
                for (const umbrella of umbrellaListRef.current) {
                    const position: Vector = {
                        x: umbrella.anchorPosition.x,
                        y: umbrella.anchorPosition.y + umbrella.yOffset
                    }

                    const distance = Math.sqrt(
                        (position.x - droplet.position.x) ** 2
                        + (position.y - droplet.position.y) ** 2
                    )

                    if (distance < umbrella.radius) {
                        const angle = Math.atan2(
                            position.y - droplet.position.y,
                            position.x - droplet.position.x
                        ) + Math.PI

                        const force = Math.sqrt(velocity.x ** 2 + velocity.y ** 2)
                            * (0.2 + Math.random() * 0.1)

                        newVelocity = {
                            x: Math.cos(angle) * force,
                            y: Math.sin(angle) * force
                        }
                    }
                }
            }

            return {
                position: {
                    x: droplet.position.x + newVelocity.x + acc.x * dt ** 2,
                    y: droplet.position.y + newVelocity.y + acc.y * dt ** 2 // TODO umbrella image
                },
                prevPosition: droplet.position,
                prevPositions: [droplet.position, ...droplet.prevPositions].slice(0, maxTailLength),
                fadingOut: fadingOut
            }
        }).filter(
            (droplet) => droplet.position.y < maxY * 2
        )
    }

    function updateUmbrellas(umbrellas: Umbrella[], dt: number, maxX: number): Umbrella[] {
        return umbrellas.map((umbrella) => {
            let movingUp = umbrella.movingUp

            if (umbrella.yOffset < -umbrella.shakeRadius) {
                movingUp = false
            } else if (umbrella.shakeRadius < umbrella.yOffset) {
                movingUp = true
            }
            const speed = dt * umbrella.shakeRadius * 0.03
            const yOffset = Math.abs(umbrella.yOffset) < umbrella.shakeRadius * 2
                ?  movingUp ? umbrella.yOffset - speed : umbrella.yOffset + speed
                : 0

            return {
                ...umbrella,
                anchorPosition: {
                    x: umbrella.anchorPosition.x + dt * 0.2,
                    y: umbrella.anchorPosition.y
                },
                yOffset: yOffset,
                movingUp: movingUp
            }
        }).filter(
            (umbrella) => umbrella.anchorPosition.x < maxX
        )
    }


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
            spawningDroplets = Math.random() < spawningDroplets % 1
                ? Math.ceil(spawningDroplets) : Math.floor(spawningDroplets)

            Array.from({length: spawningDroplets}).forEach(() => {
                const position: Vector = {x: Math.random() * canvas.width, y: -100}

                dropletListRef.current.push({
                    position: position,
                    prevPosition: position,
                    prevPositions: [],
                    fadingOut: false
                })
            })

            umbrellaSpawnTimerRef.current += dt / 1000

            if (nextUmbrellaSpawnDelay.current <= umbrellaSpawnTimerRef.current) {
                umbrellaListRef.current.push({
                    anchorPosition: {x: -100, y: canvas.height - 50},
                    radius: 10 + Math.random() * 30,
                    shakeRadius: 5,
                    yOffset: 0,
                    movingUp: false,
                    opacity: 0.5
                })
                nextUmbrellaSpawnDelay.current = 0.1 + Math.random()
                umbrellaSpawnTimerRef.current = 0
            }

            dropletListRef.current = updateDroplets(
                dropletListRef.current, umbrellaListRef.current, dt, canvas.height - 20
            )
            umbrellaListRef.current = updateUmbrellas(umbrellaListRef.current, dt, canvas.width + 100)


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

            umbrellaListRef.current.forEach((umbrella) => {
                const position: Vector = {
                    x: umbrella.anchorPosition.x,
                    y: umbrella.anchorPosition.y + umbrella.yOffset
                }

                ctx.fillStyle = `rgba(255, 255, 255, ${umbrella.opacity})`
                ctx.beginPath()
                ctx.arc(position.x, position.y, umbrella.radius, 0, Math.PI * 2)
                ctx.closePath()
                ctx.fill()
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
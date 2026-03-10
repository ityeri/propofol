import SubPageWrapper from "@/components/SubPageWrapper"
import { motion } from "framer-motion"
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
    const dropletListRef = useRef<DropLet[]>([])

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

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const droplets = dropletListRef.current

            dropletListRef.current = droplets.map((droplet) => {
                const velocity: Vector = {
                    x: droplet.position.x - droplet.prevPosition.x,
                    y: droplet.position.y - droplet.prevPosition.y
                }

                const acc: Vector = {x: 0, y: 0.1}

                const newVelocity: Vector = {x: velocity.x + acc.x, y: velocity.y + acc.y}
                console.log(droplet.position)

                return {
                    position: {
                        x: droplet.position.x + newVelocity.x,
                        y: droplet.position.y + newVelocity.y
                    },
                    prevPosition: droplet.position,
                    prevPositions: droplet.prevPositions
                }
            })

            ctx.fillStyle = '#ffffff'

            dropletListRef.current.forEach((droplet) => {
                ctx.fillRect(droplet.position.x, droplet.position.y, 10, 10)
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
        <motion.div className="fixed w-screen h-screen">
            <SubPageWrapper
                bgColor="var(--color-background-primary)"
                githubUrl="https://github.com/ityeri/propofol"
                githubProjectName="propofol"
                infoButtonSubtitle="information about"
                infoButtonTitle="Rainy Day"
                infoTitle="비오는날"
                fadeInDelay={1}
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
        </motion.div>
    )
}
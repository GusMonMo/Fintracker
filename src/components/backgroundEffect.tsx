

export default function BubbleEffect(){

    const Bubbles = new Array(50).fill('')
    

    return(
        <div className="effectContainer">
            {Bubbles.map((_, i) => {
                const iRandom = Math.floor(Math.random() * 5 + 1)
                const xRandom = Math.random() * 100
                const moveX = (Math.random() - 0.5) * 50
                const opacityX = Math.random()
                const delay = Math.random() * 3
                const scale = Math.random() *2

        return (
            <span key={i} style={{'--i':iRandom, 
                '--x': `${xRandom}vw`, 
                '--move-x': `${moveX}vw`,
                '--opacity': `${opacityX}`,
                "--delay": `${delay}s`,
                '--scale': `${scale}`
               } as React.CSSProperties}/>
        )
            })}
        </div>
    )
}
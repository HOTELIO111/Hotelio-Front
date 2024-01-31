import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'


const AnimatedBg = () => {
    const { width, height } = useWindowSize()
    return (
        <Confetti
            width={width}
            height={height}
            numberOfPieces={90}
            wind={0.006}
            gravity={0.02}
            opacity={58}
            initialVelocityX={4}
            initialVelocityY={10}
            recycle={true}
        />
    )
}

export default AnimatedBg

// https://alampros.github.io/react-confetti/?path=/story/props-demos--knobs&knob-Run=true&knob-Recycle=true&knob-# Pieces=90&knob-Wind=0.006&knob-Gravity=0.02&knob-Initial X=4&knob-Initial Y=10&knob-Opacity=58
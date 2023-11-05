import React from "react";
import WheelComponent from 'react-wheel-of-prizes'

export default function PrizeWheel(){
    const segments = [
        'better luck next time',
        'won 70 Rs',
        'won 10 Rs',
        'better luck next time',
        'won 20 RS',
        'won special pass',
        'better luck next time',
        'won a voucher'
      ]
      const segColors = [
        '#EE4040',
        '#F0CF50',
        '#815CD1',
        '#3DA5E0',
        '#34A24F',
        '#F9AA1F',
        '#EC3F3F',
        '#FF9000'
      ]
      const onFinished = (winner) => {
        console.log(winner)
      }

      return (
        <div style={{width:'60vh'}}>
          <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment='10'
        onFinished={(winner) => onFinished(winner)}
        primaryColor='black'
        contrastColor='white'
        buttonText='Spin'
        isOnlyOnce={false}
        size={290}
        upDuration={100}
        downDuration={1000}
        fontFamily='Arial'
      />
        </div>
      );

}
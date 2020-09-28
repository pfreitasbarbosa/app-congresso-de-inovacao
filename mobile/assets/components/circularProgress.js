import React, {useRef} from 'react';
import { Dimensions, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const screenDimension = Dimensions.get("window").width;
const size = screenDimension - 164;
const strokeWidth = 8;
const radius = (size - 20)/2;
const circumference = radius * 2 * Math.PI;

function CircularProgress(props){
    const progress = useRef(new Animated.Value(0)).current;
    Animated.loop(
      Animated.timing(progress, {
        toValue: circumference, //Para efeito de loading, multiplicar o valor
        duration: 5160,        //e estender a duração.
        useNativeDriver: false
      }),
      //{
       // iterations: 8
      //}
    ).start()
    const strokeDashoffset = progress;
    return(
        <Svg
         height={screenDimension}
         width={screenDimension} {...props}>
            <Circle
                cx={screenDimension*.5}
                cy={size/2}
                r={radius}
                fill="none"
                stroke="#0a122b"
                strokeWidth={20}/>
            <AnimatedCircle 
                cx={screenDimension*.5}
                cy={size/2}
                r={radius}
                stroke="#EF0432"
                strokeDasharray={`${circumference} ${circumference}`}
                {...{strokeWidth, strokeDashoffset}}/>
        </Svg>
    );
}

export default CircularProgress;
import React, {useRef} from 'react';
import { Dimensions, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const screenDimension = Dimensions.get("window").width;
const size = screenDimension - 128;
const strokeWidth = 20;
const radius = (size - strokeWidth)/2;
const circumference = radius * 2 * Math.PI;

function CircularProgress(props){
    const progress = useRef(new Animated.Value(0)).current;
    Animated.loop(
      Animated.timing(progress, {
        toValue: circumference,
        duration: 5150,
        useNativeDriver: false
      }),
      //{
       // iterations: 8
      //}
    ).start()
    const strokeDashoffset = progress;
    return(
        <Svg height={screenDimension} width={screenDimension} {...props}>
            <AnimatedCircle 
                cx={size/2}
                cy={size/2}
                r={radius}
                fill="none"
                stroke="#EF0432"
                strokeDasharray={`${circumference} ${circumference}`}
                {...{strokeWidth, strokeDashoffset}}/>
        </Svg>
    );
}

export default CircularProgress;
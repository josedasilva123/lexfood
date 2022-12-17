import { keyframes } from "styled-components";

export const AnimationFade = keyframes`
    from{
        opacity: 0;
        transform: translateX(50px);
    } to {
        opacity: 1;
        transform: translateX(0);
    }
`

export const AnimationFadeOut = keyframes`
    from{
        transform: translateX(0);
        opacity: 1;
    } to {
        transform: translateX(50px);
        opacity: 0;
    }
`
 
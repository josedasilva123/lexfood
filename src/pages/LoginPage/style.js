import styled from "styled-components"

export const StyledLoginPage = styled.section`
    width: 100%;
    min-height: 100vh;
    background: ${({theme}) => theme.colors.orange};
`

export const StyledLoginPageFlexBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 100vh;

    & > .innerBox{
        background: ${({theme}) => theme.colors.white};
        padding: 30px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        gap: 40px;

        max-width: 600px;
    }
`
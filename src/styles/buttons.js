/* eslint-disable default-case */
import styled, { css } from "styled-components";

export const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: 255px;
    transition: .4s; 

    &:hover{
        filter: brightness(1.2);   
    }

    ${({buttonSize}) => {
        switch(buttonSize){
            case "default":
                return css`
                    padding: 0 2rem;
                    height: 44px; 
                `
            case "big":
                return css`
                    padding: 0 2.5rem;
                    height: 52px;
                ` 
            case "small":
                return css`
                    padding: 0 1.75rem;
                    height: 40px;  
                `       
        }
    }}

    ${({buttonStyle}) => {
        switch(buttonStyle){
            case "solid1":
                return css`
                    background: var(--color-orange);
                    color: var(--color-white);
                `  
            case "solid2":
                return css`
                    background: var(--color-white);
                    color: var(--color-orange);
                ` 
                
            case "outline1":
                return css`
                    border: 1px solid var(--color-orange);
                    color: var(--color-orange);

                    &:hover{
                        background: var(--color-orange);
                        color: var(--color-white);   
                    }
                `    
            
            case "outline2":
                return css`
                    border: 1px solid var(--color-white);
                    color: var(--color-white);

                    &:hover{
                        background: var(--color-white);
                        color: var(--color-orange);   
                    }
                `
        }
    }}
    

`
import styled from "styled-components"

export const StyledSearchForm = styled.div`
    form{
        align-items: center;
        flex-direction: row;
    }

    @media (max-width: 350px){
        form{
            flex-direction: column;

            button{
                width: 100%;
            }
        }
    }
`
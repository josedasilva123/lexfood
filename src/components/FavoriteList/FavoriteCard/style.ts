import styled from "styled-components"

export const StyledFavoriteCard = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    padding: 8px;
    border-bottom: 2px solid ${({theme}) => theme.colors.orange}
`
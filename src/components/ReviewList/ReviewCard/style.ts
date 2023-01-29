import { Avatar, Rating } from "@mui/material";
import styled from "styled-components";

export const StyledReviewCard = styled.li`
   display: flex;
   flex-direction: column;
   gap: 10px;

   header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
      .score {
         display: flex;
         align-items: center;
         gap: 6px;

         .scoreText{
            font-weight: 600;
            color: ${({theme}) => theme.colors.black}
         }
      }

      .name{
        display: flex;
        align-items: center;
        gap: 10px;
      }

      @media (max-width: 425px){
        align-items: flex-start;
        gap: 10px;
        flex-direction: column;
      }
   }
`;

export const StyledAvatar = styled(Avatar)`
    font-weight: 400!important;
    font-size: 1rem!important;
    width: 32px!important;
    height: 32px!important;
`

export const StyledRating = styled(Rating)`
    span{
        font-size: 1.1rem!important;
    }
`
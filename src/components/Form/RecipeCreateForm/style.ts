import styled from "styled-components";

export const StyledRecipeCreateFormBox = styled.div`
   .fileImage {
      max-height: 180px;
      object-position: left;
      object-fit: contain;
   }
   .fileLabel{
      cursor: pointer;
      text-align: center;
      padding: 20px;

      display: flex;
      align-items: center;
      justify-content: center;

      height: 140px;

      border: 2px dashed ${({theme}) => theme.colors.lockOrange};
      color: ${({theme}) => theme.colors.black}
   }

`;

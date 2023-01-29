import { Dialog } from "@mui/material";
import styled from "styled-components";

export const StyledDialog = styled(Dialog)`
   .MuiPaper-root {
      background: ${({ theme }) => theme.colors.white}!important;
   }

   button {
      margin: 10px;
   }
`;

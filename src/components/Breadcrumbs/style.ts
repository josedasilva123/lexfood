import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledBreadcrumbs = styled.p`
   display: flex;
   align-items: center;
   gap: 8px;
   padding: 20px 0;

   color: ${({ theme }) => theme.colors.orange};

   .currentPage {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.black};
   }

   span {
      display: inline-flex;
      align-items: center;
      gap: 8px;
   }
`;

export const StyledBreadcrumbsLink = styled(Link)`
   color: ${({ theme }) => theme.colors.orange};

   &:hover {
      text-decoration: underline;
   }
`;

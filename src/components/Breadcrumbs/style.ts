import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledBreadcrumbs = styled.p`
   display: flex;
   align-items: center;
   flex-wrap: wrap;
   gap: 8px;
   padding: 20px 0;

   color: ${({ theme }) => theme.colors.lockOrange};

   .currentPage {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.black};
   }

   span {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
   }
`;

export const StyledBreadcrumbsLink = styled(Link)`
   color: ${({ theme }) => theme.colors.lockOrange};
   white-space: nowrap;
   &:hover {
      text-decoration: underline;
   }
`;

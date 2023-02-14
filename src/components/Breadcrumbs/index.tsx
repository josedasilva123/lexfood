/* eslint-disable react/jsx-no-comment-textnodes */
import { StyledBreadcrumbs, StyledBreadcrumbsLink } from './style';

interface iLink{
    label: string,
    url: string,
}

interface iBreadcrumbsProps{
    breadcrumbs?: iLink[];
    currentPage: string;
}

const Breadcrumbs = ({ breadcrumbs, currentPage }: iBreadcrumbsProps) => {
  return (
    <div id="breadcrumbs">
        <StyledBreadcrumbs>
            <StyledBreadcrumbsLink to="/recipes">Receitas</StyledBreadcrumbsLink>// 
            {breadcrumbs?.map((link, index) => (
                <span key={index}>
                    <StyledBreadcrumbsLink  to={link.url}>{link.label}</StyledBreadcrumbsLink>//
                </span>
            ))}
            <span className='currentPage'>{currentPage}</span>
        </StyledBreadcrumbs>
        
    </div>
  )
}

export default Breadcrumbs
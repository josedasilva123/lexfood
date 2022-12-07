import React from "react";
import { StyledButton } from "../../styles/buttons";
import { StyledTitle } from "../../styles/typography";
import SearchForm from "./SearchForm";
import { StyledSearchResults, StyledSearchSection } from "./style";

const SearchSection = ({search, setSearch}) => {
   return (
      <StyledSearchSection>        
         <SearchForm setSearch={setSearch} />
         {search && (
            <StyledSearchResults>
               <StyledTitle tag="h2" fontSize="two" fontWeight={700}>
                  Resultados de busca para: <span>{search}</span>
               </StyledTitle>
               <StyledButton buttonStyle="solid1" buttonSize="default" onClick={() => setSearch("")}>
                  Limpar busca
               </StyledButton>
            </StyledSearchResults>
         )}
      </StyledSearchSection>
   );
};

export default SearchSection;

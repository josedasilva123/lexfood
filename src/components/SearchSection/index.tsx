import React, { useContext } from "react";
import { RecipeContext } from "../../providers/RecipeContext/RecipeContext";
import { StyledButton } from "../../styles/buttons";
import { StyledTitle } from "../../styles/typography";
import SearchForm from "./SearchForm";
import { StyledSearchResults, StyledSearchSection } from "./style";

const SearchSection = () => {
   const { search, setSearch } = useContext(RecipeContext);
   return (
      <StyledSearchSection>        
         <SearchForm />
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

import React, { SyntheticEvent, useContext, useState } from "react";
import { MdSearch } from "react-icons/md";
import { StyledSearchForm } from "./style";
import { StyledForm } from "../../../styles/form";
import { StyledButton } from "../../../styles/buttons";
import { RecipePageContext } from "../../../providers/RecipeContext/RecipePageContext/RecipePageContext";

const SearchForm = () => {
   const [searchInput, setSearchInput] = useState("");
   const { setSearch } = useContext(RecipePageContext);

   function submit(event: SyntheticEvent) {
      event.preventDefault();
      setSearch(searchInput);
   }

   return (
      <StyledSearchForm>
         <StyledForm onSubmit={submit}>
            <input
               type="text"
               value={searchInput}
               placeholder="O que você está procurando?"
               onChange={(event) => setSearchInput(event.target.value)}
            />
            <StyledButton $buttonSize="default" $buttonStyle="solid1">
              <MdSearch size={21} />
            </StyledButton>  
         </StyledForm>
      </StyledSearchForm>
   );
};

export default SearchForm;

import React, { useState} from 'react'

const SearchForm = ({setSearch}) => {
  const [searchInput, setSearchInput] = useState("");  

  const submit = (event) => {
    event.preventDefault();
    setSearch(searchInput);
  } 

  return (
    <form onSubmit={submit}>      
        <input type="text" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
        <button>Pesquisar</button>
    </form>    
  )
}

export default SearchForm
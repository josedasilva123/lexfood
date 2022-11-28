import React, { useState, useEffect } from "react";

const SamplePage = () => {
   const mockGames = [
      {
         title: "League of Legends",
         category: "MOBA",
         price: 0,
      },
      {
         title: "DOTA 2",
         category: "MOBA",
         price: 0,
      },
      {
         title: "God of War",
         category: "Action",
         price: 149.9,
      },
      {
         title: "Super Mario Maker 2",
         category: "Plataform",
         price: 300,
      },
      {
         title: "Zelda Breath of Wild",
         category: "Action",
         price: 200,
      },
   ];

   const [gameList, setGameList] = useState(mockGames);
   const [categoryFilter, setCategoryFilter] = useState("todos");
   const [priceFilter, setPriceFilter] = useState(0);

   const filterGameList = gameList.filter(game => 
    (categoryFilter === "todos" ? true : game.category === categoryFilter) &&
    (priceFilter === 0 ? true : game.price <= priceFilter)
   )

   return (
    <div>    
        <ul>
            <li onClick={() => setCategoryFilter("todos")}>Todos</li>
            <li onClick={() => setCategoryFilter("MOBA")}>MOBA</li>
            <li onClick={() => setCategoryFilter("Action")}>Action</li>
            <li onClick={() => setCategoryFilter("Plataform")}>Plataform</li>
        </ul>
        {priceFilter.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
        <input type="range" value={priceFilter}  onChange={(event) => setPriceFilter(+event.target.value)} max="300"/>
        {filterGameList.map(game => (
            <li key={game.title}>{game.title}</li>
        ))}
    </div>
   );
};

export default SamplePage;

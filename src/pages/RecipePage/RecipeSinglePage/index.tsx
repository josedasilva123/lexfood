import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../../components/Header'
import { StyledContainer } from '../../../styles/grid'

const RecipeSinglePage = () => {
  const { recipeId } = useParams();
  return (
    <div>
      <Header />
      <StyledContainer>
        {}
      </StyledContainer>
        
    </div>
  )
}

export default RecipeSinglePage
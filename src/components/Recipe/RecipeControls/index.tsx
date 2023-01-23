import React from 'react'
import { StyledLinkButton } from '../../../styles/buttons'
import { MdAdd } from "react-icons/md"
import { StyledRecipeControls } from './style'

const RecipeControls = () => {
  return (
    <StyledRecipeControls>
      <StyledLinkButton to="/recipes/create" buttonStyle="outline1" buttonSize="default">
        <MdAdd size={21} />Nova Receita
      </StyledLinkButton>
    </StyledRecipeControls>
  )
}

export default RecipeControls
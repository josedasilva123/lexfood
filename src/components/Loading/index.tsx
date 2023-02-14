import { StyledLoading } from './style'
import LoadingSVG from "../../assets/Loading.svg";

const Loading = () => {
  return (
    <StyledLoading>
        <img src={LoadingSVG} alt="Carregando..." />
    </StyledLoading>    
  )
}

export default Loading
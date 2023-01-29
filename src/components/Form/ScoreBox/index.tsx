import { Rating } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { StyledScoreBox } from "./styles";

interface iScoreBoxProps {
   currentScore: string;
   onChange: (event: SyntheticEvent, newValue: any) => void;
}

const ScoreBox = ({ currentScore, onChange }: iScoreBoxProps) => {
   return (
      <StyledScoreBox>
         {currentScore && <span className="currentScore">{(+currentScore).toFixed(1)}</span>}
         <Rating value={currentScore ? +currentScore : null} onChange={onChange} />
      </StyledScoreBox>
   );
};

export default ScoreBox;

import { DialogTitle, DialogContent, DialogActions } from '@mui/material';
import React from 'react'
import { StyledButton } from '../../../styles/buttons';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { StyledDialog } from './style';

interface iConfirmDialogProps{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm: () => void;
    title: string;
    content: string;
}

const ConfirmDialog = ({ isOpen, setIsOpen, onConfirm, title, content }: iConfirmDialogProps) => {
  return (
    <StyledDialog open={isOpen} onClose={() => setIsOpen(false)}>        
        <DialogTitle>
        <StyledTitle tag="h1" fontSize="four">
            {title}
        </StyledTitle>
        </DialogTitle>
        <DialogContent>
            <StyledParagraph>
                {content}
            </StyledParagraph>
        </DialogContent>
        <DialogActions>
            <StyledButton $buttonStyle='link' onClick={onConfirm}>
                Aceitar
            </StyledButton>
            <StyledButton $buttonStyle='link' onClick={() => setIsOpen(false)}>
                Cancelar
            </StyledButton>
        </DialogActions>
    </StyledDialog>
  )
}

export default ConfirmDialog
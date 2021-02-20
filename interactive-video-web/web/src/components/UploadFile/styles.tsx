import styled, { css } from 'styled-components';

interface DropContainerPrps {
    isDragActive: boolean,
    isDragReject: boolean
}

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div`
    border: 1px dashed #ddd;
    border-radius: 4px;
    cursor: pointer;
    
    transition: height 0.2s ease; 
    
    ${(props: DropContainerPrps) => props.isDragActive && dragActive};
    ${(props:DropContainerPrps) => props.isDragReject && dragReject};
`;

interface MessageColorsTypes {
    default: string,
    error: string,
    success: string
}
const messageColors: MessageColorsTypes = {
    default: '#999',
    error: '#e57878',
    success: '#78e5d5'
}

enum Types {
    default = 'default',
    error = 'error',
    success = 'success'
}

interface UploadMessageProps {
    type?: Types
}
export const UploadMessage = styled.p<UploadMessageProps>`
  display: flex;
  color: ${(props: UploadMessageProps) => (messageColors as MessageColorsTypes)[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
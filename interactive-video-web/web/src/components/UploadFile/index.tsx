import React from 'react';
import Dropzone, {DropEvent} from "react-dropzone";
import { DropContainer, UploadMessage } from './styles'

enum Types {
    default = 'default',
    error = 'error',
    success = 'success'
}
type UploadFileProps = {
    onUpload?<T extends File>(files: T[], event: DropEvent): void;
}
const UploadFile: React.FC<UploadFileProps> = (props) => {

    const handleDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
        return (!isDragActive && <UploadMessage>Araste os arquivos para aqui</UploadMessage>)
            || (isDragReject && <UploadMessage type={Types.error}>Arquivo não suportado</UploadMessage>)
            || (<UploadMessage type={Types.success}>Solte os arquivos aqui</UploadMessage>)
    }

    return (
        <Dropzone onDropAccepted={props.onUpload}>
            {
                ({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                    <DropContainer
                        {...getRootProps()}
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                    >
                        <input {...getInputProps()}/>
                        {handleDragMessage(isDragActive, isDragReject)}
                    </DropContainer>
                )
            }
        </Dropzone>
    );
};

export default UploadFile
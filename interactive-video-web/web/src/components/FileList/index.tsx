import React, { useState } from "react";

import { Container, FileInfo, Preview } from "./styles";
import FancyImage from "../FancyImage";

interface File {
    id: number,
    preview: string,
    name: string,
    url: string
}
interface FileListProps {
    files: File[],
    onDelete: Function
}
const FileList: React.FC<FileListProps> = ({ files, onDelete }) => {
    const [imageLargeOpen, setImageLargeOpen] = useState<boolean>(false);

    return (
        <Container>
            {files.map(uploadedFile => (
                <li key={uploadedFile.id}>
                    <FileInfo>
                        <Preview src={uploadedFile.preview} onClick={() => setImageLargeOpen(!imageLargeOpen)}/>
                        <div>
                            <strong>{uploadedFile.name}</strong>
                            <span>
                                {!!uploadedFile.name && (
                                    <button onClick={() => onDelete(uploadedFile.name)}>
                                        Excluir
                                    </button>
                                )}
                            </span>
                        </div>
                        <FancyImage file={uploadedFile} openHandle={{open: imageLargeOpen, setOpen: setImageLargeOpen}} />
                    </FileInfo>
                </li>
            ))}
        </Container>
    );
}

export default FileList;
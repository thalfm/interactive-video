import {promisify} from 'util';
import {pipeline} from "stream";

export const pipelineAsync = promisify(pipeline);
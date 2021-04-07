import {Controller, Post, Req, Res} from '@nestjs/common';
import {pipelineAsync} from "../../utils";
import {Request, Response} from 'express';
import {WebsocketService} from "../service/websocket.service";

@Controller('upload')
export class UploadController {

    constructor(private websocketService: WebsocketService) {}

    @Post()
    async post(@Req() request: Request, @Res() response: Response) {
        const {headers} = request;
        const {socket_id: socketId} = request.query;

        const onFinish = (res: Response) => () => {
            res.end()
        }

        const busboyInstance = this.websocketService
            .registerEvents(
                socketId as string,
                headers,
                onFinish(response)
            )

        await pipelineAsync(
            request,
            busboyInstance
        )
    }
}

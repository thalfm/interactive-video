import { Module } from '@nestjs/common';
import {WebsocketService} from "./upload/service/websocket.service";
import { UploadController } from './upload/controller/upload.controller';

@Module({
    providers: [WebsocketService],
    controllers: [UploadController],
})
export class AppModule {}

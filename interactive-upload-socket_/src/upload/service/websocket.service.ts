import {OnGatewayInit, WebSocketGateway, WebSocketServer,} from '@nestjs/websockets';
import {Server} from 'socket.io';
import {pipelineAsync} from "../../utils";
import {Injectable} from "@nestjs/common";
// @ts-ignore
import * as AWS from 'aws-sdk';

const stream = require('stream');
const AWS_BUCKET_NAME = 'interactive-video-web';
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACESS_KEY
});

const ON_UPLOAD_EVENT = "file-uploaded"

const Busboy = require('busboy')

@Injectable()
@WebSocketGateway({namespace: 'upload'})
export class WebsocketService implements OnGatewayInit {

    afterInit(server: any) {
        console.log('Iniciando WebSocketGateway.');

    }

    @WebSocketServer()
    private server: Server;
    private socketId: string;

    registerEvents(socketId: string, headers, onFinish) {
        const busboy = new Busboy({headers});

        this.socketId = socketId;

        busboy.on("file", this.onFile.bind(this));

        busboy.on("finish", onFinish);

        return busboy;
    }

    async onFile(fieldname, file, filename) {
        console.log('Uploading...');

        await pipelineAsync(
            file,
            this.uploadFile(filename)
        )
    }

    public uploadFile(filename) {
        console.log(`filename: ${filename}`)
        const Body = new stream.PassThrough;

        var server = this.server;
        var socketId = this.socketId;

        s3.upload(
        {
                Bucket:AWS_BUCKET_NAME,
                Key: filename,
                Body
            },
            {
                partSize: 5242880,
                queueSize: 10
            })
            .on('httpUploadProgress', progress => {
                console.log(`progress: ${progress.loaded}`)
                server.clients().to(socketId).emit(ON_UPLOAD_EVENT, progress.loaded)
            })
            .send((err, data) => {
                if (err) {
                    console.log(`Error: ${err.message}`)
                    Body.destroy(err);
                } else {
                    console.log(`File uploaded and available at ${data.Location}`);
                    Body.destroy();
                }
            });

        return Body;
    }
}
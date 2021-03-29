import {Context, Server} from '@loopback/core';
import {Channel, connect, Connection, Replies} from 'amqplib';
import AssertQueue = Replies.AssertQueue;
import {repository} from "@loopback/repository";
import {CourseRepository} from "../repositories";
import {Course} from "../models";


export class RabbitmqServer extends Context implements Server {
    _listening: boolean;
    conn: Connection;
    channel: Channel;

    constructor(@repository(CourseRepository) private courseRepo: CourseRepository) {
        super();
    }

    async start(): Promise<void> {
        this.conn = await connect({
            hostname: process.env.RABBITMQ_HOST,
            username: process.env.RABBITMQ_USER,
            password: process.env.RABBITMQ_PWD
        })

        this._listening = true;

        this.boot();

        return undefined;
    }

    async boot() {
        this.channel = await this.conn.createChannel();
        const aQueue: AssertQueue = await this.channel.assertQueue('interactive-video/sync-courses');
        const aExchange = await this.channel.assertExchange('amq.topic', 'topic');

        await this.channel.bindQueue(aQueue.queue, aExchange.exchange, 'model.*.*');

        this.channel.consume(aQueue.queue, (message) => {
            if (!message) {
                return;
            }

            const data = JSON.parse(message.content.toString());
            const [model, event] = message.fields.routingKey.split('.').slice(1);

            this.sync({model, event, data})
                .then(() => this.channel.ack(message))
                .catch((error) => {
                    console.log(error);
                    this.channel.reject(message, false);
                })
        });
    }

    async sync({model, event, data}: {model:string, event: string, data: Course}) {
        if (model === 'curso') {
            switch (event) {
                case 'created':
                    await this.courseRepo.create(data);
                    break;
                case 'updated':
                    await this.courseRepo.updateById(data.id_cursos, data);
                    break;
                case 'deleted':
                    await this.courseRepo.deleteById(data.id_cursos);
                    break;
            }
        }
    }

    async stop(): Promise<void> {
        await this.conn.close();
        this._listening = true;
    }

    get listening(): boolean {
        return this._listening;
    }
}
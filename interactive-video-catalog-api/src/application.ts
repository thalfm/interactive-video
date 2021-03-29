import {BootMixin} from '@loopback/boot';
import {Application, ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {RestComponent, RestServer} from "@loopback/rest";
import {RabbitmqServer} from "./servers/rabbitmq.server";

export {ApplicationConfig};

export class InteractiveVideoCatalogApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(Application)),
) {
  constructor(options: ApplicationConfig = {}) {
    // Set up the custom sequence
    super(options);

    options.rest.sequence = MySequence;
    this.component(RestComponent);
    const restServer = this.getSync<RestServer>('servers.RestServer')
    // Set up default home page
    restServer.static('/', path.join(__dirname, '../public'));

    // // Customize @loopback/rest-explorer configuration here
    // this.configure(RestExplorerBindings.COMPONENT).to({
    //   path: '/explorer',
    // });
    // this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    this.servers([RabbitmqServer]);
  }
}

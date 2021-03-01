import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import next from 'next';
import NextServer from 'next/dist/next-server/server/next-server';
@Injectable()
export class ViewService implements OnModuleInit {
    private logger = new Logger(ViewService.name);
    private server: NextServer

    async onModuleInit(): Promise<void> {
        try {
            this.server = next({ dev: true, dir: './src/client' })
            await this.server.prepare()
        } catch (error) {
            this.logger.log(error)
        }
    }

    getNextServer(): NextServer {
        return this.server
    }

}

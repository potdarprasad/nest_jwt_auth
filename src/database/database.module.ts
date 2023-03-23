import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { repositories } from './repositories';
import { entities } from './entities';

@Module({
    imports: [
        TypeOrmModule.forFeature(entities),
    ],
    providers: [...repositories, ...entities],
    exports: [...repositories, ...entities],
})
export class DatabaseModule { }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ComicDocument = HydratedDocument<Comic>;

@Schema({ timestamps: true })
export class Comic {
    @Prop({ require: true })
    title: string;

    @Prop({ require: true })
    pageCount: number

    @Prop({ require: true })
    format: string

    @Prop({ require: false })
    imagePath: string

    @Prop({ require: true })
    dateOnStart: Date

    @Prop({ require: false })
    idApi: number
}

export const ComicSchema = SchemaFactory.createForClass(Comic);
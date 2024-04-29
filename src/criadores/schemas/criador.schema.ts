import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CriadorDocument = HydratedDocument<Criador>;

@Schema({ timestamps: true })
export class Criador {
    @Prop({ require: true })
    fullName: string;

    @Prop({ require: true })
    role: string

    @Prop({ require: true })
    comics: string[]

    @Prop({ require: false })
    imagePath: string

    @Prop({ require: false })
    idApi: number
}

export const CriadorSchema = SchemaFactory.createForClass(Criador);
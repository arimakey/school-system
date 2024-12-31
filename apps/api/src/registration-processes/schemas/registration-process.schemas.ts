import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema({
    timestamps: true
})
export class RegistrationProcess {
    @Prop({
        required: true,
        unique: true
    })
    name : string;

    @Prop()
    description : string;

    @Prop({
        required: true
    })
    status : boolean;

    @Prop({
        required: true
    })
    startDate : Date;

    @Prop({
        required: true
    })
    endDate : Date;
}

export const RegistrationProcessSchema = SchemaFactory.createForClass(RegistrationProcess);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class User {
    @Prop({
        required: true,
        unique: true
    })
    email: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop({
        required: true
    })  
    username: string;

    @Prop({
        required: false
    })
    image: string;

    @Prop({
        required: false,
        default: 'user'
    })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
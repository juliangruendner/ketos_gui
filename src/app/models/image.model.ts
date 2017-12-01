import { User } from "./user.model";

export class Image {
    id: Number;
    name: string;
    title: string;
    description: string;
    creator: User;
    created_at: Date;
    updated_at: Date;
}
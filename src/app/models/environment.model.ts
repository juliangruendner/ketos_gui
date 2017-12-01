import { User } from "./user.model";

export class Environment {
    id: Number;
    name: string;
    status: string;
    jupyter_port: string;
    jupyter_token: string;
    jupyter_url: string;
    description: string;
    creator: User;
    image_id: Number;
    created_at: Date;
    updated_at: Date;
}
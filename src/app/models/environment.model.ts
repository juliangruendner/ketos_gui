import { User } from "./user.model";

export class Environment {
    id: number;
    name: string;
    status: string;
    jupyter_port: string;
    jupyter_token: string;
    jupyter_url: string;
    description: string;
    creator: User;
    image_id: number;
    created_at: Date;
    updated_at: Date;
    progress: number;
}
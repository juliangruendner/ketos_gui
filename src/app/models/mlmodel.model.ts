import { User } from "./user.model";

export class MLModel {
    id: number;
    environment_id: number;
    ml_model_name: string;
    name: string;
    description: string;
    creator: User;
    created_at: Date;
    updated_at: Date;
}
import { User } from "./user.model";

export class Feature {
    id: number;
    resource: string;
    parameter_name: string;
    value: string;
    name: string;
    description: string;
    creator: User;
    created_at: Date;
    updated_at: Date;
    checked: boolean;
}
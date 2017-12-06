import { User } from "./user.model";
import { Feature } from "./features.model";

export class FeatureSet {
    id: number;
    name: string;
    description: string;
    creator: User;
    created_at: Date;
    updated_at: Date;
    features: Feature[];
}
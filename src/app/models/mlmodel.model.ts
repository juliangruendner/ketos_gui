import { User } from "./user.model";
import { Environment } from "./environment.model";
import { FeatureSet } from "./featureSets.model";

export class MLModel {
    id: number;
    environment_id: number;
    ml_model_name: string;
    name: string;
    description: string;
    creator: User;
    created_at: Date;
    updated_at: Date;
    environment: Environment;
    feature_set_id: number;
    feature_set: FeatureSet;
}
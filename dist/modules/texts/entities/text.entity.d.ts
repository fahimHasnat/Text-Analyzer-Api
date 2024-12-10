import { Model } from 'sequelize-typescript';
export declare class Text extends Model<Text> {
    text: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
}

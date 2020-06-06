import * as mongo from 'mongoose';
import { JSONOptions } from '../config/db.config';

export interface IEvent extends mongo.Document {
    _id: number;
    title: string;
    created: Date;
    
}
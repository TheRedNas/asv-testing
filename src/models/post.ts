import { Highlight } from "./highlight";

export interface Post {
    user: Object;
    title: string;
    content: string;
    image: string;
    highlights: Highlight[];
    dateCreated: Date;
    partitionKey: string;
    rowKey: string;
    timeStamp: Date;
}

import { Category } from "src/models/category-enum";

interface user {
    guid: string;
    emailAddress: string;
    phoneNumber: string;
    Biography: string;
    category: Category;
}

export interface freelancer extends user {
    firstName: string;
    lastName: string;
}

export interface company extends user {
    companyName: string;
}

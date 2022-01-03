import { User } from "./User";
import {Category} from "./enums/Category";

export class Company extends User {
  private _name: string;
  private _description: string;

  constructor(emailAddress: string, profilePicture: string, category: Category, name: string, description: string, links: any, phone: string, address: string) {
    super(name, emailAddress, profilePicture, category, phone, address, links);
    this._name = name;
    this._description = description;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }
}

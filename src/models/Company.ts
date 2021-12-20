import { Category } from "./enums/Category";
import { User } from "./User";

export class Company extends User {
  private _name: string;
  private _description: string;
  private _links: any;
  private _email: string;
  private _phone: string;
  private _address: string;
 
  constructor(picture: string, category: number, name: string, description: string, links: string, email: string, phone: string, address: string) {
    super(picture, category);
    this._name = name;
    this._description = description;
    this._links = links;
    this._email = email;
    this._phone = phone;
    this._address = address;
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
  
  public get links(): any {
    return this._links;
  }
  public set links(value: string) {
    this._links = value;
  }

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  
  public get phone(): string {
    return this._phone;
  }
  public set phone(value: string) {
    this._phone = value;
  }
  
  public get address(): string {
    return this._address;
  }
  public set address(value: string) {
    this._address = value;
  }
}

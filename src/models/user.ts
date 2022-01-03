import { Category } from "./enums/Category";

export abstract class User {
  private _displayName: string;
  private _emailAddress: string;
  private _profilePicture: string;
  private _category: Category;
  private _phone: string;
  private _address: string;
  private _links: any;

  protected constructor(displayName: string, emailAddress: string, profilePicture: string, category: Category, phone: string, address: string, links: any) {
    this._displayName = displayName;
    this._emailAddress = emailAddress;
    this._profilePicture = profilePicture;
    this._category = category;
    this._phone = phone;
    this._address = address;
    this._links = links;
  }

  get displayName(): string {
    return this._displayName;
  }

  get emailAddress(): string {
    return this._emailAddress;
  }

  set emailAddress(value: string) {
    this._emailAddress = value;
  }


  get profilePicture(): string {
    return this._profilePicture;
  }

  set profilePicture(value: string) {
    this._profilePicture = value;
  }

  public get category(): Category {
    return this._category;
  }
  public set category(value: Category) {
    this._category = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get links(): any {
    return this._links;
  }

  set links(value: any) {
    this._links = value;
  }
}

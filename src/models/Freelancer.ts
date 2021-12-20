import {User} from "./User";

export class Freelancer extends User {
  private _givenName: string;
  private _surname: string;
  private _links: any;
  private _skillset: any;
  private _title: string;
  private _email: string;
  private _phone: string;
  private _location: string;
  private _country: string;

  constructor(picture: string, category: number, givenName: string, surname: string, links: string, skillset: any, title: string, email: string, phone: string, location: string, country: string) {
    super(picture, category);
    this._givenName = givenName;
    this._surname = surname;
    this._links = links;
    this._skillset = skillset;
    this._title = title;
    this._email = email;
    this._phone = phone;
    this._location = location;
    this._country = country;
  }
  
  get givenName(): string {
    return this._givenName;
  }

  set givenName(value: string) {
    this._givenName = value;
  }


  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }

  
  public get links(): any {
    return this._links;
  }
  public set links(value: string) {
    this._links = value;
  }

  
  public get skillset(): any {
    return this._skillset;
  }
  public set skillset(value: string) {
    this._skillset = value;
  }


  public get title(): string {
    return this._title;
  }
  
  public set title(value: string) {
    this._title = value;
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


  public get location(): string {
    return this._location;
  }
  
  public set location(value: string) {
    this._location = value;
  }
  
  
  public get country(): string {
    return this._country;
  }
  public set country(value: string) {
    this._country = value;
  }
}

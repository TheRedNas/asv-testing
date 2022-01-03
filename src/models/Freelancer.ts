import {User} from "./User";
import {Category} from "./enums/Category";

export class Freelancer extends User {
  private _givenName: string;
  private _surname: string;
  private _jobTitle: string;
  private _skillset: any;

  constructor(emailAddress: string, picture: string, category: Category, givenName: string, surname: string, jobTitle: string, links: any, skillset: any, phone: string, address: string) {
    super(givenName + " " + surname, emailAddress, picture, category, phone, address, links);
    this._givenName = givenName;
    this._surname = surname;
    this._jobTitle = jobTitle;
    this._skillset = skillset;
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

  get jobTitle(): string {
    return this._jobTitle;
  }

  set jobTitle(value: string) {
    this._jobTitle = value;
  }


  get skillset(): any {
    return this._skillset;
  }

  set skillset(value: any) {
    this._skillset = value;
  }
}

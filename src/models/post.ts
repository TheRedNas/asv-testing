import {TableEntity} from "./interfaces/TableEntity";
import {Company} from "./Company";

export class Post implements TableEntity {
  private _user: Company;
  private _title: string;
  private _content: string;
  private _image: string;
  private _highlights: string[];
  //These values are not needed for creating a post. The initial value will be overwritted by backend.
  private readonly _dateCreated: Date = new Date();
  private _visits: number = 0;
  PartitionKey: string = "";
  RowKey: string = "";
  Timestamp: Date = new Date();

  constructor(user: Company, title: string, content: string, image: string, highlights: string[], Timestamp: Date = new Date()) {
    this._user = user;
    this._title = title;
    this._content = content;
    this._image = image;
    this._highlights = highlights;
    this.RowKey = "";
    this.PartitionKey = "";
    this.Timestamp = Timestamp;
  }

  get user(): Company {
    return this._user;
  }

  set user(value: Company) {
    this._user = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get highlights(): string[] {
    return this._highlights;
  }

  set highlights(value: string[]) {
    this._highlights = value;
  }

  get dateCreated(): Date {
    return this._dateCreated;
  }

  get visits(): number {
    return this._visits;
  }

  set visits(value: number) {
    this._visits = value;
  }

}

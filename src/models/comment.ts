import {User} from "./user";

export class Comment {
  private _user: User;
  private _post: string; // Post.Rowkey
  private _content: string;
  private _accountId: string;
  private _dateCreated: Date;

  constructor(user: User, post: string, content: string, accountId: string, dateCreated: Date) {
    this._user = user;
    this._post = post;
    this._content = content;
    this._accountId = accountId;
    this._dateCreated = dateCreated;
  }


  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get post(): string {
    return this._post;
  }

  set post(value: string) {
    this._post = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get accountId(): string {
    return this._accountId;
  }

  set accountId(value: string) {
    this._accountId = value;
  }

  get dateCreated(): Date {
    return this._dateCreated;
  }

  set dateCreated(value: Date) {
    this._dateCreated = value;
  }
}

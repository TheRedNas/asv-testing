import { Category } from "./enums/Category";

export abstract class User {
  private _profilePicture: string;
  private _category: Category;

  protected constructor(profilePicture: string, category: Category) {
    this._profilePicture = profilePicture;
    this._category = category;
  }

  public get picture(): string {
    return this._profilePicture;
  }
  public set picture(value: string) {
    this._profilePicture = value;
  }

  public get category(): Category {
    return this._category;
  }
  public set category(value: Category) {
    this._category = value;
  }
}

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/Post";
import {Category} from "../../models/enums/Category";
import {AuthService} from "../../services/auth.service";
import {Company} from "../../models/Company";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  highlightControl = new FormControl();
  filteredHighlights: Observable<string[]>;
  highlights: string[] = [];
  allHighlights: string[] = ['Java', 'C#', 'TS', 'JS', 'C++'];
  froalaField: string = "";
  showMessage: boolean =  false;

  @ViewChild('highlightInput') highlightInput!: ElementRef<HTMLInputElement>;
  public FroalaEditorOptions: Object = {
    charCounterCount: true,
    toolbarButtons: [['undo', 'redo'], ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'],
      ['fontFamily', 'fontSize', 'textColor', 'backgroundColor'], ['inlineClass', 'inlineStyle', 'clearFormatting']]
  };

  constructor(private postService: PostService,
              private authService: AuthService,
              private userService: UserService) {
    this.filteredHighlights = this.highlightControl.valueChanges.pipe(
      startWith(null),
      map((highlight: string | null) => (highlight ? this._filter(highlight) : this.allHighlights.slice())),
    );
  }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our highlight
    if (value) {
      this.highlights.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.highlightControl.setValue(null);
  }

  remove(highlight: string): void {
    const index = this.highlights.indexOf(highlight);

    if (index >= 0) {
      this.highlights.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.highlights.push(event.option.viewValue);
    this.highlightInput.nativeElement.value = '';
    this.highlightControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allHighlights.filter(highlight => highlight.toLowerCase().includes(filterValue));
  }

  async createNewPost(form: NgForm) {
    const title = form.value.title;
    const highlights = this.highlights;
    const froalaContent = this.froalaField;
    const name = await this.userService.getUser(undefined).then(user => user?.displayName!!)
    const accountId = this.authService.accountId!!;
    const accessToken = this.authService.accessToken;

    //TODO fix the Category, picture and image parameter.
    const newPost = new Post(new Company("emailAddress",  "NO PICUTRE", Category.Healthcare, name, "description", "links", "phone", "address"), title, froalaContent, "", highlights)

    this.postService.createPost(newPost,  accessToken, accountId);

    //Create post animation
    this.postService.getSucces().subscribe((value => {
      if (value){
        this.showMessage = true;
        form.reset();
        this.highlights = [];
        this.froalaField = "";

        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
      }
    }))
  }
}

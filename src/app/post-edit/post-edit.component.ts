import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  highlightControl = new FormControl();
  filteredHighlights: Observable<string[]>;
  highlights: string[] = [];
  allHighlights: string[] = ['Java', 'C#', 'TS', 'JS', 'C++'];
  
  @ViewChild('highlightInput') highlightInput!: ElementRef<HTMLInputElement>;

  public FroalaEditorOptions: Object = {
    charCounterCount: true,
    toolbarButtons: [['undo','redo'],['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'], ['fontFamily', 'fontSize', 'textColor', 'backgroundColor'], ['inlineClass', 'inlineStyle', 'clearFormatting']]
  };
  
  constructor() {
    this.filteredHighlights = this.highlightControl.valueChanges.pipe(
      startWith(null),
      map((highlight: string | null) => (highlight ? this._filter(highlight) : this.allHighlights.slice())),
    );
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

}

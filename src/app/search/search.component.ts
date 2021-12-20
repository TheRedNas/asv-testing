import { Component, OnInit } from '@angular/core';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchResults: Array<any> = []
  resultsPerPage: number = 20
  offset: number = 0
  filters: Object = new Object;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    
    this.createInitial();
  }

  createInitial() {
    this.postService.getPosts(this.resultsPerPage,this.offset, this.filters).subscribe(
      (data: Post[]) => {
        data.forEach((obj:Object) => {
        this.searchResults.push(obj)          
        });
      }
    )
  }

}

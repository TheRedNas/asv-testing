import {Component, OnInit} from "@angular/core";
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";
import {Observable} from "rxjs";
import {SearchService} from "../../services/search.service";
import { Company } from "src/models/Company";
import {DomSanitizer} from '@angular/platform-browser'
import { updateDefaultClause } from "typescript";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResults: Array<Post> = []
  resultsPerPage: number = 20
  offset: number = 0
  filters: Object = {}
  searchTerm: string = ''

  constructor(private postService: PostService,
              private searchService: SearchService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

    this.createInitial();
  }

  createInitial() {
    this.updateData();
  }

  updateData() {
    let params: any = {}
    if (this.searchTerm) {
      params.searchTerm = this.searchTerm.split(' ').join(',')
    }
    if (this.resultsPerPage) {
      params.amount = this.resultsPerPage
    }
    if (this.offset) {
      params.offset = this.offset
    }
    this.postService.getPostsFromAzure(params).subscribe(
      (data: any[]) => {
        data.forEach(obj => {
          this.searchResults.push(new Post(obj._user,obj._title,obj._content,obj._image,obj._highlights,obj.RowKey,obj.Partitionkey,obj.Timestamp))
        });
      }
    )
  }

  getSpecificPost(post: Post) {
    this.searchService.setSearchPost(post);
  }

  getContent(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content)
  }

  onEnter(value: string) { 
    this.searchTerm = value; 
    this.updateData();
  }
}



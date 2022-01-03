import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";
import {Observable} from "rxjs";
import {SearchService} from "../../services/search.service";
import { Company } from "src/models/Company";
import {DomSanitizer} from '@angular/platform-browser'
import { updateDefaultClause } from "typescript";
import { ThisReceiver } from "@angular/compiler";

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

    this.updateData();
  }

  updateData() {
    let params: any = {}
    if (this.resultsPerPage) {
      params.amount = this.resultsPerPage
    }
    if (this.offset) {
      params.offset = this.offset
    }
    if (this.searchTerm) {
      params.searchTerms = this.searchTerm.split(' ').join(',')
    
      // searchterm found, using that in params to find posts that contain searchterm
      this.postService.searchPostsFromAzure(params).subscribe(
        (data: any) => {
          this.searchResults.length = 0;
          data.Results.forEach((obj: any) => {
              this.searchResults.push(new Post(obj._user,obj._title,obj._content,obj._image,obj._highlights,obj.RowKey,obj.PartitionKey,obj.Timestamp))
            });
        }
      )
    }
    else {

      // searchterm not found, using default to show first x amount of posts
      this.postService.getPostsFromAzure(params).subscribe(
        (data: any) => {
          this.searchResults.length = 0;
          data.Results.forEach((obj: any) => {
              this.searchResults.push(new Post(obj._user,obj._title,obj._content,obj._image,obj._highlights,obj.RowKey,obj.PartitionKey,obj.Timestamp))
            });
        }
      )
    }
  }

  getContent(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content)
  }

  onEnter(value: string) { 
    this.searchTerm = value; 
    this.updateData();
  }
}



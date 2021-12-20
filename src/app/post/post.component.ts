import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../services/search.service";
import {Post} from "../../models/Post";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: any;
  comments: Array<any> = [];

  constructor(private searchService: SearchService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.searchService.getSearchPost().subscribe(
      (data: any) => {
        this.post = data;
      }
    )
  }

  getContent(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content)
  }

}

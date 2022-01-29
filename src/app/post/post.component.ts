import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PostService } from 'src/services/post.service';
import { UserService } from 'src/services/user.service';
import { Company } from 'src/models/Company';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post | undefined;
  comments: Array<any> = [];
  company!: Company;

  rowKey: string = "";
  partitionKey: string = "";


  constructor(private postService: PostService,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private userService: UserService,
              public router: Router) { }

  ngOnInit(): void {
    this.rowKey = this.route.snapshot.paramMap.get("rowKey") || "";
    this.partitionKey = this.route.snapshot.paramMap.get("partitionKey") || "";
    this.updateData()
  }

  updateData() {
    let params: any = {}
    if (this.rowKey) {
      params.rowKey = this.rowKey;
    }
    if (this.partitionKey) {
      params.partitionKey = this.partitionKey
    }
    this.postService.getPostByIdFromAzure(params).subscribe(
      (data: any) => {
        this.post = (new Post(data._user,data._title,data._content,data._image,data._highlights,data.RowKey))
        this.GetUserCompany(data.PartitionKey);
      },
      (error: any) => {
        console.log(error);
        if (error) this.router.navigate(['/search'])
      }
    )
  }

  getContent(content: string = "") {
    return content
  }

  GetUserCompany(accountId: string) {
    this.userService.getUser(accountId).then(user => {
      if (user !== undefined) this.company = user as Company
      else {
        this.userService.getUserCompany().subscribe((data: Company)=> {
          this.company = new Company(
            data.emailAddress,
            data.profilePicture,
            this.userService.defineCategory(data.category),
            data.name,
            data.description,
            JSON.parse(data.links),
            data.phone,
            data.address
          )
        });
      }
    });
  }

}

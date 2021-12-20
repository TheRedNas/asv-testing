import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: any = {};
  comments: Array<any> = [];

  constructor() { }

  ngOnInit(): void {

    this.createInitial();
  }

  createInitial() {
    this.post = 
      {
        user: {
          name: "Stephen",
          picture: "https://pbs.twimg.com/profile_images/1364920241265012743/Y__158zv_400x400.png",
        },
        title: 'lmao',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        techstack: 'Java, C#, Wiskunde',
        dateCreated: Date(),
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus lacus, congue in lacus in, semper lobortis odio.
                            Maecenas at velit vel turpis efficitur suscipit. Vestibulum in suscipit ligula. Aenean nec vestibulum turpis.
                            Pellentesque consequat, nibh in ullamcorper luctus, quam tortor porta nisi, eu congue sapien velit consectetur nulla.
                            Cras vitae lacinia felis, id fringilla diam. Integer euismod finibus neque, ornare aliquet tortor scelerisque eu.
                            Aliquam posuere tortor in java tortor varius, et ultricies purus dignissim. Donec venenatis varius gravida. Sed laoreet
                            sapien at neque dictum dignissim. Mauris euismod a purus a egestas. Sed commodo,  C# orci sit amet tempus sagittis, nisl
                            arcu dignissim diam, id consequat nunc lacus non quam. Sed rutrum tempor ante, ut auctor urna ultrices ac. Sed lorem
                            eros, pellentesque Wiskunde semper ex in, feugiat ullamcorper nunc.

                            Vivamus ornare ligula eu arcu tincidunt, gravida accumsan erat placerat. Nam non fringilla nisi. Donec nisi orci,
                            volutpat ullamcorper augue eget, vestibulum cursus lorem. Mauris vitae massa vitae neque pharetra cursus. Fusce vehicula
                            ex est, a scelerisque elit commodo a. Nunc euismod elementum magna, vitae finibus arcu condimentum vel. Pellentesque
                            habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

                            Sed hendrerit a quam sit amet vulputate. Nullam placerat varius interdum. Pellentesque lorem libero, gravida vitae
                            ullamcorper iaculis, congue sed nibh. Proin in imperdiet ligula, vitae fermentum tellus. Curabitur sem odio, iaculis at
                            nisi in, ultricies eleifend sem. Pellentesque vehicula purus nec orci lacinia, eu aliquet mauris tempus. Integer et
                            ipsum elementum, sollicitudin urna vel, imperdiet massa. Aenean pretium egestas lacus, non dignissim enim volutpat sit
                            amet.

                            Praesent ex nibh, tincidunt sed dui id, efficitur consectetur elit. Sed in urna feugiat, commodo velit vel, iaculis
                            felis. Cras ultricies commodo scelerisque. Pellentesque non leo hendrerit, porttitor erat quis, egestas justo. Morbi
                            elementum lacinia imperdiet. Nulla facilisi. Praesent viverra lectus ante, sit amet blandit leo hendrerit sit amet.
                            

                            Donec fringilla eros magna, sed bibendum justo lacinia et. Duis non scelerisque turpis. Pellentesque habitant morbi
                            tristique senectus et netus et malesuada fames ac turpis egestas. In at lacinia eros. Cras ut augue enim. Pellentesque
                            quis bibendum urna. Nullam convallis augue metus, vel aliquet metus fermentum a. Nam purus nulla, pellentesque ac ex sit
                            amet, gravida dictum tellus. Vestibulum pellentesque tellus magna, nec suscipit nisi placerat at. Nulla nisi sapien,
                            malesuada ut bibendum et, tincidunt ut massa. Fusce tincidunt lorem a leo euismod, eu aliquam velit dictum. Ut
                            sollicitudin nulla ac ex euismod vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                            inceptos himenaeos.`,
      }
    
      this.comments.push(
        {
          picture: 'https://pbs.twimg.com/profile_images/1364920241265012743/Y__158zv_400x400.png',
          name: 'Stephen',
          dateCreated: Date(),
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus lacus, congue in lacus in, semper lobortis odio. Maecenas at velit vel turpis efficitur suscipit.Vestibulum in suscipit ligula.Aenean nec vestibulum turpis. Pellentesque consequat, nibh in ullamcorper luctus, quam tortor porta nisi, eu congue sapien velit consectetur nulla. Cras vitae lacinia felis, id fringilla diam.'
        }
      )

    this.comments.push(this.comments[0]);

  }

}

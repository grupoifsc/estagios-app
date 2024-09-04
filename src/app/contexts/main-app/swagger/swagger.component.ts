import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwaggerUI from 'swagger-ui';
import { config } from '../../../config';
import { ApiUrlService } from '../../../api-url.service';


// https://stackoverflow.com/questions/65419099/adding-swagger-ui-with-angular-10

@Component({
  selector: 'app-swagger',
  standalone: true,
  imports: [],
  templateUrl: './swagger.component.html',
  styleUrl: './swagger.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SwaggerComponent implements OnInit {

  constructor(
    private apiUrlService : ApiUrlService
  ) {}

  ngOnInit(): void {
    // let apiUrl : string = '';
    // this.apiUrlService.apiUrl.subscribe({
    //   next: value => apiUrl = value.url
    // })
    SwaggerUI({
      dom_id: '#swagger-ui',
      layout: 'BaseLayout',
      url: config.apiUrl + '/v3/api-docs',
      docExpansion: 'none',
      operationsSorter: 'alpha'
    });
  }

}

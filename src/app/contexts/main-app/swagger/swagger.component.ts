import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwaggerUI from 'swagger-ui';
import { env } from '../../../environment';

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

  ngOnInit(): void {
    SwaggerUI({
      dom_id: '#swagger-ui',
      layout: 'BaseLayout',
      url: env.apiUrl + '/v3/api-docs',
      docExpansion: 'none',
      operationsSorter: 'alpha'
    });
  }

}

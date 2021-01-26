import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MainService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-fetch-url',
  templateUrl: './fetch-url.component.html',
  styleUrls: ['./fetch-url.component.scss']
})
export class FetchUrlComponent implements OnInit {
  urls: [];

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.getAllSlugs()
  }

  goToUrl(slug: string) {
    this.mainService.fetchUrl(slug).subscribe((res: any) => {
      console.log(res);

      window.open(res.url, '_blank')
    }, (err: any) => {
      console.error(err);

    });
  }

  getAllSlugs() {
    this.mainService.getAllSlugs().subscribe((res: any) => {
      this.urls = res.data;
    })
  }

}

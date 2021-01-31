import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main-service.service';
import { trigger, state, style, animate, transition } from "@angular/animations";

@Component({
  selector: 'app-generate-slug',
  templateUrl: './generate-slug.component.html',
  styleUrls: ['./generate-slug.component.scss'],
})
export class GenerateSlugComponent implements OnInit {

  generateSlug: FormGroup;
  isLoading: boolean;
  generatedSlug: string;
  errMsg: string;

  constructor(private mainService: MainService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.generateSlug = this.fb.group({
      url: [null, [Validators.required, Validators.pattern(/^(https:|http:|ftp:|www\.)\S*/)]]
    });
  }

  onGenerate() {
    this.isLoading = true;
    this.mainService.generateSlug(this.generateSlug.value).subscribe((res: any) => {
      this.generateSlug.reset();
      this.isLoading = false;
      this.generatedSlug = res.data;
    }, (err: any) => {
      this.isLoading = false;
      this.errMsg = err.error.msg;
    });
  }

}

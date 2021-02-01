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

  generateSlugForm: FormGroup;
  isLoading: boolean;
  generatedSlug: string;
  errMsg: string;
  urlExpression = '^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?';
  urlCheck: RegExp = new RegExp(this.urlExpression);


  constructor(private mainService: MainService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.generateSlugForm = this.fb.group({
      url: [null, [Validators.required, Validators.pattern(this.urlCheck)]]
    });
  }

  onGenerate(): void {
    this.isLoading = true;
    this.generatedSlug = null;
    this.errMsg = null;
    this.mainService.generateSlug(this.generateSlugForm.value).subscribe((res: any) => {
      this.generateSlugForm.reset();
      this.isLoading = false;
      this.generatedSlug = res.data;
    }, (err: any) => {
      this.isLoading = false;
      this.errMsg = err.error.msg.split(':')[2]
    });
  }

}

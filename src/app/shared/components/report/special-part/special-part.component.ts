import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { FormServiceService } from '../../../../core/services/form-service.service';
import {TaskModel} from '../../../../core/models/report.model';
import {SpecialItemModel, SpecialTaskModel} from '../../../../core/models/specialItem.model';
import {ParseToXmlService} from '../../../../core/services/parse-to-xml.service';
import {MainService} from '../../../../core/services/main.service';

@Component({
  selector: 'app-special-part',
  templateUrl: './special-part.component.html',
  styleUrls: ['./special-part.component.scss']
})
export class SpecialPartComponent implements OnInit, OnChanges {

  @Input() data: any;
  form: FormArray;

  constructor(private formService: FormServiceService,
              private parseToXmlService: ParseToXmlService,
              private mainService: MainService) { }

  ngOnInit() {
    this.form = this.formService.makeSpecialForm(this.data);
    this.formValueChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.data = changes.data.currentValue;
    this.form = this.formService.makeSpecialForm(this.data);
    this.formValueChanges();
  }

  formValueChanges() {
    this.form.valueChanges.pipe(debounceTime(2000)).subscribe(values => {
      console.log(values);
      const formValue = this.formService.getForm().getRawValue();
      const content = this.parseToXmlService.parseToXml(formValue);
      this.mainService.saveFile(localStorage.getItem('folderPath') + '\\' + localStorage.getItem('selectedFile'), content);
      console.log('данные сохранены');
    });
  }

  addSpecialItem() {
    const emptySpecialItem: SpecialItemModel = null;
    this.form.controls.push(this.formService.makeSpecialItemForm(emptySpecialItem));
    console.log(this.form);
  }

  addSpecialTask(specialItem) {
    const emptySpecialTask: SpecialTaskModel = null;
    specialItem.controls.specialTasks.push(this.formService.makeSpecialTaskForm(emptySpecialTask));
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HomeService } from '../../../core/services/home.service';
import {ParseToXmlService} from '../../../core/services/parse-to-xml.service';
import {FormServiceService} from '../../../core/services/form-service.service';
import {EmployeeModel, ProjectModel, ReportModel, TaskModel} from '../../../core/models/report.model';
import {SpecialItemModel, SpecialTaskModel} from '../../../core/models/specialItem.model';

@Component({
  selector: 'app-new-report-modal',
  templateUrl: './new-report-modal.component.html',
  styleUrls: ['./new-report-modal.component.scss'],
  providers: [HomeService]
})
export class NewReportModalComponent implements OnInit {

  @Input() folderPath: string;
  @Output() closeModal = new EventEmitter<boolean>();

  public fileName;

  constructor(private homeService: HomeService,
              private parseToXmlService: ParseToXmlService,
              private formService: FormServiceService) { }

  ngOnInit() {}

  clickClose() {
    this.closeModal.emit(false);
  }

  createReport() {
    const emptyReport = this.createEmptyReportObject();
    const emptyReportXml = this.parseToXmlService.parseToXml(emptyReport);
    this.homeService.saveFile(this.folderPath + '\\' + this.fileName, emptyReportXml).then(result => {
      alert('Файл ' + result + ' был успешно создан');
      let files = JSON.parse(localStorage.getItem('files'));
      files.push(this.fileName);
      localStorage.setItem('files', JSON.stringify(files));
    });

    /*
    this.homeService.createFile(this.folderPath, this.fileName).then(result => {
      alert('Файл ' + result + ' был успешно создан')
      let files = JSON.parse(localStorage.getItem('files'));
      files.push(this.fileName);
      localStorage.setItem('files', JSON.stringify(files));
    });
     */
  }

  createEmptyReportObject() {
    const obj = {
      commonForm: [],
      specialForm: []
    };
    obj.commonForm.push(new ProjectModel());
    obj.commonForm[0].employee.push(new EmployeeModel());
    obj.commonForm[0].employee[0].tasks.push(new TaskModel());

    obj.specialForm.push(new SpecialItemModel());
    obj.specialForm[0].specialTasks.push(new SpecialTaskModel());
    return obj;
  }

}

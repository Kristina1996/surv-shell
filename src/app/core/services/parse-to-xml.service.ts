import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParseToXmlService {

  getMainXml = (content) => `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Author>TAS</Author>
  <LastAuthor>ird</LastAuthor>
  <LastPrinted>2006-05-25T13:56:24Z</LastPrinted>
  <Created>2006-05-25T10:32:45Z</Created>
  <LastSaved>2006-05-29T11:34:29Z</LastSaved>
  <Company>Inreco LAN</Company>
  <Version>12.00</Version>
 </DocumentProperties>
 <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">
  <WindowHeight>9105</WindowHeight>
  <WindowWidth>15360</WindowWidth>
  <WindowTopX>-30</WindowTopX>
  <WindowTopY>1125</WindowTopY>
  <ActiveSheet>1</ActiveSheet>
  <RefModeR1C1/>
  <ProtectStructure>False</ProtectStructure>
  <ProtectWindows>False</ProtectWindows>
 </ExcelWorkbook>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Bottom"/>
   <Borders/>
   <Font ss:FontName="Arial Cyr" x:CharSet="204"/>
   <Interior/>
   <NumberFormat/>
   <Protection/>
  </Style>
  <Style ss:ID="s62">
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="s64">
   <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
   <Font ss:FontName="Arial Cyr" x:CharSet="204" ss:Size="16"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="s65">
   <Font ss:FontName="Arial Cyr" x:CharSet="204" ss:Color="#FFFFFF"/>
   <Protection/>
  </Style>
  <Style ss:ID="s67">
   <Alignment ss:Vertical="Bottom"/>
   <Font ss:FontName="Arial Cyr" x:CharSet="204" ss:Size="16"/>
   <Protection/>
  </Style>
  <Style ss:ID="s68">
   <Alignment ss:Vertical="Bottom"/>
   <Font ss:FontName="Arial Cyr" x:CharSet="204" ss:Color="#FFFFFF" ss:Bold="1"/>
   <Protection/>
  </Style>
  <Style ss:ID="s70">
   <Alignment ss:Vertical="Bottom"/>
   <Font ss:FontName="Arial Cyr" x:CharSet="204" ss:Bold="1"/>
   <Protection/>
  </Style>
  <Style ss:ID="s71">
   <Alignment ss:Vertical="Bottom"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="s74">
   <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
   <Font ss:FontName="Arial Cyr" x:CharSet="204" ss:Size="16"/>
  </Style>
  <Style ss:ID="s76">
   <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
  </Style>
  <Style ss:ID="s78">
   <Alignment ss:Vertical="Bottom"/>
   <Protection/>
  </Style>
  <Style ss:ID="s79">
   <Alignment ss:Vertical="Bottom"/>
  </Style>
  <Style ss:ID="s82">
   <Alignment ss:Vertical="Bottom"/>
   <Borders/>
   <Interior/>
   <Protection/>
  </Style>
  <Style ss:ID="s84">
   <Alignment ss:Horizontal="Left" ss:Vertical="Bottom"/>
   <Borders/>
   <Interior/>
   <Protection/>
  </Style>
 </Styles>${content}</Workbook>`

  getCommonWorksheet = (rows) => `<Worksheet ss:Name="общие задачи">
  <Table ss:ExpandedColumnCount="9" ss:ExpandedRowCount="20" x:FullColumns="1"
   x:FullRows="1" ss:StyleID="s62">
   <Column ss:Index="4" ss:StyleID="s62" ss:AutoFitWidth="0" ss:Width="58.5"/>
   <Row ss:AutoFitHeight="0" ss:Height="20.25">
    <Cell ss:MergeAcross="8" ss:StyleID="s64"><Data ss:Type="String">Отчет по проекту</Data></Cell>
   </Row>
    ${rows}
    <Row>
    <Cell ss:MergeAcross="3" ss:StyleID="s71"/>
   </Row>
  </Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <PageSetup>
    <PageMargins x:Bottom="0.984251969" x:Left="0.78740157499999996"
     x:Right="0.78740157499999996" x:Top="0.984251969"/>
   </PageSetup>
   <Print>
    <ValidPrinterInfo/>
    <PaperSizeIndex>9</PaperSizeIndex>
    <HorizontalResolution>200</HorizontalResolution>
    <VerticalResolution>200</VerticalResolution>
   </Print>
   <Panes>
    <Pane>
     <Number>3</Number>
     <ActiveRow>11</ActiveRow>
     <ActiveCol>1</ActiveCol>
     <RangeSelection>R12C2:R12C4</RangeSelection>
    </Pane>
   </Panes>
   <ProtectObjects>False</ProtectObjects>
   <ProtectScenarios>False</ProtectScenarios>
  </WorksheetOptions>
 </Worksheet>`

  getSpecialWorksheet = (rows) => `<Worksheet ss:Name="специальные задачи">
  <Table ss:ExpandedColumnCount="9" ss:ExpandedRowCount="19" x:FullColumns="1"
   x:FullRows="1">
   <Row ss:AutoFitHeight="0" ss:Height="20.25">
    <Cell ss:MergeAcross="8" ss:StyleID="s74"><Data ss:Type="String">Специальные задачи</Data></Cell>
   </Row>
   ${rows}
   </Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <PageSetup>
    <PageMargins x:Bottom="0.984251969" x:Left="0.78740157499999996"
     x:Right="0.78740157499999996" x:Top="0.984251969"/>
   </PageSetup>
   <Print>
    <ValidPrinterInfo/>
    <PaperSizeIndex>9</PaperSizeIndex>
    <HorizontalResolution>200</HorizontalResolution>
    <VerticalResolution>200</VerticalResolution>
   </Print>
   <Selected/>
   <Panes>
    <Pane>
     <Number>3</Number>
     <ActiveRow>18</ActiveRow>
     <RangeSelection>R19C1:R19C4</RangeSelection>
    </Pane>
   </Panes>
   <ProtectObjects>False</ProtectObjects>
   <ProtectScenarios>False</ProtectScenarios>
  </WorksheetOptions>
 </Worksheet>`

  getProjectRow = (name) => `<Row ss:AutoFitHeight="0" ss:Height="20.25">
    <Cell ss:Index="3" ss:StyleID="s65"><Data ss:Type="String">prnm_</Data></Cell>
    <Cell ss:MergeAcross="2" ss:StyleID="s67"><Data ss:Type="String">${name}</Data></Cell>
   </Row>`

  getEmployeeRow = (name) => `<Row>
    <Cell ss:StyleID="s68"><Data ss:Type="String">empl_</Data></Cell>
    <Cell ss:MergeAcross="2" ss:StyleID="s70"><Data ss:Type="String">${name}</Data></Cell>
   </Row>`

  getTaskRow = (task, hours) => `<Row>
    <Cell ss:MergeAcross="3" ss:StyleID="s71"><Data ss:Type="String">${task}</Data></Cell>
    <Cell><Data ss:Type="Number">${hours}</Data></Cell>
   </Row>`

  getSpecialEmplRow = (empl) => `<Row>
    <Cell ss:StyleID="s68"><Data ss:Type="String">empl_</Data></Cell>
    <Cell ss:MergeAcross="2" ss:StyleID="s70"><Data ss:Type="String">${empl.employeeName}</Data></Cell>
    <Cell ss:StyleID="s62"><Data ss:Type="Number">${empl.rate}</Data></Cell>
    <Cell ss:MergeAcross="3" ss:StyleID="s79"/>
   </Row>`

  getSpecialTaskRow = (task) => `<Row>
    <Cell ss:MergeAcross="3" ss:StyleID="s82"><Data ss:Type="String">${task.name}</Data></Cell>
    <Cell ss:StyleID="s62"><Data ss:Type="Number">${task.hours}</Data></Cell>
    <Cell ss:MergeAcross="3" ss:StyleID="s79"><Data ss:Type="String">${task.comment}</Data></Cell>
   </Row>`

  constructor() { }

  parseToXml(model) {
    const common = this.getCommonPartReport(model.commonForm);
    const special = this.getSpecialPartReport(model.specialForm);

    const commonWorksheet = this.getCommonWorksheet(common);
    const specialWorksheet = this.getSpecialWorksheet(special);
    const content = this.getMainXml(commonWorksheet + specialWorksheet);
    console.log(content);
    return content;
  }

  getCommonPartReport(common) {
    const commonXml = common.map(report => this.getProjectXml(report)).join();
    return commonXml;
  }

  getSpecialPartReport(special): string {
    const specialXml = special.map(specialItem => this.getSpecialItemXml(specialItem)).join();
    return specialXml;
  }

  getProjectXml(report) {
    const projectXml = this.getProjectRow(report.name);
    const employeeXml = report.employee.map(employee => this.getEmployeeXml(employee)).join();
    return projectXml + employeeXml;
  }

  getEmployeeXml(employee) {
    const employeeXml = this.getEmployeeRow(employee.name);
    const tasksXmlArray = employee.tasks.map(task => this.getTaskRow(task.name, task.hours));
    const tasksXml = tasksXmlArray.join();
    return employeeXml + tasksXml;
  }

  getSpecialItemXml(specialItem) {
    const emplXml = this.getSpecialEmplRow(specialItem);
    const specialTasksXml = specialItem.specialTasks.map(specialTask => this.getSpecialTaskRow(specialTask)).join();
    return emplXml + specialTasksXml;
  }



  // без async await:

  /*
  parseToXml(model) {
    model.common.forEach(report => {
      this.getProjectXml(report);
    });
  }

  getProjectXml(report) {
    this.getProjectRow(report.name);
    let xml = '';
    report.employee.forEach(employee => {
      xml = xml + this.getEmployeeXml(employee);
    });
  }

  getEmployeeXml(employee) {
    this.getEmployeeRow(employee.name);
    employee.tasks.forEach(task => {
      this.getTaskXml(task);
    });
  }

  getTaskXml(task) {
    return this.getTaskRow(task.name, task.hours);
  }

  getSpecialItemXml() {

  }

  getSpecialTaskXml() {

  }
   */
}

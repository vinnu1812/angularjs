import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { config } from '../config/config';

@Component({
  selector: 'app-tables',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {
    
    public data;
    public healthData;
    public storeIdSearch = '';
    public hostSearch = '';
    public rowsOnPage = 5;
    public sortBy = 'host';
    public sortOrder = 'asc';

    constructor(private http: Http) {
    }

    ngOnInit(): void {
        this.getData();
    }

    public getData() {
        this.http.get(config.apiUrl)
        .subscribe((data)=> {
            setTimeout(()=> {
                this.data = data.json();
                this.data.HealthMetrics = this.fomatHealthData(this.data.HealthMetrics);
                this.healthData = new Array<any>();
                this.healthData = this.healthData.concat(this.data.HealthMetrics);
            }, 1000);
        });
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    public refresh(){
        this.hostSearch = '';
        this.storeIdSearch = '';
        this.healthData = new Array<any>();
        setTimeout(() => this.getData(), 1000);
    }

    public downloadExcel() {
        new Angular2Csv(
            this.healthData,
            'HealthData',
            { headers: Object.keys(this.healthData[0]) });
    }

    public fomatHealthData(metrics: any) {
        // Loop Json data and update status
        let result = [];

        metrics.forEach(element => {
            element.status = this.getStatus(element.timestamp, element.hasVersion, element.firmwareVersion, element.tmoFormsVersion, element.tmoFirmwareVersion);
            result.push(element);

        });
        return result;
    }

    public getStatus(timestamp: string, hasVersion, firmwareVersion, tmoFormsVersion, tmoFirmwareVersion){
        var status = 'Green';
        var dataDate  = new Date(timestamp);
        var threeDayFromCurrentDate = new Date();
        threeDayFromCurrentDate.setDate( threeDayFromCurrentDate.getDate() + config.validDaysForStatus );
        
        if (dataDate > threeDayFromCurrentDate) {
            status = 'Red';
            return status;
        }

        if (parseInt(hasVersion) >= config.hasVersion &&
            parseInt(firmwareVersion) >= config.firmwareVersion && 
            parseInt(tmoFormsVersion) >= config.tmoFormsVersion &&
            parseInt(tmoFirmwareVersion) >= config.tmoFirmwareVersion) {
            status = 'Green';
        }else{
            status = 'Orange';
        }

        return status;
    }
}

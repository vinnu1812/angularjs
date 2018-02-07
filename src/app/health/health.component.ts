import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-tables',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {
    
    public data;
    public healthData;
    public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "host";
    public sortOrder = "asc";

    constructor(private http: Http) {
    }

    ngOnInit(): void {
        this.getData();
    }

    public getData() {
        this.http.get("assets/dummy.json")
        .subscribe((data)=> {
            setTimeout(()=> {
                this.data = data.json();
                this.healthData = new Array<any>();
                this.healthData = this.healthData.concat(this.data.healthMetrics);
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
        this.filterQuery = '';
        this.healthData = new Array<any>();
        setTimeout(() => this.getData(), 1000);
    }

    public downloadExcel() {
        new Angular2Csv(
            this.healthData,
            'HealthData',
            { headers: Object.keys(this.healthData[0]) });
    }
}

import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

    transform(items: any[], hostSearch: string, storeIdSearch: string, statusSearch: string){
        if (items && items.length) {
            return items.filter(item => {
                if (hostSearch && item.host.toLowerCase().indexOf(hostSearch.toLowerCase()) === -1) {
                    return false;
                }
                if (storeIdSearch && item.storeId.toString().indexOf(storeIdSearch) === -1) {
                    return false;
                }
                if (statusSearch && item.status.toLowerCase().indexOf(statusSearch.toLowerCase()) === -1) {
                    return false;
                }
                return true;
           });
        } else {
            return items;
        }
    }
}

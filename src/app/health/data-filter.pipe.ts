import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

    // transform(array: any[], hostSearch: string, storeIdSearch: string): any {
    //     if (hostSearch) {
    //         return _.filter(array, row=>row.host.indexOf(hostSearch) > -1);
    //     }
    //     return array;
    // }

    transform(items: any[], hostSearch: string, storeIdSearch: string){
        if (items && items.length) {
            return items.filter(item => {
                if (hostSearch && item.host.toLowerCase().indexOf(hostSearch.toLowerCase()) === -1) {
                    return false;
                }
                if (storeIdSearch && item.storeId.toString().indexOf(storeIdSearch) === -1) {
                    return false;
                }
                return true;
           });
        } else {
            return items;
        }
    }
}


export class DateUtil {
   
    public static date2str(date: Date): string {
        //SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");//2017-09-19 16:13:01.175 //

        return date.getFullYear() + '-' + ("0"+(date.getMonth()+1)).slice(-2) + '-' + ("0"+date.getDate()).slice(-2) + " " + ("0"+date.getHours()).slice(-2) + ":" + ("0"+date.getMinutes()).slice(-2) + ":" + ("0"+date.getSeconds()).slice(-2);
    }

    public static sentRequestDateT(): string {
        var dateNow = new Date();

        var datestring = ("0" + dateNow.getDate()).slice(-2) + "-" + ("0"+(dateNow.getMonth()+1)).slice(-2) + "-" +
        dateNow.getFullYear() + "T" + ("0" + dateNow.getHours()).slice(-2) + ":" + ("0" + dateNow.getMinutes()).slice(-2) + ":" + ("0" + dateNow.getSeconds()).slice(-2);
        return datestring;
      // return dateNow.getDate() + "-" +  (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear() + "T" + dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
    }

    public static dateYMD(date: Date): string {
        return date.getFullYear() + '-' + ("0"+(date.getMonth()+1)).slice(-2) + '-' + ("0"+date.getDate()).slice(-2);
    }

}
export class SQLiteHandle {

    /**
     * สถานะขั้นตอนการ Sync
     */
    public static isDoneSync: boolean = false;

    /**
     * สถานะการแสดงหน้าจอ Sync 
     */
    public static isOnLoadScreenSync: boolean = false;

    public static recordTotalSize: number = 0;

    public static recordBeWrite: number = 0;
    
}
export class AllocationModel{
    public agentid : string;
    public customerid : string;
    public fundid : string;
    /**
     * ลงทุน %
     */
    public percent : string;
    /**
     * RPP, RSP, TOP-UP
     */
    public typepremium : string;
    /**
     * น่าจะเป็นความเสี่ยง
     */
    public typerisk : string;
    public status : string;
    public lastupdate : string;
}
export class AgentModel {

    public roleType: string = 'agent';
    public agentid: string;

    // ฝ่ายขาย
    public iss: string;
    public exp: string;
    public nbf: string;
    public branch: string;
    public fName: string;
    public lName: string;
    public pName: string;
    public tel: string;
    public license: string;
    public fNameE: string;
    public lNameE: string;
    public idCardNo: string;
    public email: string;
    public perrmissionAgent: string;
    public ulLicense: string;
    public unLicense: string;
    public image: string;

    // พนักงาน
    public dn: string;
    public empName: string;
    public mail: string;
    public pid: string;
    public ou: string;
    public o: string;
}
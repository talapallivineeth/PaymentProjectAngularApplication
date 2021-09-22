import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  isbank:boolean=false;
  transactionbody:any;
  customer_id:string;
  bic:string;
  transactionobj:any;
  receiveracct_num:string="";
  receiveracct_name:string="";
  customerdata:any;
  bankdata:any;
  error:any;
  customerfetched:boolean=false;
  customererrorfetch:boolean=false;
  bankfetched:boolean=false;
  bankerrorfetch:boolean=false;
  transactionfetched:boolean=false;
  transactionerrorfetch:boolean=false;
  isreceiverbank:boolean=false;
  isempty:boolean=true;
  msg_code:string="";
  amount:number;
  msg_array=[new MsgCode("CHQB","beneficiary customer must be paid by cheque only"),
            new MsgCode("CORT","Payment is made in settlement for a trade"),
            new MsgCode("HOLD","Beneficiary customer or claimant will call upon identification."),
            new MsgCode("INTC","Payment between two companies that belongs to the same group."),
            new MsgCode("PHOB","Please advise the intermediary institution by phone."),
            new MsgCode("PHOI","Please advise the intermediary by phone."),
            new MsgCode("PHON","Please advise the account with institution by phone."),
            new MsgCode("REPA","Payments has a related e-Payments reference."),
            new MsgCode("SDVA","Payment must be executed with same day value to the")];


  
  constructor(private transactionservice:TransactionService) { 
    this.customer_id="";
    this.bic="";
    this.amount=0;
    
  }

  ngOnInit(): void {
  }

  onIdSubmit()
  {
      this.transactionservice.fetchCustomer(this.customer_id).subscribe(
        response =>{ this.customerdata = response;this.customerfetched=true;this.customererrorfetch=false;
        if(this.customerdata.isbank)
          this.isbank=true;
        else
          this.isbank=false;},
        err => {this.error=err.error;this.customerfetched=false;this.customererrorfetch=true
        }
      );

  }

  onBicSubmit()
  {
      this.transactionservice.fetchBankname(this.bic).subscribe(
        response =>{ this.bankdata = response;this.bankfetched=true;this.bankerrorfetch=false},
        err => {this.error=err.error;this.bankfetched=false;this.bankerrorfetch=true}
      );

  }

  ondoTransaction()
  {

       this.transactionbody={
        customer_id:this.customer_id,
        receiver_bic:this.bic,
        receiver_account_number:this.receiveracct_num,
        receiver_account_name:this.receiveracct_name,
        message_code:this.msg_code,
        amount:this.amount
      };
      

    if(this.isreceiverbank){
     this.transactionbody={
      customer_id:this.customer_id,
      receiver_bic:"HDFCINBBAHM",
      receiver_account_number:this.receiveracct_num,
      receiver_account_name:"HDFC bank",
      message_code:"CORT",
      amount:this.amount
      };
    }
   

      this.transactionservice.doTransaction(this.transactionbody).subscribe(
        response =>{this.transactionobj = response;this.transactionfetched=true;this.transactionerrorfetch=false},
        err => {this.error=err.error;this.transactionfetched=false;this.transactionerrorfetch=true});
  }

  checkBank()
  {
    this.transactionservice.fetchCustomer(this.receiveracct_num).subscribe(
      response =>{ 
        this.isempty=false;
      if(response.isbank)
        this.isreceiverbank=true;
      else
        this.isreceiverbank=false;}
    );
  }

}

class MsgCode{
  code:string;
  desc:string;
  constructor(code:string,desc:string)
  {
      this.code=code;
      this.desc=desc;
  }
  
}

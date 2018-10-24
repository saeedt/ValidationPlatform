//main function
function verify_company(input){
	var Result = new Object();
	Result.flgname  =  [];
	Result.flgs  =  [];
	Result.flgvalue =  [];
	Result.flgmsg   =  [];	
	merge_objs(Result,shipping_Company_name_1(input.shipping_comapny_name_1));	
	merge_objs(Result,shipping_Company_name_2(input.shipping_comapny_name_2));
	merge_objs(Result,shipping_address(input.shipping_address));
	merge_objs(Result,shipping_city(input.shipping_city));
	merge_objs(Result,shipping_state(input.shipping_state));
	merge_objs(Result,shipping_zip5(input.shipping_city,input.shipping_state,input.shipping_zip5,Result));
	merge_objs(Result,shipping_zip4(input.shipping_zip4));
	merge_objs(Result,mailing_company_name_1(input.Mailing_comapny_name_1));
	merge_objs(Result,mailing_company_name_2(input.Mailing_comapny_name_2));
	merge_objs(Result,mailing_attention(input.Mailing_attention));
	merge_objs(Result,mailing_address(input.Mailing_address));
	merge_objs(Result,mailing_city(input.Mailing_city));
	merge_objs(Result,mailing_state(input.Mailing_state));
	merge_objs(Result,mailing_zip5(input.Mailing_city,input.Mailing_state,input.Mailing_zip5,Result));
	merge_objs(resResultult,mailing_zip4(input.Mailing_zip4));
	//var ceased_op_date = input.status_ceased_month+'/'+input.status_ceased_day+'/'+input.status_ceased_year;
	merge_objs(Result,date_Of_Ceased(input.status_ceased_month,input.status_ceased_day, input.status_ceased_year));
	merge_objs(Result,contact_name(input.contact_name));
	merge_objs(Result,contact_title(input.contact_title));
	merge_objs(Result,contact_phone(input.contact_phone));
	merge_objs(Result,contact_fax_number(input.contact_fax_number));
	merge_objs(Result,completion_time(input.time_hours, input.time_minutes));
	merge_objs(Result,remarks(input.remarks));
	merge_objs(Result,check_operating_Status(input.status_inoperation,input.status_temporary,input.status_ceased, Result));

	
	if (result.flgs.length>0)
		result.pass = false;
	return result;
}
// shipping address 
  function Verfication_companyName_Shipping_address (input){
		var result = new Object();
		var error;
		result.flgname  =  [];
		result.flgs  =  [];
		result.flgvalue =  [];
		result.flgmsg   =  [];
		result.pass = true;
		if (!presence_check(input)){
			error = "E20_2"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
			}		
		if (result.flgname.length>0){
			result.pass = false;
		}
		return result;
}	
//company name 1
//console.log(shipping_Company_name_1("s.f/ a12@*%"));
//console.log(shipping_Company_name_1("sa@12@"));

function shipping_Company_name_1 (input){
		var result = new Object();
		var error;
		result.flgname  =  [];
		result.flgs  =  [];
		result.flgvalue =  [];
		result.flgmsg   =  [];
		result.pass = true;
		if (!presence_check(input)){
			error = "E21_2"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
			} else {
				if (!check_allowed_char(input, "alphanumeric", "conf1")){
					error = "E21_1"
					result.flgname.push(flags[error].name);
					result.flgs.push(flags[error].flag);
					result.flgvalue.push(flags[error].value);
					result.flgmsg.push(flags[error].msg);
					}
			}				
		if (result.flgname.length>0){
			result.pass = false;
		}
		return result;
}	

//Company name 2
function shipping_Company_name_2(input){ //need presence check
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check(input)){
		error = "E22_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	} 
	else { 
		if (!check_allowed_char(input, "alphanumeric", "conf1")){
		error = "E22_1"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	}
	if (result.flgname.lenght>0){
		result.pass = false;
	}
	return result;
}	
//Shipping address



//console.log(shipping_address("street23,'jkm'"));
function shipping_address(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check(input)){
		error = "E23_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	else{
		if (!check_allowed_char(input, "shippingAddress", "conf1")){
				error = "E23_1"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
		}	
		if (check_invalid_char(input, "shippingAddress", "conf1")){
				error = "E23_5"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
		}
	}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
//city
function shipping_city(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.valid = true;
	if (!presence_check(input)){
		error = "E24_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E24_1"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
				}
		}	
	if (result.flgname.length>0){
		result.pass = false;
		result.valid = false;
	}
	else {
		result.pass = true;
	}
	return result;
}
//state
function shipping_state(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.valid = true;	
	if (!presence_check(input)){
		error = "E25_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E25_1"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
				}	
			if(!field_length_check(input, "state", "conf1")){
				error = "E25_4"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
					}
		}
	if (!result.flgname.length>0){
		if (lkup_linear('lkup32',input)){
			error = "E25_22"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);	
		}
	}
	if (result.flgname.length>0){
		result.pass = false;
		result.valid = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

//5 digit zip code 

function shipping_zip5(city, state, zip, evalres){ // need to change based on shipment-crsooscheck zip
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true; 
	if (!presence_check(zip)){
		error = "E26_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	} 
	else {
		if (!check_allowed_char(zip, "numeric", "conf1")){
			error = "E26_1"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
		}
		if(!field_length_check(zip, "zipCode5", "conf1")){ // means that if zip is not numeric filed-length is not needed to be checked
			error = "E26_4"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
		}
		if (!result.flgname.length >0){ 
			var test2 = lkup_binary_m("lkup4","zipCode", zip).data;
			var test1 = {"city" : city, "state" : state, "zip" : zip };
			if((lkup_binary_m("lkup4","zipCode",zip).found )){
				if (evalres.shipping_state.valid && evalres.shipping_city.valid){
					if(!matchObj(test1, test2, "zipCode")){
						error = "E26_23"
						result.flgname.push(flags[error].name);
						result.flgs.push(flags[error].flag);
						result.flgvalue.push(flags[error].value);
						result.flgmsg.push(flags[error].msg);
					}
				}
			} 
			else {
				error = "E26_22"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
			}
		}
	}
	if (result.flgname.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

		
//4 digit zip code extension
function shipping_zip4 (input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check(input)){
		error = "E27_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	} else {
		if (!check_allowed_char(input, "numeric", "conf1")){	
			error = "E27_1"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
		}
		else if(!field_length_check(input, "zipCode4", "conf1")){
			error = "E27_4"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
		}
		if (result.flgname.length>0){
			result.pass = false;
		}
		return result;
	}
		
}

// verification Mailing address integration functions
function Verfication_companyName_Shipping_address (input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check(input)){
		error = "E28_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	

//mailing address attributes integration functions
function mailing_company_name_1(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true
	if (!presence_check(input)){
		error = "E29_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		} else {
			if (!check_allowed_char(input, "alphanumeric", "conf1")){
				error = "E29_1"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
				}
		}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
//Mailing company name 2
function mailing_company_name_2(input){ //needs presence check
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true
	if (!presence_check(input)){
		error = "E30_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		} else {
			if (!check_allowed_char(input, "alphanumeric", "conf1")){
				error = "E30_1"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
				}
		}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	

//Mailing address attention
function mailing_attention (input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check(input)){
		error = "E30_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		} else {
			if (!check_allowed_char(input, "numeric", "conf1")){	
				error = "E31_1"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
			}
		}
	if (result.flgname.length>0){
			result.pass = false;
		}		
	return result;		
}	
//Mailing address
function mailing_address(input){ 
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true
	if (!presence_check(input)){
		error = "E32_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		} else {
			if (!check_allowed_char(input, "shippingAddress", "conf1")){
				error = "E32_1"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
				}
		}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
//Mailing city
function mailing_city(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.valid = true

	if (!presence_check(input)){
		error = "E33_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E33_1"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
				}
		}
	if (result.flgname.length>0){
		result.pass = false;
		result.valid = false;
	}
	else {
		result.pass = true;
	}
	return result;
}
	
//Mailing state
function mailing_state(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.valid = true
	if (!presence_check(input)){
		error = "E34_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E34_1"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
				}			
			if(!field_length_check(input, "state", "conf1")){
				error = "E34_4"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
				}
			if (!result.flgname.length>0){
				if (lkup_linear('lkup32',input)){
					error = "E34_22"
					result.flgname.push(flags[error].name);
					result.flgs.push(flags[error].flag);
					result.flgvalue.push(flags[error].value);
					result.flgmsg.push(flags[error].msg);	
				}
			}
		}
	if (result.flgname.length>0){
		result.pass = false;
		result.valid = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

//5 digit mailing zip code
		
function mailing_zip5(city, state, zip,evalres){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true; 
	if (!presence_check(zip)){
		error = "E35_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	} 
	else {
		if (!check_allowed_char(zip, "numeric", "conf1")){
			error = "E35_1"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
		}
		if(!field_length_check(zip, "zipCode5", "conf1")){ // means that if zip is not numeric filed-length is not needed to be checked
			error = "E35_4"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
		}
		if (!result.flgname.length >0){ 
			var test2 = lkup_binary_m("lkup4","zipCode", zip).data;
			var test1 = {"city" : city, "state" : state, "zip" : zip };
			if((lkup_binary_m("lkup4","zipCode",zip).found )){
				if (evalres.shipping_state.valid && evalres.shipping_city.valid){
					if(!matchObj(test1, test2, "zipCode")){
						error = "E35_23"
						result.flgname.push(flags[error].name);
						result.flgs.push(flags[error].flag);
						result.flgvalue.push(flags[error].value);
						result.flgmsg.push(flags[error].msg);
					}
				}
			} 
			else {
				error = "E35_22"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
			}
		}
	}
	if (result.flgname.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

// 4 digit mailing zip code extension
function mailing_zip4 (input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check(input)){
		error = "E36_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		} else {
			if (!check_allowed_char(input, "numeric", "conf1")){	
				error = "E36_1"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
			}
			else if(!field_length_check(input, "zipCode4", "conf1")){
				error = "E36_4"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
			}
		}
		if (result.flgname.length>0){
			result.pass = false;
		}
		return result;
	
}
//Date of ceased operations
console.log(date_Of_Ceased("mn","32","12"));
function date_Of_Ceased(month, day, year){ //needs presence check: // added presence checks
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.valid = true
	if (!presence_check(month) || !presence_check(day) || !presence_check(year)) {
	error = "E38_2"
	result.flgname.push(flags[error].name);
	result.flgs.push(flags[error].flag);
	result.flgvalue.push(flags[error].value);
	result.flgmsg.push(flags[error].msg);
	result.valid= false; 
	} 
	if (presence_check(month) && presence_check(day) && presence_check(year)) {
		if (!check_allowed_char(day, "numeric", "conf1")||!check_allowed_char(month, "numeric", "conf1")||!check_allowed_char(year, "numeric", "conf1")){
		error = "E38_1"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
		if (!range_val_check(month, "ship_date_month", "conf1")||!range_val_check(day, "ship_date_day", "conf1")||!field_length_check(year, "ship_date_year", "conf1") ){
		error = "E38_3"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		
		} 
			
	}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;

}


//Operating status and date of ceased operation cross check
/*function CrossCheck_operatingStatus_dateOfCeased (ceasedOp,ceased_op_date){
	var result = new Object();
	var error;	
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;	

		if ((presence_check(ceasedOp) || presence_check(ceased_op_date)) ){
			error = "E5_1"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
			}
		if ((presence_check(ceasedOp) && ! presence_check(ceased_op_date))||(!presence_check(ceasedOp) && presence_check(ceased_op_date)) ){
			error = "E38_40"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
			}

	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}

// new cross-check function for op-status and date-of ceased

function CrossCheck_operatingStatus_dateOfCeased (ceasedOp, evalres){
	var result = new Object();
	var error;	
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;	
	if (evalres.date_Of_Ceased.valid){ // if (day, month , year)from date-of-Ceased function pass presence check 
		if (presence_check(ceasedOp)){
			error = "E5_1"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
			}
		if (!presence_check(ceasedOp)){
			error = "E38_40"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
			}
	}
		else if (presence_check(ceasedOp)){
			error = "E38_40"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
			}
	//}

	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}
*/

//  Integration functions for verification of Primary Industry Activities
function Verfication_priamaryIndustry_checkBox (input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check(input)){
		error = "E39_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
// Integration function for Name of contact information
function contact_name(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check(input)){
		error = "E41_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E41_1"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
				}
		}	
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}
//Integration function for title of contact information
function contact_title(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;	
	if (!presence_check(input)){
		error = "E42_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E42_1"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
				}
		}	
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}
//Integration function for phone number of contact information
function contact_phone(input1, exten){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check(input1)){
		error = "E43_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		} else {
			if (!check_allowed_char(input1, "numeric", "conf1")){
				error = "E43_1"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
				}
			if(!field_length_check(input1, "phone_main", "conf1")){
				error = "E43_4"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
			}
		}
	if (!presence_check(exten)){
		error = "E44_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		} else {
			if (!field_length_check(exten, "phone_extent", "conf1")){
				error = "E44_4"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
			}
		}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}
//Integration function for fax number of contact information
function contact_fax_number(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check(input)){
		error = "E45_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		} else {
			if (!check_allowed_char(input, "numeric", "conf1")){
				error = "E7_1"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
				}
			if(!field_length_check(input, "faxNum", "conf1")){
				error = "E7_2"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
			}
		}

	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}
//Survey completion time
function completion_time(input1, input2){
	var result = new Object();
	var error;	
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check(input1) || !presence_check(input2)){
		error = "E10_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		} else {
			if (!check_allowed_char(input1, "numeric", "conf1") ||!check_allowed_char(input2, "numeric", "conf1")){
				error = "E10_1"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);
				}
			else if(!range_val_check(input1, "hour", "conf1")){
				error = "E10_3"
				result.flgname.push(flags[error].name);
				result.flgs.push(flags[error].flag);
				result.flgvalue.push(flags[error].value);
				result.flgmsg.push(flags[error].msg);	
			}
		}	
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}

function remarks(input){
	var result = new Object();
	var error;	
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.valid = true;
	
	if (!presence_check(input)){
		error = "E46_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if (result.flgname.length>0){
		result.pass = false;
		result.valid=false;
	}
	else {
		result.pass = true;
	}
	return result;
}

//Operating Status check and missing remarks cross check 

function check_operating_Status(inOperat, temp, ceasedOp, evalres){//evalres are added instead of function CrossCheck_operatingStatus_dateOfCeased and 
	var result = new Object();
	var error;	
	result.flgname  =  [];
	result.flgs  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	
	if (!presence_check(inOperat) && !presence_check(temp) && ! presence_check(ceasedOp)){
		error = "E37_2"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (presence_check(inOperat) && !presence_check(temp) && ! presence_check(ceasedOp)){
		if(evalres.remarks.valid){// in remarks result.valid is added
			error = "E46_40"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);	
		}
	}
	if (evalres.date_Of_Ceased.valid){ // if (day, month , year)from date-of-Ceased function pass presence check evalres2=true
		if (presence_check(ceasedOp)){
			error = "E5_1"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
			}
		if (!presence_check(ceasedOp)){
			error = "E38_40"
			result.flgname.push(flags[error].name);
			result.flgs.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
			}
	}
	else if (presence_check(ceasedOp)){// if evalres2=false presence check of ceasedOp is checked
		error = "E38_40"
		result.flgname.push(flags[error].name);
		result.flgs.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
			}
	
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}
/*
console.log(shipping_Company_name_1("sa129715"));
console.log(shipping_Company_name_2("sa"));
console.log(shipping_address("54sara stereet45 , camden, #23"));
console.log(shipping_city("agawama"));
console.log(shipping_state("DC"));
console.log(shipping_zip5("agawama", "DC", "01265"));
console.log(shipping_zip4(""));
console.log(mailing_company_name_1("apple23"));
console.log(mailing_company_name_2(""));
console.log(mailing_attention("ds tryyy777 gg"));
console.log(mailing_address("Athens, andover,P.O."));
console.log(mailing_city("sa4445"));
console.log(mailing_state("sa4445"));
console.log(mailing_zip5("blandford", "MA","01021"));
console.log(mailing_zip4("365"));
console.log(date_Of_Ceased("12","32","2016"));
console.log(remarks("sarfm4455"));
var test_eval_res = new object();
test_eval_res.remarks.valid = true;
test_eval_res.date_Of_Ceased.valid = true;
console.log(check_operating_Status ("In-op","", "",test_eval_res));
/*
var Object2 = { 
		Mailing_address: "Putnam Sq, no.268",
		Mailing_attention: "",
		Mailing_city: "Amherest",
		Mailing_comapny_name_1: "apple34/kj",
		Mailing_comapny_name_2: "",
		Mailing_state: "MA",
		Mailing_zip4: "",
		Mailing_zip5: "01001",
		shipment_number: "126899",
		shipment_value: "66333",
		shipping_address: "Mill street ave, po_b 25668, num 23.",
		shipping_city: "agawama",
		shipping_comapny_name_1: "Oil gass 567",
		shipping_comapny_name_2: "Patburg",
		shipping_state: "DC",
		shipping_zip4: "",
		shipping_zip5: "01005",
		status_ceased_day: "15",
		status_ceased_month: "12",
		status_ceased_year: "2017",
		status_inoperation: "Inactive",
		contact_name: "Sara236",
		contact_title: "Senior Manger",
		contact_phone: " 85642368",
		contact_fax_number: "111236859",
		time_hours: "24",
		time_minutes: "25"
};

*/

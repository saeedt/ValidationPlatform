//main function
function verify_est(input){
	var Result = [];
	var tmp = new Object();
	var evalres = new Object();	
	tmp = shipping_Company_name_1(input.shipping_comapny_name_1);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = shipping_Company_name_1(input.shipping_comapny_name_1);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = shipping_Company_name_2(input.shipping_comapny_name_2);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = shipping_address(input.shipping_address);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = shipping_city(input.shipping_city);
	evalres.shipping_city = new Object();
	evalres.shipping_city.valid = tmp.valid;
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);	
	tmp = shipping_state(input.shipping_state);
	evalres.shipping_state = new Object();
	evalres.shipping_state.valid = tmp.valid;
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = shipping_zip5(input.shipping_city,input.shipping_state,input.shipping_zip5,evalres);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = shipping_zip4(input.shipping_zip4);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = mailing_company_name_1(input.Mailing_comapny_name_1);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = mailing_company_name_2(input.Mailing_comapny_name_2);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = mailing_attention(input.Mailing_attention);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = mailing_address(input.Mailing_address);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = mailing_city(input.Mailing_city);
	evalres.mailing_city = new Object();
	evalres.mailing_city.valid = tmp.valid;
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = mailing_state(input.Mailing_state);
	evalres.mailing_state = new Object();
	evalres.mailing_state.valid = tmp.valid;
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = mailing_zip5(input.Mailing_city,input.Mailing_state,input.Mailing_zip5,evalres);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = mailing_zip4(input.Mailing_zip4);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	//var ceased_op_date = input.status_ceased_month+'/'+input.status_ceased_day+'/'+input.status_ceased_year;
	tmp = date_Of_Ceased(input.status_ceased_month,input.status_ceased_day, input.status_ceased_year);
	evalres.date_of_ceased = new Object();
	evalres.date_of_ceased.valid = tmp.valid;
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = contact_name(input.contact_name);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = contact_title(input.contact_title);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = contact_phone(input.contact_phone);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = contact_fax_number(input.contact_fax_number);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = completion_time(input.time_hours, input.time_minutes);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = remarks(input.remarks);
	evalres.remarks = new Object();
	evalres.remarks.valid = tmp.valid;
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	tmp = check_operating_Status(input.status_inoperation,input.status_temporary,input.status_ceased,evalres);
	if (!tmp.pass)
		Result = Result.concat(tmp.errors);
	return Result;
}

// shipping address 
  function Verfication_companyName_Shipping_name (input){
		var result = new Object();
		var errors = [];
		var tmp = new Object();	
		var error;
		result.pass = true;
		if (!presence_check(input)){
			error = "E20_2"
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			errors.push(tmp);
			}		
		if (errors.length>0){
			result.pass = false;
			result.errors = errors;
		}		 
		return result;
}
  
//company name 1
function shipping_Company_name_1 (input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input)){
		error = "E21_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphanumeric", "conf1")){
				error = "E21_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
				}
		}				
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}	

//Company name 2
function shipping_Company_name_2(input){ //need presence check
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input)){
		error = "E22_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
	} 
	else { 
		if (!check_allowed_char(input, "alphanumeric", "conf1")){
		error = "E22_1"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		}
	}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}

//Shipping address
function shipping_address(input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input)){
		error = "E23_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		}
	else{
		if (!check_allowed_char(input, "shippingAddress", "conf1")){
				error = "E23_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
		}	
		if (check_invalid_char(input, "shippingAddress", "conf1")){
				error = "E23_5"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
		}
	}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}	

//city
function shipping_city(input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.valid = true;	
	if (!presence_check(input)){
		error = "E24_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E24_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
				}
		}	
	if (errors.length>0){
		result.pass = false;
		result.valid = false;
		result.errors = errors;
	} else {
		result.pass = true;
	}
	return result;
}

//state
function shipping_state(input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.valid = true;	
	if (!presence_check(input)){
		error = "E25_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E25_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
				}	
			if(!field_length_check(input, "state", "conf1")){
				error = "E25_4"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
					}
		}
	if (!errors.length>0){
		if (lkup_linear('lkup32',input)){
			error = "E25_22"
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;	
			errors.push(tmp);
		}
	}
	if (errors.length>0){
		result.pass = false;
		result.valid = false;
		result.errors = errors;
	} else {
		result.pass = true;
	}
	return result;
}

//5 digit zip code 
function shipping_zip5(city, state, zip, evalres){ // need to change based on shipment-crsooscheck zip
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true; 
	if (!presence_check(zip)){
		error = "E26_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
	} else {
		if (!check_allowed_char(zip, "numeric", "conf1")){
			error = "E26_1"
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			errors.push(tmp);
		}
		if(!field_length_check(zip, "zipCode5", "conf1")){ // means that if zip is not numeric filed-length is not needed to be checked
			error = "E26_4"
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			errors.push(tmp);
		}
		if (!errors.length >0){ 
			var test2 = lkup_binary_m("lkup4","zipCode", zip).data;
			var test1 = {"city" : city, "state" : state, "zip" : zip };
			if((lkup_binary_m("lkup4","zipCode",zip).found )){
				if (evalres.shipping_state.valid && evalres.shipping_city.valid){
					if(!matchObj(test1, test2, "zipCode")){
						error = "E26_23"
						tmp.flagname = flags[error].name;
						tmp.flag = flags[error].flag;
						tmp.flagval = flags[error].value;
						tmp.flagmsg = flags[error].msg;
						errors.push(tmp);
					}
				}
			} else {
				error = "E26_22"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
			}
		}
	}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	} else {
		result.pass = true;
	}
	return result;
}

		
//4 digit zip code extension
function shipping_zip4 (input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true;
	if (!presence_check(input)){
		error = "E27_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
	} else {
		if (!check_allowed_char(input, "numeric", "conf1")){	
			error = "E27_1"
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			errors.push(tmp);
		}
		else if(!field_length_check(input, "zipCode4", "conf1")){
			error = "E27_4"
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			errors.push(tmp);
		}		
	}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}
//TODO: fix the name 
// verification Mailing address integration functions
function Verfication_companyName_Mailing_name (input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true;
	if (!presence_check(input)){
		error = "E28_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}	

//mailing address attributes integration functions
function mailing_company_name_1(input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true;
	if (!presence_check(input)){
		error = "E29_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphanumeric", "conf1")){
				error = "E29_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
				}
		}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}

//Mailing company name 2
function mailing_company_name_2(input){ 
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true;
	if (!presence_check(input)){
		error = "E30_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphanumeric", "conf1")){
				error = "E30_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
				}
		}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}	

//Mailing address attention
function mailing_attention (input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true;
	if (!presence_check(input)){
		error = "E30_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "numeric", "conf1")){	
				error = "E31_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
			}
		}
	if (errors.length>0){
			result.pass = false;
			result.errors = errors;
		}		
	return result;		
}

//Mailing address
function mailing_address(input){ 
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true;
	if (!presence_check(input)){
		error = "E32_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "shippingAddress", "conf1")){
				error = "E32_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.flag = flags[error].flag;
				errors.push(tmp);
				}
		}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}

//Mailing city
function mailing_city(input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.valid = true;
	if (!presence_check(input)){
		error = "E33_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E33_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
				}
		}
	if (errors.length>0){
		result.pass = false;
		result.valid = false;
		result.errors = errors;
	}
	else {
		result.pass = true;
	}
	return result;
}
	
//Mailing state
function mailing_state(input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.valid = true;
	if (!presence_check(input)){
		error = "E34_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E34_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
				}			
			if(!field_length_check(input, "state", "conf1")){
				error = "E34_4"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
				}
			if (!errors.length>0){
				if (lkup_linear('lkup32',input)){
					error = "E34_22"
					tmp.flagname = flags[error].name;
					tmp.flag = flags[error].flag;
					tmp.flagval = flags[error].value;
					tmp.flagmsg = flags[error].msg;	
					errors.push(tmp);
				}
			}
		}
	if (errors.length>0){
		result.pass = false;
		result.valid = false;
		result.errors = errors;
	}
	else {
		result.pass = true;
	}
	return result;
}

//5 digit mailing zip code
function mailing_zip5(city, state, zip,evalres){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true; 
	if (!presence_check(zip)){
		error = "E35_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
	} 
	else {
		if (!check_allowed_char(zip, "numeric", "conf1")){
			error = "E35_1"
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			errors.push(tmp);
		}
		if(!field_length_check(zip, "zipCode5", "conf1")){ // means that if zip is not numeric filed-length is not needed to be checked
			error = "E35_4"
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			errors.push(tmp);
		}
		if (!errors.length >0){ 
			var test2 = lkup_binary_m("lkup4","zipCode", zip).data;
			var test1 = {"city" : city, "state" : state, "zip" : zip };
			if((lkup_binary_m("lkup4","zipCode",zip).found )){
				if (evalres.shipping_state.valid && evalres.shipping_city.valid){
					if(!matchObj(test1, test2, "zipCode")){
						error = "E35_23"
						tmp.flagname = flags[error].name;
						tmp.flag = flags[error].flag;
						tmp.flagval = flags[error].value;
						tmp.flagmsg = flags[error].msg;
						errors.push(tmp);
					}
				}
			} 
			else {
				error = "E35_22"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
			}
		}
	}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	} else {
		result.pass = true;
	}
	return result;
}

// 4 digit mailing zip code extension
function mailing_zip4 (input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true;
	if (!presence_check(input)){
		error = "E36_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "numeric", "conf1")){	
				error = "E36_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
			}
			else if(!field_length_check(input, "zipCode4", "conf1")){
				error = "E36_4"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
			}
		}
		if (errors.length>0){
			result.pass = false;
			result.errors = errors;
		}
		return result;	
}

//Date of ceased operations
function date_Of_Ceased(month, day, year){ //needs presence check: // added presence checks
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.valid = true;
	if (!presence_check(month) || !presence_check(day) || !presence_check(year)) {
	error = "E38_2"
	tmp.flagname = flags[error].name;
	tmp.flag = flags[error].flag;
	tmp.flagval = flags[error].value;
	tmp.flagmsg = flags[error].msg;
	errors.push(tmp);
	result.valid= false; 
	} 
	if (presence_check(month) && presence_check(day) && presence_check(year)) {
		if (!check_allowed_char(day, "numeric", "conf1")||!check_allowed_char(month, "numeric", "conf1")||!check_allowed_char(year, "numeric", "conf1")){
		error = "E38_1"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		}
		if (!range_val_check(month, "ship_date_month", "conf1")||!range_val_check(day, "ship_date_day", "conf1")||!field_length_check(year, "ship_date_year", "conf1") ){
		error = "E38_3"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} 			
	}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}


//Operating status and date of ceased operation cross check
/*function CrossCheck_operatingStatus_dateOfCeased (ceasedOp,ceased_op_date){
	var result = new Object();
	var error;	
	result.flagname  =  [];
	result.flags  =  [];
	result.flagval =  [];
	result.flagmsg   =  [];
	result.pass = true;	

		if ((presence_check(ceasedOp) || presence_check(ceased_op_date)) ){
			error = "E5_1"
			result.flagname.push(flags[error].name);
			result.flags.push(flags[error].flag);
			result.flagval.push(flags[error].value);
			result.flagmsg.push(flags[error].msg);
			}
		if ((presence_check(ceasedOp) && ! presence_check(ceased_op_date))||(!presence_check(ceasedOp) && presence_check(ceased_op_date)) ){
			error = "E38_40"
			result.flagname.push(flags[error].name);
			result.flags.push(flags[error].flag);
			result.flagval.push(flags[error].value);
			result.flagmsg.push(flags[error].msg);
			}

	if (result.flagname.length>0){
		result.pass = false;
	}
	return result;
}

// new cross-check function for op-status and date-of ceased

function CrossCheck_operatingStatus_dateOfCeased (ceasedOp, evalres){
	var result = new Object();
	var error;	
	result.flagname  =  [];
	result.flags  =  [];
	result.flagval =  [];
	result.flagmsg   =  [];
	result.pass = true;	
	if (evalres.date_Of_Ceased.valid){ // if (day, month , year)from date-of-Ceased function pass presence check 
		if (presence_check(ceasedOp)){
			error = "E5_1"
			result.flagname.push(flags[error].name);
			result.flags.push(flags[error].flag);
			result.flagval.push(flags[error].value);
			result.flagmsg.push(flags[error].msg);
			}
		if (!presence_check(ceasedOp)){
			error = "E38_40"
			result.flagname.push(flags[error].name);
			result.flags.push(flags[error].flag);
			result.flagval.push(flags[error].value);
			result.flagmsg.push(flags[error].msg);
			}
	}
		else if (presence_check(ceasedOp)){
			error = "E38_40"
			result.flagname.push(flags[error].name);
			result.flags.push(flags[error].flag);
			result.flagval.push(flags[error].value);
			result.flagmsg.push(flags[error].msg);
			}
	//}

	if (result.flagname.length>0){
		result.pass = false;
	}
	return result;
}
*/

//  Integration functions for verification of Primary Industry Activities
function Verfication_priamaryIndustry_checkBox (input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input)){
		error = "E39_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}

// Integration function for Name of contact information
function contact_name(input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input)){
		error = "E41_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E41_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
				}
		}	
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}

//Integration function for title of contact information
function contact_title(input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;	
	if (!presence_check(input)){
		error = "E42_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E42_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
				}
		}	
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}

//Integration function for phone number of contact information
function contact_phone(input1, exten){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input1)){
		error = "E43_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input1, "numeric", "conf1")){
				error = "E43_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
				}
			if(!field_length_check(input1, "phone_main", "conf1")){
				error = "E43_4"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
			}
		}
	if (!presence_check(exten)){
		error = "E44_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!field_length_check(exten, "phone_extent", "conf1")){
				error = "E44_4"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
			}
		}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}

//Integration function for fax number of contact information
function contact_fax_number(input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input)){
		error = "E45_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "numeric", "conf1")){
				error = "E7_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
				}
			if(!field_length_check(input, "faxNum", "conf1")){
				error = "E7_2"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
			}
		}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}

//Survey completion time
function completion_time(input1, input2){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input1) || !presence_check(input2)){
		error = "E10_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input1, "numeric", "conf1") ||!check_allowed_char(input2, "numeric", "conf1")){
				error = "E10_1"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				errors.push(tmp);
				}
			else if(!range_val_check(input1, "hour", "conf1")){
				error = "E10_3"
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;	
				errors.push(tmp);
			}
		}	
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}

function remarks(input){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.valid = true;	
	if (!presence_check(input)){
		error = "E46_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
	}
	if (errors.length>0){
		result.pass = false;
		result.valid=false;
		result.errors = errors;
	} else {
		result.pass = true;
	}
	return result;
}

//Operating Status check and missing remarks cross check 
function check_operating_Status(inOperat, temp, ceasedOp, evalres){//evalres are added instead of function CrossCheck_operatingStatus_dateOfCeased and 
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;	
	if (!presence_check(inOperat) && !presence_check(temp) && ! presence_check(ceasedOp)){
		error = "E37_2"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
		}
	if (presence_check(inOperat) && !presence_check(temp) && ! presence_check(ceasedOp)){
		if(evalres.remarks.valid){// in remarks result.valid is added
			error = "E46_40"
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			errors.push(tmp);
		}
	}
	if (evalres.date_of_ceased.valid){ // if (day, month , year)from date-of-Ceased function pass presence check evalres2=true
		if (presence_check(ceasedOp)){
			error = "E5_1"
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			errors.push(tmp);
			}
		if (!presence_check(ceasedOp)){
			error = "E38_40"
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			errors.push(tmp);
			}
	} else if (presence_check(ceasedOp)){// if evalres2=false presence check of ceasedOp is checked
		error = "E38_40"
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		errors.push(tmp);
			}	
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}

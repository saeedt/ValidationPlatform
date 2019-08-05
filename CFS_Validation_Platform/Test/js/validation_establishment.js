//main function
function verify_est(input){
	var Result = [];
	var tmp;
	var attr = verify_combos('est');
	//console.log(attr);
	for (var i=0; i<input.length; i++){
		var evalres = new Object();
		if (input[i][attr.data[1].eval[0].id] !=100){
			tmp = shipping_Company_name_1(input[i][attr.data[1].eval[0].name],i+1);
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);
		}
		if (input[i][attr.data[2].eval[0].id] !=100){
			tmp = shipping_Company_name_2(input[i][attr.data[2].eval[0].name],i+1);
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);
		}
		if (input[i][attr.data[3].eval[0].id] !=100){
			tmp = shipping_address(input[i][attr.data[3].eval[0].name],i+1);
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);
		}
		if (input[i][attr.data[4].eval[0].id] !=100){
			tmp = shipping_city(input[i][attr.data[4].eval[0].name],i+1);
			evalres.shipping_city = new Object();
			evalres.shipping_city.valid = tmp.valid;
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);	
		}
		if (input[i][attr.data[5].eval[0].id] !=100){
			tmp = shipping_state(input[i][attr.data[5].eval[0].name],i+1);
			evalres.shipping_state = new Object();
			evalres.shipping_state.valid = tmp.valid;
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);
		}
		if (input[i][attr.data[4].eval[0].id] !=100 && input[i][attr.data[5].eval[0].id] !=100 && input[i][attr.data[6].eval[0].id] !=100){
			tmp = shipping_zip5(input[i][attr.data[4].eval[0].name],input[i][attr.data[5].eval[0].name],input[i][attr.data[6].eval[0].name],evalres,i+1);
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);
		}
		if (input[i][attr.data[7].eval[0].id] !=100){
			tmp = shipping_zip4(input[i][attr.data[7].eval[0].name],i+1);
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);
		}
		if (input[i][attr.data[8].eval[0].id] !=100){
			tmp = mailing_company_name_1(input[i][attr.data[8].eval[0].name],i+1);
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);
		}
		if (input[i][attr.data[9].eval[0].id] !=100){
			tmp = mailing_company_name_2(input[i][attr.data[9].eval[0].name],i+1);
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);
		}
		if (input[i][attr.data[10].eval[0].id] !=100){
			tmp = mailing_attention(input[i][attr.data[10].eval[0].name],i+1);
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);
		}
		if (input[i][attr.data[11].eval[0].id] !=100){
			tmp = mailing_address(input[i][attr.data[11].eval[0].name],i+1);
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);
		}
		if (input[i][attr.data[12].eval[0].id] !=100){
			tmp = mailing_city(input[i][attr.data[12].eval[0].name],i+1);
			evalres.mailing_city = new Object();
			evalres.mailing_city.valid = tmp.valid;
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);
		}
		if (input[i][attr.data[13].eval[0].id] !=100){
			tmp = mailing_state(input[i][attr.data[13].eval[0].name],i+1);
			evalres.mailing_state = new Object();
			evalres.mailing_state.valid = tmp.valid;
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);
		}
		if (input[i][attr.data[12].eval[0].id] !=100){
			tmp = mailing_zip5(input[i][attr.data[12].eval[0].name],input[i][attr.data[13].eval[0].name],input[i][attr.data[14].eval[0].name],evalres,i+1);
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);
		}
		if (input[i][attr.data[8].eval[0].id] !=100){
			tmp = mailing_zip4(input[i][attr.data[8].eval[0].name],i+1);
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);
		}
		//var ceased_op_date = input.status_ceased_month+'/'+input.status_ceased_day+'/'+input.status_ceased_year;
		if (input[i][attr.data[18].eval[0].id] !=100 && input[i][attr.data[17].eval[0].id] !=100 && input[i][attr.data[19].eval[0].id] !=100){
			tmp = date_Of_Ceased(input[i][attr.data[18].eval[0].name],input[i][attr.data[17].eval[0].name],input[i][attr.data[19].eval[0].name],i+1);
			evalres.date_of_ceased = new Object();
			evalres.date_of_ceased.valid = tmp.valid;
			if (!tmp.pass)
				Result = Result.concat(tmp.errors);
		}
		/*tmp = contact_name(input.contact_name,i+1);
		if (!tmp.pass)
			Result = Result.concat(tmp.errors);
		tmp = contact_title(input.contact_title,i+1);
		if (!tmp.pass)
			Result = Result.concat(tmp.errors);
		tmp = contact_phone(input.contact_phone,i+1);
		if (!tmp.pass)
			Result = Result.concat(tmp.errors);
		tmp = contact_fax_number(input.contact_fax_number,i+1);
		if (!tmp.pass)
			Result = Result.concat(tmp.errors);
		tmp = completion_time(input.time_hours, input.time_minutes,i+1);
		if (!tmp.pass)
			Result = Result.concat(tmp.errors);
		tmp = remarks(input.remarks,i+1);
		evalres.remarks = new Object();
		evalres.remarks.valid = tmp.valid;
		if (!tmp.pass)
			Result = Result.concat(tmp.errors);*/
		/*tmp = check_operating_Status(input[i][attr.data[16].eval[0].name],input.status_temporary,input.status_ceased,evalres,i+1);
		if (!tmp.pass)
			Result = Result.concat(tmp.errors);*/
	}	
	return Result;
}
  
//company name 1
function shipping_Company_name_1 (input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input)){
		error = "E21_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphanumeric", "conf1")){
				error = "E21_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
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
function shipping_Company_name_2(input,line){ //need presence check
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input)){
		error = "E22_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
	} 
	else { 
		if (!check_allowed_char(input, "alphanumeric", "conf1")){
		error = "E22_1";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
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
function shipping_address(input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input)){
		error = "E23_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		}
	else{
		if (!check_allowed_char(input, "shippingAddress", "conf1")){
				error = "E23_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
				errors.push(tmp);
		}	
		if (check_invalid_char(input, "shippingAddress", "conf1")){
				error = "E23_5";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
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
function shipping_city(input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.valid = true;	
	if (!presence_check(input)){
		error = "E24_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E24_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
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
function shipping_state(input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.valid = true;	
	if (!presence_check(input)){
		error = "E25_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E25_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
				errors.push(tmp);
				}	
			if(!field_length_check(input, "state", "conf1")){
				error = "E25_4";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
				errors.push(tmp);
					}
		}
	if (!errors.length>0){
		if (!lkup_linear('lkup32',input)){
			error = "E25_22";
			tmp.line = line;
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			tmp.priority = (flags)[error].priority;	
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
function shipping_zip5(city, state, zip, evalres,line){ // need to change based on shipment-crsooscheck zip
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true; 
	if (!presence_check(zip)){
		error = "E26_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
	} else {
		if (!check_allowed_char(zip, "numeric", "conf1")){
			error = "E26_1";
			tmp.line = line;
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			tmp.priority = (flags)[error].priority;
			errors.push(tmp);
		}
		if(!field_length_check(zip, "zipCode5", "conf1")){ // means that if zip is not numeric filed-length is not needed to be checked
			error = "E26_4";
			tmp.line = line;
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			tmp.priority = (flags)[error].priority;
			errors.push(tmp);
		}
		if (!errors.length >0){ 
			var test2 = lkup_binary_m("lkup4","zip", zip);
			var test1 = {"city" : city, "state" : state, "zip" : zip };
			if(test2.found){
				if (evalres.shipping_state.valid && evalres.shipping_city.valid){
					if(!matchObj(test1, test2.data, "zip")){
						error = "E26_23";
						tmp.line = line;
						tmp.flagname = flags[error].name;
						tmp.flag = flags[error].flag;
						tmp.flagval = flags[error].value;
						tmp.flagmsg = flags[error].msg;
						tmp.priority = (flags)[error].priority;
						errors.push(tmp);
					}
				}
			} else {
				error = "E26_22";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
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
function shipping_zip4 (input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true;
	if (!presence_check(input)){
		error = "E27_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
	} else {
		if (!check_allowed_char(input, "numeric", "conf1")){	
			error = "E27_1";
			tmp.line = line;
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			tmp.priority = (flags)[error].priority;
			errors.push(tmp);
		}
		else if(!field_length_check(input, "zipCode4", "conf1")){
			error = "E27_4";
			tmp.line = line;
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			tmp.priority = (flags)[error].priority;
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
function Verfication_companyName_Mailing_name (input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true;
	if (!presence_check(input)){
		error = "E28_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}	

//mailing address attributes integration functions
function mailing_company_name_1(input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true;
	if (!presence_check(input)){
		error = "E29_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphanumeric", "conf1")){
				error = "E29_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
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
function mailing_company_name_2(input,line){ 
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true;
	if (!presence_check(input)){
		error = "E30_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphanumeric", "conf1")){
				error = "E30_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
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
function mailing_attention (input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true;
	if (!presence_check(input)){
		error = "E30_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphanumeric", "conf1")){	
				error = "E31_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
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
function mailing_address(input,line){ 
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true;
	if (!presence_check(input)){
		error = "E32_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "shippingAddress", "conf1")){
				error = "E32_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.flag = flags[error].flag;
				tmp.priority = (flags)[error].priority;
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
function mailing_city(input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.valid = true;
	if (!presence_check(input)){
		error = "E33_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E33_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
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
function mailing_state(input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.valid = true;
	if (!presence_check(input)){
		error = "E34_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E34_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
				errors.push(tmp);
				}			
			if(!field_length_check(input, "state", "conf1")){
				error = "E34_4";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
				errors.push(tmp);
				}
			if (!errors.length>0){
				if (lkup_linear('lkup32',input)){
					error = "E34_22";
					tmp.line = line;
					tmp.flagname = flags[error].name;
					tmp.flag = flags[error].flag;
					tmp.flagval = flags[error].value;
					tmp.flagmsg = flags[error].msg;
					tmp.priority = (flags)[error].priority;	
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
function mailing_zip5(city, state, zip,evalres,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true; 
	if (!presence_check(zip)){
		error = "E35_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
	} 
	else {
		if (!check_allowed_char(zip, "numeric", "conf1")){
			error = "E35_1";
			tmp.line = line;
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			tmp.priority = (flags)[error].priority;
			errors.push(tmp);
		}
		if(!field_length_check(zip, "zipCode5", "conf1")){ // means that if zip is not numeric filed-length is not needed to be checked
			error = "E35_4";
			tmp.line = line;
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			tmp.priority = (flags)[error].priority;
			errors.push(tmp);
		}
		if (!errors.length >0){ 
			var test2 = lkup_binary_m("lkup4","zip", zip);
			var test1 = {"city" : city, "state" : state, "zip" : zip };
			if(test2.found){
				if (evalres.shipping_state.valid && evalres.shipping_city.valid){
					if(!matchObj(test1, test2.data, "zip")){
						error = "E35_23";
						tmp.line = line;
						tmp.flagname = flags[error].name;
						tmp.flag = flags[error].flag;
						tmp.flagval = flags[error].value;
						tmp.flagmsg = flags[error].msg;
						tmp.priority = (flags)[error].priority;
						errors.push(tmp);
					}
				}
			} 
			else {
				error = "E35_22";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
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
function mailing_zip4 (input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.pass = true;
	if (!presence_check(input)){
		error = "E36_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "numeric", "conf1")){	
				error = "E36_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
				errors.push(tmp);
			}
			else if(!field_length_check(input, "zipCode4", "conf1")){
				error = "E36_4";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
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
function date_Of_Ceased(month, day, year, line){ //needs presence check: // added presence checks
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;	
	result.valid = true;
	if (!presence_check(month) || !presence_check(day) || !presence_check(year)) {
	error = "E38_2";
	tmp.line = line;
	tmp.flagname = flags[error].name;
	tmp.flag = flags[error].flag;
	tmp.flagval = flags[error].value;
	tmp.flagmsg = flags[error].msg;
	tmp.priority = (flags)[error].priority;
	errors.push(tmp);
	result.valid= false; 
	} 
	if (presence_check(month) && presence_check(day) && presence_check(year)) {
		if (!check_allowed_char(day, "numeric", "conf1")||!check_allowed_char(month, "numeric", "conf1")||!check_allowed_char(year, "numeric", "conf1")){
		error = "E38_1";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		}
		if (!range_val_check(month, "ship_date_month", "conf1")||!range_val_check(day, "ship_date_day", "conf1")||!field_length_check(year, "ship_date_year", "conf1") ){
		error = "E38_3";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
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
function Verfication_priamaryIndustry_checkBox (input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input)){
		error = "E39_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}

// Integration function for Name of contact information
function contact_name(input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input)){
		error = "E41_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E41_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
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
function contact_title(input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;	
	if (!presence_check(input)){
		error = "E42_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "alphabetic", "conf1")){
				error = "E42_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
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
function contact_phone(input1, exten, line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input1)){
		error = "E43_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input1, "numeric", "conf1")){
				error = "E43_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
				errors.push(tmp);
				}
			if(!field_length_check(input1, "phone_main", "conf1")){
				error = "E43_4";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
				errors.push(tmp);
			}
		}
	if (!presence_check(exten)){
		error = "E44_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!field_length_check(exten, "phone_extent", "conf1")){
				error = "E44_4";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
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
function contact_fax_number(input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input)){
		error = "E45_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input, "numeric", "conf1")){
				error = "E7_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
				errors.push(tmp);
				}
			if(!field_length_check(input, "faxNum", "conf1")){
				error = "E7_2";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
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
function completion_time(input1, input2, line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;
	if (!presence_check(input1) || !presence_check(input2)){
		error = "E10_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		} else {
			if (!check_allowed_char(input1, "numeric", "conf1") ||!check_allowed_char(input2, "numeric", "conf1")){
				error = "E10_1";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;
				errors.push(tmp);
				}
			else if(!range_val_check(input1, "hour", "conf1")){
				error = "E10_3";
				tmp.line = line;
				tmp.flagname = flags[error].name;
				tmp.flag = flags[error].flag;
				tmp.flagval = flags[error].value;
				tmp.flagmsg = flags[error].msg;
				tmp.priority = (flags)[error].priority;	
				errors.push(tmp);
			}
		}	
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}

function remarks(input,line){
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.valid = true;	
	if (!presence_check(input)){
		error = "E46_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
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
function check_operating_Status(inOperat, temp, ceasedOp, evalres, line){//evalres are added instead of function CrossCheck_operatingStatus_dateOfCeased and 
	var result = new Object();
	var errors = [];
	var tmp = new Object();	
	var error;
	result.pass = true;	
	if (!presence_check(inOperat) && !presence_check(temp) && ! presence_check(ceasedOp)){
		error = "E37_2";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
		}
	if (presence_check(inOperat) && !presence_check(temp) && ! presence_check(ceasedOp)){
		if(evalres.remarks.valid){// in remarks result.valid is added
			error = "E46_40";
			tmp.line = line;
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			tmp.priority = (flags)[error].priority;
			errors.push(tmp);
		}
	}
	if (evalres.date_of_ceased.valid){ // if (day, month , year)from date-of-Ceased function pass presence check evalres2=true
		if (presence_check(ceasedOp)){
			error = "E5_1";
			tmp.line = line;
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			tmp.priority = (flags)[error].priority;
			errors.push(tmp);
			}
		if (!presence_check(ceasedOp)){
			error = "E38_40";
			tmp.line = line;
			tmp.flagname = flags[error].name;
			tmp.flag = flags[error].flag;
			tmp.flagval = flags[error].value;
			tmp.flagmsg = flags[error].msg;
			tmp.priority = (flags)[error].priority;
			errors.push(tmp);
			}
	} else if (presence_check(ceasedOp)){// if evalres2=false presence check of ceasedOp is checked
		error = "E38_40";
		tmp.line = line;
		tmp.flagname = flags[error].name;
		tmp.flag = flags[error].flag;
		tmp.flagval = flags[error].value;
		tmp.flagmsg = flags[error].msg;
		tmp.priority = (flags)[error].priority;
		errors.push(tmp);
			}	
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	}
	return result;
}

// shipping address 
  function Verfication_companyName_Shipping_address (input){
		var result = new Object();
		var error;
		result.flgname  =  [];
		result.flgflag  =  [];
		result.flgvalue =  [];
		result.flgmsg   =  [];
		result.pass = true;
		if (!presence_check(input)){
			error = "E20_2"
			result.flgname.push(flags[error].name);
			result.flgflag.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
			}		
		if (result.flgname.length>0){
			result.pass = false;
		}
		return result;
}	
//company name 1
function shipping_Company_name_1 (input){
		var result = new Object();
		var error;
		result.flgname  =  [];
		result.flgflag  =  [];
		result.flgvalue =  [];
		result.flgmsg   =  [];
		result.pass = true;
		if (!check_allowed_char(input, "alphanumeric", "conf1")){
			error = "E21_1"
			result.flgname.push(flags[error].name);
			result.flgflag.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
			}
		if (!presence_check(input)){
			error = "E21_2"
			result.flgname.push(flags[error].name);
			result.flgflag.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
			}		
		if (result.flgname.length>0){
			result.pass = false;
		}
		return result;
}	

//Company name 2
function shipping_Company_name_2(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!check_allowed_char(input, "alphanumeric", "conf1")){
		error = "E21_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (result.flgname.lenght>0){
		result.pass = false;
	}
	return result;
}	
//Shipping address
function shipping_address(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!check_allowed_char(input, "alphanumeric", "conf1")){
		error = "E23_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E23_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (check_invalid_char(input, "shippingAddress", "conf1")){
		error = "E23_5"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
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
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	
	if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "E23_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E23_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
//state
function shipping_state(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	
	if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "E25_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E25_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	
	if(!length_field_check(input, "state", "conf1")){
		error = "E25_4"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
			}
	
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	

//5 digit zip code
function shipping_zip5(input1, input2, input3){
	var result = new Object();
	var error;
	var input1;
	var input2;
	var input3;
	var test2 = lkup_binary_m("city_state_zip","zip", input3).data;
	var test1 = {
			"city" : input1 ,
			"state" : input2,
			"zip" : input3
	};
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!check_allowed_char(input3, "numeric", "conf1")){
		error = "E26_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if (!presence_check(input3)){
		error = "E26_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if(!length_field_check(input3, "zipCode5", "conf1")){
		error = "E26_4"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if((lkup_binary_m("city_state_zip","zip",input3).found )){
		if(!matchObj(test1, test2, "zip")){
			error = "E24_23"
			result.flgname.push(flags[error].name);
			result.flgflag.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
		}
	}
	else{
		error = "E26_22"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	

//4 digit zip code extension
function shipping_zip4 (input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (presence_check(input)){
		if (!check_allowed_char(input, "numeric", "conf1")){	
			error = "E26_1"
			result.flgname.push(flags[error].name);
			result.flgflag.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
		}
		if(!length_field_check(input, "zipCode4", "conf1")){
			error = "E26_4"
			result.flgname.push(flags[error].name);
			result.flgflag.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
		}
		if (result.flgname.length>0){
			result.pass = false;
		}
		return result;
	}
	else{
		return true
	}	
}	
// verification Mailing address integration functions
function Verfication_companyName_Shipping_address (input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check(input)){
		error = "E27_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	console.log(result.flgname.length);
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
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true
	if (!check_allowed_char(input, "alphanumeric", "conf1")){
		error = "E28_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E28_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
//Mailing company name
function mailing_company_name_2(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true

	if (!check_allowed_char(input, "alphanumeric", "conf1")){
		error = "E29_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
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
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (presence_check(input)){
		if (!check_allowed_char(input, "numeric", "conf1")){	
			error = "E30_1"
			result.flgname.push(flags[error].name);
			result.flgflag.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
		}
		if (result.flgname.length>0){
			result.pass = false;
		}
		return result;
	}
	else{
		return true
	}	
}	
//Mailing address
function mailing_address(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true

	if (!check_allowed_char(input, "alphanumeric", "conf1")){
		error = "E31_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E31_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
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
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true
	
	if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "E32_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E32_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
//Mailing state
function mailing_state(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true
	
	if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "E33_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E33_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	
	if(!length_field_check(input, "state", "conf1")){
		error = "E33_4"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
			}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}

//5 digit mailing zip code
function mailing_zip5(input1, input2, input3){
	var result = new Object();
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	var error;
	var input1;
	var input2;
	var input3;
	var test2 = lkup_binary_m("city_state_zip","zip", input3).data;
	var test1 = {
			"city" : input1 ,
			"state" : input2,
			"zip" : input3
	};
	
	result.pass = true;
	if (!check_allowed_char(input3, "numeric", "conf1")){
		error = "E34_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if (!presence_check(input3)){
		error = "E34_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if(!length_field_check(input3, "zipCode5", "conf1")){
		error = "E34_4"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	
	if((lkup_binary_m("city_state_zip","zip",input3).found )){
		if(!matchObj(test1, test2, "zip")){
			error = "E32_23"
			result.flgname.push(flags[error].name);
			result.flgflag.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
		}
	}
	else{
		error = "E26_22"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
// 4 digit mailing zip code extension
function mailing_zip4 (input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (presence_check(input)){
		if (!check_allowed_char(input, "numeric", "conf1")){	
			error = "E34_1"
			result.flgname.push(flags[error].name);
			result.flgflag.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
		}
		if(!length_field_check(input, "zipCode4", "conf1")){
			error = "E34_4"
			result.flgname.push(flags[error].name);
			result.flgflag.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
		}
		if (result.flgname.length>0){
			result.pass = false;
		}
		return result;
	}
	else{
		return true
	}
	
}	

//Date of ceased operations
function date_Of_Ceased(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true
	
	if (!check_allowed_char(input, "dateOfCeased", "conf1")){
		error = "E36_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	//if (!presence_check(input)){
	//	error = "E31_2"
		//result.flgname.push(flags[error].name);
		//result.flgflag.push(flags[error].flag);
		//result.flgvalue.push(flags[error].value);
		//result.flgmsg.push(flags[error].msg);
		//}
	if (check_req_char(input, "dateOfCeased", "conf1")){
		error = "E36_3"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
// Operating Status check
function check_operating_Status(input1, input2, input3){
	var result = new Object();
	var error;
	var input1;
	var input2;
	var input3;
	var test = {
		"In_Operation" : input1,
		"Inactive" : input2,
		"Ceased ":input3
	};
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (presence_check(input1) && presence_check(input2) && presence_check(input3)){
		error = "E35_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	console.log(result.flgname.length);
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	

//Operating status and date of ceased operation cross check
function CrossCheck_operatingStatus_dateOfCeased (input1,input2){
	var result = new Object();
	var error;
	var input1;
	var input2;
	var test = {
		"Ceased Operation ": input1,
		"date of Ceased" : input2
	};
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if ((presence_check && ! presence_check(input2))||(!presence_check(input1) && presence_check(input2)) ){
		error = "E5_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	console.log(result.flgname.length);
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}
//  Integration functions for verification of Primary Industry Activities
function Verfication_priamaryIndustry_checkBox (input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check(input)){
		error = "E37_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	console.log(result.flgname.length);
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
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	
	if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "E39_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E23_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
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
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	
	if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "E40_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E40_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
//Integration function for phone number of contact information
function contact_phone(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	
	if (!check_allowed_char(input, "phone", "conf1")){
		error = "E41_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E41_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	//if (!check_required-char(input)){
		//error = "E41_3"
		//result.flgname.push(flags[error].name);
		//result.flgflag.push(flags[error].flag);
		//result.flgvalue.push(flags[error].value);
		//result.flgmsg.push(flags[error].msg);
		//}
	
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
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!check_allowed_char(input, "faxNum", "conf1")){
		error = "E7_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if ( check_req_char(input, "faxNum", "conf1")){
		error = "E42_3"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E42_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}

	if(!length_field_check(input, "faxNum", "conf1")){
		error = "E7_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
//Survey completion time
function completionh_time(input1, input2){
	var result = new Object();
	var error;
	var input1;
	var input2;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check(input1) && !presence_check(input2)){
		error = "E10_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!check_allowed_char(input1, "numeric", "conf1") ||!check_allowed_char(input2, "numeric", "conf1")){
		error = "E10_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if(!Range_val_check(input1, "hour", "conf1")){
		error = "E10_3"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);	
	}
	
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
// Test objects company_form.js
var object = {
		shipping_comapny_name_1: "sa129715",
		shipping_comapny_name_2: "sa",
		shipping_address: "2 Andoveer, p.o.box34", 
		shipping_city: "agawama", 
		shipping_state: "DC",
		shipping_zip5: "01001",
		shipping_zip4: "", 
		mailing_comapny_name_1: "apple23", 
		mailing_comapny_name_2: "",
		mailing_attention: "" ,
		mailing_address: "Putnam Sq, no.268",
		mailing_attention:"",
		mailing_comapny_name_1: "Apple34/kj",
		mailing_comapny_name_2: "",
		mailing_city: "blandford",
		mailing_state: "MA",
		mailing_zip5: "01005",
		mailing_zip4: "365",
		//status_ceased_day: "12",
		//status_ceased_month: "32",
		//status_ceased_year: "2017",
		status_inoperation: "Ceased"
};


//console.log(Verfication_companyName_Shipping_address (input));
/*console.log(shipping_Company_name_1("sa129715"));
console.log(shipping_Company_name_2("sa"));
console.log(shipping_address("2 Andoveer, p.o.box34"));
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
console.log(date_Of_Ceased("15/12/2017"));
console.log(check_operating_Status ("In Operation","Temp", "Ceased"));
console.log(CrossCheck_operatingStatus_dateOfCeased ("","21/11/2014"));*/

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
		status_inoperation: "Inactive"
}
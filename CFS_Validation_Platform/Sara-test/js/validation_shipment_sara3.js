//main function
function verify_shipment(input){
	var result =  [];
	var tmpResult;
	//TODO implement test_naic function : presence check and field validation
	//tmpResult.NAICS = test_naics(NAICS);
	for (var i=0; i<input.length; i++){
		tmpResult = new Object();
		tmpResult.SHIP_NUM = test_ship_ID(input[i].SHIP_NUM);
		tmpResult.SHIPMENT_MONTH = test_ship_month(input[i].SHIPMENT_MONTH);		
		tmpResult.SHIPMT_DAY = test_ship_day(input[i].SHIPMT_DAY);		
		
		tmpResult.TEMPERATURE_CONTROL_YN = test_temp_control(input[i].TEMPERATURE_CONTROL_YN);
		tmpResult.DOMESTIC_TRANSPORT_MODE = test_mode(input[i].DOMESTIC_TRANSPORT_MODE);
		tmpResult.DOMESTIC_STATE_ABBREV = test_destinationState(input[i].DOMESTIC_STATE_ABBREV);
		tmpResult.SHIPMENT_WEIGHT = test_ship_weight(input[i].SHIPMENT_WEIGHT,input[i].DOMESTIC_TRANSPORT_MODE,'',tmpResult);
		tmpResult.SHIPMENT_VALUE = test_ship_value(input[i].SHIPMENT_VALUE);
		tmpResult.SCTG_COMMODITY_CODE = test_sctg(input[i].SCTG_COMMODITY_CODE,input[i].SHIPMENT_VALUE,input[i].SHIPMENT_WEIGHT,input[i].DOMESTIC_TRANSPORT_MODE,input[i].TEMPERATURE_CONTROL_YN,input[i].NAICS,tmpResult);
				
		tmpResult.COMMODITY_DESCRIPTION = test_sctg_descr(input[i].COMMODITY_DESCRIPTION);
		tmpResult.HAZMAT_CODE = test_unna(input[i].HAZMAT_CODE,input[i].SCTG_COMMODITY_CODE);
		tmpResult.DOMESTIC_CITY_NAME = test_destinationCity(input[i].DOMESTIC_CITY_NAME);
		tmpResult.DOMESTIC_ZIP_CODE = test_destinationZip(input[i].DOMESTIC_ZIP_CODE);
		tmpResult.EXPORT_CITY_NAME = test_exportCity(input[i].EXPORT_CITY_NAME);
		tmpResult.EXPORT_COUNTRY_NAME = test_exportCountry(input[i].EXPORT_COUNTRY_NAME,input[i].EXPORT_CITY_NAME,input[i].EXPORT_TRANSPORT_MODE);
		tmpResult.EXPORT_CITY_NAME = test_exportCity(input[i].EXPORT_CITY_NAME);		
		result.push(tmpResult);
	}
	result.push(test_auto_fill_m(input[i].list,input[i].attrib));	
	return result;
}

function test_numberOfShip(shipNum){
	var result = new Object();;
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	var interval;
	var required;
	if (!presence_check(shipNum)){
		error = "S30_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else {
		if (!range_val_check(shipNum, "numberOfShip", "conf1")){ 
			error = "S30_20";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(shipNum) && input.lenght > 0){ //FIXME: input is a local variable - not valid here. pass a parameter 'nos' to this function instead
			error = "E1_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (shipNum == 0 && input.lenght > 0){ 
			error = "E1_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (shipNum > 0 && input.lenght == 0){ 
			error = "E1_3";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if ((shipNum == 0 && input.lenght == 0)||(!presence_check(shipNum) && input.lenght == 0)){
			error = "E1_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (shipNum > 100000 && input.lenght > 0){ 
			error = "E1_5";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (shipNum > 100000){ 
			error = "E8_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (shipNum != 0 ){
			if (range_val_check(shipNum, "interval1", "conf1")){
				interval = Math.ceil(parseInt(shipNum/40))
			}
			else if (range_val_check(shipNum, "interval2", "conf1")){
				interval = 5 * Math.ceil(parseInt(shipNum/200))
			}
			else if (range_val_check(shipNum, "interval3", "conf1")){
				interval = 10 * Math.ceil(parseInt(shipNum/600))
			}
			else if (range_val_check(shipNum, "interval4", "conf1")){
				interval = 10 * Math.ceil(parseInt(shipNum/600))
			}
			else if (range_val_check(shipNum, "interval5", "conf1")){
				interval = 20 * Math.ceil(parseInt(shipNum/1600))
			}
			else if (range_val_check(shipNum, "interval6", "conf1")){
				interval = 20 * Math.ceil(parseInt(shipNum/1600))
			}
			else if (range_val_check(shipNum, "interval7", "conf1")){
				interval = 50 * Math.ceil(parseInt(shipNum/4000))
			}
			else if (range_val_check(shipNum, "interval8", "conf1")){
				interval = 100 * Math.ceil(parseInt(shipNum/8000))
			}
			required = Math.floor(shipNum/interval)
			if (required > 10 && (required- input.lenght)/required > 0.2 ){
				error = "E2_1";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
			else if (required <= 10 && Math.abs(required- input.lenght) > 1 ){
				error = "E2_2";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
		}
	}
		if (result.flags.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}
function MOS_vs_ATV(ATV, MOS, estbWeight){
	var result = new Object();;
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	//TODO ATV and MOS must be coverted to numbers, and checked if they are valid (presence, numeric, range, etc.)
	//FIXME hard coded numbers must be moved to config
	if ((Math.abs(ATV-MOS) > 1000000000) && (ATV==0 ||(MOS/ATV) < 0.2 || (MOS/ATV) > 5)){
		error = "E3_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	}
	if (((Math.abs(ATV-MOS)> 20000000) || estbWeight >5 ) && (ATV==0 || (MOS/ATV) < 0.1 ||(MOS/ATV) > 10)){
		error = "E3_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	}
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

function test_totShipValue(totShipVal, totValWeek, ATV, estbWeight){
	var result = new Object();
	var tvw = (totValWeek/1000)*52;
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(totShipVal)){
		error = "S31_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else {
		if (!range_val_check(totShipVal, "totShipValue", "conf1")){
			error = "S31_20";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if ((Math.abs(ATV-tvw) > 1000000000) && (ATV == 0 || tvw/ATV < 0.2 || tvw/ATV > 5)){
			error = "E9_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if ((Math.abs(ATV-tvw) > 20000000 || estbWeight> 5) && (ATV == 0 || tvw/ATV < 0.1 || tvw/ATV > 10)){
			error = "E9_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
	}		
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}
function test_moreThan40Ship(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S32_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	}
	//TODO check valid inputs Y and N similar to temp control field
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}
function test_ship_ID(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S33_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else {
		if (!check_allowed_char(input, "alphanumeric", "conf1")){
			error = "S33_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}		
	}
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

function test_ship_month(ship_month, quarter){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(ship_month)){
		error = "S14_5";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else {
		if (!check_allowed_char(ship_month, "numeric", "conf1")){
			error = "S34_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!range_val_check(ship_month, "ship_date_month", "conf1")){
			error = "S34_20";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (quarter == 1 && !lkup_linear("lkup21", ship_month)){
			error = "S14_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (quarter == 2 && !lkup_linear("lkup22", ship_month)){
			error = "S14_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (quarter == 3 && !lkup_linear("lkup23", ship_month)){
			error = "S14_3";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (quarter == 4 && !lkup_linear("lkup24", ship_month)){
			error = "S14_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
	}
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

function test_ship_day(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S35_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else {
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S35_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!range_val_check(input, "ship_date_day", "conf1")){
			error = "S35_20";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}		
	}
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

function test_ship_value(input){
	var result = new Object();
	var error;
	result.valid = true;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S5_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else {
		if (!range_val_check(input, "ship_value", "conf1")){
			error = "S5_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S36_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}			
	}
	if (result.flags.length>0){
		result.pass = false;
		result.valid = false;
	}else {
		result.pass = true;
	}
	return result;
}

function test_ship_weight(weight, mode, naics, evalres){
	var result = new Object();
	var error;	
	result.valid = true;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];	
	if (!presence_check(weight)){
		error = "S6_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		result.valid = false;
	} else {
		if (!check_allowed_char(weight, "numeric", "conf1")){
			error = "S37_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
		}
		if (!range_val_check(weight, "ship_weight", "conf1")){
			error = "S6_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
		}
		// FIXME add range cheack for weight: weights must be >0
	}
	if (!result.flags.length>0){
		if (evalres.DOMESTIC_TRANSPORT_MODE.valid){ //cross consistency checks are performed if all participating variables are valid
			var lkup_result = lkup_binary_m("lkup20","mode", mode);
			if (lkup_result.found){ // all numeric inputs must be casted to a numeric types before any numeric operation like division, multiplication, summation, subtraction or comparison is performed 			
				if (lkup_result.data[0].maxWeight <= parseFloat(weight)) {
					error = "S7_1";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}	
				if (lkup_result.data[0].minWeight >= parseFlaot(weight)){
					error = "S7_2";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
				if (evalres.NAICS.valid){
					if ((lkup_linear("lkup30",naics) && mode == "4")){
						if (parseFlaot(weight) <= 100){
							error = "S7_2";
							result.flagname.push((flags)[error].name);
							result.flags.push((flags)[error].flag);
							result.flagval.push((flags)[error].value);
							result.flagmsg.push((flags)[error].msg);
							}
						}
					}
			} 
		}			
	}
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

function test_sctg(sctg, value, weight, mode, temp, naics, evalres){
	var result = new Object();
	result.valid = true;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	var error;
	if (!presence_check(sctg)){ //presence check is always performed first
		error = "S3_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		result.valid = false;
	} else {
		if (!check_allowed_char(sctg, "numeric", "conf1")){ // the other field validation checks are performed if the presence check returns true
			error = "S38_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
		}
		if (!field_length_check(sctg, "sctg", "conf1")){
			error = "S38_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
		}
	}
	if (!result.flags.length>0){ //lookups and cross checks can only be performed if the presence and field validation checks return true
		//SCTG, value, weight
		var lkup_result1 = lkup_binary_m("lkup1","sctg", sctg);		
		if (lkup_result1.found){ // vw ratio tests and sctg substring checks are performed if sctg is valid 
			// value to weight ratio tests are only performed if value and weight have passed presence and filed validation tests, otherwise the division is not possible
			if (evalres.SHIPMENT_VALUE.valid && evalres.SHIPMENT_WEIGHT.valid) {
				var vw_ratio = parseFloat(value)*1.0/parseFloat(weight);
				if (lkup_linear("lkup18", sctg.substr(0,2))){
					
					if (lkup_result1.data[0].vw_lb > vw_ratio){
						error = "S8_1";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}	
					if (lkup_result1.data[0].vw_ub < vw_ratio){	
						error = "S8_2";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					} 
				 } 
				else if (lkup_linear("lkup19", sctg.substr(0,2))){
					if (lkup_result1.data[0].vw_lb > vw_ratio){			
						error = "S8_3";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}	
					if (lkup_result1.data[0].vw_ub < vw_ratio){		
						error = "S8_4";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}
				} else {
					if (lkup_result1.data[0].vw_lb > vw_ratio){	
						error = "S8_5";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);	
					}
					if (lkup_result1.data[0].vw_lb < vw_ratio){	
						error = "S8_6";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);	
					}
				}
			}			
			if (sctg.substr(0,2) == "16"){ // updated this according to the spec sheet - this test does not check the validity of the sctg, it just checks if it starts with 16
				error = "S3_3";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
			// SCTG & NAICS
			if (eavlres.NAICS.valid) {
				var lkup_result2 = lkup_binary_m("lkup17","partial_naics", naics);			
				if (lkup_result2.found){
					if (lkup_result2.data[0].sctg_2digit == sctg.substr(0,2)){
						if(lkup_result2.data[0].flag_value == "0"){
							error = "S10_0";
							result.flagname.push((flags)[error].name);
							result.flags.push((flags)[error].flag);
							result.flagval.push((flags)[error].value);
							result.flagmsg.push((flags)[error].msg);
						}
						if (lkup_result2.data[0].flag_value == "1"){
							error = "S10_1";
							result.flagname.push((flags)[error].name);
							result.flags.push((flags)[error].flag);
							result.flagval.push((flags)[error].value);
							result.flagmsg.push((flags)[error].msg);
						}
						if (lkup_result2.data[0].flag_value == "2"){
							error = "S10_2";
							result.flagname.push((flags)[error].name);
							result.flags.push((flags)[error].flag);
							result.flagval.push((flags)[error].value);
							result.flagmsg.push((flags)[error].msg);
						}
						if (lkup_result2.data[0].flag_value == "3"){
							error = "S10_3";
							result.flagname.push((flags)[error].name);
							result.flags.push((flags)[error].flag);
							result.flagval.push((flags)[error].value);
							result.flagmsg.push((flags)[error].msg);
						}
					}
				}
			}
			//SCTG & Mode
			if (evalres.DOMESTIC_TRANSPORT_MODE.valid){
				if (!lkup_linear("lkup6", sctg.substr(0,2))){
					if (check_char("lkup26", mode)){ 
						error = "S4_1";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}
				}
			}
			//SCTG, mode, weight
			if (evalres.DOMESTIC_TRANSPORT_MODE.valid && evalres.SHIPMENT_WEIGHT.valid){
				if (lkup_linear("lkup7", sctg.substr(0,2))){ //FIXME hard-coded numbers must be moved to config
					if (check_char("lkup27", mode)){ 
						if (weight >= 150 || (parseFloat(weight) >= 150 && state != "AK")){
							error = "S4_2";
							result.flagname.push((flags)[error].name);
							result.flags.push((flags)[error].flag);
							result.flagval.push((flags)[error].value);
							result.flagmsg.push((flags)[error].msg);
						}
					}	
					if (check_char("lkup28", mode)){ //FIXME hard-coded numbers must be moved to config
						if (weight >= 1000  || (parseFloat(weight) >= 1000 && state != "AK")){
							error = "S4_3";
							result.flagname.push((flags)[error].name);
							result.flags.push((flags)[error].flag);
							result.flagval.push((flags)[error].value);
							result.flagmsg.push((flags)[error].msg);
						}
					}
				}
			}
			// SCTG & Temp
			if (evalres.TEMPERATURE_CONTROL_YN.valid){
				if (temp_control == "Y"){
					if (lkup_linear("lkup9", sctg.substr(0,2))){ 
						error = "S12_1";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}	
					else if (lkup_linear("lkup10", sctg.substr(0,2))){ 			
						error = "S12_2";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}
				}
				if (temp_control == "N" && lkup_linear("lkup11", sctg)){	
					error = "S12_3";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
				if (evalres.DOMESTIC_TRANSPORT_MODE.valid){
					if (temp_control == "Y" && mode == "7"){	
						error = "S13_1";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}
				}				
			}			
		} else {// if the SCTG code is not found in the lookup table
			error = "S3_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
		}		
	}		
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}
function test_sctg_descr(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S39_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else if (!check_allowed_char(input, "alphanumeric", "conf1")){
		error = "S39_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	}
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

function test_temp_control(temp_control){
	var result = new Object();
	var error;
	result.valid = true;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(temp_control)){
			error = "S11_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
	} else if (!lkup_linear("lkup25", temp_control)){
			error = "S11_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
		}		
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

function test_unna(unna, sctg, evalres){
	var result = new Object();
	var error;
	result.valid = true;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];	
		if (!check_allowed_char(unna, "numeric", "conf1")){
			error = "S40_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
		}
		if (!field_length_check(unna, "unna", "conf1")){
			error = "S40_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
		}
	if (presence_check(unna)){
		if (evalres.SCTG_COMMODITY_CODE.valid){
			if (lkup_linear("lkup31", sctg)){
				//TODO lookup 31 is reserved for the UNNA/SCTG combination list			
				error = "S9_4";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			} else if (result.valid){
				if (lkup_binary_m("lkup2", "unna_code", unna).found){
				 	if (!lkup_linear("lkup13", sctg)){	
				 		error = "S9_3";
				 		result.flagname.push((flags)[error].name);
				 		result.flags.push((flags)[error].flag);
				 		result.flagval.push((flags)[error].value);
				 		result.flagmsg.push((flags)[error].msg);				
				 	} 
				} else {
					if (!lkup_binary_m("lkup2", "unna_code", unna).found){
						error = "S9_2";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);			 				
					} 
				}
			}
		}			
	} else {
		if (evalres.SCTG_COMMODITY_CODE.valid){
			if (lkup_linear("lkup12", sctg)){					
				error = "S9_1";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);			
			}
		}			
	}		
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

function test_destinationCity(input){
	var result = new Object();
	var error;
	result.valid = true;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S41_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else {
		if (!check_allowed_char(input, "alphabetic", "conf1")){
			error = "S41_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (check_invalid_char(input, "city", "conf1")){
			error = "S41_5";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
	}
	if (result.flags.length>0){
		result.pass = false;
		result.valid = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

function test_destinationState(input){
	var result = new Object();
	var error;
	result.valid = true;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S42_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);		
	} else {
		if (!check_allowed_char(input, "alphabetic", "conf1")){
			error = "S42_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);			
		}
		if (!field_length_check(input, "state", "conf1")){
			error = "S42_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}	
		if (check_invalid_char(input, "state", "conf1")){
			error = "S42_5";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!lkup_linear('lkup31',input)){
			// TODO: add a flag for invalid state and update 
		}		
	}					
	if (result.flags.length>0){
		result.pass = false;
		result.valid = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

function test_destinationZip(city, state, zip, evalres){
	var result = new Object();
	var error;	
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(zip)){
		error = "S43_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else {
		if (!check_allowed_char(zip, "numeric", "conf1")){
			error = "S43_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!field_length_check(zip, "zipCode5", "conf1")){
			error = "S43_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
	}
	if (!result.flags.length >0){
		var test2 = lkup_binary_m("lkup4", "zip", zip).data;
		if (lkup_linear("lkup5", zip.substr(0,3))){
			error = "S1_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if ((lkup_binary_m("lkup4", "zip", zip).found)){
			if (evalres.DOMESTIC_STATE_ABBREV.valid && evalres.DOMESTIC_CITY_NAME.valid){
				var test1 = {"city" : city, "state" : state, "zip" : zip };
				if (!matchObj(test1, test2, "zip")){// perfromed only if zip and state are valid
					error = "S1_2";
					result.flagname.push(flags[error].name);
					result.flags.push(flags[error].flag);
					result.flagval.push(flags[error].value);
					result.flagmsg.push(flags[error].msg);
				}
			} 			
		} else {
			error = "S43_22";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
	}	
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

function test_mode(mode){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	result.valid = true;
	if (!presence_check(mode)){
		error = "S2_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		result.valid = false;
	} else if (!check_allowed_char(mode, "numeric", "conf1")){
		error = "S2_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		result.valid = false;
	} else {
		if (!lkup_linear("lkup3", mode)){
			error = "S2_3";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}				
	}
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}		
function test_export(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S44_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else if (!lkup_linear("lkup25", input)){
		error = "S44_5";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	}	
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}
function test_exportCity(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S45_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "S45_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else if (!lkup_linear("lkup14", input) || !lkup_linear("lkup15", input)){
		error = "S17_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	}	
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}
function test_exportCountry(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S46_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "S46_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else if (!lkup_linear("lkup16", input)){
		error = "S17_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	}
	if (result.flags.length>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}
function test_exportMode(exp_mode, country){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(exp_mode)){
		error = "S47_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else if (!check_allowed_char(exp_mode, "numeric", "conf1")){
		error = "S47_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else if (lkup_linear("lkup29", exp_mode)){
			if (country != "Canada" || country != "Mexico"){
				error = "S16_1";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
		}			
	if (result.flags.length>0){
		result.pass = false;
	}else {
		result.pass = true;
	}
	return result;
}

function test_auto_fill_m(input, attrib){ //FIXME fix this according to our discussion last week
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	let count = 0;
	for (var attrib in input){
		if (!auto_fill(input, attrib)){
			count = count + 1;
		}
		if (count = 1){
			error = "S15_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (count = 2){
			error = "S15_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (count = 3){
			error = "S15_3";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (count = 4){
			error = "S15_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (count = 5){
			error = "S15_5";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (count = 6){
			error = "S15_6";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
	}
	if (result.flags.length>0){
		result.pass = false;
	}else {
		result.pass = true;
	}
	return result;
}
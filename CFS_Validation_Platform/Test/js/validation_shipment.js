//main function
function verify_shipment(input){
	var result =  [];
	var tmpResult;
	//TODO implement test_naic function : presence check and field validation
	//tmpResult.NAICS = test_naics(NAICS);
	for (var i=0; i<input.length; i++){
		tmpResult = new Object();
		tmpResult.SHIP_NUM = test_numberOfShip(input[i].SHIP_NUM);
		tmpResult.SHIP_ID = test_ship_ID(input[i].SHIP_ID);
		tmpResult.SHIPMENT_MONTH = test_ship_month(input[i].SHIPMENT_MONTH);		
		tmpResult.SHIPMT_DAY = test_ship_day(input[i].SHIPMT_DAY);
		tmpResult.NAICS = test_naics(input[i].NAICS);
		
		tmpResult.TEMPERATURE_CONTROL_YN = test_temp_control(input[i].TEMPERATURE_CONTROL_YN);
		tmpResult.DOMESTIC_TRANSPORT_MODE = test_mode(input[i].DOMESTIC_TRANSPORT_MODE);
		tmpResult.DOMESTIC_STATE_ABBREV = test_destinationState(input[i].DOMESTIC_STATE_ABBREV);
		tmpResult.SHIPMENT_WEIGHT = test_ship_weight(input[i].SHIPMENT_WEIGHT,input[i].DOMESTIC_TRANSPORT_MODE,input[i].NAICS,tmpResult);
		tmpResult.SHIPMENT_VALUE = test_ship_value(input[i].SHIPMENT_VALUE);
		tmpResult.SCTG_COMMODITY_CODE = test_sctg(input[i].SCTG_COMMODITY_CODE,input[i].SHIPMENT_VALUE,input[i].SHIPMENT_WEIGHT,input[i].DOMESTIC_TRANSPORT_MODE,input[i].TEMPERATURE_CONTROL_YN,input[i].NAICS,input[i].DOMESTIC_STATE_ABBREV,tmpResult);
				
		tmpResult.COMMODITY_DESCRIPTION = test_sctg_descr(input[i].COMMODITY_DESCRIPTION);
		tmpResult.HAZMAT_CODE = test_unna(input[i].HAZMAT_CODE,input[i].SCTG_COMMODITY_CODE,tmpResult);
		tmpResult.DOMESTIC_CITY_NAME = test_destinationCity(input[i].DOMESTIC_CITY_NAME);
		tmpResult.DOMESTIC_ZIP_CODE = test_destinationZip(input[i].DOMESTIC_ZIP_CODE,input[i].DOMESTIC_STATE_ABBREV,input[i].DOMESTIC_CITY_NAME,tmpResult);
		tmpResult.EXPORT_CITY_NAME = test_exportCity(input[i].EXPORT_CITY_NAME);
		tmpResult.EXPORT_COUNTRY_NAME = test_exportCountry(input[i].EXPORT_COUNTRY_NAME,input[i].EXPORT_CITY_NAME,tmpResult);
		tmpResult.EXPORT_TRANSPORT_MODE = test_exportMode(input[i].EXPORT_TRANSPORT_MODE,input[i].EXPORT_COUNTRY_NAME,tmpResult);
		result.push(tmpResult);
	}
	result.push(test_auto_fill_m(input));	
	return result;
}

function test_numberOfShip(shipNum,nos){
	var result = new Object();
	var error;
	var interval;
	var required;
	var reqRatio = (required-nos)/required;
	var difReNos = Math.abs(required- nos);
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(shipNum)){
		error = "S30_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		if (nos == 0){	
			error = "E1_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		} 
		if (nos > 0){ //FIXME: input is a local variable - not valid here. pass a parameter 'nos' to this function instead 
		error = "E1_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		}
	}
	else {
		if (!check_allowed_char(shipNum, "numeric", "conf1")){ 
			error = "S30_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}		
		if (!range_val_check(shipNum, "tot_ship_week", "conf1")){ 
			error = "E8_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}		
		if (shipNum == 0 && nos > 0){ 
			error = "E1_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (shipNum > 0 && nos == 0){ 
			error = "E1_3";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!range_val_check(shipNum, "tot_ship_week", "conf1") && nos > 0){ 
			error = "E1_5";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (shipNum != 0 ){
			if (range_val_check(shipNum, "interval1", "conf1")){
				interval = Math.ceil(parseInt(shipNum/conf1.interval1.sample_rate))
			}
			else if (range_val_check(shipNum, "interval2", "conf1")){
				interval = 5 * Math.ceil(parseInt(shipNum/shipNum/conf1.interval2.sample_rate))
			}
			else if (range_val_check(shipNum, "interval3", "conf1")){
				interval = 10 * Math.ceil(parseInt(shipNum/shipNum/conf1.interval3.sample_rate))
			}
			else if (range_val_check(shipNum, "interval4", "conf1")){
				interval = 10 * Math.ceil(parseInt(shipNum/shipNum/conf1.interval4.sample_rate))
			}
			else if (range_val_check(shipNum, "interval5", "conf1")){
				interval = 20 * Math.ceil(parseInt(shipNum/shipNum/conf1.interval5.sample_rate))
			}
			else if (range_val_check(shipNum, "interval6", "conf1")){
				interval = 20 * Math.ceil(parseInt(shipNum/shipNum/conf1.interval6.sample_rate))
			}
			else if (range_val_check(shipNum, "interval7", "conf1")){
				interval = 50 * Math.ceil(parseInt(shipNum/shipNum/conf1.interval7.sample_rate))
			}
			else if (range_val_check(shipNum, "interval8", "conf1")){
				interval = 100 * Math.ceil(parseInt(shipNum/shipNum/conf1.interval8.sample_rate))
			}
			required = Math.floor(shipNum/interval);
			if (!range_val_check(required, "requiredCase1", "conf1") && !range_val_check(reqRatio,"requiredRatio", "conf1")){
				error = "E2_1";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
			else if (!range_val_check(required, "requiredCase2", "conf1") && !range_val_check(difReNos, "difReNos", "conf1")){
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

function MOS_vs_ATV(ATV, MOS, estbWeight, evalres){
	var result = new Object();;
	var error;	
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	//TODO ATV and MOS must be converted to numbers, and checked if they are valid (presence, numeric, range, etc.)// added presence and allowed functions
	//FIXME hard coded numbers must be moved to config // removed hard codes and added in config
	if (evalres.ATV.valid && evalres.MOS.valid){
		var dif= Math.abs(ATV-MOS);
		var ratio = 0;
		if (ATV > 0){
			ratio = MOS/ATV;
		}
		if (!range_val_check(dif, "dif", "ATV_MOS_case1") && (ATV==0 ||!range_val_check(ratio, "ratio", "ATV_MOS_case1"))){
			error = "E3_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		} else if ((!range_val_check(dif, "dif", "ATV_MOS_case2") || !range_val_check(estbWeight, "estabWeight", "ATV_MOS_case2")) && ( ATV==0 || !range_val_check(ratio, "ratio", "ATV_MOS_case2"))){
			error = "E3_2";
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

function test_totShipValue(totShipVal, totValWeek, ATV, estbWeight, evalres){
	var result = new Object();
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
		if (!check_allowed_char(totShipVal, "numeric", "conf1")){
			error = "S31_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!range_val_check(totShipVal, "totShipValue", "conf1")){
			error = "S31_20";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
	}
	if (evalres.ATV.valid){
		var eav = (totValWeek/1000)*52;//eav stands for Estimated Annual Value
		var dif= Math.abs(ATV-tvw);
		var ratio = 0;
		if (ATV > 0){
			ratio = eav/ATV;
		}
		if (!range_val_check(dif, "dif", "ATV_MOS_case1") && (ATV==0 ||!range_val_check(ratio, "ratio", "ATV_MOS_case1"))){
			error = "E9_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if ((!range_val_check(dif, "dif", "ATV_MOS_case2") || !range_val_check(estbWeight, "estabWeight", "ATV_MOS_case2")) && ( ATV==0 || !range_val_check(ratio, "ratio", "ATV_MOS_case2"))){
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
	else if (!lkup_linear("lkup25", input.toUpperCase())){
		error = "S32_5";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	}
	//TODO check valid inputs Y and N similar to temp control field
	//Added the flag S32-5 and updated flags.js 
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
	} else if (!check_allowed_char(input, "alphanumeric", "conf1")){
			error = "S33_1";
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

function test_ship_month(input){
	var result = new Object();
	var error;
	result.valid = true;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S14_5";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else {
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S34_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!range_val_check(input, "ship_date_month", "conf1")){
			error = "S34_20";
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

function test_ship_quarter(ship_month, quarter, evalres){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(quarter)){
		error = "S52_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else {
		if (!check_allowed_char(quarter, "numeric", "conf1")){
			error = "S52_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!range_val_check(quarter, "ship_date_quarter", "conf1")){
			error = "S52_20";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
	}
	if (evalres.SHIPMENT_MONTH.valid){
		var q = parseInt((parseInt(ship_month)-1)/3)+1;
		if (quarter !=q){
			switch (q){
				case 1:
					error = "S14_1";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
					break;
				case 2:
					error = "S14_2";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
					break;
				case 3:
					error = "S14_3";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
					break;
				case 4:
					error = "S14_4";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
					break;		
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
		if (!range_val_check(weight, "ship_weight_c1", "conf1")){
			error = "S6_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
		}
		// FIXME add range cheack for weight: weights must be >0
	//Updated the config
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
						if (range_val_check(weight, "ship_weight_c2", "conf1")){//Removed the hard-coded number
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

function test_sctg(sctg, value, weight, mode, temp, naics, state, evalres){
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
		temp = temp.toUpperCase();
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
		if (!range_val_check(sctg, "sctg", "conf1")){//Added for checking the range of sctg 
			error = "S38_20";
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
			if (evalres.SHIPMENT_VALUE.valid && evalres.SHIPMENT_WEIGHT.valid){
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
			if (evalres.DOMESTIC_TRANSPORT_MODE.valid && evalres.SHIPMENT_WEIGHT.valid && evalres.DOMESTIC_STATE_ABBREV.valid){
				if (!range_val_check(weight, "sctg_m1_weight", "conf1")){
					if (check_char("lkup27", mode)){ 
						if (lkup_linear("lkup7", sctg.substr(0,2))){ //FIXME hard-coded numbers must be moved to config
							error = "S4_2";
							result.flagname.push((flags)[error].name);
							result.flags.push((flags)[error].flag);
							result.flagval.push((flags)[error].value);
							result.flagmsg.push((flags)[error].msg);
						} else if (lkup_linear("lkup8", sctg.substr(0,2)) && state != "AK"){
								error = "S4_2";
								result.flagname.push((flags)[error].name);
								result.flags.push((flags)[error].flag);
								result.flagval.push((flags)[error].value);
								result.flagmsg.push((flags)[error].msg);
						}
					}
				}
				if (!range_val_check(weight, "sctg_m8_weight", "conf1")){ 
					if (check_char("lkup28", mode)){
						if (lkup_linear("lkup7", sctg.substr(0,2))){
							error = "S4_3";
							result.flagname.push((flags)[error].name);
							result.flags.push((flags)[error].flag);
							result.flagval.push((flags)[error].value);
							result.flagmsg.push((flags)[error].msg);
						}
						else if (lkup_linear("lkup8", sctg.substr(0,2)) && state != "AK"){
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
				if (temp == "Y"){
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
				if (temp == "N" && lkup_linear("lkup11", sctg)){	
					error = "S12_3";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
				if (evalres.DOMESTIC_TRANSPORT_MODE.valid){
					if (temp == "Y" && mode == "7"){	
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

function test_temp_control(input){
	var result = new Object();
	var error;	
	result.valid = true;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
			error = "S11_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
	} else if (!lkup_linear("lkup25", input.toUpperCase())){
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
	if (presence_check(unna)){		
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
		if (!range_val_check(unna, "unna", "conf1")){//Added for checking the range of Hazmat code.
			error = "S40_20";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
		}
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
		input = input.toUpperCase();
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
		if (!lkup_linear("lkup32",input)){
			error = "S42_22";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}// TODO: add a flag for invalid state and update 		
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
				if (!matchObj(test1, test2, "zip")){// performed only if zip and state are valid
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

function test_mode(input){
	var result = new Object();
	var error;
	result.valid = true;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S2_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		result.valid = false;
	} else if (!check_allowed_char(input, "numeric", "conf1")){
		error = "S2_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		result.valid = false;
	} else if (!field_length_check(input, "mode", "conf1")){
		error = "S44_4";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		result.valid = false;
	} else {
		if (!lkup_linear("lkup3", input)){
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
		error = "S45_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else if (!lkup_linear("lkup25", input.toUpperCase())){
		error = "S45_5";
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
	result.valid = true;
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

function test_exportCountry(country, city, evalres){
	var result = new Object();
	var error;
	result.valid = true;	
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(country)){
		error = "S47_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		result.valid = false
	} else if (!check_allowed_char(country, "alphabetic", "conf1")){
		error = "S47_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		result.valid = false
	} else {
		country = country.toUpperCase();
		if (evalres.EXPORT_CITY_NAME.valid){
			if (country == "CANADA"){
				if (!lkup_linear("lkup14", city)){
					error = "S17_1";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			}	
			else if (country == "MEXICO"){
				if (!lkup_linear("lkup15", city)){
					error = "S17_1";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			}
		}	
		if (!lkup_linear("lkup16", country)){
			error = "S17_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false
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

function test_exportMode(exp_mode, country, evalres){
	var result = new Object();
	var error;	
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(exp_mode)){
		error = "S48_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else if (!check_allowed_char(exp_mode, "numeric", "conf1")){
		error = "S48_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else {
		if (evalres.EXPORT_COUNTRY_NAME.valid){
			country = country.toUpperCase();
			if ((!lkup_linear("lkup33", country)) && (lkup_linear("lkup29", exp_mode))){//Used lookup table instead of name of countries also logical operator AND is used.
				error = "S16_1";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}	
		}
	}	
	if (result.flags.length>0){
		result.pass = false;
	}else {
		result.pass = true;
	}
	return result;
}

function test_auto_fill_m(input){ //TODO: add a new flag if number of reported shipments is <2
	var result = new Object();
	var error;
	var count = 0;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	var failed_attribs = [];
	if (!auto_fill(input, "SHIPMENT_VALUE")){
		count ++;
		failed_attribs.push("SHIPMENT_VALUE");
	}
	if (!auto_fill(input, "SHIPMENT_WEIGHT")){
		count ++;
		failed_attribs.push("SHIPMENT_WEIGHT");
	}
	if (!auto_fill(input, "SCTG_COMMODITY_CODE")){
		count ++;
		failed_attribs.push("SCTG_COMMODITY_CODE");
	}
	if (!auto_fill(input, "DOMESTIC_TRANSPORT_MODE")){
		count ++;
		failed_attribs.push("DOMESTIC_TRANSPORT_MODE");
	}
	if (!auto_fill(input, "HAZMAT_CODE")){
		count ++;
		failed_attribs.push("HAZMAT_CODE");
	}
	if (!auto_fill(input, "DOMESTIC_ZIP_CODE")){
		count ++;
		failed_attribs.push("DOMESTIC_ZIP_CODE");
	}		
	if (count > 0){
		error = "S15";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagmsg.push((flags)[error].msg+failed_attribs.join(';'));
		result.flagval.push(count);
	}
	if (result.flags.length>0){
		result.pass = false;
	}else {
		result.pass = true;
	}
		return result;
}

function test_naics(input){
	var result = new Object();
	var error;
	result.valid = true;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S49_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		result.valid = false;
	} else {
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S49_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
		}	
		if (!field_length_check(input, "naics", "conf1")){
			error = "S49_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
		}	
		if (!range_val_check(input, "naics", "conf1")){
			error = "S49_20";
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

function test_MOS(input){
	var result = new Object();
	var error;
	result.valid = true;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S50_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		result.valid = false;
	} else if (!check_allowed_char(input, "numeric", "conf1")){
		error = "S50_1";
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

function test_ATV(input){
	var result = new Object();
	var error;
	result.valid = true;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S51_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		result.valid = false;
	} else {
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S51_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
		}
		if (!range_val_check(input, "atv", "conf1")){
			error = "S51_20";
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
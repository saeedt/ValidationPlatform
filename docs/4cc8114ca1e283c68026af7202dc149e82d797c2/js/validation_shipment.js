//main function
function verify_shipment(input){
	var Result =  [];
	var tmp;
	var evalres;
	//TODO implement test_naic function : presence check and field validation
	//tmpResult.NAICS = test_naics(NAICS);
	for (var i=0; i<input.length; i++){		
		evalres = new Object();		
		tmp = test_numberOfShip(input[i].SHIP_NUM,input.length,i+1);
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}			
		tmp = test_ship_ID(input[i].SHIP_ID,i+1);
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}
		tmp = test_ship_month(input[i].SHIPMENT_MONTH,i+1);	
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}
		tmp = test_ship_day(input[i].SHIPMT_DAY,i+1);
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}
		tmp = test_naics(input[i].NAICS,i+1);
		evalres.NAICS = new Object();
		evalres.NAICS.valid = tmp.valid;
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}		
		tmp = test_temp_control(input[i].TEMPERATURE_CONTROL_YN,i+1);
		evalres.TEMPERATURE_CONTROL_YN = new Object();
		evalres.TEMPERATURE_CONTROL_YN.valid = tmp.valid;
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}
		tmp = test_mode(input[i].DOMESTIC_TRANSPORT_MODE,i+1);
		evalres.DOMESTIC_TRANSPORT_MODE = new Object();
		evalres.DOMESTIC_TRANSPORT_MODE.valid = tmp.valid;
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}
		tmp = test_destinationState(input[i].DOMESTIC_STATE_ABBREV,i+1);
		evalres.DOMESTIC_STATE_ABBREV = new Object();
		evalres.DOMESTIC_STATE_ABBREV.valid = tmp.valid;
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}
		tmp = test_ship_weight(input[i].SHIPMENT_WEIGHT,input[i].DOMESTIC_TRANSPORT_MODE,input[i].NAICS,evalres,i+1);
		evalres.SHIPMENT_WEIGHT = new Object();
		evalres.SHIPMENT_WEIGHT.valid = tmp.valid
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}
		tmp = test_ship_value(input[i].SHIPMENT_VALUE,i+1);
		evalres.SHIPMENT_VALUE = new Object();
		evalres.SHIPMENT_VALUE.valid = tmp.valid;
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}
		tmp = test_sctg(input[i].SCTG_COMMODITY_CODE,input[i].SHIPMENT_VALUE,input[i].SHIPMENT_WEIGHT,input[i].DOMESTIC_TRANSPORT_MODE,input[i].TEMPERATURE_CONTROL_YN,input[i].NAICS,input[i].DOMESTIC_STATE_ABBREV,evalres,i+1);
		evalres.SCTG_COMMODITY_CODE = new Object();
		evalres.SCTG_COMMODITY_CODE.valid = tmp.valid;
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}		
		tmp = test_sctg_descr(input[i].COMMODITY_DESCRIPTION,i+1);
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}
		tmp = test_unna(input[i].HAZMAT_CODE,input[i].SCTG_COMMODITY_CODE,evalres,i+1);
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}
		tmp = test_destinationCity(input[i].DOMESTIC_CITY_NAME,i+1);
		evalres.DOMESTIC_CITY_NAME = new Object();
		evalres.DOMESTIC_CITY_NAME.valid = tmp.valid;
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}
		tmp = test_destinationZip(input[i].DOMESTIC_ZIP_CODE,input[i].DOMESTIC_STATE_ABBREV,input[i].DOMESTIC_CITY_NAME,evalres,i+1);
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}
		tmp = test_exportCity(input[i].EXPORT_CITY_NAME,i+1);
		evalres.EXPORT_CITY_NAME = new Object();
		evalres.EXPORT_CITY_NAME.valid = tmp.valid;
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}		
		tmp = test_exportCountry(input[i].EXPORT_COUNTRY_NAME,input[i].EXPORT_CITY_NAME,evalres,i+1);
		evalres.EXPORT_COUNTRY_NAME = new Object();
		evalres.EXPORT_COUNTRY_NAME.valid = tmp.valid;
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}
		tmp = test_exportMode(input[i].EXPORT_TRANSPORT_MODE,input[i].EXPORT_COUNTRY_NAME,evalres,i+1);
		if (!tmp.pass){
			Result = Result.concat(tmp.errors);
		}		
	}
	tmp = test_auto_fill_m(input,'NA');
	if (!tmp.pass){
		Result = Result.concat(tmp.errors);
	}		
	return Result;
}

function test_numberOfShip(shipNum,nos,line){
	var result = new Object();
	var tmp = new Object();
	var errors = [];
	var error;
	var interval;
	var required;
	var reqRatio = (required-nos)/required;
	var difReNos = Math.abs(required- nos);	
	if (!presence_check(shipNum)){
		error = "S30_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag= (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
		if (nos == 0){	
			error = "E1_4";
			tmp.line = line;
			tmp.flagname.push((flags)[error].name);
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		} 
		if (nos > 0){ //FIXME: input is a local variable - not valid here. pass a parameter 'nos' to this function instead 
		error = "E1_1";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
		}
	}
	else {
		if (!check_allowed_char(shipNum, "numeric", "conf1")){ 
			error = "S30_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}		
		if (!range_val_check(shipNum, "tot_ship_week", "conf1")){ 
			error = "E8_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}		
		if (shipNum == 0 && nos > 0){ 
			error = "E1_2";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}
		if (shipNum > 0 && nos == 0){ 
			error = "E1_3";
			tmp.line = line;
			tmp.flagname.push((flags)[error].name);
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}
		if (!range_val_check(shipNum, "tot_ship_week", "conf1") && nos > 0){ 
			error = "E1_5";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
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
				tmp.line = line;
				tmp.flagname = (flags)[error].name;
				tmp.flag = (flags)[error].flag;
				tmp.flagval = (flags)[error].value;
				tmp.flagmsg = (flags)[error].msg;
				errors.push(tmp);
			}
			else if (!range_val_check(required, "requiredCase2", "conf1") && !range_val_check(difReNos, "difReNos", "conf1")){
				error = "E2_2";
				tmp.line = line;
				tmp.flagname = (flags)[error].name;
				tmp.flag = (flags)[error].flag;
				tmp.flagval = (flags)[error].value;
				tmp.flagmsg = (flags)[error].msg;
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

function MOS_vs_ATV(ATV, MOS, estbWeight, evalres,line){
	var result = new Object();;
	var error;
	var tmp = new Object();
	var errors = [];	
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
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		} else if ((!range_val_check(dif, "dif", "ATV_MOS_case2") || !range_val_check(estbWeight, "estabWeight", "ATV_MOS_case2")) && ( ATV==0 || !range_val_check(ratio, "ratio", "ATV_MOS_case2"))){
			error = "E3_2";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
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

function test_totShipValue(totShipVal, totValWeek, ATV, estbWeight, evalres,line){
	var result = new Object();
	var error;
	var tmp = new Object();
	var errors = [];
	if (!presence_check(totShipVal)){
		error = "S31_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	} else {
		if (!check_allowed_char(totShipVal, "numeric", "conf1")){
			error = "S31_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}
		if (!range_val_check(totShipVal, "totShipValue", "conf1")){
			error = "S31_20";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
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
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}
		if ((!range_val_check(dif, "dif", "ATV_MOS_case2") || !range_val_check(estbWeight, "estabWeight", "ATV_MOS_case2")) && ( ATV==0 || !range_val_check(ratio, "ratio", "ATV_MOS_case2"))){
			error = "E9_2";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
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

function test_moreThan40Ship(input,line){
	var result = new Object();
	var error;	
	var tmp = new Object();
	var errors = [];
	if (!presence_check(input)){
		error = "S32_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	}
	else if (!lkup_linear("lkup25", input.toUpperCase())){
		error = "S32_5";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	}
	//TODO check valid inputs Y and N similar to temp control field
	//Added the flag S32-5 and updated flags.js 
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	} else {
		result.pass = true;
	}
	return result;
}

function test_ship_ID(input,line){
	var result = new Object();
	var error;
	var tmp = new Object();
	var errors = [];
	if (!presence_check(input)){
		error = "S33_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	} else if (!check_allowed_char(input, "alphanumeric", "conf1")){
			error = "S33_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;	
			errors.push(tmp);
	}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	} else {
		result.pass = true;
	}
	return result;
}

function test_ship_month(input,line){
	var result = new Object();
	var error;
	result.valid = true;
	var tmp = new Object();
	var errors = [];
	if (!presence_check(input)){
		error = "S14_5";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	} else {
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S34_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}
		if (!range_val_check(input, "ship_date_month", "conf1")){
			error = "S34_20";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
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

function test_ship_quarter(ship_month, quarter, evalres,line){
	var result = new Object();
	var error;
	var tmp = new Object();
	var errors = [];
	if (!presence_check(quarter)){
		error = "S52_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	} else {
		if (!check_allowed_char(quarter, "numeric", "conf1")){
			error = "S52_1";
			tmp.line = line;
			tmp.flagname.push((flags)[error].name);
			tmp.flag.push((flags)[error].flag);
			tmp.flagval.push((flags)[error].value);
			tmp.flagmsg.push((flags)[error].msg);
			errors.push(tmp);
		}
		if (!range_val_check(quarter, "ship_date_quarter", "conf1")){
			error = "S52_20";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}
	}
	if (evalres.SHIPMENT_MONTH.valid){
		var q = parseInt((parseInt(ship_month)-1)/3)+1;
		if (quarter !=q){
			switch (q){
				case 1:
					error = "S14_1";
					tmp.line = line;
					tmp.flagname = (flags)[error].name;
					tmp.flag = (flags)[error].flag;
					tmp.flagval = (flags)[error].value;
					tmp.flagmsg = (flags)[error].msg;
					errors.push(tmp);
					break;
				case 2:
					error = "S14_2";
					tmp.line = line;
					tmp.flagname = (flags)[error].name;
					tmp.flag = (flags)[error].flag;
					tmp.flagval = (flags)[error].value;
					tmp.flagmsg = (flags)[error].msg;
					errors.push(tmp);
					break;
				case 3:
					error = "S14_3";
					tmp.line = line;
					tmp.flagname = (flags)[error].name;
					tmp.flag = (flags)[error].flag;
					tmp.flagval = (flags)[error].value;
					tmp.flagmsg = (flags)[error].msg;
					errors.push(tmp);
					break;
				case 4:
					error = "S14_4";
					tmp.line = line;
					tmp.flagname = (flags)[error].name;
					tmp.flag = (flags)[error].flag;
					tmp.flagval = (flags)[error].value;
					tmp.flagmsg = (flags)[error].msg;
					errors.push(tmp);
					break;		
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


function test_ship_day(input,line){
	var result = new Object();
	var error;
	var tmp = new Object();
	var errors = [];
	if (!presence_check(input)){
		error = "S35_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	} else {
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S35_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}
		if (!range_val_check(input, "ship_date_day", "conf1")){
			error = "S35_20";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
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

function test_ship_value(input,line){
	var result = new Object();
	var error;
	result.valid = true;
	var tmp = new Object();
	var errors = [];
	if (!presence_check(input)){
		error = "S5_1";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	} else {
		if (!range_val_check(input, "ship_value", "conf1")){
			error = "S5_2";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S36_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
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

function test_ship_weight(weight, mode, naics, evalres,line){
	var result = new Object();
	var error;	
	result.valid = true;
	var tmp = new Object();
	var errors = [];	
	if (!presence_check(weight)){
		error = "S6_1";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
		result.valid = false;
	} else {
		if (!check_allowed_char(weight, "numeric", "conf1")){
			error = "S37_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false;
		}
		if (!range_val_check(weight, "ship_weight_c1", "conf1")){
			error = "S6_2";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false;
		}
		// FIXME add range cheack for weight: weights must be >0
	//Updated the config
	}
	if (!errors.length>0){
		if (evalres.DOMESTIC_TRANSPORT_MODE.valid){ //cross consistency checks are performed if all participating variables are valid
			var lkup_result = lkup_binary_m("lkup20","mode", mode);
			if (lkup_result.found){ // all numeric inputs must be casted to a numeric types before any numeric operation like division, multiplication, summation, subtraction or comparison is performed 			
				if (lkup_result.data[0].maxWeight <= parseFloat(weight)) {
					error = "S7_1";
					tmp.line = line;
					tmp.flagname = (flags)[error].name;
					tmp.flag = (flags)[error].flag;
					tmp.flagval = (flags)[error].value;
					tmp.flagmsg = (flags)[error].msg;
					errors.push(tmp);
				}	
				if (lkup_result.data[0].minWeight >= parseFlaot(weight)){
					error = "S7_2";
					tmp.line = line;
					tmp.flagname = (flags)[error].name;
					tmp.flag = (flags)[error].flag;
					tmp.flagval = (flags)[error].value;
					tmp.flagmsg = (flags)[error].msg;
					errors.push(tmp);
				}
				if (evalres.NAICS.valid){
					if ((lkup_linear("lkup30",naics) && mode == "4")){
						if (range_val_check(weight, "ship_weight_c2", "conf1")){//Removed the hard-coded number
							error = "S7_2";
							tmp.line = line;
							tmp.flagname = (flags)[error].name;
							tmp.flag = (flags)[error].flag;
							tmp.flagval = (flags)[error].value;
							tmp.flagmsg = (flags)[error].msg;
							errors.push(tmp);
							}
						}
					}
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

function test_sctg(sctg, value, weight, mode, temp, naics, state, evalres,line){
	var result = new Object();
	result.valid = true;	
	var tmp = new Object();
	var errors = [];
	var error;
	if (!presence_check(sctg)){ //presence check is always performed first
		error = "S3_1";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
		result.valid = false;
	} else {
		temp = temp.toUpperCase();
		if (!check_allowed_char(sctg, "numeric", "conf1")){ // the other field validation checks are performed if the presence check returns true
			error = "S38_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			tmp.valid = false;
		}
		if (!field_length_check(sctg, "sctg", "conf1")){
			error = "S38_4";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false;
		}
		if (!range_val_check(sctg, "sctg", "conf1")){//Added for checking the range of sctg 
			error = "S38_20";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false;
		}
	}
	if (!errors.length>0){ //lookups and cross checks can only be performed if the presence and field validation checks return true
		//SCTG, value, weight
		var lkup_result1 = lkup_binary_m("lkup1","sctg", sctg);		
		if (lkup_result1.found){ // vw ratio tests and sctg substring checks are performed if sctg is valid 
			// value to weight ratio tests are only performed if value and weight have passed presence and filed validation tests, otherwise the division is not possible
			if (evalres.SHIPMENT_VALUE.valid && evalres.SHIPMENT_WEIGHT.valid){
				var vw_ratio = parseFloat(value)*1.0/parseFloat(weight);
				if (lkup_linear("lkup18", sctg.substr(0,2))){					
					if (lkup_result1.data[0].vw_lb > vw_ratio){
						error = "S8_1";
						tmp.line = line;
						tmp.flagname = (flags)[error].name;
						tmp.flag = (flags)[error].flag;
						tmp.flagval = (flags)[error].value;
						tmp.flagmsg = (flags)[error].msg;
						errors.push(tmp);
					}	
					if (lkup_result1.data[0].vw_ub < vw_ratio){	
						error = "S8_2";
						tmp.line = line;
						tmp.flagname = (flags)[error].name;
						tmp.flag = (flags)[error].flag;
						tmp.flagval = (flags)[error].value;
						tmp.flagmsg = (flags)[error].msg;
						errors.push(tmp);
					} 
				 } 
				else if (lkup_linear("lkup19", sctg.substr(0,2))){
					if (lkup_result1.data[0].vw_lb > vw_ratio){			
						error = "S8_3";
						tmp.line = line;
						tmp.flagname = (flags)[error].name;
						tmp.flag = (flags)[error].flag;
						tmp.flagval = (flags)[error].value;
						tmp.flagmsg = (flags)[error].msg;
						errors.push(tmp);
					}	
					if (lkup_result1.data[0].vw_ub < vw_ratio){		
						error = "S8_4";
						tmp.line = line;
						tmp.flagname = (flags)[error].name;
						tmp.flag = (flags)[error].flag;
						tmp.flagval = (flags)[error].value;
						tmp.flagmsg = (flags)[error].msg;
						errors.push(tmp);
					}
				} else {
					if (lkup_result1.data[0].vw_lb > vw_ratio){	
						error = "S8_5";
						tmp.line = line;
						tmp.flagname = (flags)[error].name;
						tmp.flag = (flags)[error].flag;
						tmp.flagval = (flags)[error].value;
						tmp.flagmsg = (flags)[error].msg;
						errors.push(tmp);
					}
					if (lkup_result1.data[0].vw_lb < vw_ratio){	
						error = "S8_6";
						tmp.line = line;
						tmp.flagname = (flags)[error].name;
						tmp.flag = (flags)[error].flag;
						tmp.flagval = (flags)[error].value;
						tmp.flagmsg = (flags)[error].msg;
						errors.push(tmp);
					}
				}
			}			
			if (sctg.substr(0,2) == "16"){ // updated this according to the spec sheet - this test does not check the validity of the sctg, it just checks if it starts with 16
				error = "S3_3";
				tmp.line = line;
				tmp.flagname = (flags)[error].name;
				tmp.flag = (flags)[error].flag;
				tmp.flagval = (flags)[error].value;
				tmp.flagmsg = (flags)[error].msg;
				errors.push(tmp);
			}
			// SCTG & NAICS
			if (eavlres.NAICS.valid) {
				var lkup_result2 = lkup_binary_m("lkup17","partial_naics", naics);			
				if (lkup_result2.found){
					if (lkup_result2.data[0].sctg_2digit == sctg.substr(0,2)){
						if(lkup_result2.data[0].flag_value == "0"){
							error = "S10_0";
							tmp.line = line;
							tmp.flagname = (flags)[error].name;
							tmp.flag = (flags)[error].flag;
							tmp.flagval = (flags)[error].value;
							tmp.flagmsg = (flags)[error].msg;
							errors.push(tmp);
						}
						if (lkup_result2.data[0].flag_value == "1"){
							error = "S10_1";
							tmp.line = line;
							tmp.flagname = (flags)[error].name;
							tmp.flag = (flags)[error].flag;
							tmp.flagval = (flags)[error].value;
							tmp.flagmsg = (flags)[error].msg;
							errors.push(tmp);
						}
						if (lkup_result2.data[0].flag_value == "2"){
							error = "S10_2";
							tmp.line = line;
							tmp.flagname = (flags)[error].name;
							tmp.flag = (flags)[error].flag;
							tmp.flagval = (flags)[error].value;
							tmp.flagmsg = (flags)[error].msg;
							errors.push(tmp);
						}
						if (lkup_result2.data[0].flag_value == "3"){
							error = "S10_3";
							tmp.line = line;
							tmp.flagname = (flags)[error].name;
							tmp.flag = (flags)[error].flag;
							tmp.flagval = (flags)[error].value;
							tmp.flagmsg = (flags)[error].msg;
							errors.push(tmp);
						}
					}
				}
			}
			//SCTG & Mode
			if (evalres.DOMESTIC_TRANSPORT_MODE.valid){
				if (!lkup_linear("lkup6", sctg.substr(0,2))){
					if (check_char("lkup26", mode)){ 
						error = "S4_1";
						tmp.line = line;
						tmp.flagname = (flags)[error].name;
						tmp.flag = (flags)[error].flag;
						tmp.flagval = (flags)[error].value;
						tmp.flagmsg = (flags)[error].msg;
						errors.push(tmp);
					}
				}
			}
			//SCTG, mode, weight
			if (evalres.DOMESTIC_TRANSPORT_MODE.valid && evalres.SHIPMENT_WEIGHT.valid && evalres.DOMESTIC_STATE_ABBREV.valid){
				if (!range_val_check(weight, "sctg_m1_weight", "conf1")){
					if (check_char("lkup27", mode)){ 
						if (lkup_linear("lkup7", sctg.substr(0,2))){ //FIXME hard-coded numbers must be moved to config
							error = "S4_2";
							tmp.line = line;
							tmp.flagname = (flags)[error].name;
							tmp.flag = (flags)[error].flag;
							tmp.flagval = (flags)[error].value;
							tmp.flagmsg = (flags)[error].msg;
							errors.push(tmp);
						} else if (lkup_linear("lkup8", sctg.substr(0,2)) && state != "AK"){
								error = "S4_2";
								tmp.line = line;
								tmp.flagname = (flags)[error].name;
								tmp.flag = (flags)[error].flag;
								tmp.flagval = (flags)[error].value;
								tmp.flagmsg = (flags)[error].msg;
								errors.push(tmp);
						}
					}
				}
				if (!range_val_check(weight, "sctg_m8_weight", "conf1")){ 
					if (check_char("lkup28", mode)){
						if (lkup_linear("lkup7", sctg.substr(0,2))){
							error = "S4_3";
							tmp.line = line;
							tmp.flagname = (flags)[error].name;
							tmp.flag = (flags)[error].flag;
							tmp.flagval = (flags)[error].value;
							tmp.flagmsg = (flags)[error].msg;
							errors.push(tmp);
						}
						else if (lkup_linear("lkup8", sctg.substr(0,2)) && state != "AK"){
								error = "S4_3";
								tmp.line = line;
								tmp.flagname = (flags)[error].name;
								tmp.flag = (flags)[error].flag;
								tmp.flagval = (flags)[error].value;
								tmp.flagmsg = (flags)[error].msg;	
								errors.push(tmp);
						}					
					}
				}
			}	
			// SCTG & Temp
			if (evalres.TEMPERATURE_CONTROL_YN.valid){
				if (temp == "Y"){
					if (lkup_linear("lkup9", sctg.substr(0,2))){ 
						error = "S12_1";
						tmp.line = line;
						tmp.flagname = (flags)[error].name;
						tmp.flag = (flags)[error].flag;
						tmp.flagval = (flags)[error].value;
						tmp.flagmsg = (flags)[error].msg;
						errors.push(tmp);
					}	
					else if (lkup_linear("lkup10", sctg.substr(0,2))){ 			
						error = "S12_2";
						tmp.line = line;
						tmp.flagname = (flags)[error].name;
						tmp.flag = (flags)[error].flag;
						tmp.flagval = (flags)[error].value;
						tmp.flagmsg = (flags)[error].msg;
						errors.push(tmp);
					}
				}
				if (temp == "N" && lkup_linear("lkup11", sctg)){	
					error = "S12_3";
					tmp.line = line;
					tmp.flagname = (flags)[error].name;
					tmp.flag = (flags)[error].flag;
					tmp.flagval = (flags)[error].value;
					tmp.flagmsg = (flags)[error].msg;
					errors.push(tmp);
				}
				if (evalres.DOMESTIC_TRANSPORT_MODE.valid){
					if (temp == "Y" && mode == "7"){	
						error = "S13_1";
						tmp.line = line;
						tmp.flagname = (flags)[error].name;
						tmp.flag = (flags)[error].flag;
						tmp.flagval = (flags)[error].value;
						tmp.flagmsg = (flags)[error].msg;
						errors.push(tmp);
					}
				}				
			}			
		} else {// if the SCTG code is not found in the lookup table
			error = "S3_2";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false;
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

function test_sctg_descr(input,line){
	var result = new Object();
	var error;
	var tmp = new Object();
	var errors = [];
	if (!presence_check(input)){
		error = "S39_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	} else if (!check_allowed_char(input, "alphanumeric", "conf1")){
		error = "S39_1";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	} else {
		result.pass = true;
	}
	return result;
}

function test_temp_control(input,line){
	var result = new Object();
	var error;	
	result.valid = true;
	var tmp = new Object();
	var errors = [];
	if (!presence_check(input)){
			error = "S11_1";
			tmp.line = line;tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false;
	} else if (!lkup_linear("lkup25", input.toUpperCase())){
			error = "S11_2";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false;
		}		
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	} else {
		result.pass = true;
	}
	return result;
}

function test_unna(unna, sctg, evalres,line){
	var result = new Object();
	var error;
	result.valid = true;
	var tmp = new Object();
	var errors = [];
	if (presence_check(unna)){		
		if (!check_allowed_char(unna, "numeric", "conf1")){
			error = "S40_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false;
		}
		if (!field_length_check(unna, "unna", "conf1")){
			error = "S40_4";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false;
		}
		if (!range_val_check(unna, "unna", "conf1")){//Added for checking the range of Hazmat code.
			error = "S40_20";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false;
		}
	}
	if (presence_check(unna)){
		if (evalres.SCTG_COMMODITY_CODE.valid){
			if (lkup_linear("lkup31", sctg)){
				//TODO lookup 31 is reserved for the UNNA/SCTG combination list			
				error = "S9_4";
				tmp.line = line;
				tmp.flagname = (flags)[error].name;
				tmp.flag = (flags)[error].flag;
				tmp.flagval = (flags)[error].value;
				tmp.flagmsg = (flags)[error].msg;
				errors.push(tmp);
			} else if (result.valid){
				if (lkup_binary_m("lkup2", "unna_code", unna).found){
				 	if (!lkup_linear("lkup13", sctg)){	
				 		error = "S9_3";
				 		tmp.line = line;
				 		tmp.flagname = (flags)[error].name;
				 		tmp.flag = (flags)[error].flag;
				 		tmp.flagval = (flags)[error].value;
				 		tmp.flagmsg = (flags)[error].msg;	
				 		errors.push(tmp);
				 	} 
				} else {
					if (!lkup_binary_m("lkup2", "unna_code", unna).found){
						error = "S9_2";
						tmp.line = line;
						tmp.flagname = (flags)[error].name;
						tmp.flag = (flags)[error].flag;
						tmp.flagval = (flags)[error].value;
						tmp.flagmsg = (flags)[error].msg;
						errors.push(tmp);
					} 
				}
			}
		}			
	} else {
		if (evalres.SCTG_COMMODITY_CODE.valid){
			if (lkup_linear("lkup12", sctg)){					
				error = "S9_1";
				tmp.line = line;
				tmp.flagname = (flags)[error].name;
				tmp.flag = (flags)[error].flag;
				tmp.flagval = (flags)[error].value;
				tmp.flagmsg = (flags)[error].msg;	
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

function test_destinationCity(input,line){
	var result = new Object();
	var error;
	result.valid = true;
	var tmp = new Object();
	var errors = [];
	if (!presence_check(input)){
		error = "S41_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	} else {
		if (!check_allowed_char(input, "alphabetic", "conf1")){
			error = "S41_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}
		if (check_invalid_char(input, "city", "conf1")){
			error = "S41_5";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
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

function test_destinationState(input,line){
	var result = new Object();
	var error;
	result.valid = true;
	var tmp = new Object();
	var errors = [];
	if (!presence_check(input)){
		error = "S42_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	} else {
		input = input.toUpperCase();
		if (!check_allowed_char(input, "alphabetic", "conf1")){
			error = "S42_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}
		if (!field_length_check(input, "state", "conf1")){
			error = "S42_4";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}	
		if (check_invalid_char(input, "state", "conf1")){
			error = "S42_5";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}
		if (!lkup_linear("lkup32",input)){
			error = "S42_22";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}// TODO: add a flag for invalid state and update 		
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

function test_destinationZip(city, state, zip, evalres,line){
	var result = new Object();
	var error;	
	var tmp = new Object();
	var errors = [];
	if (!presence_check(zip)){
		error = "S43_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	} else {
		if (!check_allowed_char(zip, "numeric", "conf1")){
			error = "S43_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}
		if (!field_length_check(zip, "zipCode5", "conf1")){
			error = "S43_4";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}
	}
	if (!errors.length >0){
		var test2 = lkup_binary_m("lkup4", "zip", zip).data;
		if (lkup_linear("lkup5", zip.substr(0,3))){
			error = "S1_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
		}
		if ((lkup_binary_m("lkup4", "zip", zip).found)){
			if (evalres.DOMESTIC_STATE_ABBREV.valid && evalres.DOMESTIC_CITY_NAME.valid){
				var test1 = {"city" : city, "state" : state, "zip" : zip };
				if (!matchObj(test1, test2, "zip")){// performed only if zip and state are valid
					error = "S1_2";
					tmp.line = line;
					tmp.flagname = flags[error].name;
					tmp.flag = flags[error].flag;
					tmp.flagval = flags[error].value;
					tmp.flagmsg = flags[error].msg;
					errors.push(tmp);
				}
			} 			
		} else {
			error = "S43_22";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
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

function test_mode(input,line){
	var result = new Object();
	var error;
	result.valid = true;
	var tmp = new Object();
	var errors = [];
	if (!presence_check(input)){
		error = "S2_1";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
		result.valid = false;
	} else if (!check_allowed_char(input, "numeric", "conf1")){
		error = "S2_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
		result.valid = false;
	} else if (!field_length_check(input, "mode", "conf1")){
		error = "S44_4";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
		result.valid = false;
	} else {
		if (!lkup_linear("lkup3", input)){
			error = "S2_3";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
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

function test_export(input,line){
	var result = new Object();
	var error;	
	var tmp = new Object();
	var errors = [];
	if (!presence_check(input)){
		error = "S45_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	} else if (!lkup_linear("lkup25", input.toUpperCase())){
		error = "S45_5";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	} else {
		result.pass = true;
	}
	return result;
}

function test_exportCity(input,line){
	var result = new Object();
	var error;
	result.valid = true;
	var tmp = new Object();
	var errors = [];
	if (!presence_check(input)){
		error = "S46_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	} else if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "S46_1";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
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

function test_exportCountry(country, city, evalres, line){
	var result = new Object();
	var error;
	result.valid = true;	
	var tmp = new Object();
	var errors = [];
	if (!presence_check(country)){
		error = "S47_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
		result.valid = false
	} else if (!check_allowed_char(country, "alphabetic", "conf1")){
		error = "S47_1";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
		result.valid = false
	} else {
		country = country.toUpperCase();
		if (evalres.EXPORT_CITY_NAME.valid){
			if (country == "CANADA"){
				if (!lkup_linear("lkup14", city)){
					error = "S17_1";
					tmp.line = line;
					tmp.flagname = (flags)[error].name;
					tmp.flag = (flags)[error].flag;
					tmp.flagval = (flags)[error].value;
					tmp.flagmsg = (flags)[error].msg;
					errors.push(tmp);
				}
			}	
			else if (country == "MEXICO"){
				if (!lkup_linear("lkup15", city)){
					error = "S17_1";
					tmp.line = line;
					tmp.flagname = (flags)[error].name;
					tmp.flag = (flags)[error].flag;
					tmp.flagval = (flags)[error].value;
					tmp.flagmsg = (flags)[error].msg;
					errors.push(tmp);
				}
			}
		}	
		if (!lkup_linear("lkup16", country)){
			error = "S17_2";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false
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

function test_exportMode(exp_mode, country, evalres, line){
	var result = new Object();
	var error;	
	var tmp = new Object();
	var errors = [];
	if (!presence_check(exp_mode)){
		error = "S48_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	} else if (!check_allowed_char(exp_mode, "numeric", "conf1")){
		error = "S48_1";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
	} else {
		if (evalres.EXPORT_COUNTRY_NAME.valid){
			country = country.toUpperCase();
			if ((!lkup_linear("lkup33", country)) && (lkup_linear("lkup29", exp_mode))){//Used lookup table instead of name of countries also logical operator AND is used.
				error = "S16_1";
				tmp.line = line;
				tmp.flagname = (flags)[error].name;
				tmp.flag = (flags)[error].flag;
				tmp.flagval = (flags)[error].value;
				tmp.flagmsg = (flags)[error].msg;
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

function test_auto_fill_m(input,line){ //TODO: add a new flag if number of reported shipments is <2
	var result = new Object();
	var error;
	var count = 0;
	var tmp = new Object();
	var errors = [];
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
		tmp.line = line;		
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagmsg = (flags)[error].msg+failed_attribs.join(';');
		tmp.flagval = count;
		errors.push(tmp);
	}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	} else {
		result.pass = true;
	}
		return result;
}

function test_naics(input,line){
	var result = new Object();
	var error;
	result.valid = true;
	var tmp = new Object();
	var errors = [];
	if (!presence_check(input)){
		error = "S49_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
		result.valid = false;
	} else {
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S49_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false;
		}	
		if (!field_length_check(input, "naics", "conf1")){
			error = "S49_4";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false;
		}	
		if (!range_val_check(input, "naics", "conf1")){
			error = "S49_20";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false;	
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

function test_MOS(input,line){
	var result = new Object();
	var error;
	result.valid = true;
	var tmp = new Object();
	var errors = [];
	if (!presence_check(input)){
		error = "S50_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
		result.valid = false;
	} else if (!check_allowed_char(input, "numeric", "conf1")){
		error = "S50_1";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
		result.valid = false;
	}
	if (errors.length>0){
		result.pass = false;
		result.errors = errors;
	} else {
		result.pass = true;
	}
	return result;
}

function test_ATV(input,line){
	var result = new Object();
	var error;
	result.valid = true;
	var tmp = new Object();
	var errors = [];
	if (!presence_check(input)){
		error = "S51_2";
		tmp.line = line;
		tmp.flagname = (flags)[error].name;
		tmp.flag = (flags)[error].flag;
		tmp.flagval = (flags)[error].value;
		tmp.flagmsg = (flags)[error].msg;
		errors.push(tmp);
		result.valid = false;
	} else {
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S51_1";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false;
		}
		if (!range_val_check(input, "atv", "conf1")){
			error = "S51_20";
			tmp.line = line;
			tmp.flagname = (flags)[error].name;
			tmp.flag = (flags)[error].flag;
			tmp.flagval = (flags)[error].value;
			tmp.flagmsg = (flags)[error].msg;
			errors.push(tmp);
			result.valid = false;
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
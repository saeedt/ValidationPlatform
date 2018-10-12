//main function
function verify_shipment(input){
	var result =  [];
	var tmpResult;		
	for (var i=0; i<input.length; i++){
		tmpResult = test_ship_ID(input[i].SHIP_NUM);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_ship_date_month(input[i].SHIPMENT_MONTH);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_ship_date_day(input[i].SHIPMT_DAY);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_ship_value(input[i].SHIPMENT_VALUE,input[i].SHIPMENT_WEIGHT,input[i].SCTG_COMMODITY_CODE);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_ship_weight(input[i].SHIPMENT_VALUE,input[i].SHIPMENT_WEIGHT,input[i].SCTG_COMMODITY_CODE,input[i].DOMESTIC_TRANSPORT_MODE);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_sctg(input[i].SCTG_COMMODITY_CODE,input[i].TEMPERATURE_CONTROL_YN,input[i].SHIPMENT_VALUE,input[i].SHIPMENT_WEIGHT,input[i].DOMESTIC_STATE_ABBREV,input[i].DOMESTIC_TRANSPORT_MODE,input[i].HAZMAT_CODE);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_sctg_descr(input[i].COMMODITY_DESCRIPTION);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_temp_control(input[i].TEMPERATURE_CONTROL_YN,input[i].SCTG_COMMODITY_CODE);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_unna(input[i].HAZMAT_CODE,input[i].SCTG_COMMODITY_CODE);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_destinationCity(input[i].DOMESTIC_CITY_NAME);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_destinationState(input[i].DOMESTIC_STATE_ABBREV);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_destinationZip(input[i].DOMESTIC_ZIP_CODE);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_mode(input[i].DOMESTIC_TRANSPORT_MODE,input[i].TEMPERATURE_CONTROL_YN,input[i].SHIPMENT_WEIGHT,input[i].SCTG_COMMODITY_CODE,input[i].DOMESTIC_STATE_ABBREV);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_exportCity(input[i].EXPORT_CITY_NAME);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_exportCountry(input[i].EXPORT_COUNTRY_NAME,input[i].EXPORT_CITY_NAME,input[i].EXPORT_TRANSPORT_MODE);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_exportCity(input[i].EXPORT_CITY_NAME);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		tmpResult = test_auto_fill_m(input[i].list,input[i].attrib);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		return result;
	}	
	return result;
}

function test_numberOfShip(shipNum, nos){
	var result = new Object();;
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	var interval;
	var required;
 	var reqRatio = (required-nos)/required;
 	var difReNos = Math.abs(required- nos);
	if (!presence_check(shipNum)){
		error = "S30_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else {
		if (!check_allowed_char(shipNum, "numeric", "conf1")){ 
			error = "S30_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}//Added the edit flag for checking the data type of numberOfShip also I deleted the S30_20 flag since the range is checked in E8_1
		if (!presence_check(shipNum) && range_val_check(nos, "ship_reported", "conf1")){ //FIXME: input is a local variable - not valid here. pass a parameter 'nos' to this function instead
			error = "E1_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (shipNum == 0 && range_val_check(nos, "ship_reported", "conf1")){ 
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
		if ((shipNum == 0 && nos == 0)||(!presence_check(shipNum) && nos == 0)){
			error = "E1_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!range_val_check(shipNum, "numberOfShip", "conf1") && range_val_check(nos, "ship_reported", "conf1")){ 
			error = "E1_5";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!range_val_check(shipNum, "numberOfShip", "conf1")){ 
			error = "E8_1";
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
				interval = 5 * Math.ceil(parseInt(shipNum/conf1.interval2.sample_rate))
			}
			else if (range_val_check(shipNum, "interval3", "conf1")){
				interval = 10 * Math.ceil(parseInt(shipNum/conf1.interval3.sample_rate))
			}
			else if (range_val_check(shipNum, "interval4", "conf1")){
				interval = 10 * Math.ceil(parseInt(shipNum/conf1.interval4.sample_rate))
			}
			else if (range_val_check(shipNum, "interval5", "conf1")){
				interval = 20 * Math.ceil(parseInt(shipNum/conf1.interval5.sample_rate))
			}
			else if (range_val_check(shipNum, "interval6", "conf1")){
				interval = 20 * Math.ceil(parseInt(shipNum/conf1.interval6.sample_rate))
			}
			else if (range_val_check(shipNum, "interval7", "conf1")){
				interval = 50 * Math.ceil(parseInt(shipNum/conf1.interval7.sample_rate))
			}
			else if (range_val_check(shipNum, "interval8", "conf1")){
				interval = 100 * Math.ceil(parseInt(shipNum/conf1.interval8.sample_rate))
			}
			required = Math.floor(shipNum/interval)
			if (range_val_check(required, "requiredCase1", "conf1") && range_val_check(reqRatio, "requiredRatio", "conf1")){
				error = "E2_1";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
			else if (range_val_check(required, "requiredCase2", "conf1") && range_val_check(difReNos, "difReNos", "conf1")){
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
//console.log(MOS_vs_ATV("0", "400000000", "80"));
//console.log(MOS_vs_ATV("10", "1", "801"));
function test_MOS_vs_ATV(ATV, MOS, estbWeight){
	//TODO ATV and MOS must be coverted to numbers, and checked if they are valid (presence, numeric, range, etc.)
	//FIXME hard coded numbers must be moved to config
	//Removed the hard-coded numbers
	var result = new Object();;
	var error;
	var ATV_MOS = Math.abs(ATV-MOS);
	var ratio = MOS/ATV;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = []; 
	if ((!range_val_check(ATV_MOS, "ATV_c1", "conf1")) && (!range_val_check(ATV, "ATV", "conf1")) ||((!range_val_check(ratio, "ATV_c2", "conf1")))){
				error = "E3_1";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
	}
	if ((!range_val_check(ATV_MOS, "ATV_c3", "conf1")) || (!range_val_check(estbWeight, "estbWeight", "conf1")) && ((!range_val_check(ATV, "ATV", "conf1")) || (!range_val_check(ratio, "ATV_c4", "conf1")))){
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
//console.log(test_totShipValue("50","10000","40000000","10"));
//console.log(test_totShipValue("50","10000","4000000000","10"));
//console.log(test_totShipValue("","10000","0","10"));

function test_totShipValue(totShipVal, totValWeek, ATV, estbWeight){//Removed the hard coded numbers
	var result = new Object();
	var tvw = (totValWeek/1000)*52;
	var ATV_tvw = Math.abs(ATV-tvw);
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
		if (!check_allowed_char(totShipVal, "numric", "conf1")){
			error = "S31_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}//Added the edit flag for checking the data type
		if (!range_val_check(totShipVal, "totShipValue", "conf1")){
			error = "S31_20";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if ((!range_val_check(ATV_tvw, "ATV_c1", "conf1")) && ((!range_val_check(ATV, "ATV", "conf1")) || (!range_val_check(ATV_tvw, "ATV_c2", "conf1")))){
			error = "E9_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if ((!range_val_check(ATV_tvw, "ATV_c3", "conf1")) && ((!range_val_check(ATV, "ATV", "conf1")) || (!range_val_check(ATV_tvw, "ATV_c4", "conf1")))){
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
//console.log(test_moreThan40Ship(""));
//console.log(test_moreThan40Ship("y"));
//console.log(test_moreThan40Ship("j"));
function test_moreThan40Ship(input){
	var result = new Object();
	var error;
	var input = input.toUpperCase();
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
	if (!lkup_linear("lkup25", input)){
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
//console.log(test_ship_ID("jh5"));
//console.log(test_ship_ID(""));
//console.log(test_ship_ID("5hh5###"));
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
//console.log(test_ship_month("","2"));
//console.log(test_ship_month("11s","2"));
//console.log(test_ship_month("9","1"));
//console.log(test_ship_month("8","2"));
//console.log(test_ship_month("5","4"));
//console.log(test_ship_month("","1"));
//console.log(test_ship_month("102","1"));
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

//console.log(test_ship_day("9*"));
//console.log(test_ship_day(""));
//console.log(test_ship_day("91"));
//console.log(test_ship_day("0"));
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

//console.log(test_ship_value("jj4g"));
//console.log(test_ship_value(""));
//console.log(test_ship_value("0"));
//console.log(test_ship_value("1"));
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

//console.log(test_ship_weight("0","4","33","a"));
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

//console.log(test_sctg("298","1","100","3","n","3340","A"));
//console.log(test_sctg("00012","1","100","3","n","3340","A"));
//console.log(test_sctg("50001","1","100","3","n","3340","A"));
//console.log(test_sctg("298bv","1","100","3","n","3340","A"));
//console.log(test_sctg("02200","1","100","3","n","3340","A"));
//console.log(test_sctg("","1","100","3","n","3340","A"));
//console.log(test_sctg("16001","1","100","3","n","3340","A"));
//console.log(test_sctg("16000","1","100","3","n","3340","A"));
function test_sctg(sctg, value, weight, mode, temp, naics, evalres){
	var result = new Object();
	result.valid = true;
	var temp = temp.toUpperCase();//case-insensitivity
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
				if (lkup_linear("lkup7", sctg.substr(0,2)) || lkup_linear("lkup8", sctg.substr(0,2))){ //FIXME hard-coded numbers must be moved to config
					//Added lkup 8 to check sctg codes starts with 17, 18
					if (check_char("lkup27", mode)){ 
						if ((!range_val_check(weight, "sctg_m1_weight", "conf1")) || (!range_val_check(weight, "sctg_m1_weight", "conf1")  && state != "AK")){//Removed the numbers and updated the config
							error = "S4_2";
							result.flagname.push((flags)[error].name);
							result.flags.push((flags)[error].flag);
							result.flagval.push((flags)[error].value);
							result.flagmsg.push((flags)[error].msg);
						}
					}	
					if (check_char("lkup28", mode)){ //FIXME hard-coded numbers must be moved to config
						if ((!range_val_check(weight, "sctg_m8_weight", "conf1")) || (!range_val_check(weight, "sctg_m8_weight", "conf1")  && state != "AK")){//Removed the numbers and updated the config
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
//console.log(test_sctg_descr("ahb564@#"));
//console.log(test_sctg_descr());
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

//console.log(test_temp_control(""));
//console.log(test_temp_control("Y"));
//console.log(test_temp_control("y"));
//console.log(test_temp_control("N"));
//console.log(test_temp_control("n"));
//console.log(test_temp_control("b"));
//console.log(test_temp_control("101"));
function test_temp_control(input){
	var result = new Object();
	var error;
	var input = input.toUpperCase();
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
	} else if (!lkup_linear("lkup25", input)){
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
		if (!range_val_check(unna, "unna", "conf1")){//Added for checking the range of Hazmat code.
			error = "S40_20";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
			result.valid = false;
		}
	if (presence_check(unna)){
		if (evalres.SCTG_COMMODITY_CODE.valid){
			if (lkup_linear("lkup33", sctg)){
				//TODO lookup 33 is reserved for the UNNA/SCTG combination list			
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


//console.log(test_destinationCity(""));
//console.log(test_destinationCity("67858"));
//console.log(test_destinationCity("67858APO"));
//console.log(test_destinationCity("APOCity"));
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
//console.log(test_destinationState(""));
//console.log(test_destinationState("6as7858"));
//console.log(test_destinationState("Oh"));
//console.log(test_destinationState("oS"));
//console.log(test_destinationState("AA"));
function test_destinationState(input){
	var result = new Object();
	var error;
	result.valid = true;
	var input = input.toUpperCase();
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
//console.log(test_destinationZip("Amherst", "MA", "", "B"));
//console.log(test_destinationZip("Amherst", "MA", "ad657", "B"));
//console.log(test_destinationZip("Amherst", "MA", "657", "B"));
//console.log(test_destinationZip("Amsterdam", "OH","45701", ""));
//console.log(test_destinationZip("Amherst", "MA","09001", "acB"));
//console.log(test_destinationZip("Amherst", "MA","01005","acvg"));
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
//console.log(test_mode(""));
//console.log(test_mode("b56gj*"));
//console.log(test_mode("23"));
//console.log(test_mode("0897"));
//console.log(test_mode("001"));
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
//console.log(test_export("B"));
//console.log(test_export(""));
//console.log(test_export("y"));
//console.log(test_export("n"));
//console.log(test_export("Y"));
//console.log(test_export("N"));
function test_export(input){
	var result = new Object();
	var error;
	var input = input.toUpperCase();
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
	} else if (!lkup_linear("lkup25", input)){
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
//console.log(test_exportCity(""));
//console.log(test_exportCity("B12"));
//console.log(test_exportCity("Amacuzac"));
//console.log(test_exportCity("Morse"));
//console.log(test_exportCity("Bologna"));
function test_exportCity(input){
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
	} else if ((!lkup_linear("lkup14", input)) && (!lkup_linear("lkup15", input))){
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
//console.log(test_exportCountry("1766"));
//console.log(test_exportCountry(""));
//console.log(test_exportCountry("lkjh"));
//console.log(test_exportCountry("Algeria"));
function test_exportCountry(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(input)){
		error = "S47_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	} else if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "S47_1";
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
//console.log(test_exportMode("","Sweden"));
//console.log(test_exportMode("3","Sweden"));
//console.log(test_exportMode("2","Mexico"));
//console.log(test_exportMode("4","Canada"));
//console.log(test_exportMode("wty","Albania"));
//console.log(test_exportMode("4","canada"));
//console.log(test_exportMode("4","mExiCo"));
function test_exportMode(exp_mode, country){
	var result = new Object();
	var error;
	var country = country.toUpperCase();
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
	} else if ((lkup_linear("lkup29", exp_mode)) && (!lkup_linear("lkup31", country))){//Used lookup table instead of name of countries also logical operator AND is used.
				error = "S16_1";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
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
	var count = 0;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	var failed_attribs = '';
	for (i= 0 ; i < attrib.length; i++){
		if (!auto_fill(input, "SHIPMENT_VALUE")){
			count ++;
			failed_attribs+= "SHIPMENT_VALUE;";
		}
		if (!auto_fill(input, "SHIPMENT_WEIGHT")){
			count ++;
			failed_attribs+="SHIPMENT_WEIGHT;";
		}
		if (!auto_fill(input, "SCTG_COMMODITY_CODE")){
			count ++;
			failed_attribs+="SCTG_COMMODITY_CODE;";
		}
		if (!auto_fill(input, "DOMESTIC_TRANSPORT_MODE")){
			count ++;
			failed_attribs+="DOMESTIC_TRANSPORT_MODE;";
		}
		if (!auto_fill(input, "HAZMAT_CODE")){
			count ++;
			failed_attribs+="HAZMAT_CODE;";
		}
		if (!auto_fill(input, "DOMESTIC_ZIP_CODE")){
			count ++;
			failed_attribs+= "DOMESTIC_ZIP_CODE;";
		}
	}	
	if (count > 0){
		error = "S15";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagmsg.push((flags)[error].msg+failed_attribs);
		result.flagval.push(count);
	}
	if (result.flags.length>0){
		result.pass = false;
	}else {
		result.pass = true;
	}
		return result;
}
//console.log(test_naics("bns"));
//console.log(test_naics("5"));
//console.log(test_naics("76897668"));
//console.log(test_naics("09"));
//console.log(test_naics("934000"));
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
	} else if (!check_allowed_char(input, "numeric", "conf1")){
		error = "S49_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		result.valid = false;
	} else if (!field_length_check(input, "naics", "conf1")){
		error = "S49_4";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
		result.valid = false;
	} else if (!range_val_check(input, "naics", "conf1")){
		error = "S49_20";
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
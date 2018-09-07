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
		return result;
		//console.log(test_numberOfShip(510));
		//console.log(test_totShipValue(03456789));
		//console.log(test_moreThan40Ship(""));
		//ToDo: TEMPERATURE_CONTROL_YN, EXPORT_TRANSPORT_MODE,EXPORT_YN		
		
	}	
	return result;
}
//Integration functions for shipment attributes
function test_numberOfShip(input){
	var result = new Object();;
	var error;
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!presence_check(input)){
			error = "S30_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!range_val_check (input, "numberOfShip", "conf1")){ 
			error = "S30_20";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (result.flgs.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}

function test_totShipValue(input){
	var result = new Object();
	var error;
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!presence_check(input)){
			error = "S31_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!range_val_check(input, "totShipValue", "conf1")){
			error = "S31_20";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (result.flgs.length>0){
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
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!presence_check(input)){
			error = "S32_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (result.flgs.length>0){
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
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!check_allowed_char(input, "alphanumeric", "conf1")){
			error = "S33_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S33_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (result.flgs.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}

function test_ship_date_month(input){
	var result = new Object();
	var error;
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S35_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S35_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!range_val_check(input, "ship_date_month", "conf1")){
			error = "S35_20";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (result.flgs.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}

function test_ship_date_day(input){
	var result = new Object();
	var error;
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S36_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S36_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!range_val_check(input, "ship_date_day", "conf1")){
			error = "S36_20";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (result.flgs.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}

function test_ship_value(value, weight, sctg){
	var result = new Object();
	var error;
	var vw_ratio = value/weight;
	var lkup_result = lkup_binary_m("lkup1","sctg", sctg);
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!presence_check(value)){
			error = "S37_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!range_val_check(weight, "ship_weight", "conf1")){
			error = "S6_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!range_val_check(value, "ship_value", "conf1")){
			error = "S5_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}	
		if (lkup_result.found){
			if (lkup_linear("lkup19", sctg.substr(0,2))){
				if (lkup_result.data[0].vw_lb > vw_ratio){
					error = "S8_1";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}	
				if (lkup_result.data[0].vw_ub < vw_ratio){	
					error = "S8_2";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}
			
			}
			else if (lkup_linear("lkup20", sctg.substr(0,2))){
					if (lkup_result.data[0].vw_lb > vw_ratio){			
						error = "S8_3";
						result.flgname.push((flags)[error].name);
						result.flgs.push((flags)[error].flag);
						result.flgvalue.push((flags)[error].value);
						result.flgmsg.push((flags)[error].msg);
					}	
					if (lkup_result.data[0].vw_ub < vw_ratio){		
						error = "S8_4";
						result.flgname.push((flags)[error].name);
						result.flgs.push((flags)[error].flag);
						result.flgvalue.push((flags)[error].value);
						result.flgmsg.push((flags)[error].msg);
					}
			}else if (lkup_result.data[0].vw_lb > vw_ratio){	
						error = "S8_5";
						result.flgname.push((flags)[error].name);
						result.flgs.push((flags)[error].flag);
						result.flgvalue.push((flags)[error].value);
						result.flgmsg.push((flags)[error].msg);
				} else { 
					(lkup_result.data[0].vw_lb < vw_ratio)
							error = "S8_6";
							result.flgname.push((flags)[error].name);
							result.flgs.push((flags)[error].flag);
							result.flgvalue.push((flags)[error].value);
							result.flgmsg.push((flags)[error].msg);
				}
		}
		if (result.flgs.length>0){
			result.pass = false;
		}else {
			result.pass = true;
		}
			return result;
}

function test_ship_weight(value, weight, sctg, mode){
	var result = new Object();
	var error;
	var vw_ratio = value/weight;
	var lkup_result = lkup_binary_m("lkup1","sctg", sctg);
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!presence_check(weight)){
			error = "S38_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!range_val_check(weight, "ship_weight", "conf1")){
			error = "S6_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}	
		if (lkup_result.found){
			if (lkup_linear("lkup19", sctg.substr(0,2))){
				if (lkup_result.data[0].vw_lb > vw_ratio){
					error = "S38_34";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}	
				if (lkup_result.data[0].vw_ub < vw_ratio){	
					error = "S38_35";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}			
			}
			else if (lkup_linear("lkup20", sctg.substr(0,2))){
					if (lkup_result.data[0].vw_lb > vw_ratio){			
						error = "S38_36";
						result.flgname.push((flags)[error].name);
						result.flgs.push((flags)[error].flag);
						result.flgvalue.push((flags)[error].value);
						result.flgmsg.push((flags)[error].msg);
					}	
					if (lkup_result.data[0].vw_ub < vw_ratio){		
						error = "S38_37";
						result.flgname.push((flags)[error].name);
						result.flgs.push((flags)[error].flag);
						result.flgvalue.push((flags)[error].value);
						result.flgmsg.push((flags)[error].msg);
					}
			}else if (lkup_result.data[0].vw_lb > vw_ratio){	
						error = "S38_38";
						result.flgname.push((flags)[error].name);
						result.flgs.push((flags)[error].flag);
						result.flgvalue.push((flags)[error].value);
						result.flgmsg.push((flags)[error].msg);
				} else { 
						(lkup_result.data[0].vw_lb < vw_ratio)
							error = "S38_39";
							result.flgname.push((flags)[error].name);
							result.flgs.push((flags)[error].flag);
							result.flgvalue.push((flags)[error].value);
							result.flgmsg.push((flags)[error].msg);
				}
		}
		if (lkup_linear("lkup22", mode)){
			if(weight > 150){
					error = "S7_1";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
			}
		}	
		if (lkup_linear("lkup23", mode)){ 
			if(weight > 80000){
				error = "S7_1";
				result.flgname.push((flags)[error].name);
				result.flgs.push((flags)[error].flag);
				result.flgvalue.push((flags)[error].value);
				result.flgmsg.push((flags)[error].msg);
			}
		}	
		if (mode == 8 && weight > 2000){
			error = "S7_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (lkup_linear("lkup24", mode)){
			if(weight < 5000){
					error = "S7_2";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
			 }
		}
		if (mode == 4 && weight < 100){
			error = "S7_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (result.flgs.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}

function test_sctg(sctg, temp_control, value, weight, state, mode, unna){
	var result = new Object();
	var error;
	var vw_ratio = value/weight;
	var lkup_result = lkup_binary_m("lkup1","sctg", sctg);
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!range_val_check(weight, "ship_weight", "conf1")){
			error = "S6_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}	
		if (!check_allowed_char(sctg, "numeric", "conf1")){
			error = "S39_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!presence_check(sctg)){
			error = "S39_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!check_req_char(sctg, "sctg", "conf1")){
			error = "S39_3";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (lkup_result.found){
			if (lkup_linear("lkup19", sctg.substr(0,2))){
				if (lkup_result.data[0].vw_lb > vw_ratio){
					error = "S39_34";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}	
				if (lkup_result.data[0].vw_ub < vw_ratio){	
					error = "S39_35";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}			
			}
			else if (lkup_linear("lkup20", sctg.substr(0,2))){
					if (lkup_result.data[0].vw_lb > vw_ratio){			
						error = "S39_36";
						result.flgname.push((flags)[error].name);
						result.flgs.push((flags)[error].flag);
						result.flgvalue.push((flags)[error].value);
						result.flgmsg.push((flags)[error].msg);
					}	
					if (lkup_result.data[0].vw_ub < vw_ratio){		
						error = "S39_37";
						result.flgname.push((flags)[error].name);
						result.flgs.push((flags)[error].flag);
						result.flgvalue.push((flags)[error].value);
						result.flgmsg.push((flags)[error].msg);
					}
			}else if (lkup_result.data[0].vw_lb > vw_ratio){	
						error = "S39_38";
						result.flgname.push((flags)[error].name);
						result.flgs.push((flags)[error].flag);
						result.flgvalue.push((flags)[error].value);
						result.flgmsg.push((flags)[error].msg);
				} else { (lkup_result.data[0].vw_lb < vw_ratio)
							error = "S39_39";
							result.flgname.push((flags)[error].name);
							result.flgs.push((flags)[error].flag);
							result.flgvalue.push((flags)[error].value);
							result.flgmsg.push((flags)[error].msg);
						}
		}
			if  (lkup_linear("lkup11", sctg.substr(0,2))){ 
				if (temp_control == "Y"){
						error = "S12_1";
						result.flgname.push((flags)[error].name);
						result.flgs.push((flags)[error].flag);
						result.flgvalue.push((flags)[error].value);
						result.flgmsg.push((flags)[error].msg);
				}
			} 
			if (lkup_linear("lkup12", sctg.substr(0,2))){ 
				if (temp_control == "Y"){			
					error = "S12_2";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}
			}
			if (lkup_linear("lkup13", sctg.substr(0,2))){
				if (temp_control == "N"){	
					error = "S12_3";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}
			}
			if (lkup_linear("lkup14", sctg)){
				if (!presence_check(unna)){
					error = "S9_1";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}
			}
			if (!lkup_binary_m("lkup2", "unna_code", unna).found){
					error = "S9_2";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
			}
			if (!lkup_linear("lkup15", sctg)){
				if (presence_check(unna)){
					error = "S9_3";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}
			}
			if (sctg.substr(0,2) == 16 && sctg != 16000){
				error = "S3_3";
				result.flgname.push((flags)[error].name);
				result.flgs.push((flags)[error].flag);
				result.flgvalue.push((flags)[error].value);
				result.flgmsg.push((flags)[error].msg);
			}
			if (!lkup_linear("lkup6", sctg)){
				if (!check_char("lkup26", mode)){ 
					error = "S4_1";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}
			}
			if (lkup_linear("lkup7", sctg)){
				if (!check_char("lkup27", mode)){ 
					if (weight>=150){
						error = "S4_2";
						result.flgname.push((flags)[error].name);
						result.flgs.push((flags)[error].flag);
						result.flgvalue.push((flags)[error].value);
						result.flgmsg.push((flags)[error].msg);
					}
				}	
			}
			if (lkup_linear("lkup8", sctg)){ 
				if (!check_char("lkup27", mode)){
					if (weight>=150){
						if (state != "AK"){		
							error = "S4_2";
							result.flgname.push((flags)[error].name);
							result.flgs.push((flags)[error].flag);
							result.flgvalue.push((flags)[error].value);
							result.flgmsg.push((flags)[error].msg);
						}
					}
				}
			}
			if (lkup_linear("lkup9",sctg)){  
				if (!check_char("lkup28", mode)){
					if	(weight>=1000){
						error = "S4_3";
						result.flgname.push((flags)[error].name);
						result.flgs.push((flags)[error].flag);
						result.flgvalue.push((flags)[error].value);
						result.flgmsg.push((flags)[error].msg);
					}
				}
			}
			if (lkup_linear("lkup10", sctg)){
				if (!check_char("lkup28", mode)){
					if (weight>=1000){
						if (state != "AK"){	
							error = "S4_3";
							result.flgname.push((flags)[error].name);
							result.flgs.push((flags)[error].flag);
							result.flgvalue.push((flags)[error].value);
							result.flgmsg.push((flags)[error].msg);

						}
					}
				}
			}
		if (result.flgs.length>0){
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
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!check_allowed_char(input, "alphanumeric", "conf1")){
			error = "S40_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S40_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (result.flgs.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}

function test_temp_control(temp_control, sctg){
	var result = new Object();
	var error;
	var lkup_result = lkup_binary_m("lkup1","sctg", sctg);
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!presence_check(temp_control)){
			error = "S41_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (lkup_result.found){
			if (temp_control == "Y"){
				if (lkup_linear("lkup11", sctg.substr(0,2))){ 
					error = "S41_34";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}	
				else if (lkup_linear("lkup12", sctg.substr(0,2))){ 			
					error = "S41_35";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
					}
			}
			else {
				if (temp_control == "N"){	
				if (lkup_linear("lkup13", sctg.substr(0,2))){ 
					error = "S41_36";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}
				}
			}
		}	
		if (result.flgs.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}

function test_unna(unna, sctg){
	var result = new Object();
	var error;
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!check_allowed_char(unna,"numeric", "conf1")){
			error = "S42_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!range_val_check(unna,"unna", "conf1")){
			error = "S42_3";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!lkup_binary_m("lkup2", "unna_code", unna).found){
			error = "S42_22";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}	
		if (lkup_linear("lkup14",sctg) && !presence_check(unna)){
			error = "S42_34";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (lkup_linear("lkup15",sctg) && presence_check(unna)){
			error = "S42_35";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (result.flgs.length>0){
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
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!lkup_linear("lkup4",input)){
			error = "S43_22";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}	
		if (!check_allowed_char(input, "alphabetic", "conf1")){
			error = "S43_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S43_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (check_invalid_char(input, "city", "conf1")){
			error = "S43_5";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}		
		if (result.flgs.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}

function test_destinationState(input){
	var result = new Object();
	var error;
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!check_allowed_char(input, "alphabetic", "conf1")){
			error = "S44_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S44_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (check_invalid_char(input, "state", "conf1")){
			error = "S44_5";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!lkup_exhaustive_m("lkup4", "state", input).found){
			error = "S44_22";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}			
		if (result.flgs.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}

function test_destinationZip(input){
	var result = new Object();
	var error;
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!lkup_binary_m("lkup4", "zipCode", input).found){
			error = "S45_22";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}	
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S45_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S45_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!range_val_check(input, "zip", "conf1")){
			error = "S45_3";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (lkup_linear("lkup5", input)){
			error = "S1_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}			
		if (result.flgs.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}

function test_mode(mode, temp_control, weight, sctg, state){
	var result = new Object();
	var error;
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!check_allowed_char(mode, "numeric", "conf1")){
			error = "S46_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!presence_check(mode)){
			error = "S46_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!check_invalid_char(mode, "mode", "conf1")){
			error = "S46_5";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (temp_control == "Y" && mode == 7){
			error = "S46_28";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (lkup_linear("lkup22", mode)){
			if(weight > 150){
					error = "S46_29";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
			}
		}	
		if (lkup_linear("lkup23", mode)){ 
			if(weight > 80000){
				error = "S46_29";
				result.flgname.push((flags)[error].name);
				result.flgs.push((flags)[error].flag);
				result.flgvalue.push((flags)[error].value);
				result.flgmsg.push((flags)[error].msg);
			}
		}	
		if (mode == 8 && weight > 2000){
			error = "S46_29";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (lkup_linear("lkup24", mode)){
			if(weight < 5000){
					error = "S46_30";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
			 }
		}
		if (mode == 4 && weight < 100){
			error = "S46_30";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!lkup_linear("lkup6", sctg)){
			if (!check_char("lkup26", mode)){ 
				error = "S46_34";
				result.flgname.push((flags)[error].name);
				result.flgs.push((flags)[error].flag);
				result.flgvalue.push((flags)[error].value);
				result.flgmsg.push((flags)[error].msg);
			}
		}
		if (lkup_linear("lkup7", sctg)){
			if (!check_char("lkup27", mode)){ 
				if (weight>=150){
					error = "S46_35";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}
			}	
		}
		if (lkup_linear("lkup8", sctg)){ 
			if (!check_char("lkup27", mode)){
				if (weight>=150){
					if (state != "AK"){		
						error = "S46_35";
						result.flgname.push((flags)[error].name);
						result.flgs.push((flags)[error].flag);
						result.flgvalue.push((flags)[error].value);
						result.flgmsg.push((flags)[error].msg);
					}
				}
			}
		}
		if (lkup_linear("lkup9",sctg)){  
			if (!check_char("lkup28", mode)){
				if	(weight>=1000){
					error = "S46_36";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}
			}
		}
		if (lkup_linear("lkup10", sctg)){
			if (!check_char("lkup28", mode)){
				if (weight>=1000){
					if (state != "AK"){	
						error = "S46_36";
						result.flgname.push((flags)[error].name);
						result.flgs.push((flags)[error].flag);
						result.flgvalue.push((flags)[error].value);
						result.flgmsg.push((flags)[error].msg);

					}
				}
			}
		}
		if (!lkup_binary_m("lkup3", "mode", mode).found){
			error = "S2_3";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}			
		if (result.flgs.length>0){
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
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!check_allowed_char(input, "alphabetic", "conf1")){
			error = "S48_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S48_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}	
		if (result.flgs.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}

function test_exportCountry(country, city, mode){
	var result = new Object();
	var error;
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!check_allowed_char(country, "alphabetic", "conf1")){
			error = "S49_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!presence_check(country)){
			error = "S49_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (lkup_linear("lkup25", mode)){
			if (country != "Mexico"){
				if (country != "Canada"){
					error = "S49_28";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}
			}
		}
		if (!lkup_linear("lkup16", city)){
			if (!lkup_linear("lkup17", city)){
				error = "S17_1";
				result.flgname.push((flags)[error].name);
				result.flgs.push((flags)[error].flag);
				result.flgvalue.push((flags)[error].value);
				result.flgmsg.push((flags)[error].msg);
			}	
		}
		if (!lkup_linear("lkup18", country)){
				error = "S17_2";
				result.flgname.push((flags)[error].name);
				result.flgs.push((flags)[error].flag);
				result.flgvalue.push((flags)[error].value);
				result.flgmsg.push((flags)[error].msg);
		}	
		if (result.flgs.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}

function test_exportMode(input){
	var result = new Object();
	var error;
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S50_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S50_2";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}			
		if (result.flgs.length>0){
			result.pass = false;
		}else {
			result.pass = true;
		}
			return result;
}
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
		tmpResult = auto_fill(input[i].list,input[i].attrib);
		if (!tmpResult.pass) {
			tmpResult.line = i+1;
			result.push(tmpResult);
		}
		return result;
	}	
	return result;
}
//Integration functions for shipment attributes
// input.lenght should be the result of a function which counts the rows of shipment values. Now we dont't have it.
/*
function test_numberOfShip(numberOfShip, input.lenght){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!presence_check(numberOfShip)){
			error = "S30_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!range_val_check(numberOfShip, "numberOfShip", "conf1")){ 
			error = "S30_20";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(numberOfShip) && input.lenght > 0){ 
			error = "E1_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (numberOfShip == 0 && input.lenght > 0){ 
			error = "E1_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (numberOfShip > 0 && input.lenght == 0){ 
			error = "E1_3";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		//if ((numberOfShip == 0 && input.lenght == 0)){ 
		//} else {(!presence_check(numberOfShip) && input.lenght == 0 )
			//	error = "E1_4";
			//	result.flagname.push((flags)[error].name);
			//	result.flags.push((flags)[error].flag);
			//	result.flagval.push((flags)[error].value);
			//	result.flagmsg.push((flags)[error].msg);
			//}
		// Revised upper code for E4-1
		if ((numberOfShip == 0 && input.lenght == 0)||(!presence_check(numberOfShip) && input.lenght == 0)){
			error = "E1_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
					
		if (numberOfShip > 100000 && input.lenght > 0){ 
			error = "E1_5";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (numberOfShip > 100000){ 
			error = "E8_1";
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
*/
//console.log(test_NumberOfship("2015","50"));
//console.log(test_NumberOfship("39","20"));

function test_NumberOfship(shipNum){   //input is taken from verify_shipment(input)to use as input.lenght ==numberOfRowsInF
	var result = new Object();
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
	}
	if (!range_val_check(shipNum, "numberOfShip", "conf1")){ 
		error = "S30_20";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	}
	if (!presence_check(shipNum) && input.lenght > 0){ 
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
	
	if (result.flags.length > 0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}

// Where to get ATV , MOS and Estab-weight calculation or data !!!!
function MOS_vs_ATV (ATV, MOS, EstabWeight){
	if (Math.abs(ATV-MOS)> 1000000000 && (ATV==0 ||(MOS/ATV) < 0.2 || (MOS/ATV) > 5)){
		error = "E3_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	}
	if ((Math.abs(ATV-MOS)> 20000000 || EstabWeight >5 ) && (ATV==0 || (MOS/ATV) < 0.1 ||(MOS/ATV) > 10)){
		error = "E3_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	}
	if (result.flags.length > 0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}
//console.log(test_totShipValue("200000"));
function test_totShipValue(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!presence_check(input)){
			error = "S31_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!range_val_check(input, "totShipValue", "conf1")){
			error = "S31_20";
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
		if (!check_allowed_char(input, "alphanumeric", "conf1")){
			error = "S33_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S33_2";
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
//console.log(test_ship_date_month("2", "3"));
function test_ship_date_month(ship_month, quarter){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
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
		if (!presence_check(ship_month)){
			error = "S14_5";
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

function test_ship_date_day(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S35_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S35_2";
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
		if (result.flags.length>0){
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
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!presence_check(value)){
			error = "S5_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!range_val_check(value, "ship_value", "conf1")){
			error = "S5_2";
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

//console.log(test_ship_weight("55", "4", "33"));
//console.log(test_ship_weight("200", "1", ""));
//console.log(test_ship_weight("1500", "5", "22"));  /// don't get false with S7_2
function test_ship_weight(weight, mode, naics){
	var result = new Object();
	var error;
	var lkup_result = lkup_binary_m("lkup20","mode", mode);
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
		}
		if (!range_val_check(weight, "ship_weight", "conf1")){
			error = "S6_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}	
		
		if (lkup_result.found){			
			if (lkup_result.data[0].maxWeight <= weight) {
				error = "S7_1";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}	
			
			if (lkup_result.data[0].minWeight >= weight){
				error = "S7_2";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
		}
		else 
		{
			if ((lkup_linear("lkup30",naics) && mode==4)){
				if (weight <= 100){
				error = "S7_2";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
				}
			}	
			
		}
		// missing mode 4 (100 lbs and NAICS 33, 42, 45) is added but we don't have naics code, I hypothesize we have them as input . This constraint needs to be completed.
			
		if (result.flags.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
		return result;
}
console.log(test_sctg("10010","236589", "25628","2365"));
function test_sctg(sctg, value, weight, naics){
	var result = new Object();
	var error;
	var vw_ratio = value/weight;
	var lkup_result1 = lkup_binary_m("lkup1","sctg", sctg);
	var lkup_result2 = lkup_binary_m("lkup17","2digit_sctg", sctg.substr(0,2));
	result.flgname = [];
	result.flgs = [];
	result.flgvalue = [];
	result.flgmsg = [];
		if (!check_allowed_char(sctg, "numeric", "conf1")){
			error = "S36_1";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		if (!length_field_check(sctg, "sctg", "conf1")){
			error = "S36_4";
			result.flgname.push((flags)[error].name);
			result.flgs.push((flags)[error].flag);
			result.flgvalue.push((flags)[error].value);
			result.flgmsg.push((flags)[error].msg);
		}
		
		if (lkup_result1.found){
			if (lkup_linear("lkup18", sctg.substr(0,2))){
				if (lkup_result1.data[0].vw_lb > vw_ratio){
					error = "S8_1";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}	
				if (lkup_result1.data[0].vw_ub < vw_ratio){	
					error = "S8_2";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}			
			}
			else if (lkup_linear("lkup19", sctg.substr(0,2))){
				if (lkup_result1.data[0].vw_lb > vw_ratio){			
					error = "S8_3";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}	
				if (lkup_result1.data[0].vw_ub < vw_ratio){		
						error = "S8_4";
						result.flgname.push((flags)[error].name);
						result.flgs.push((flags)[error].flag);
						result.flgvalue.push((flags)[error].value);
						result.flgmsg.push((flags)[error].msg);
				}
			}
		else{
				if(lkup_result1.data[0].vw_lb > vw_ratio){	
					error = "S8_5";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);442
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);	
				}
				if(lkup_result1.data[0].vw_lb < vw_ratio){	
					error = "S8_6";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);	
				}
			}
			
		if (!presence_check(sctg)){
			error = "S3_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup_result1.found == false){
			error = "S3_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (sctg.substr(0,2) == "16" && sctg != "16000"){
			error = "S3_3";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
// Provisional test !!!! is new I haven't checked this
		if (lkup_result2.found){
			if (lkup_result2.data[0].partial_naics == naics){
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
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!check_allowed_char(input, "alphanumeric", "conf1")){
			error = "S37_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S37_2";
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

function test_temp_control(temp_control, sctg){
	var result = new Object();
	var error;
	var lkup_result = lkup_binary_m("lkup1","sctg", sctg);
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
		}
		if (!lkup_linear("lkup25", temp_control)){
			error = "S11_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		
		if (lkup_result.found){    
			if (temp_control == "Y"){
			if (lkup_linear("lkup9", sctg.substr(0,2))){ 
					error = "S12_1";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}	
				else if (lkup_linear("lkup10", sctg.substr(0,2))){ 			
					error = "S12_2";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
					}
			}
			else {
				if (temp_control == "N"){	
				if (lkup_linear("lkup11", sctg.substr(0,2))){ 
					error = "S12_3";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
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

function test_unna(unna, sctg){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!check_allowed_char(unna, "numeric", "conf1")){
			error = "S38_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!length_field_check(unna, "unna", "conf1")){
			error = "S38_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		/*
		if (lkup_linear("lkup12", sctg)){
			if (!presence_check(unna)){
				error = "S9_1";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
		}
		
		if (!lkup_binary_m("lkup2", "unna_code", unna).found){
				error = "S9_2";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
		}
		if (!lkup_linear("lkup13", sctg)){
			if (presence_check(unna)){
				error = "S9_3";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
		}
		*/
		// I used the previous code we have revised with Dr. Tehrani because it needs presence check of unna
		if (presence_check(unna)){
			if (lkup_linear("lkup14", sctg)){
				//need to get SCTG-HAZMAT Table 
				/*if (!lkup_binary_m("lkup??", "unna_code", unna).found){
					error = "S9_4";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}*/					
			} else if (!lkup_linear("lkup13", sctg)){					
				error = "S9_3";
				result.flgname.push((flags)[error].name);
				result.flgs.push((flags)[error].flag);
				result.flgvalue.push((flags)[error].value);
				result.flgmsg.push((flags)[error].msg);				
			} else {
				if (!lkup_binary_m("lkup2", "unna_code", unna).found){
					error = "S9_2";
					result.flgname.push((flags)[error].name);
					result.flgs.push((flags)[error].flag);
					result.flgvalue.push((flags)[error].value);
					result.flgmsg.push((flags)[error].msg);
				}
			}				 				
		} else {
			if (lkup_linear("lkup12", sctg)){					
				error = "S9_1";
				result.flgname.push((flags)[error].name);
				result.flgs.push((flags)[error].flag);
				result.flgvalue.push((flags)[error].value);
				result.flgmsg.push((flags)[error].msg);
				
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
// I checked up to here

function test_destinationCity(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!check_allowed_char(input, "alphabetic", "conf1")){
			error = "S39_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S39_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (check_invalid_char(input, "city", "conf1")){
			error = "S39_5";
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

function test_destinationState(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!check_allowed_char(input, "alphabetic", "conf1")){
			error = "S40_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S40_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!length_field_check(input, "state", "conf1")){
			error = "S40_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}	
		if (check_invalid_char(input, "state", "conf1")){
			error = "S40_5";
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

function test_destinationZip(city, state, zip){
	var result = new Object();
	var error;
	var test1 = lkup_binary_m("lkup4", "zip", zip).data;
	var test2 = {
			"city" : city,
			"state" : state,
			"zip" : zip
				};
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!check_allowed_char(zip, "numeric", "conf1")){
			error = "S41_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(zip)){
			error = "S41_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!length_field_check(zip, "zip", "conf1")){
			error = "S41_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!lkup_binary_m("lkup4", "zip", zip).found){
			error = "S41_22";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}	
		if (lkup_linear("lkup5", zip.substr(0,3))){
			error = "S1_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!matchObj(test1, test2, "zip")){
			error = "S1_2";
			result.flgname.push(flags[error].name);
			result.flgflag.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
		}			
		if (result.flags.length>0){
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
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	if (!presence_check(mode)){
		error = "S2_1";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	}
	if (!check_allowed_char(mode, "numeric", "conf1")){
		error = "S2_2";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	}
	if (!lkup_linear("lkup3", mode)){
		error = "S2_3";
		result.flagname.push((flags)[error].name);
		result.flags.push((flags)[error].flag);
		result.flagval.push((flags)[error].value);
		result.flagmsg.push((flags)[error].msg);
	}
	if (!lkup_linear("lkup6", sctg.substr(0,2))){
		if (check_char("lkup26", mode)){ 
			error = "S4_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
	}
	if (lkup_linear("lkup7", sctg.substr(0,2))){
		if (check_char("lkup27", mode)){ 
			if (weight>=150){
				error = "S4_2";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
		}	
	}
	if (lkup_linear("lkup7", sctg.substr(0,2))){ 
		if (check_char("lkup27", mode)){
			if (weight>=150){
				if (state != "AK"){		
					error = "S4_2";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			}
		}
	}
	if (lkup_linear("lkup7",sctg.substr(0,2))){  
		if (check_char("lkup28", mode)){
			if (weight>=1000){
				error = "S4_3";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
		}
	}
	if (lkup_linear("lkup7", sctg.substr(0,2))){
		if (check_char("lkup28", mode)){
			if (weight>=1000){
				if (state != "AK"){	
					error = "S4_3";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);

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

function test_export(input){
	var result = new Object();
	var error;
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
		}
		if (!lkup_linear("lkup25", input)){
			error = "S42_5";
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
		if (!check_allowed_char(input, "alphabetic", "conf1")){
			error = "S43_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S43_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!lkup_linear("lkup14", input) || !lkup_linear("lkup15", input)){
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

function test_exportCountry(country, city, mode){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!check_allowed_char(country, "alphabetic", "conf1")){
			error = "S44_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(country)){
			error = "S44_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!lkup_linear("lkup16", country)){
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
		if (!check_allowed_char(exp_mode, "numeric", "conf1")){
			error = "S45_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(exp_mode)){
			error = "S45_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup_linear("lkup29", exp_mode)){
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
}


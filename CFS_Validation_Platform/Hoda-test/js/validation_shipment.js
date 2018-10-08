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
		if (result.flags.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}
//console.log(MOS_vs_ATV("4000000000", "400000000", "80"));
//console.log(MOS_vs_ATV("10", "1", "801"));
function MOS_vs_ATV(ATV, MOS, estbWeight){
	var result = new Object();;
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
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
//console.log(test_totShipValue("50","10000","40000000","10"));
//console.log(test_totShipValue("50","10000","4000000000","10"));
//console.log(test_totShipValue("","10000","0","10"));

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
		}
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
		if (result.flags.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}
//console.log(test_moreThan40Ship(""));
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
//console.log(test_ship_month("11","2"));
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
//console.log(test_ship_day("9*"));
//console.log(test_ship_day(""));
//console.log(test_ship_day("89"));
function test_ship_day(input){
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
//console.log(test_ship_value("jj4g"));
function test_ship_value(input){
	var result = new Object();
	var error;
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
		}
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
		if (result.flags.length>0){
			result.pass = false;
		}else {
			result.pass = true;
		}
			return result;
}
//console.log(test_ship_weight("hj4",2,"546"));
//console.log(test_ship_weight("0",2,"546"));
//console.log(test_ship_weight("200",1,"546"));
//console.log(test_ship_weight("1000000",2,"546"));
//console.log(test_ship_weight("60000000",3,"546"));
//console.log(test_ship_weight("600",4,"546"));
//console.log(test_ship_weight("40",6,"546"));
//console.log(test_ship_weight("500",81,"546"));
//console.log(test_ship_weight("45",4,"33"));
//console.log(test_ship_weight("490000",4,"33"));
//console.log(test_ship_weight("4900",4,"33"));
function test_ship_weight(weight, mode, naics){
	var result = new Object();
	var error;
	var lkup_result = lkup_binary_m("lkup20","mode", mode);
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!check_allowed_char(weight, "numeric", "conf1")){
			error = "S37_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
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
		} else {
				if ((lkup_linear("lkup30",naics) && mode == "4")){
					if (weight <= 100){
						error = "S7_2";
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
//console.log(test_sctg("564","5","6","33"));
//console.log(test_sctg("564jk","5","6","33"));
//console.log(test_sctg("02902","3","1000","33"));
//console.log(test_sctg("02100","80","10","33"));
//console.log(test_sctg("17110", "9","1000","33"));
//console.log(test_sctg("41110","2","10000","33"));
//console.log(test_sctg("41110","100","1","33"));
//console.log(test_sctg("16009","2","10000","33"));
//console.log(test_sctg("30400","100","1000","315"));
function test_sctg(sctg, value, weight, naics){
	var result = new Object();
	var error;
	var vw_ratio = value/weight;
	var lkup_result1 = lkup_binary_m("lkup1","sctg", sctg);
	var lkup_result2 = lkup_binary_m("lkup17","partial_naics", naics);
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!check_allowed_char(sctg, "numeric", "conf1")){
			error = "S38_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!length_field_check(sctg, "sctg", "conf1")){
			error = "S38_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup_result1.found){
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
			}
			else {
				if(lkup_result1.data[0].vw_lb > vw_ratio){	
					error = "S8_5";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);	
				}
				if(lkup_result1.data[0].vw_lb < vw_ratio){	
					error = "S8_6";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);	
				}
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
		if (!check_allowed_char(input, "alphanumeric", "conf1")){
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
		if (result.flags.length>0){
			result.pass = false;
		}
		else {
			result.pass = true;
		}
			return result;
}
//console.log(test_temp_control("D","02100","4"));
//console.log(test_temp_control("Y","10010","4"));
//console.log(test_temp_control("Y","02903","4"));
//console.log(test_temp_control("N","03100", "7"));
//console.log(test_temp_control("Y","03100","7"));
function test_temp_control(temp_control, sctg, mode){
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
		}	
		if (temp_control == "N" && lkup_linear("lkup11", sctg)){	
			error = "S12_3";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}	
		if (temp_control == "Y" && mode == "7"){	
			error = "S13_1";
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
		if (!lkup_linear("lkup31",input)){
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
//console.log(test_destinationZip("Amherst", "MA","09001"));
//console.log(test_destinationZip("Amherst", "MA","01005"));
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
//console.log(test_mode(""));
//console.log(test_mode("b56gj*"));
//console.log(test_mode("23"));
//console.log(test_mode("0897"));
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
		result.valid = false;
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
	} else if ((lkup_linear("lkup29", exp_mode)) && (!lkup_linear("lkup32", country))){
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
/*
function test_auto_fill_m(input, attrib){ //FIXME fix this according to our discussion last week
	var result = new Object();
	var error;
	var count = 0;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
	for (i== 0 ; i < attrib.length; i++){
		if (!auto_fill(input, "SHIPMENT_VALUE")){
			count ++;
		}
		if (!auto_fill(input, "SHIPMENT_WEIGHT")){
			count ++;
		}
		if (!auto_fill(input, "SCTG_COMMODITY_CODE")){
			count ++;
		}
		if (!auto_fill(input, "DOMESTIC_TRANSPORT_MODE")){
			count ++;
		}
		if (!auto_fill(input, "HAZMAT_CODE")){
			count ++;
		}
		if (!auto_fill(input, "DOMESTIC_ZIP_CODE")){
			count ++;
		}
	}	
	if (count > 0){
		count = result.flagval
		error = "S15_1";
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
}*/
		
	

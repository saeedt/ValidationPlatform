//Global variables
var inputData = [];

var config = {
		delimiter: "",	// auto-detect
		newline: "",	// auto-detect
		quoteChar: '"',
		escapeChar: '"',
		header: false,
		trimHeader: false,
		dynamicTyping: false,
		preview: 0,
		encoding: "",
		worker: true,
		comments: false,
		step: undefined,
		complete: undefined,
		error: undefined,
		download: false,
		skipEmptyLines: true,
		chunk: undefined,
		fastMode: undefined,
		beforeFirstChunk: undefined,
		withCredentials: undefined
	}

//binding the event listener to the file picker button
$(document).ready(function(e) {
	//Empty_not_allowed("input") 	
	document.getElementById('file').addEventListener('change', readFile, false);
	});


//file reader based on papaparse when the file picker is clicked
function readFile (evt) {
    var files = evt.target.files;
    var file = files[0]; 
    Papa.parse(file, {
    	complete: function(results) {
    		log(results);
    	}
    }, config);
 }

//processing the input and displaying the results
function log(input){
	inputData = input.data;
	$("#log-contect").empty();
	var html = '<p>Errors <br>';
	html += input.errors+'</p>';
	html += '<p>Header <br>';
	html += input.data[0]+'</p>';
	html += '<p>Meta <br>';
	html += input.meta+'</p>';
	$("#log-contect").append(html);
	//console.log(test_numberOfShip(3));
	//console.log(test_totShipValue(1));
	//console.log(test_ship_ID("12as"));
	//console.log(test_ship_ID("*&^%23s"));
	//console.log(test_ship_date_month("gf2ha"));
	//console.log(test_ship_date_month(166));
	//console.log(test_ship_date_day(31));
	//console.log(test_ship_value(3 , 1000, "02100"));	
	//console.log(test_ship_value(200, 1, "02100"));
	//console.log(test_ship_value(4, 100, "17110"));
	//console.log(test_ship_value(200, 10, "17110"));
	//console.log(test_ship_value(3, 1000, "07119"));
	//console.log(test_ship_value(200, 1, "07119"));
	//console.log(test_ship_value(0, 1, "07119"));
	//console.log(test_ship_weight(30000, 40, "02100", 4));
	//console.log(test_sctg("10010", "Y", 1, 1, "OH", "1", "65451"));
}
//configuration object for verification functions
var conf1= {
		
	ship_ID: {
		allowed: /[^a-zA-Z0-9]/g,
		not_allowed: /^.*/,
		required: /^.*/	
	},		
	email: {
		allowed: /[^a-zA-Z0-9!@#$%&'*+-/=?^_`{|}~.]/g,
		not_allowed: /[(),:;<>[\]]/g,
		required: /^.+@{1}.+[.].+$/
	},	
	ship_date_day: {
		allowed: /[0-9]/g,
		not_allowed: /^.*/,
		required: /^.*/,
		minRange: 1,
		maxRange: 31		
	},	
	ship_date_month: {
		allowed: /[0-9]/g,
		not_allowed: /^.*/,
		required: /^.*/,
		minRange: 1,
		maxRange: 12	
	},	
	numberOfShip: {
		minRange:1,
		maxRange:100000
	},	
	totShipValue: {
		minRange: 1
	},	
	ship_value: {
		minRange: 1
	},
	ship_weight: {
		minRange: 1
	},
	unna: {
		allowed: /[0-9]/g,
		not_allowed: /^.*/,
		required: /^.*/,
		minRange:4,
		maxRange:4
	},	
	sctg: {
		allowed: /[0-9]/g,
		not_allowed: /^.*/,
		required: /^\d{5}$/,
		minRange:5,
		maxRange:5	
	},	
	zip: {
		allowed: /[0-9]/g,
		not_allowed: /^.*/,
		required: /^.*/,
		minRange:5,
		maxRange:10	
	},	
	city: {
		allowed: /[A-Za-z]/g,
		not_allowed: /(APO|FPO|DPO)/g,
		required: /^.*/
	},	
	state: {
		allowed: /[A-Za-z]/g,
		not_allowed: /(AA|AE|AP)/g,
		required: /^.*/,
		minRange:2,
		maxRange:2
	},	
	country: {
		allowed: /[A-Za-z]/g,
		not_allowed: /^.*/,
		required: /^.*/
	},
	mode: {
		allowed: /[0-9]/g,
		not_allowed: /^.*/,
		required: /^.*/,
		minRange:1,
		maxRange:4
	},
	numeric:{
		allowed: /[^0-9+$]/g,
		not_allowed: /^.*/,
		required:/^.*/
	},
	alphabetic:{
		allowed: /[^A-Za-z+$ ]/g,
		not_allowed: /^.*/,
		required:/^.*/
	},
	alphanumeric:{
		allowed: /[^0-9a-zA-Z+$]/g,
		not_allowed: /^.*/,
		required:/^.*/
	}	
};
//Variables for lookup tables
var lkup1 = [
	{
		"sctg" : "02100",
		"vw_lb" : 0.02546,
		"vw_ub" : 0.26954
	},
	{
		"sctg" : "02200",
		"vw_lb" : 0.02886,
		"vw_ub" : 0.16191
	},
	{
		"sctg" : "02901",
		"vw_lb" : 0.06828,
		"vw_ub" : 127.36676
	},
	{
		"sctg" : "02902",
		"vw_lb" : 0.00635,
		"vw_ub" : 1.05098
	},
	{
		"sctg" : "02903",
		"vw_lb" : 0.00801,
		"vw_ub" : 26.34756
	},
	{
		"sctg" : "07119",
		"vw_lb" : 0.0043,
		"vw_ub" : 146.08756
	},
	{
		"sctg" : "10010",
		"vw_lb" : 0.00008,
		"vw_ub" : 1710.53333	
	},
	{
		"sctg" : "14992",
		"vw_lb" : 0.00453,
		"vw_ub" : 16658.75
	},
	{
		"sctg" : "17110",
		"vw_lb" : 0.08168,
		"vw_ub" : 1.13683
	},
	{
		"sctg" : "41110",
		"vw_lb" : 0.00038,
		"vw_ub" : 89.19525
	}	
	];
	
var lkup2 = [
	{
		"hazmat_descr" : "Acetal",
		"unna_code"	: "1088"
	},		
	{	
		"hazmat_descr" : "Acetaldehyde", 
		"unna_code" : "1089"
	},
	{
		"hazmat_descr" : "Acetaldehyde ammonia", 
		"unna_code" : "1841"
	},
	{	
		"hazmat_descr" : "Acetaldehyde oxime", 
		"unna_code" : "2332"
	},		
	{	
		"hazmat_descr" : "Acetone", 
		"unna_code" : "1090"
	}
];		

var lkup3 = [
	{
		"mode_descr" : "Railroad",
		"mode" : "4"
	},
	{	
		"mode_descr" : "Inland water",
		"mode" : "5"
	},
	{
		"mode_descr" : "Deep sea",
		"mode" : "6"
	},
	{
		"mode_descr" : "Pipeline",
		"mode" : "7"
	},
	{
		"mode_descr" : "Air",
		"mode" : "8"
	}
];					

var lkup4 = [
	{
		"city" : "Agawam",
		"state" : "MA",
		"zipCode" : "01001"
	},
	{
		"city" : "Amherst",
		"state" : "MA",
		"zipCode" : "01001"
	},
	{
		"city" : "Barre",
		"state" : "MA",
		"zipCode" : "01005"
	},
	{
		"city" : "Belchertown",
		"state" : "MA",
		"zipCode" : "01007"
	},
	{
		"city" : "Blandford",
		"state" : "MA",
		"zipCode" : "01008"
	}
];						

var lkup5 = ["09009", "09011", "09012", "09021", "09028"];

var lkup6 = ["13101", "13109", "13200", "13300", "13910"];

var lkup7 = ["02100", "02200", "02902", "02903", "02904"];

var lkup8 = ["17110", "17120", "17201", "17202", "17500"];
 	
var lkup9 = ["41130", "41210", "41220", "41291", "41299"];
	
var lkup10 = ["17110", "17120", "17201", "17202", "17500"];
	
var lkup11 = ["10", "11", "12", "13", "14", "15", "25", "26", "27", "28", "29", "30", "32", "33", "35", "36", "37", "41"];
	
var lkup12 = ["02", "24", "31", "34", "38", "39", "40"];

var lkup13 = ["01", "03", "04", "05", "06", "07"]; 
	
var lkup14 = ["08310", "08410", "17110", "17120", "17201"];

var lkup15 = ["14992", "17500", "17600", "18100", "18200", "18210"];

var lkup16 = ["Abbey", "Abbotsford", "Abercorn", "Aberdeen", "Abernethy"];
	
var lkup17 = ["Aconchi", "Acteopan", "Acuamanala", "Acuitlapan", "Acula"];

var lkup18 = ["Afghanistan", "Albania", "Algeria", "Angola", "Argentina"];

var lkup19 = ["02", "10", "11", "12", "13", "14", "15", "19", "22", "25", "31", "32", "33"];

var lkup20 = ["16", "17", "18"];

var lkup21 = ["02", "10", "11", "12", "13", "14", "15", "19", "22", "25", "31", "32", "33", "16", "17", "18"];

var lkup22 = ["1", "12", "13", "18", "21", "31", "81"];

var lkup23 = ["2", "3"];

var lkup24 = ["4", "5", "6"];

var lkup25 = ["2", "3", "4"];

var lkup26 = ["7"];

var lkup27 = ["1"];

var lkup28 = ["8"];

//Edit flags for shipment attributes
var flags = {
	S1_1: {
			flag: "S1",
			value: "1",
			name: "overseas_military_zip",
			msg: "Zipcode contains overseas military mail address."
	},	
	S1_2: {
			flag: "S1",
			value: "2",
			name: "inv_zip_state",
			msg: "Zipcode/state combination is invalid."
	},
	S2_3: {
			flag: "S2",
			value: "3",
			name: "inv_mode",
			msg: "Mode of transport is invalid."
	},
	S3_3: {
			flag: "S3",
			value: "3",
			name: "sctg_16xxx",
			msg: "SCTG code is invalid."
	},	
	S4_1: {
			flag: "S4",
			value: "1",
			name: "inv_sctg_mode7",
			msg: "SCTG code is invalid for mode includes pipeline (7)."
	},
	S4_2: {
			flag: "S4",
			value: "2",
			name: "inv_sctg_mode1_weight150_orAK",
			msg: "SCTG code is invalid for mode includes parcel (1), shipment weight ≥ 150 lbs, or state ≠ AK."		
	},
	S4_3: {
			flag: "S4",
			value: "3",
			name: "inv_sctg_mode8_weight1000_orAK",
			msg: "SCTG code is invalid for mode includes air (8), shipment weight ≥ 1000 lbs, or state ≠ AK."
	},
	S5_2: {
		flag: "S5",
		value: "2",
		name: "zero_ship_value",
		msg: "Shipment value is invalid. The value must be greater than zero."
	},
	S6_2: {
		flag: "S6",
		value: "2",
		name: "zero_ship_weight",
		msg: "Shipment weight is invalid. The value must be greater than zero."
	},
	S7_1: {
		flag: "S7",
		value: "1",
		name: "maxWeight_threshold_mode",
		msg: "Shipment weight exceeds maximum weight for modes 1, 2, 3, 8, 12, 13, 18, 21, 31 and 81."
	},
	S7_2: {
		flag: "S7",
		value: "2",
		name: "minWeight_threshold_mode",
		msg: "Shipment weight is less than minimum weight for modes 4, 5 and 6."
	},
	S8_1: {
		flag: "S8",
		value: "1",
		name: "valueW_sctg_lessThanExpected",
		msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
	},
	S8_2: {
		flag: "S8",
		value: "2",
		name: "valueW_sctg_greaterThanExpected",
		msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
	},
	S8_3: {
		flag: "S8",
		value: "3",
		name: "valueW_sctg16_17_18_lessThanExpected",
		msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG codes of 16, 17 and 18."
	},
	S8_4: {
		flag: "S8",
		value: "4",
		name: "valueW_sctg16_17_18_greaterThanExpected",
		msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG codes of 16, 17 and 18."
	},		
	S8_5: {
		flag: "S8",
		value: "5",
		name: "valueW_allSctg_lessThanExpected",
		msg: "Shipment value to weight ratio is less than excpected for SCTG code provided."
	},
	S8_6: {
		flag: "S8",
		value: "6",
		name: "valueW_allSctg_greaterThanExpected",
		msg: "Shipment value to weight ratio is greater than excpected for SCTG code provided."
	},
	S9_1: {
		flag: "S9",
		value: "1",
		name: "sctg_balnk_unna",
		msg: "The 4-digit 'UN' or 'NA' number for commodity code provided is missing."
	},
	S9_2: {
		flag: "S9",
		value: "2",
		name: "inv_unna",
		msg: "The 4-digit 'UN' or 'NA' number is invalid."
	},
	S9_3: {
		flag: "S9",
		value: "3",
		name: "notAllowed_sctg_unna",
		msg: "SCTG code/'UN' or 'NA' number combination is invalid."
	},
	S9_4: {
		flag: "S9",
		value: "4",
		name: "inv_sctg_unna",
		msg: "SCTG code/'UN' or 'NA' number combination is invalid."
	}, 
	S10_1: {
		flag: "S10",
		value: "1",
		name: "sctg_naics_provisionalPass",
		msg: "Provisional pass (NAICS/SCTG)"
	},//Not sure about the error message
	S10_2: {
		flag: "S10",
		value: "2",
		name: "sctg_naics_provisionalStop",
		msg: "Provisional stop (NAICS/SCTG)"
	},//Not sure about the error message
	S10_3: {
		flag: "S10",
		value: "3",
		name: "sctg_naics_automaticStop",
		msg: "Automatic stop (NAICS/SCTG)"
	},//Not sure about the error message
//I excluded the edit flag S11 since its rules are defined by our own validation flags.	
	S12_1: {
		flag: "S12",
		value: "1",
		name: "inv_sctg_tempContY",
		msg: "SCTG code is invalid with a positive temperature control response."
	},
	S12_2: {
		flag: "S12",
		value: "2",
		name: "inv_sctg_tempContY",
		msg: "SCTG code is invalid with a positive temperature control response."
	},
	S12_3: {
		flag: "S12",
		value: "3",
		name: "inv_sctg_tempContN",
		msg: "SCTG code is invalid with a negative temperature control response."
	},
	S13_1: {
		flag: "S13",
		value: "1",
		name: "mode7_tempContY",
		msg: "Temperature control response is invalid for mode of transport includes pipeline (7)."
	},
	S14_1: {
		flag: "S14",
		value: "1",
		name: "ship_date_quarter1",
		msg: "Shipment month is not within the quarter reported."
	},
	S14_2: {
		flag: "S14",
		value: "2",
		name: "ship_date_quarter2",
		msg: "Shipment month is not within the quarter reported."
	},
	S14_3: {
		flag: "S14",
		value: "3",
		name: "ship_date_quarter3",
		msg: "Shipment month is not within the quarter reported."
	},
	S14_4: {
		flag: "S14",
		value: "4",
		name: "ship_date_quarter4",
		msg: "Shipment month is not within the quarter reported."
	},
	S15_1: {
		flag: "S15",
		value: "1",
		name: "autoFill_error1",
		msg: ""
	},//Edit flag value indicated the number of variables that fail the edit (Not sure about the error message).
	S15_2: {
		flag: "S15",
		value: "2",
		name: "autoFill_error2",
		msg: ""
	},//Not sure about the error message
	S15_3: {
		flag: "S15",
		value: "3",
		name: "autoFill_error3",
		msg: ""
	},//Not sure about the error message
	S15_4: {
		flag: "S15",
		value: "4",
		name: "autoFill_error4",
		msg: ""
	},//Not sure about the error message
	S15_5: {
		flag: "S15",
		value: "5",
		name: "autoFill_error5",
		msg: ""
	},//Not sure about the error message
	S15_6: {
		flag: "S15",
		value: "6",
		name: "autoFill_error6",
		msg: ""
	},//Not sure about the error message
	S16_1: {
		flag: "S16",
		value: "1",
		name: "inv_mode_exportCountry",
		msg: "Export mode of transport (truck or rail) is invalid for countries other than Mexico or Canada."
	},
	S17_1: {
		flag: "S17",
		value: "1",
		name: "inv_exportCity_country",
		msg: "Export city is invalid for Canada or Mexico."
	},
	S17_2: {
		flag: "S17",
		value: "2",
		name: "inv_exportCountry",
		msg: "Export country is invalid."
	},
	E1_1: {
		flag: "E1",
		value: "1",
		name: "miss_numOfShip_D",
		msg: "Number of shipments in Item D is missing while the number of lines entered in Item F is greater than zero."
	},
	E1_2: {
		flag: "E1",
		value: "2",
		name: "zero_numOfShip_D",
		msg: "Number of shipments in Item D is zero while the number of lines entered in Item F is greater than zero."
	},
	E1_3: {
		flag: "E1",
		value: "3",
		name: "zero_numOfShip_F",
		msg: "Number of shipments in Item D is greater than zero while the number of lines entered in Item F is zero."
	},
	E1_4: {
		flag: "E1",
		value: "4",
		name: "missOrZero_numofShip_D",
		msg: "Number of shipments in Item D is missing or zero and the number of lines entered in Item F is zero."
	},
	E1_5: {
		flag: "E1",
		value: "5",
		name: "threshold_numOfShip_D",
		msg: "Number of shipments in Item D is greater than 100,000 and the number of lines entered in Item F is greater than zero."
	},
	E2_1: {
		flag: "E2",
		value: "1",
		name: "numOfShip_required_vs_reported_greaterThan10",
		msg: ""
	},//Not sure about the error message. Number of shipments required > 10 and (number of shipments required - number of shipments reported) / number of shipments required > 0.2
	E2_2: {
		flag: "E2",
		value: "2",
		name: "numOfShip_required_vs_reported_lessThan10",
		msg: ""
	},//Not sure about the error message. Number of shipments required ≤  10 and |number of shipments required – number of shipments reported| > 1
	E3_1: {
		flag: "E3",
		value: "1",
		name: "mos_vs_atv_1billion",
		msg: ""
	},//Not sure about the error message. |ATV - MOS| > $1 billion and (MOS/ATV) is < 0.2 or > 5
	E3_2: {
		flag: "E3",
		value: "2",
		name: "mos_vs_atv_20billion",
		msg: ""
	},//Not sure about the error message. [|ATV - MOS| > $20 million or Estab Wgt > 5] and ratio of (MOS/ATV) < 0.1 or > 10
	S30_2: {
		flag: "S30",
		value: "2",
		name: "miss_numberOfShip",
		msg: "Total number of outbound shipments is missing."
	},
	S30_20: {
		flag: "S30",
		value: "20",
		name: "outOfRange_numberOfShip",
		msg: "Total number of outbound shipments is invalid. The total number of outbound shipments must be between 1 and 100,000."
	},
	S31_2: {
		flag: "S31",
		value: "2",
		name: "miss_totShipValue",
		msg: "Total value of shipments is missing."
	},
	S31_20: {
		flag: "S31",
		value: "20",
		name: "zero_totShipValue",
		msg: "Total value of shipments is not in range."
	},
	S31_28: {
		flag: "S31",
		value: "28",
		name: "totShipValue_atv_sum",
		msg: ""
	},//Not sure about the message for the error: ATV =  SUM ( YEARWGT * QTRWGT * WEEKWGT * SHIP_VALUE )
	S31_29: {
		flag: "S31",
		value: "29",
		name: "totShipValue_atv_valueWeek_1billion",
		msg: ""
	},//Not sure about the message for the error: (ATV*1000)–(TOT_VALUE_WEEK*52))|>$1 Billion and (TOT_VALUE_WEEK*52) / (ATV*1000)| < 0.2 or > 5, reference look up table Total-value-week and ATV
	S31_30: {
		flag: "S31",
		value: "30",
		name: "totShipValue_atv_valueWeek_20million",
		msg: ""
	},//Not sure about the message for the error: |(ATV*1000)–(TOT_VALUE_WEEK*52)|>$20 Million or ESTAB_WEIGHT>5] and |(TOT_VALUE_WEEK*52) / (ATV*1000)| < 0.1 or > 10
	S32_2: {
		flag: "S32",
		value: "2",
		name: "checkBox_moreThan_40ship",
		msg: "No selection is made."
	},
	S32_40: {
		flag: "S32",
		value: "40",
		name: "checkBox_moreThan_40ship_numberOfShip",
		msg: "Total number of shipments does not match with information provided in Item D."
	},
	S33_1: {
		flag: "S33",
		value: "1",
		name: "nonAlphanumeric_ship_ID",
		msg: "Shipment ID is not alphanumeric."
	},
	S33_2: {
		flag: "S33",
		value: "2",
		name: "miss_ship_ID",
		msg: "Shipment ID is missing."
	},
	S33_5: {
		flag: "S33",
		value: "5",
		name: "invChar_ship_ID",
		msg: "Shipment ID has invalid character."
	},
	S34_2: {
		flag: "S34",
		value: "2",
		name: "miss_numberOfShipReported",
		msg: "Total number of shipments is missing."
	},
	S34_28: {
		flag: "S34",
		value: "28",
		name: "numberOfShipReported_atv_mos_1billion",
		msg: ""
	},//Not sure about the message for the error: |ATV - MOS| > $1 billion and (MOS/ATV) is < 0.2 or > 5
	S34_29: {
		flag: "S34",
		value: "29",
		name: "numberOfShipReported_atv_mos_20million",
		msg: ""
	},//Not sure about the message for the error: [|ATV - MOS| > $20 million or Estab Wgt > 5] and ratio of (MOS/ATV) < 0.1 or > 10
	S35_1: {
		flag: "S35",
		value: "1",
		name: "nonNumeric_ship_date_month",
		msg: "Shipment date (month) is not numeric."
	},
	S35_2: {
		flag: "S35",
		value: "2",
		name: "miss_ship_date_month",
		msg: "Shipment date (month) is missing."
	},
	S35_20: {
		flag: "S35",
		value: "20",
		name: "inv_ship_date_month",
		msg: "Shipment date (month) is not within the range."
	},
	S36_1: {
		flag: "S36",
		value: "1",
		name: "nonNumeric_ship_date_day",
		msg: "Shipment date (day) is not numeric."
	},
	S36_2: {
		flag: "S36",
		value: "2",
		name: "miss_ship_date_day",
		msg: "Shipment date (day) is missing."
	},
	S36_20: {
		flag: "S36",
		value: "20",
		name: "inv_ship_date_day",
		msg: "Shipment date (day) is not within the range."
	},
	S37_2: {
		flag: "S37",
		value: "2",
		name: "miss_ship_value",
		msg: "Shipment value is missing."
	},
	S37_28: {
		flag: "S37",
		value: "28",
		name: "ship_value_atv_sum",
		msg: ""
	},//Not sure about the message for the error: ATV =  SUM ( YEARWGT * QTRWGT * WEEKWGT * SHIP_VALUE )
	S37_29: {
		flag: "S37",
		value: "29",
		name: "ship_value_atv_valueWeek_1billion",
		msg: ""
	},//Not sure about the message for the error: (ATV*1000)–(TOT_VALUE_WEEK*52))|>$1 Billion and (TOT_VALUE_WEEK*52) / (ATV*1000)| < 0.2 or > 5, reference look up table Total-value-week and ATV
	S37_30: {
		flag: "S37",
		value: "30",
		name: "ship_value_atv_valueWeek_20million",
		msg: ""
	},//Not sure about the message for the error: |(ATV*1000)–(TOT_VALUE_WEEK*52)|>$20 Million or ESTAB_WEIGHT>5] and |(TOT_VALUE_WEEK*52) / (ATV*1000)| < 0.1 or > 10
	S38_2: {
		flag: "S38",
		value: "2",
		name: "miss_ship_weight",
		msg: "Shipment weight is missing."
	},
	S38_34: {
		flag: "S38",
		value: "34",
		name: "vWeight_sctg_lessThanExpected",
		msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
	},
	S38_35: {
		flag: "S38",
		value: "35",
		name: "vWeight_sctg_greaterThanExpected",
		msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
	},		
	S38_36: {
		flag: "S38",
		value: "36",
		name: "vWeight_sctg16_17_18_lessThanExpected",
		msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG codes of 16, 17 and 18."
	},
	S38_37: {
		flag: "S38",
		value: "37",
		name: "vWeight_sctg16_17_18_greaterThanExpected",
		msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG codes of 16, 17 and 18."
	},
	S38_38: {
		flag: "S38",
		value: "38",
		name: "vWeight_allSctg_lessThanExpected",
		msg: "Shipment value to weight ratio is less than excpected for the SCTG code provided."
	},
	S38_39: {
		flag: "S38",
		value: "39",
		name: "vWeight_allSctg_greaterThanExpected",
		msg: "Shipment value to weight ratio is greater than excpected for the SCTG code provided."
	},
	S38_40: {
		flag: "S38",
		value: "40",
		name: "ship_weight_mode0",
		msg: "Shipment weight is invalid for mode of transport unknown (0)."
	},//If mode = 0 (Unknown mode), then shipments will be converted to 3 or 4 based on shipment weight.
	S38_41: {
		flag: "S38",
		value: "41",
		name: "ship_weight_lessThanOrEqualTo_80000_mode0",
		msg: "Shipment weight (≤ 80,000 lbs) is invalid for mode of transport unknown (0)."
	},//If weight ≤ 80,000 lbs, then mode 0 will be converted to 3 (for-hire truck).
	S38_42: {
		flag: "S38",
		value: "42",
		name: "ship_weight_greaterThan_80000_mode0",
		msg: "Shipment weight (> 80,000 lbs) is invalid for mode of transport unknown (0)."
	},//If weight > 80,000 lbs, then mode 0 will be coveted to 4 (rail).
	S38_43: {
		flag: "S38",
		value: "43",
		name: "ship_weight_mode9",
		msg: "Shipment weight is invalid for other mode of transport (9)."
	},//If mode = 9 (Other mode), then shipments will likely be converted to 3 or 4 based on shipment weight.
	S39_1: {
		flag: "S39",
		value: "1",
		name: "nonNumeric_sctg",
		msg: "SCTG code is not numeric."
	},
	S39_2: {
		flag: "S39",
		value: "2",
		name: "miss_sctg",
		msg: "SCTG code is missing."
	},
	S39_3: {
		flag: "S39",
		value: "3",
		name: "invFormat_sctg",
		msg: "SCTG code is not a 5-digit number."
	},
	S39_34: {
		flag: "S39",
		value: "34",
		name: "sctg_vw_lessThanExpected",
		msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
	},
	S39_35: {
		flag: "S39",
		value: "35",
		name: "sctg_vw_greaterThanExpected",
		msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
	},
	S39_36: {
		flag: "S39",
		value: "36",
		name: "sctg16_17_18_vw_lessThanExpected",
		msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG codes of 16, 17 and 18."
	},
	S39_37: {
		flag: "S39",
		value: "37",
		name: "sctg16_17_18_vw_greaterThanExpected",
		msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG codes of 16, 17 and 18."
	},
	S39_38: {
		flag: "S39",
		value: "38",
		name: "allSctg_vw_lessThanExpected",
		msg: "Shipment value to weight ratio is less than excpected for the SCTG code provided."
	},
	S39_39: {
		flag: "S39",
		value: "39",
		name: "allSctg_vw_greaterThanExpected",
		msg: "Shipment value to weight ratio is greater than excpected for the SCTG code provided."
	},
	S39_40: {
		flag: "S39",
		value: "40",
		name: "inv_sctg_mode",
		msg: "SCTG code/mode of transport combination is invalid."
	},
	S40_1: {
		flag: "S40",
		value: "1",
		name: "nonAlphanumeric_sctg_descr",
		msg: "Commodity description is not alphanumeric."
	},
	S40_2: {
		flag: "S40",
		value: "2",
		name: "miss_sctg_descr",
		msg: "Commodity description is missing."
	},
	S40_5: {
		flag: "S40",
		value: "5",
		name: "inv_sctg_descr",
		msg: "Commodity discriction has invalid character."
	},
	S41_2: {
		flag: "S41",
		value: "2",
		name: "miss_temp_cont",
		msg: "No selection is made."
	},
	S41_34: {
		flag: "S41",
		value: "34",
		name: "inv_tempContY_sctg",
		msg: "SCTG code is invalid with a positive temperature control response."
	},
	S41_35: {
		flag: "S41",
		value: "35",
		name: "inv_tempContY_sctg",
		msg: "SCTG code is invalid with a positive temperature control response."
	},
	S41_36: {
		flag: "S41",
		value: "36",
		name: "inv_tempContN_sctg",
		msg: "SCTG code is invalid with a negative temperature control response."
	},
	S42_1: {
		flag: "S42",
		value: "3",
		name: "invFormat_unna",
		msg: "'UN' or 'NA' code is nnumeric."
	},
	S42_3: {
		flag: "S42",
		value: "3",
		name: "invFormat_unna",
		msg: "'UN' or 'NA' code is not a 4-digit number."
	},
	S42_22: {
		flag: "S42",
		value: "22",
		name: "inv_unna",
		msg: "'UN' or 'NA' code is invalid."
	},
	S42_34: {
		flag: "S42",
		value: "34",
		name: "miss_unna_sctg",
		msg: "The 4-digit 'UN' or 'NA' number for commodity code is missing."
	},
	S42_35: {
		flag: "S42",
		value: "35",
		name: "unna_notAllowed_sctg",
		msg: "SCTG code/'UN' or 'NA' number combination is invalid."
	},
	S42_36: {
		flag: "S42",
		value: "36",
		name: "inv_unna_sctg",
		msg: "SCTG code/'UN' or 'NA' number combination is invalid."
	}, 
	S43_1: {
		flag: "S43",
		value: "1",
		name: "nonAlphabetic_destinationCity",
		msg: "U.S. destination (city) is not alphabetic."
	},
	S43_2: {
		flag: "S43",
		value: "2",
		name: "miss_destinationCity",
		msg: "U.S. destination (city) is missing."
	},
	S43_5: {
		flag: "S43",
		value: "5",
		name: "invChar_destinationCity",
		msg: "U.S. destination (city) has invalid character."
	},
	S43_22: {
		flag: "S43",
		value: "22",
		name: "inv_destinationCity",
		msg: "U.S. destination (city) is invalid."
	},
	S44_1: {
		flag: "S44",
		value: "1",
		name: "nonAlphabetic_destinationState",
		msg: "U.S. destination (state) is not alphabetic."
	},
	S44_2: {
		flag: "S44",
		value: "2",
		name: "miss_destinationState",
		msg: "U.S. destination (state) is missing."
	},
	S44_3: {
		flag: "S44",
		value: "3",
		name: "invFormat_destinationState",
		msg: "U.S. destination (state) is not two-letter state abbreviation."
	},
	S44_5: {
		flag: "S44",
		value: "5",
		name: "invChar_destinationState",
		msg: "U.S. destination (state) has invalid character."
	},
	S44_22: {
		flag: "S44",
		value: "22",
		name: "inv_destinationState",
		msg: "U.S. destination (state) is invalid."
	},
	S44_34: {
		flag: "S44",
		value: "34",
		name: "inv_destinationState_zip",
		msg: "Zipcode/state combination is invalid."
	},
	S45_1: {
		flag: "S45",
		value: "1",
		name: "nonNumeric_destinationZip",
		msg: "U.S. destination (zip code) is not numeric."
	},
	S45_2: {
		flag: "S45",
		value: "2",
		name: "miss_destinationZip",
		msg: "U.S. destination (zip code) is missing."
	},
	S45_3: {
		flag: "S45",
		value: "3",
		name: "invFormat_destinationZip",
		msg: "U.S. destination (zip code) is not a 5-digit or 10-digit number."
	},
	S45_5: {
		flag: "S45",
		value: "5",
		name: "invChar_destinationZip",
		msg: "U.S. destination (zip code) has invalid character."
	},
	S45_22: {
		flag: "S45",
		value: "22",
		name: "inv_destinationZip",
		msg: "U.S. destination (zip code) is invalid."
	},
	S46_1: {
		flag: "S46",
		value: "1",
		name: "nonNumeric_mode",
		msg: "Mode of transport is not numeric."
	},
	S46_2: {
		flag: "S46",
		value: "2",
		name: "miss_mode",
		msg: "Mode of transport is missing."
	},
	S46_5: {
		flag: "S46",
		value: "5",
		name: "invChar_mode",
		msg: "Mode of transport has invalid character."
	},
	S46_28: {
		flag: "S46",
		value: "28",
		name: "mode7_inv_tempCont",
		msg: "Temperature control response is invalid for mode of transport includes pipeline (7)."
	},
	S46_29: {
		flag: "S46",
		value: "29",
		name: "mode_maxWeight_threshold",
		msg: "Shipment weight exceeds maximum weight for modes of transport 1, 2, 3, 8, 12, 13, 18, 21, 31 and 81."
	},
	S46_30: {
		flag: "S46",
		value: "30",
		name: "mode_minWeight_threshold",
		msg: "Shipment weight is less than minimum weight for modes of transport 4, 5 and 6."
	},
	S46_34: {
		flag: "S46",
		value: "34",
		name: "mode7_inv_sctg",
		msg: "SCTG code is invalid for mode of transport includes pipeline (7)."
	},
	S46_35: {
		flag: "S46",
		value: "35",
		name: "mode1_inv_sctg_weight150_orAK",
		msg: "SCTG code is invalid for mode of transport includes parcel (1), shipment weight ≥ 150 lbs, or state ≠ AK."
	},
	S46_36: {
		flag: "S46",
		value: "36",
		name: "mode8_inv_sctg_weight1000_orAK",
		msg: "SCTG code is invalid for mode of transport includes air (8), shipment weight ≥ 1000 lbs, or state ≠ AK."
	},
	S46_40: {
		flag: "S46",
		value: "40",
		name: "inv_mode_sctg",
		msg: "SCTG code/mode of transport combination is invalid."
	},
	S47_2: {
		flag: "S47",
		value: "2",	
		name: "checkbox_exportMode",
		msg: "No selection is made."
	},
	S48_1: {
		flag: "S48",
		value: "1",
		name: "nonAlphabetic_exportCity",
		msg: "Foreign destination (city) is not alphabetic."
	},
	S48_2: {
		flag: "S48",
		value: "2",
		name: "miss_exportCity",
		msg: "Foreign destination (city) is missing."
	},
	S48_5: {
		flag: "S48",
		value: "5",
		name: "invChar_exportCity",
		msg: "Foreign destination (city) has invalid character."
	},
	S49_1: {
		flag: "S49",
		value: "1",
		name: "nonAlphabetic_exportCountry",
		msg: "Foreign destination (country) is not alphabetic."
	},
	S49_2: {
		flag: "S49",
		value: "2",
		name: "miss_exportCountry",
		msg: "Foreign destination (country) is missing."
	},
	S49_5: {
		flag: "S49",
		value: "5",
		name: "invChar_exportCountry",
		msg: "Foreign destination (country) has invalid character."
	},
	S49_28: {
		flag: "S49",
		value: "28",
		name: "inv_exportCountry_mode",
		msg: "Export mode of transport (truck or rail) is invalid for countries other than Mexico or Canada."
	},
	S50_1: {
		flag: "S50",
		value: "1",
		name: "nonNumeric_exportMode",
		msg: "Export mode of transport is not numeric."
	},
	S50_2: {
		flag: "S50",
		value: "2",
		name: "miss_exportMode",
		msg: "Export mode of transport is missing."
	}	
};

//returns true if the string only has the allowed characters
function check_allowed_char(input, type, config){
	var filter = eval(config)[type].allowed;
	//console.log(!filter.test(input));
	return(!filter.test(input));
}

//returns true if the string contains any invalid characters
function check_invalid_char(input, type, config){
	var filter = eval(config)[type].not_allowed;
	//console.log(filter.test(input));
	return(filter.test(input));
}

//returns true if the string contains all required characters
function check_req_char(input, type, config){
	var filter = eval(config)[type].required;
	//console.log(filter.test(input));
	return(filter.test(input));
}
//Lookup linear function
function lkup_linear(table,input){
	var tbl = eval(table);
	for (var i=0; i<tbl.length; i++){
		if (tbl[i]==input){
			return true;
	}
	}	
	return false;	
}
//Range validation check
function range_val_check(input, type, config){
	var cfg = eval(config)[type];
	var min_pass = true;
	var max_pass = true;
		if (typeof(cfg.minRange != "undefined")){
			if (input < cfg.minRange){
				min_pass = false;
			}
		}
		if(typeof(cfg.maxRange != "undefined")){
			if (input > cfg.maxRange){
				max_pass = false;
			}
		}
		if (min_pass && max_pass){
			return true;
		}
	return false;
	}
//Presence check
function presence_check(input){	
	if ( typeof(input) == 'undefined') { 
		return false;
	}   	
	else if (input.length == 0 || input == 'null' || input == 'NA' ) {
		return false;
	}   	
	else {
		return true;
	}		 
} 

//Character check
function check_char(table, input){
	var tbl = eval(table);
	for (var i = 0; i < tbl.length; i++){
		if (input.includes(tbl[i])){
			return true;
		}
	}
	return false;
}

//matches a given object with an array of values
function matchObj(ref,list,column){
	for (var i=0; i<list.length; i++){
		if ((list[i])[column] == ref[column]){
			var match = true;
			for (var key in list[i]){
				if ((list[i])[key].toUpperCase() != ref[key].toUpperCase()){
					match = false;
					break;
				}				
			}
			if (match) return true;			
		}
	} 
	return false;
}

//exhaustive lookup returning multiple matches
function lkup_exhaustive_m(table,column,index){
	var list = eval(table);
	var result = new Object();
	result.data = [];
	result.data.push(list[0]);
	result.found = false;
	for (var i = 0; i < list.length; i++){
		if ((list[i])[column] == index){
			result.data[0] = list[i];
			result.found = true;
			var j = 1;
    		while ((i+j)<list.length){
    			if ((list[i+j])[column] == index){
    				result.data.push(list[i+j]);
        			j++;
    			} else 
    				break;
    		}
			break;
		}
	}
	return result;
}

//binary lookup returning multiple matches
function lkup_binary_m(table,column,index){
	var list = eval(table);	
	var l_Index = 0;
	var h_Index = list.length-1;
	var m_Index;
	var result = new Object();
	result.data = [];
	result.data.push(list[l_Index]);
	result.found = false;
	//console.log("initial assignment: "+ result);
	while (l_Index < h_Index -1) {
    	m_Index = l_Index + Math.floor((h_Index - l_Index)/2);
    	//console.log('m_index: '+ m_Index);
    	if (parseInt((list[m_Index])[column]) == parseInt(index)){
    		result.data[0] = list[m_Index];
    		result.found = true;
    		var j = 1;
    		while ((m_Index+j)<list.length){
    			if (parseInt((list[m_Index+j])[column]) == parseInt(index)){
    				result.data.push(list[m_Index+j]);
        			j++;
    			}else 
    				break;    			
    		}
    		j = 1;
    		while ((m_Index-j)>=0){
    			if (parseInt((list[m_Index-j])[column]) == parseInt(index)){
    				result.data.push(list[m_Index-j]);
        			j++;
    			}else 
    				break;    			
    		}    		
			break;
    	} else if (parseInt((list[m_Index])[column]) < parseInt(index)) {
    		l_Index = m_Index;
    	} else {
    		h_Index = m_Index;
    	}
    }
	if (h_Index-l_Index ==1){
		if (parseInt((list[l_Index])[column]) == parseInt(index)){
    		result.data[0] = list[l_Index];
    		result.found = true;
		} else if (parseInt((list[h_Index])[column]) == parseInt(index)){
			result.data[0] = list[h_Index];
    		result.found = true;
		}
	}
	return result;
}

//Integration functions for shipment attributes
function test_numberOfShip(input){
	var result = new Object();;
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!presence_check(input)){
			error = "S30_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!range_val_check(input, "numberOfShip", "conf1")){ 
			error = "S30_20";
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

function test_ship_date_month(input){
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
		if (!range_val_check(input, "ship_date_month", "conf1")){
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

function test_ship_date_day(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S36_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S36_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!range_val_check(input, "ship_date_day", "conf1")){
			error = "S36_20";
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
			error = "S37_2";
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
		if (!range_val_check(value, "ship_value", "conf1")){
			error = "S5_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}	
		if (lkup_result.found){
			if (lkup_linear("lkup19", sctg.substr(0,2))){
				if (lkup_result.data[0].vw_lb > vw_ratio){
					error = "S8_1";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}	
				if (lkup_result.data[0].vw_ub < vw_ratio){	
					error = "S8_2";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			
			}
			else if (lkup_linear("lkup20", sctg.substr(0,2))){
					if (lkup_result.data[0].vw_lb > vw_ratio){			
						error = "S8_3";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}	
					if (lkup_result.data[0].vw_ub < vw_ratio){		
						error = "S8_4";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}
			}else if (lkup_result.data[0].vw_lb > vw_ratio){	
						error = "S8_5";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
				} else { 
					(lkup_result.data[0].vw_lb < vw_ratio)
							error = "S8_6";
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

function test_ship_weight(value, weight, sctg, mode){
	var result = new Object();
	var error;
	var vw_ratio = value/weight;
	var lkup_result = lkup_binary_m("lkup1","sctg", sctg);
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!presence_check(weight)){
			error = "S38_2";
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
			if (lkup_linear("lkup19", sctg.substr(0,2))){
				if (lkup_result.data[0].vw_lb > vw_ratio){
					error = "S38_34";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}	
				if (lkup_result.data[0].vw_ub < vw_ratio){	
					error = "S38_35";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}			
			}
			else if (lkup_linear("lkup20", sctg.substr(0,2))){
					if (lkup_result.data[0].vw_lb > vw_ratio){			
						error = "S38_36";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}	
					if (lkup_result.data[0].vw_ub < vw_ratio){		
						error = "S38_37";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}
			}else if (lkup_result.data[0].vw_lb > vw_ratio){	
						error = "S38_38";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
				} else { 
						(lkup_result.data[0].vw_lb < vw_ratio)
							error = "S38_39";
							result.flagname.push((flags)[error].name);
							result.flags.push((flags)[error].flag);
							result.flagval.push((flags)[error].value);
							result.flagmsg.push((flags)[error].msg);
				}
		}
		if (lkup_linear("lkup22", mode)){
			if(weight > 150){
					error = "S7_1";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
			}
		}	
		if (lkup_linear("lkup23", mode)){ 
			if(weight > 80000){
				error = "S7_1";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
		}	
		if (mode == 8 && weight > 2000){
			error = "S7_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup_linear("lkup24", mode)){
			if(weight < 5000){
					error = "S7_2";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
			 }
		}
		if (mode == 4 && weight < 100){
			error = "S7_2";
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

function test_sctg(sctg, temp_control, value, weight, state, mode, unna){
	var result = new Object();
	var error;
	var vw_ratio = value/weight;
	var lkup_result = lkup_binary_m("lkup1","sctg", sctg);
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!range_val_check(weight, "ship_weight", "conf1")){
			error = "S6_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}	
		if (!check_allowed_char(sctg, "numeric", "conf1")){
			error = "S39_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(sctg)){
			error = "S39_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!check_req_char(sctg, "sctg", "conf1")){
			error = "S39_3";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup_result.found){
			if (lkup_linear("lkup19", sctg.substr(0,2))){
				if (lkup_result.data[0].vw_lb > vw_ratio){
					error = "S39_34";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}	
				if (lkup_result.data[0].vw_ub < vw_ratio){	
					error = "S39_35";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}			
			}
			else if (lkup_linear("lkup20", sctg.substr(0,2))){
					if (lkup_result.data[0].vw_lb > vw_ratio){			
						error = "S39_36";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}	
					if (lkup_result.data[0].vw_ub < vw_ratio){		
						error = "S39_37";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}
			}else if (lkup_result.data[0].vw_lb > vw_ratio){	
						error = "S39_38";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
				} else { (lkup_result.data[0].vw_lb < vw_ratio)
							error = "S39_39";
							result.flagname.push((flags)[error].name);
							result.flags.push((flags)[error].flag);
							result.flagval.push((flags)[error].value);
							result.flagmsg.push((flags)[error].msg);
						}
		}
			if  (lkup_linear("lkup11", sctg.substr(0,2))){ 
				if (temp_control == "Y"){
						error = "S12_1";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
				}
			} 
			if (lkup_linear("lkup12", sctg.substr(0,2))){ 
				if (temp_control == "Y"){			
					error = "S12_2";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			}
			if (lkup_linear("lkup13", sctg.substr(0,2))){
				if (temp_control == "N"){	
					error = "S12_3";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			}
			if (lkup_linear("lkup14", sctg)){
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
			if (!lkup_linear("lkup15", sctg)){
				if (presence_check(unna)){
					error = "S9_3";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			}
			if (sctg.substr(0,2) == 16 && sctg != 16000){
				error = "S3_3";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
			if (!lkup_linear("lkup6", sctg)){
				if (!check_char("lkup26", mode)){ 
					error = "S4_1";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			}
			if (lkup_linear("lkup7", sctg)){
				if (!check_char("lkup27", mode)){ 
					if (weight>=150){
						error = "S4_2";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}
				}	
			}
			if (lkup_linear("lkup8", sctg)){ 
				if (!check_char("lkup27", mode)){
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
			if (lkup_linear("lkup9",sctg)){  
				if (!check_char("lkup28", mode)){
					if	(weight>=1000){
						error = "S4_3";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}
				}
			}
			if (lkup_linear("lkup10", sctg)){
				if (!check_char("lkup28", mode)){
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

function test_sctg_descr(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!check_allowed_char(input, "alphanumeric", "conf1")){
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
			error = "S41_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup_result.found){
			if (temp_control == "Y"){
				if (lkup_linear("lkup11", sctg.substr(0,2))){ 
					error = "S41_34";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}	
				else if (lkup_linear("lkup12", sctg.substr(0,2))){ 			
					error = "S41_35";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
					}
			}
			else {
				if (temp_control == "N"){	
				if (lkup_linear("lkup13", sctg.substr(0,2))){ 
					error = "S41_36";
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

function test_unna(unna, sctg){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!check_allowed_char(unna,"numeric", "conf1")){
			error = "S42_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!range_val_check(unna,"unna", "conf1")){
			error = "S42_3";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!lkup_binary_m("lkup2", "unna_code", unna).found){
			error = "S42_22";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}	
		if (lkup_linear("lkup14",sctg) && !presence_check(unna)){
			error = "S42_34";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup_linear("lkup15",sctg) && presence_check(unna)){
			error = "S42_35";
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

function test_destinationCity(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!lkup_linear("lkup4",input)){
			error = "S43_22";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}	
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
		if (check_invalid_char(input, "city", "conf1")){
			error = "S43_5";
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
			error = "S44_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S44_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (check_invalid_char(input, "state", "conf1")){
			error = "S44_5";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!lkup_exhaustive_m("lkup4", "state", input).found){
			error = "S44_22";
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

function test_destinationZip(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!lkup_exhaustive_m("lkup4", "zipCode", input).found){
			error = "S45_22";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}	
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S45_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S45_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!range_val_check(input, "zip", "conf1")){
			error = "S45_3";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup_linear("lkup5", input)){
			error = "S1_1";
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

function test_mode(mode, temp_control, weight, sctg, state){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!check_allowed_char(mode, "numeric", "conf1")){
			error = "S46_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(mode)){
			error = "S46_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!check_invalid_char(mode, "mode", "conf1")){
			error = "S46_5";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (temp_control == "Y" && mode == 7){
			error = "S46_28";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup_linear("lkup22", mode)){
			if(weight > 150){
					error = "S46_29";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
			}
		}	
		if (lkup_linear("lkup23", mode)){ 
			if(weight > 80000){
				error = "S46_29";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
		}	
		if (mode == 8 && weight > 2000){
			error = "S46_29";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup_linear("lkup24", mode)){
			if(weight < 5000){
					error = "S46_30";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
			 }
		}
		if (mode == 4 && weight < 100){
			error = "S46_30";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!lkup_linear("lkup6", sctg)){
			if (!check_char("lkup26", mode)){ 
				error = "S46_34";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
		}
		if (lkup_linear("lkup7", sctg)){
			if (!check_char("lkup27", mode)){ 
				if (weight>=150){
					error = "S46_35";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			}	
		}
		if (lkup_linear("lkup8", sctg)){ 
			if (!check_char("lkup27", mode)){
				if (weight>=150){
					if (state != "AK"){		
						error = "S46_35";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);
					}
				}
			}
		}
		if (lkup_linear("lkup9",sctg)){  
			if (!check_char("lkup28", mode)){
				if	(weight>=1000){
					error = "S46_36";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			}
		}
		if (lkup_linear("lkup10", sctg)){
			if (!check_char("lkup28", mode)){
				if (weight>=1000){
					if (state != "AK"){	
						error = "S46_36";
						result.flagname.push((flags)[error].name);
						result.flags.push((flags)[error].flag);
						result.flagval.push((flags)[error].value);
						result.flagmsg.push((flags)[error].msg);

					}
				}
			}
		}
		if (!lkup_binary_m("lkup3", "mode", mode).found){
			error = "S2_3";
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
			error = "S48_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S48_2";
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
			error = "S49_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(country)){
			error = "S49_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup_linear("lkup25", mode)){
			if (country != "Mexico"){
				if (country != "Canada"){
					error = "S49_28";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			}
		}
		if (!lkup_linear("lkup16", city)){
			if (!lkup_linear("lkup17", city)){
				error = "S17_1";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}	
		}
		if (!lkup_linear("lkup18", country)){
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

function test_exportMode(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
		if (!check_allowed_char(input, "numeric", "conf1")){
			error = "S50_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!presence_check(input)){
			error = "S50_2";
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
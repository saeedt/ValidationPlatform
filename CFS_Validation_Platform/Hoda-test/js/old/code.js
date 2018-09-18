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
	
}

//configuration object for verification functions
var conf1= {
					
	ship_date_day: {
		required: /^0[1-9]|[12][0-9]|3[01]$/,
		minRange: 1,
		maxRange: 31		
	},	
	ship_date_month: {
		required: /^0[1-9]|1[012]$/,
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
		minlength:4,
		maxlength:4
	},	
	sctg: {
		minlength:5,
		maxlength:5	
	},	
	zip: {
		minlength:5
	},	
	city: {
		not_allowed: /(APO|FPO|DPO)/g
	},	
	state: {
		not_allowed: /(AA|AE|AP)/g,
		minlength:2,
		maxlength:2
	},	
	mode: {
		minlength:1,
		maxlength:4
	},
	numeric:{
		allowed: /[^0-9+$]/g
	},
	alphabetic:{
		allowed: /[^A-Za-z+$ ]/g
	},
	alphanumeric:{
		allowed: /[^0-9a-zA-Z+$,():;<>[\ ]]/g,
		required: /^(0[1-9]|1[012])[\/](0[1-9]|[12][0-9]|3[01])[\/][0-9]{4}$/g
	}	
}
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
		"zip" : "01001"
	},
	{
		"city" : "Amherst",
		"state" : "MA",
		"zip" : "01001"
	},
	{
		"city" : "Barre",
		"state" : "MA",
		"zip" : "01005"
	},
	{
		"city" : "Belchertown",
		"state" : "MA",
		"zip" : "01007"
	},
	{
		"city" : "Blandford",
		"state" : "MA",
		"zip" : "01008"
	}
];						

var lkup5 = ["09009", "09011", "09012", "09021", "09028"];

var lkup6 = ["13", "14", "17", "18", "19", "20"];

var lkup7 = ["02", "10", "11", "12", "14", "15", "22", "25", "41"];

var lkup8 = ["17", "18"];

var lkup9 = ["10", "11", "12", "13", "14", "15", "25", "26", "27", "28", "29", "30", "32", "33", "35", "36", "37", "41"];

var lkup10 = ["02", "24", "31", "34", "38", "39", "40"];

var lkup11 = ["01009", "03100", "03211", "03219", "03311"];

var lkup12 = ["08310", "08410", "17110", "17120", "17201"];

var lkup13 = ["20101", "20102", "20221", "20222", "20241"];

var lkup14 = ["Abbey", "Abbotsford", "Abercorn", "Aberdeen", "Abernethy"];
	
var lkup15 = ["Aconchi", "Acteopan", "Acuamanala", "Acuitlapan", "Acula"];

var lkup16 = ["Afghanistan", "Albania", "Algeria", "Angola", "Argentina"];

var lkup17 = [
	{
		"2digit_sctg": "34",
		"partial_naics": "314",
		"edit_flag": "2"
	},
	{
		"2digit_sctg": "35",
		"partial_naics": "314",
		"edit_flag": "1"
	},
	{
		"2digit_sctg": "36",
		"partial_naics": "314",
		"edit_flag": "1"
	},
	{
		"2digit_sctg": "37",
		"partial_naics": "314",		
		"edi_flag": "1"
	},
	{
		"2digit_sctg": "38",
		"partial_naics": "314",
		"edit_flag": "2"
	}
];

var lkup18 = ["10", "11", "12", "13", "14", "15", "25", "26", "27", "28", "29", "30", "32", "33", "35", "36", "37", "41"];

var lkup19 = ["02", "24", "31", "34", "38", "39", "40"];

var lkup20 = ["01", "03", "04", "05", "06", "07"]; 

var lkup21 = ["02", "10", "11", "12", "13", "14", "15", "19", "22", "25", "31", "32", "33"];

var lkup22 = ["16", "17", "18"];

var lkup23 = ["1", "12", "13", "18", "21", "31", "81"];

var lkup24 = ["2", "3"];

var lkup25 = ["4", "5", "6"];

var lkup26 = ["2", "3", "4"];

var lkup27 = ["7"];

var lkup28 = ["1"];

var lkup29 = ["8"];

var lkup30 = ["1", "2", "3"];

var lkup31 = ["4", "5", "6"];

var lkup32 = ["7", "8", "9"];

var lkup33 = ["10", "11", "12"];

var lkup34 = ["Y", "N"];

//Edit flags for shipment attributes
var flags = {
	S1_1: {
		flag: "S1",
		value: "1",
		name: "overseas_military_zip",
		msg: "U.S. destination (zip) contains overseas millitary address."
	},	
	S1_2: {
		flag: "S1",
		value: "2",
		name: "inv_zip_state",
		msg: "U.S. destination state/zip combination is invalid."
	},
	S2_1: {
		flag: "S2",
		value: "1",
		name: "miss_mode",
		msg: "Mode of transport is missing."
	},
	S2_2: {
		flag: "S2",
		value: "2",
		name: "nonNumeric_mode",
		msg: "Mode of transport is not numeric."
	},
	S2_3: {
		flag: "S2",
		value: "3",
		name: "inv_mode",
		msg: "Mode of transport contains a numeric entry but is not a valid mode including multi-mode."
	},
	S3_1: {
		flag: "S3",
		value: "1",
		name: "miss_sctg",
		msg: "SCTG commodity code is missing."
	},
	S3_2: {
		flag: "S3",
		value: "2",
		name: "notFound_sctg",
		msg: "SCTG commodity code is invalid."
	},	
	S3_3: {
		flag: "S3",
		value: "3",
		name: "16xxx_sctg",
		msg: "SCTG commodity code is invalid."
	},	
	S4_1: {
		flag: "S4",
		value: "1",
		name: "inv_sctg_mode7",
		msg: "SCTG commodity code is invalid for mode includes pipeline (7)."
	},
	S4_2: {
		flag: "S4",
		value: "2",
		name: "inv_sctg_mode1_weight_state",
		msg: "SCTG commodity code is invalid for mode includes parcel (1), shipment weight and state provided."		
	},
	S4_3: {
		flag: "S4",
		value: "3",
		name: "inv_sctg_mode8_weight_state",
		msg: "SCTG commodity code is invalid for mode includes air (8), shipment weight and state provided."
	},
	S5_1: {
		flag: "S5",
		value: "1",
		name: "miss_ship_value",
		msg: "Shipment value is missing."
	},
	S5_2: {
		flag: "S5",
		value: "2",
		name: "nonPositive_ship_value",
		msg: "Shipment value is invalid. The value must be greater than zero."
	},
	S6_1: {
		flag: "S6",
		value: "1",
		name: "miss_ship_weight",
		msg: "Shipment weight is missing."
	},
	S6_2: {
		flag: "S6",
		value: "2",
		name: "nonPositive_ship_weight",
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
		name: "vw_sctg_lessThanExpected",
		msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG commodity codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
	},
	S8_2: {
		flag: "S8",
		value: "2",
		name: "vw_sctg_greaterThanExpected",
		msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG commodity codes of 02, 10, 11, 12, 13, 14, 15, 19, 22, 25, 31, 32 and 33."
	},
	S8_3: {
		flag: "S8",
		value: "3",
		name: "vw_sctg16_17_18_lessThanExpected",
		msg: "Shipment value to weight ratio is less than excpected for the 2-digit SCTG commodity codes of 16, 17 and 18."
	},
	S8_4: {
		flag: "S8",
		value: "4",
		name: "vw_sctg16_17_18_greaterThanExpected",
		msg: "Shipment value to weight ratio is greater than excpected for the 2-digit SCTG commodity codes of 16, 17 and 18."
	},		
	S8_5: {
		flag: "S8",
		value: "5",
		name: "vw_allSctg_lessThanExpected",
		msg: "Shipment value to weight ratio is less than excpected for SCTG commodity code provided."
	},
	S8_6: {
		flag: "S8",
		value: "6",
		name: "vw_allSctg_greaterThanExpected",
		msg: "Shipment value to weight ratio is greater than excpected for SCTG commodity code provided."
	},
	S9_1: {
		flag: "S9",
		value: "1",
		name: "sctg_miss_unna",
		msg: "The 4-digit 'UN' or 'NA' number for SCTG commodity code provided is missing."
	},
	S9_2: {
		flag: "S9",
		value: "2",
		name: "notFound_unna",
		msg: "The 4-digit 'UN' or 'NA' number is invalid."
	},
	S9_3: {
		flag: "S9",
		value: "3",
		name: "notAllowed_sctg_unna",
		msg: "SCTG commodity code/'UN' or 'NA' number combination is invalid."
	},
	S9_4: {
		flag: "S9",
		value: "4",
		name: "inv_sctg_unna",
		msg: "SCTG commodity code/'UN' or 'NA' number combination is invalid."
	}, 
	S10_1: {
		flag: "S10",
		value: "1",
		name: "sctg_naics_provisionalPass",
		msg: "NAICS code/SCTG commodity code combination is invalid."
	},
	S10_2: {
		flag: "S10",
		value: "2",
		name: "sctg_naics_provisionalStop",
		msg: "NAICS code/SCTG commodity code combination is invalid."
	},
	S10_3: {
		flag: "S10",
		value: "3",
		name: "sctg_naics_automaticStop",
		msg: "NAICS code/SCTG commodity code combination is invalid."
	},
	S11_1: {
		flag: "S11",
		value: "1",
		name: "miss_tempCont",
		msg: "No selection is made."
	},
	S11_2: {
		flag: "S11",
		value: "2",
		name: "inv_tempCont",
		msg: "Input is invalid."
	},
	S12_1: {
		flag: "S12",
		value: "1",
		name: "inv_sctg_tempContY",
		msg: "SCTG commodity code is invalid with a positive temperature control response."
	},
	S12_2: {
		flag: "S12",
		value: "2",
		name: "inv_sctg_tempContY",
		msg: "SCTG commodity code is invalid with a positive temperature control response."
	},
	S12_3: {
		flag: "S12",
		value: "3",
		name: "inv_sctg_tempContN",
		msg: "SCTG commodity code is invalid with a negative temperature control response."
	},
	S13_1: {
		flag: "S13",
		value: "1",
		name: "mode7_tempContY",
		msg: "Temperature control response is invalid with pipeline (7) as mode of transport."
	},
	S14_1: {
		flag: "S14",
		value: "1",
		name: "ship_month_quarter1",
		msg: "Shipment date (month) is not within the quarter reported."
	},
	S14_2: {
		flag: "S14",
		value: "2",
		name: "ship_month_quarter2",
		msg: "Shipment date (month) is not within the quarter reported."
	},
	S14_3: {
		flag: "S14",
		value: "3",
		name: "ship_month_quarter3",
		msg: "Shipment date (month) is not within the quarter reported."
	},
	S14_4: {
		flag: "S14",
		value: "4",
		name: "ship_month_quarter4",
		msg: "Shipment date (month) is not within the quarter reported."
	},
	S14_5: {
		flag: "S14",
		value: "5",
		name: "miss_ship_month",
		msg: "Shipment date (month) is missing."
	},
	S15_1: {
		flag: "S15",
		value: "1",
		name: "autoFill_error1",
		msg: "Autofill error."
	},
	S15_2: {
		flag: "S15",
		value: "2",
		name: "autoFill_error2",
		msg: "Autofill error."
	},
	S15_3: {
		flag: "S15",
		value: "3",
		name: "autoFill_error3",
		msg: "Autofill error."
	},
	S15_4: {
		flag: "S15",
		value: "4",
		name: "autoFill_error4",
		msg: "Autofill error."
	},
	S15_5: {
		flag: "S15",
		value: "5",
		name: "autoFill_error5",
		msg: "Autofill error."
	},
	S15_6: {
		flag: "S15",
		value: "6",
		name: "autoFill_error6",
		msg: "Autofill error."
	},
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
		msg: "Total number of outbound shipments is invalid. The value must be greater than zero."
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
		msg: "Total value of shipments is invalid. The value must be greater than zero."
	},
	S32_2: {
		flag: "S32",
		value: "2",
		name: "moreThan40ship",
		msg: "No selection is made."
	},
	S33_1: {
		flag: "S33",
		value: "1",
		name: "nonAlphanumeric_ship_ID",
		msg: "Shipment ID number is not alphanumeric."
	},
	S33_2: {
		flag: "S33",
		value: "2",
		name: "miss_ship_ID",
		msg: "Shipment ID number is missing."
	},
	S34_1: {
		flag: "S34",
		value: "1",
		name: "nonNumeric_ship_date_month",
		msg: "Shipment date (month) is not numeric."
	},
	S34_20: {
		flag: "S34",
		value: "20",
		name: "outOfRange_ship_date_month",
		msg: "Shipment date (month) is not in range."
	},
	S35_1: {
		flag: "S35",
		value: "1",
		name: "nonNumeric_ship_date_day",
		msg: "Shipment date (day) is not numeric."
	},
	S35_2: {
		flag: "S35",
		value: "2",
		name: "miss_ship_date_day",
		msg: "Shipment date (day) is missing."
	},
	S35_20: {
		flag: "S35",
		value: "20",
		name: "outOfRange_ship_date_day",
		msg: "Shipment date (day) is not in range."
	},
	S36_1: {
		flag: "S36",
		value: "1",
		name: "nonNumeric_sctg",
		msg: "SCTG commodity code is not numeric."
	},
	S36_4: {
		flag: "S36",
		value: "4",
		name: "inv_sctg",
		msg: "SCTG commodity code not a 5-digit number."
	},
	S37_1: {
		flag: "S37",
		value: "1",
		name: "nonAlphanumeric_sctg_descr",
		msg: "Commodity description is not alphanumeric."
	},
	S37_2: {
		flag: "S37",
		value: "2",
		name: "miss_sctg_descr",
		msg: "Commodity description is missing."
	},
	S38_1: {
		flag: "S38",
		value: "1",
		name: "nonNumeric_unna",
		msg: "'UN' or 'NA' code is not numeric."
	},
	S38_4: {
		flag: "S38",
		value: "4",
		name: "inv_unna",
		msg: "'UN' or 'NA' code is not a 4-digit number."
	},
	S39_1: {
		flag: "S39",
		value: "1",
		name: "nonAlphabetic_destinationCity",
		msg: "U.S. destination (city) is not alphabetic."
	},
	S39_2: {
		flag: "S39",
		value: "2",
		name: "miss_destinationCity",
		msg: "U.S. destination (city) is missing."
	},
	S39_5: {
		flag: "S39",
		value: "5",
		name: "invChar_destinationCity",
		msg: "U.S. destination (city) has invalid character (a value of APO, FPO, and DPO)."
	},
	S40_1: {
		flag: "S40",
		value: "1",
		name: "nonAlphabetic_destinationState",
		msg: "U.S. destination (state) is not alphabetic."
	},
	S40_2: {
		flag: "S40",
		value: "2",
		name: "miss_destinationState",
		msg: "U.S. destination (state) is missing."
	},
	S40_4: {
		flag: "S40",
		value: "4",
		name: "inv_destinationState",
		msg: "U.S. destination (state) is not a two-letter abbreviation."
	},
	S40_5: {
		flag: "S40",
		value: "5",
		name: "invChar_destinationState",
		msg: "U.S. destination (state) has invalid character (a value of AA, AE, and AP)."
	},
	S41_1: {
		flag: "S41",
		value: "1",
		name: "nonNumeric_destinationZip",
		msg: "U.S. destination (zip) is not numeric."
	},
	S41_2: {
		flag: "S41",
		value: "2",
		name: "miss_destinationZip",
		msg: "U.S. destination (zip) is missing."
	},
	S41_4: {
		flag: "S41",
		value: "4",
		name: "inv_destinationZip",
		msg: "U.S. destination (zip) is not a 5-digit number."
	},
	S41_22: {
		flag: "S41",
		value: "22",
		name: "notFound_destinationZip",
		msg: "U.S. destination (zip) is invalid."
	},
	S42_2: {
		flag: "S42",
		value: "2",	
		name: "YN_exportMode",
		msg: "No selection is made."
	},
	S42_5: {
		flag: "S42",
		value: "5",	
		name: "inv_exportMode",
		msg: "Input is invalid."
	},
	S43_1: {
		flag: "S43",
		value: "1",
		name: "nonAlphabetic_exportCity",
		msg: "Foreign destination (city) is not alphabetic."
	},
	S43_2: {
		flag: "S43",
		value: "2",
		name: "miss_exportCity",
		msg: "Foreign destination (city) is missing."
	},
	S44_1: {
		flag: "S44",
		value: "1",
		name: "nonAlphabetic_exportCountry",
		msg: "Foreign destination (country) is not alphabetic."
	},
	S44_2: {
		flag: "S44",
		value: "2",
		name: "miss_exportCountry",
		msg: "Foreign destination (country) is missing."
	},
	S45_1: {
		flag: "S45",
		value: "1",
		name: "nonNumeric_exportMode",
		msg: "Export mode of transport is not numeric."
	},
	S45_2: {
		flag: "S45",
		value: "2",
		name: "miss_exportMode",
		msg: "Export mode of transport is missing."
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
		msg: "The number of reported shipments provided in item D and the total number of shipments reported in Item F are not consistent."
	},
	E2_2: {
		flag: "E2",
		value: "2",
		name: "numOfShip_required_vs_reported_lessThan10",
		msg: "The number of reported shipments provided in item D and the total number of shipments reported in Item F are not consistent."
	},
	E3_1: {
		flag: "E3",
		value: "1",
		name: "mos_vs_atv_1billion",
		msg: "The value of ATV derived from the CFS data is not consistent with the value of MOS from derived the CFS frame."
	},
	E3_2: {
		flag: "E3",
		value: "2",
		name: "mos_vs_atv_20billion",
		msg: "The value of ATV derived from the CFS data is not consistent with the value of MOS from derived the CFS frame."
	},
	E4_1: {
		flag: "E4",
		value: "1",
		name:"shipAddress_inv_state_zip",
		msg: "Shipping address state/zip combination is invalid."
	},
	E4_2: {
		flag: "E4",
		value: "2",
		name:"shipAddress_inv_state_zip",
		msg: "Shipping address state has been changed since it was mailed to the database."
	},
	E4_3: {	
		flag: "E4",
		value: "3",
		name: "shipAddress_invChar_state",
		msg: "Shipping address (state) has invalid character (a value of P.O.Box)."
	},
	E5_1:{
		flag: "E5",
		value: "1",
		name: "operatingStatus_dateOfCeased",
		msg: "Ceased operation is selected for the establishment operating status or a date for ceased operation is provided."
	},
	E6_1: {
		flag: "E6",
		value:"1",
		name: "mailAddress_inv_state_zip",
		msg: "Mailing address state/zip combination is invalid."
	},
	E7_1: {	
		flag: "E7",
		value: "1",
		name: "nonNumeric_fax",
		msg: "Fax number in not numeric."
	},
	E7_2: {	
		flag: "E7",
		value: "2",
		name: "inv_fax",
		msg: "Fax number is not a 10 digit number."
	},
	E8_1: {
		flag: "E8",
		value: "1",
		name: "numOfShip_100000",
		msg: "Total number of outbound shipments is greater than 100,000."
	},
	E9_1: {
		flag: "E9",
		value: "1",
		name: "weeklyValue1_vs_ATV",
		msg: "The total weekly value of shipments is not consistent with the value of ATV derived from the CFS data."
	},
	E9_2: {
		flag: "E9",
		value: "2",
		name: "weeklyValue2_vs_ATV",
		msg: "The total weekly value of shipments is not consistent with the value of ATV derived from the CFS data."
	},
	E10_1: {
		flag: "E10",
		value: "1",
		name: "miss_completeTime",
		msg: "Completion time (hours or minutes) are missing."
	},
	E10_2: {	
		flag: "E10",
		value: "2",
		name: "nonNumeric_completeTime",
		msg: "Completion time (hours or minutes) are not numeric."
	},
	E10_3: {		
		flag: "E10",
		value: "3",
		name: "8hours_completeTime",
		msg: "The value of completation time is more than 8 hours."
	},
	E20_2: {		
		flag: "E20",
		value: "2",
		name: "checkBox_companyShipName",
		msg: "No selection is made."
	},
	E21_1: {	
		flag: "E21",
		value: "1",
		name: "nonAlphanumeric_companyShipName1",
		msg: "Shipping company name is not alphanumeric."
	},	
	E21_2: {		
		flag: "E21",
		value: "2",
		name: "miss_companyShipName1",
		msg: "Shipping company name 1 is missing."
	},
	E22_1: {	
		flag: "E22",
		value: "1",
		name: "nonAlphanumeric_companyShipName2",
		msg: "Shipping company name 2 is not alphanumeric."
	},
	E23_1: {	
		flag: "E23",
		value: "1",
		name: "nonAlphanumeric_shipAddress",
		msg: "Shipping address is not alphanumeric. "
	},
	E23_2: {	
		flag: "E23",
		value: "2",
		name: "miss_shipAddress",
		msg: "Shipping address is missing."
	},	
	E23_5: {	
		flag: "E23",
		value: "5",
		name: "invChar_shipAddress",
		msg: "Shipping address has invalid character (a value of P_O_/P.O_/P..B/P.O_/P.O./PO_B/PO_D/POB_/POST)."
	},
	E24_1: {	
		flag: "E24",
		value: "1",
		name: "nonAlphabetic_shipCity",
		msg: "Shipping address (city) is not alphabetic."
	},
	E24_2: {	
		flag: "E24",
		value: "2",
		name: "miss_shipCity",
		msg: "Shipping address (city) is missing."
	},
	E25_1: {	
		flag: "E25",
		value: "1",
		name: "nonAlphabetic_shipState",
		msg: "Shipping address (state) is not alphabetic."
	},
	E25_2: {	
		flag: "E25",
		value: "2",
		name: "miss_shipState",
		msg: "Shipping address (state) is missing."
	},
	E25_4: {		
		flag: "E25",
		value: "4",
		name: "inv_shipState",
		msg: "Shipping address (state) is not a two-letter abbreviation."
	},
	E26_1: {	
		flag: "E26",
		value: "1",
		name: "nonNumeric_shipZip",
		msg: "Shipping address (zip) is not numeric."
	},
	E26_2: {	
		flag: "E26",
		value: "2",
		name: "miss_shipZip",
		msg: "Shipping address (zip) is missing."
	},
	E26_4: {	
		flag: "E26",
		value: "4",
		name: "inv_shipZip",
		msg: "Shipping address (zip) is not a 5-digit number."
	},
	E26_22: {	
		flag: "E26",
		value: "22",
		name: "notFound_shipZip",
		msg: "Shipping address (zip) is invalid."
	},
	E26_23: {	
		flag: "E24",
		value: "26",
		name: "inv_shipCity_state_zip",
		msg: "City/state/zip combination is invalid."
	},
	E27_2: {		
		flag: "E27",
		value: "2",
		name: "CheckBox_companyMailName",
		msg: "No selection is made."
	},
	E28_1: {
		flag: "E28",
		value: "1",
		name: "nonAlphanumeric_companyMailName1",
		msg: "Mailing company name 1 is not alphanumeric."
	},	
	E28_2: {	
		flag: "E28",
		value: "2",
		name: "miss_companyMailName1",
		msg: "Mailing company name 1 is missing."
	},
	E29_1: {
		flag: "E29",
		value: "1",
		name: "nonAlphanumeric_companyMailName2",
		msg: "Mailing company name 2 is not alphanumeric."
	},	
	E30_1: {	
		flag: "E30",
		value: "1",
		name: "nonAlphanumeric_mailAddressAttention",
		msg: "Mailing address (attention) is not alphanumeric."
	},
	E31_1: {
		flag: "E31",
		value:"1",
		name:"nonAlphanumeric_mailAddress_address",
		msg: "Mailing address (address) is not alphanumeric."
	},
	E31_2: {	
		flag: "E31",
		value: "2",
		name: "miss_mailAddress_address",
		msg: "Mailing address (address) is missing."
	},
	E32_1: {	
		flag: "E32",
		value: "1",
		name: "nonAlphabetic_mailCity",
		msg: "Mailing address (city) is not alphabetic."
	},
	E32_2: {	
		flag: "E32",
		value: "2",
		name: "miss_mailCity",
		msg: "Mailing address (city) is missing."
	},
	E32_23: {	
		flag: "E32",
		value: "22",
		name: "inv_mailCity_state_zip",
		msg: "City/state/zip combination is invalid."
	},
	E33_1: {
		flag: "E33",
		value: "1",
		name: "nonAlphabetic_mailState",
		msg: "Mailing address (state) is not alphabetic."
	},
	E33_2: {
		flag: "E33",
		value: "2",
		name: "miss_mailStat",
		msg: "Mailing address (state) is missing."
	},
	E33_4: {	
		flag: "E33",
		value: "3",
		name: "inv_mailState",
		msg: "Mailing address (state) is not a two-letter abbreviation."
	},
	E34_1: {	
		flag: "E34",
		value: "1",
		name: "nonNumeric_mailZip",
		msg: "Mailing address (zip) is not numeric."
	},
	E34_2: {		
		flag: "E34",
		value: "2",
		name: "miss_mailZip",
		msg: "Mailing address (zip) is missing."
	},
	E34_4: {	
		flag: "E34",
		value: "4",
		name: "inv_mailZip",
		msg: "Mailing address (zip) is not a 10-digit number."
	},
	E34_22: {	
		flag: "E34",
		value: "22",
		name: "notFound_mailZip",
		msg: "Mailing address (zip) is invalid."
	},
	E35_2: {	
		flag: "E35",
		value: "2",
		name: "checkBox_operatingStatus",
		msg: "No selection is made."
	},
	E36_1:{
		flag: "E36",
		value:"1",
		name: "nonNumeric_dateOfCeased",
		msg: "Date for ceased operation is not numeric."
	},
	E36_3:{
		flag: "E36",
		value: "3",
		name: "invFormat_dateOfCeased",
		msg: "Date of ceased operation is not in  MMDDYYYY format."
	},
	E37_2: {	
		flag: "E37",
		value: "2",
		name: "checkBox_priIndustryActivity",
		msg: "No selection is made."
	},
	E38_1: {	
		flag: "E38",
		value: "1",
		name: "nonAlphanumeric_priIndustryActivity",
		msg: "Primary industry activity is not alphanumeric "
	},
	E38_40: {
		flag: "E38",
		value: "40",
		name: "primIndustAct_CrossConst",
		msg: "Checkbox is checked as 'No' but primary industry activity description is not provided."
	},
	E39_1: {	
		flag : "E39",
		value: "1",
		name: "nonAlphabetic_contactName",
		msg: "Contact information (name) is not alphabetic."
	},
	E39_2: {
		flag: "E39",
		value: "2",
		name: "miss_contactName",
		msg: "Contact information (name) is missing."
	},	
	E40_1: {	
		flag: "E40",
		value: "1",
		name: "nonAlphabetic_contactTitle",
		msg: "Contact information (title) is not alphabetic."
	},
	E40_2: {
		flag: "40",
		value: "2",
		name: "miss_contactTitle",
		msg: "Contact information (title) is missing."
	},		
	E41_1: {	
		flag: "E41",
		value: "1",
		name: "nonNumeric_contactPhone",
		msg: "Contact information (phone number) is not numeric."
	},
	E41_2: {
		flag: "41",
		value: "2",
		name: "miss_contactPhone",
		msg: "Contact information (phone number) is missing."
	},	
	E42_2: {	
		flag: "E42",
		value: "2",
		name: "miss_contactFax",
		msg: "Contact information (fax number) is missing."
	},
	E43_41: {	
		flag: "E43",
		value: "41",
		name: "Remark_CrossConst_OperatStatusCheck",
		msg: "Operating status is checked as 'in operation' but description of operation change is not provided."
	},
	
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

//length field validation function
function length_field_check(input, type, config){  
	var lowerbound = eval(config)[type].minlenght;
	var upperbound =eval(config)[type].maxlenght;
    if(input.length >= lowerbound && input.length <=upperbound)
      {  	
	   return true;
      }
    else
      {  	  		
       return false;  	
      }  
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
function test_numberOfShip(numberOfShip, numberOfRowsInF){
	var result = new Object();;
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
		if (!presence_check(numberOfShip) && numberOfRowsInF > 0){ 
			error = "E1_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (numberOfShip == 0 && numberOfRowsInF > 0){ 
			error = "E1_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (numberOfShip > 0 && numberOfRowsInF == 0){ 
			error = "E1_3";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (numberOfShip == 0 && numberOfRowsInF == 0){ 
			if (!presence_check(numberOfShip) && numberOfRowsInF == 0 ){
				error = "E1_4";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
		}
			}
		if (numberOfShip > 100000 && numberOfRowsInF > 0){ 
			error = "E1_5";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if ( numberOfShip > 100000){ 
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
		if (ship_month == 1 && !lkup_linear("lkup30", quarter)){
			error = "S14_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (ship_month == 2 && !lkup_linear("lkup31", quarter)){
			error = "S14_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (ship_month == 3 && !lkup_linear("lkup32", quarter)){
			error = "S14_3";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (ship_month == 4 && !lkup_linear("lkup33", quarter)){
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
			if (lkup_linear("lkup21", sctg.substr(0,2))){
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
			else if (lkup_linear("lkup22", sctg.substr(0,2))){
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
			if (lkup_linear("lkup21", sctg.substr(0,2))){
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
			else if (lkup_linear("lkup22", sctg.substr(0,2))){
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
		if (lkup_linear("lkup23", mode)){
			if(weight > 150){
					error = "S7_1";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
			}
		}	
		if (lkup_linear("lkup24", mode)){ 
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
		if (lkup_linear("lkup25", mode)){
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

function test_sctg(sctg, temp_control, value, weight, state, mode, unna, naics){
	var result = new Object();
	var error;
	var vw_ratio = value/weight;
	var lkup_result = lkup_binary_m("lkup1","sctg", sctg);
	var lkup_naics_sctg = lkup_binary_m("lkup17","2digit_sctg", sctg.substr(0,2));
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
		if (!check_allowed_char(sctg, "numeric", "conf1")){
			error = "S36_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (!length_field_check(sctg, "sctg", "conf1")){
			error = "S36_4";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup_result.found){
			if (lkup_linear("lkup21", sctg.substr(0,2))){
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
			else if (lkup_linear("lkup22", sctg.substr(0,2))){
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
				} else { (lkup_result.data[0].vw_lb < vw_ratio)
							error = "S8_6";
							result.flagname.push((flags)[error].name);
							result.flags.push((flags)[error].flag);
							result.flagval.push((flags)[error].value);
							result.flagmsg.push((flags)[error].msg);
						}
		}
		if (!presence_check(sctg)){
			error = "S3_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup.result.found == false){
			error = "S3_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (sctg.substr(0,2) == 16 && sctg != 16000){
			error = "S3_3";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup_sctg_naics.found){
			if (lkup_sctg_naics.data[0].partial_naics == naics){
				if(lkup_sctg_naics.data[0].edit_flag == "0"){
					error = "S10_0";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
				if (lkup_sctg_naics.data[0].edit_flag == "1"){
					error = "S10_1";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
				if (lkup_sctg_naics.data[0].edit_flag == "2"){
					error = "S10_2";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
				if (lkup_sctg_naics.data[0].edit_flag == "3"){
					error = "S10_3";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			}
		}	
		if (!lkup_linear("lkup6", sctg.substr(0,2))){
			if (!check_char("lkup27", mode)){ 
				error = "S4_1";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
		}
		if (lkup_linear("lkup7", sctg.substr(0,2))){
			if (!check_char("lkup28", mode)){ 
				if (weight>=150){
					error = "S4_2";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			}	
		}
		if (lkup_linear("lkup8", sctg.substr(0,2))){ 
			if (!check_char("lkup28", mode)){
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
			if (!check_char("lkup29", mode)){
				if	(weight>=1000){
					error = "S4_3";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			}
		}
		if (lkup_linear("lkup8", sctg.substr(0,2))){
			if (!check_char("lkup29", mode)){
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
		if (lkup_linear("lkup9", sctg.substr(0,2))){ 
			if (temp_control == "Y"){
					error = "S12_1";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
			}
		} 
		if (lkup_linear("lkup10", sctg.substr(0,2))){ 
			if (temp_control == "Y"){			
				error = "S12_2";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
		}
		if (lkup_linear("lkup11", sctg)){
			if (temp_control == "N"){	
				error = "S12_3";
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

function test_temp_control(temp_control, sctg, mode){
	var result = new Object();
	var error;
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
		if (!lkup_linear("lkup34", temp_control)){
			error = "S11_2";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup_linear("lkup9", sctg.substr(0,2))){ 
			if (temp_control == "Y"){
					error = "S12_1";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
			}
		} 
		if (lkup_linear("lkup10", sctg.substr(0,2))){ 
			if (temp_control == "Y"){			
				error = "S12_2";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
		}
		if (lkup_linear("lkup11", sctg)){
			if (temp_control == "N"){	
				error = "S12_3";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
		}
		if (temp_control == "Y" && mode == 7){	
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
		if (length_field_check(input, "state", "conf1")){
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
	var test1 = lkup_exhaustive_m("lkup4", "zip", zip).data;
	var test2 = {
			"city" : city ,
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
		if (!lkup_exhaustive_m("lkup4", "zip", zip).found){
			error = "S41_22";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}	
		if (lkup_linear("lkup5", zip)){
			error = "S1_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if(!matchObj(test1, test2, "zip")){
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
		if (!lkup_binary_m(mode, "mode", "conf1").found){
			error = "S2_3";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (temp_control == "Y" && mode == 7){	
			error = "S13_1";
			result.flagname.push((flags)[error].name);
			result.flags.push((flags)[error].flag);
			result.flagval.push((flags)[error].value);
			result.flagmsg.push((flags)[error].msg);
		}
		if (lkup_linear("lkup23", mode)){
			if(weight > 150){
					error = "S7_1";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
			}
		}	
		if (lkup_linear("lkup24", mode)){ 
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
		if (lkup_linear("lkup25", mode)){
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
		if (!lkup_linear("lkup6", sctg.substr(0,2))){
			if (!check_char("lkup27", mode)){ 
				error = "S4_1";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
		}
		if (lkup_linear("lkup7", sctg.substr(0,2))){
			if (!check_char("lkup28", mode)){ 
				if (weight>=150){
					error = "S4_2";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			}	
		}
		if (lkup_linear("lkup8", sctg.substr(0,2))){ 
			if (!check_char("lkup28", mode)){
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
			if (!check_char("lkup29", mode)){
				if	(weight>=1000){
					error = "S4_3";
					result.flagname.push((flags)[error].name);
					result.flags.push((flags)[error].flag);
					result.flagval.push((flags)[error].value);
					result.flagmsg.push((flags)[error].msg);
				}
			}
		}
		if (lkup_linear("lkup8", sctg.substr(0,2))){
			if (!check_char("lkup29", mode)){
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
		if (!lkup_linear("lkup34", input)){
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
		if (lkup_linear("lkup26", mode)){
			if (country != "Canada" || country != "Mexico"){
				error = "S16_1";
				result.flagname.push((flags)[error].name);
				result.flags.push((flags)[error].flag);
				result.flagval.push((flags)[error].value);
				result.flagmsg.push((flags)[error].msg);
			}
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

function test_exportMode(input){
	var result = new Object();
	var error;
	result.flagname = [];
	result.flags = [];
	result.flagval = [];
	result.flagmsg = [];
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
		if (lkup_linear("lkup26", mode)){
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
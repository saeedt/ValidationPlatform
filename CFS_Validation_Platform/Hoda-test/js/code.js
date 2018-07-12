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
	console.log(input)
	check_req_char("m.e@test.com","email","conf1");
}

//configuration object for verification functions
var conf1= {
	email: {
		allowed: /[^a-zA-Z0-9!@#$%&'*+-/=?^_`{|}~.]/g,
		not_allowed: /[(),:;<>[\]]/g,
		required: /^.+@{1}.+[.].+$/

	dateFormat: {
		allowed: /[0-9]/g,
		not_allowed: /[A-Za-z`~!@#$%^&*(.)_-=+{|}:;?,<>[\]'"]/g,
		required: /^\d{2}-?\d{2}-?\d{4}$/
	},	
	
	unnaNumber: {
		allowed: /[0-9]/g
		not_allowed: /[A-Za-z`~!@#$%^&*(.)_-=+{|}:;?,<>[\]'"]/g,
		required: /^\d{4}$/
	},
	
	sctgCode: {
		allowed: /[0-9]/g
		not_allowed: /[A-Za-z`~!@#$%^&*(.)_-=+{|}:;?,<>[\]'"]/g,
		required: /^\d{5}$/
	}

//Variables for lookup tables
var lkup1_HAZMAT = [
	{
		"HAZMAT_descr" : "Acetal",
		"unna_code"	: "1088"
	},		
	{	
		"HAZMAT_descr" : "Acetaldehyde", 
		"unna_code" : "1089"
	},
	{
		"HAZMAT_descr" : "Acetaldehyde ammonia", 
		"unna_code" : "1841"
	},
	{	
		"HAZMAT_descr" : "Acetaldehyde oxime", 
		"unna_code" : "2332"
	},		
	{	
		"HAZMAT_descr" : "Acetone", 
		"unna_code" : "1090"
	}
];		

var lkup2_sctg = [
	{
		"sctg_descr" : "Wheat",
		"sctg_code" : "02100"
	},
	{	
		"sctg_descr" : "Rye",
		"sctg_code" : "02901"
	},
	{
		"sctg_descr" : "Barley",
		"sctg_code" : "02902" 	
	},
	{
		"sctg_descr" : "Oats",
		"sctg_code" : "02903" 	
	},
	{
		"sctg_descr" : "Grain sorghum",
		"sctg_code" : "02904" 	
	}				
];	

var lkup3_mode = [
	{
		"mode_descr" : "Railroad",
		"mode_code" : "4"
	},
	{	
		"mode_descr" : "Inland water",
		"mode_code" : "5"
	},
	{
		"mode_descr" : "Deep sea",
		"mode_code" : "6"
	},
	{
		"mode_descr" : "Pipeline",
		"mode_code" : "7"
	},
	{
		"mode_descr" : "Air",
		"mode_code" : "8"
	}
];					

var lkup4_city_state_zip = [
	{
		"city" : "Agawam",
		"state" : "MA",
		"zip" : "01001"
	},
	{
		"city" : "Amherst",
		"state" : "MA",
		"zip" : "01002"
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

var lkup5_overseas_military_zip = ["13101", "13109", "13200", "13300", "13910"];

var lkup6_inv_sctg_mode7 = ["17110", "17120", "17201", "17202", "17500"];

var lkup7_inv_sctg_mode1_weight150 = ["02100", "02200", "02902", "02903", "02904"];

var lkup8_inv_sctg_mode1_weight150_AK = ["17110", "17120", "17201", "17202", "17500"];
 	
var lkup9_inv_sctg_mode8_weight1000 = ["41130", "41210", "41220", "41291", "41299"];
	
var lkup10_inv_sctg_mode8_weight1000_AK = ["17110", "17120", "17201", "17202", "17500"];
	
var lkup13_inv_sctg_tempContY = ["10010", "10020", "11010", "11020", "12011"];
	
var lkup15_inv_sctg_tempContN = ["01009", "03100", "03211", "03219", "03311"];

var lkup16_inv_sctg_missUnna = ["08310", "08410", "17110", "17120", "17201"]; 
	
var lkup17_sctg_unna = ["08310", "08410", "17110", "17120", "17201"];

var lkup18_city_canada = ["Abbey", "Abbotsford", "Abercorn", "Aberdeen", "Abernethy"] ;
	
var lkup19_city_mexico = ["Aconchi", "Acteopan", "Acuamanala", "Acuitlapan", "Acula"];

//error flags objects
var flags = {
	overseas_military_zip: {
		flag: "S1",
		value: "1",
		msg: "Please enter a valid zipcode."
	},	
	inv_zip_state: {
		flag: "S1",
		value: "2",
		msg: "Please enter a valid zipcode for state selected."
	},
	inv_mode: {
		flag: "S2",
		value: "3",
		msg: "Please provide a valid transport mode including multimode."
	},
	sctg_16xxx: {
		flag: "S3",
		value: "3",
		msg: "You have entered an invalid SCTG code. Please enter a valid code."
	},	
	inv_sctg_mode7: {
		flag: "S4",
		value: "1",
		msg: "Please enter a valid commodity code for mode provided."
	},
	inv_sctg_mode1_weight150_orAK: {
		flag: "S4",
		value: "2",
		msg: "Please enter a valid commodity code for mode, weight and state provided."
	},
	inv_sctg_mode8_weight1000_orAK: {
		flag: "S4",
		value: "3",
		msg: "Please enter a valid commodity code for mode, weight and state provided."
	},
	zero_ship_value: {
		flag: "S5",
		value: "2",
		msg: "Please provide a shipment value."
	},
	negative_ship_value: {
		flag: "S5",
		value: "3",
		msg: "Please provide a shipment value."
	},
	zero_ship_weight: {
		flag: "S6",
		value: "2",
		msg: "Please provide a shipment weight."
	},
	negative_ship_weight: {
		flag: "S6",
		value: "3",
		msg: "Please provide a shipment weight."
	},
	maxWeight_threshold_mode: {
		flag: "S7",
		value: "1",
		msg: "Please enter a valid shipment weight. Weight exceeds maximum weight for mode provided."
	},
	minWeight_threshold_mode: {
		flag: "S7",
		value: "2",
		msg: "Please enter a valid shipment weight. Weight is less than minimum weight for mode provided."
	},
	valueW_sctg_lessThanExpected: {
		flag: "S8",
		value: "1",
		msg: "Please provide a valid shipment value. Shipment value to weight ratio is less than excpected for SCTG provided."
	},
	valueW_sctg_greaterThanExpected: {
		flag: "S8",
		value: "2",
		msg: "Please provide a valid shipment value. Shipment value to weight ratio is greater than excpected for SCTG provided."
	},
	valueW_sctg16_17_18_lessThanExpected: {
		flag: "S8",
		value: "3",
		msg: "Please provide a valid shipment value. Shipment value to weight ratio is less than excpected for SCTG provided."
	},
	valueW_sctg16_17_18_greaterThanExpected: {
		flag: "S8",
		value: "4",
		msg: "Please provide a valid shipment value. Shipment value to weight ratio is greater than excpected for SCTG provided."
	},
	valueW_allSctg_lessThanExpected: {
		flag: "S8",
		value: "5",
		msg: "Please provide a valid shipment value. Shipment value to weight ratio is less than excpected for SCTG provided."
	},
	valueW_allSctg_greaterThanExpected: {
		flag: "S8",
		value: "6",
		msg: "Please provide a valid shipment value. Shipment value to weight ratio is greater than excpected for SCTG provided."
	},
	sctg_balnk_unna: {
		flag: "S9",
		value: "1",
		msg: "Please enter the 4-digit 'UN' or 'NA' number for commodity code provided."
	},
	notAllowed_sctg_unna: {
		flag: "S9",
		value: "3",
		msg: "Please provide a valid 'UN' or 'NA' code for commodity code provided."
	},
	inv_sctg_unna: {
		flag: "S9",
		value: "4",
		msg: "Please provide a valid 'UN' or 'NA' code for commodity code provided."
	}, 
	sctg_naics_provisionalPass: {
		flag: "S10",
		value: "1",
		msg: "Provisional pass (NAICS/SCTG)"
	},//Not sure about the error message
	sctg_naics_provisionalStop: {
		flag: "S10",
		value: "2",
		msg: "Provisional stop (NAICS/SCTG)"
	},//Not sure about the error message
	sctg_naics_automaticStop: {
		flag: "S10",
		value: "3",
		msg: "Automatic stop (NAICS/SCTG)"
	},//Not sure about the error message
//I excluded the edit flag S11 since its rules are defined by our own validation flags.	
	inv_sctg_tempContY: {
		flag: "S12",
		value: "1",
		msg: "Please provide a valid commodity code for temperature controlled shipment selected."
	},
	inv_sctg_tempContN: {
		flag: "S12",
		value: "3",
		msg: "Please provide a valid commodity code if the shipment is not temperature controlled."
	},
	mode7_tempContY: {
		flag: "S13",
		value: "1",
		msg: "Please provide a valid transport mode for temperature controlled shipment selected."
	},
	ship_date_quarter1: {
		flag: "S14",
		value: "1",
		msg: "Please provide a shipment date within the reporting period."
	},
	ship_date_quarter2: {
		flag: "S14",
		value: "2",
		msg: "Please provide a shipment date within the reporting period."
	},
	ship_date_quarter3: {
		flag: "S14",
		value: "3",
		msg: "Please provide a shipment date within the reporting period."
	},
	ship_date_quarter4: {
		flag: "S14",
		value: "4",
		msg: "Please provide a shipment date within the reporting period."
	},
	autoFill_error1: {
		flag: "S15",
		value: "1",
		msg: "Edit flag value indicated the number of variables that fail the edit."
	},//Not sure about the error message
	autoFill_error2: {
		flag: "S15",
		value: "2",
		msg: "Edit flag value indicated the number of variables that fail the edit."
	},//Not sure about the error message
	autoFill_error3: {
		flag: "S15",
		value: "3",
		msg: "Edit flag value indicated the number of variables that fail the edit."
	},//Not sure about the error message
	autoFill_error4: {
		flag: "S15",
		value: "4",
		msg: "Edit flag value indicated the number of variables that fail the edit."
	},//Not sure about the error message
	autoFill_error5: {
		flag: "S15",
		value: "5",
		msg: "Edit flag value indicated the number of variables that fail the edit."
	},//Not sure about the error message
	autoFill_error6: {
		flag: "S15",
		value: "6",
		msg: "Edit flag value indicated the number of variables that fail the edit."
	},//Not sure about the error message
	inv_mode_exportCountry: {
		flag: "S16",
		value: "1",
		msg: "Please enter a valid mode for country provided."
	},//When export mode is 2, 3 or 4 and export country is not Mexico or Canada. 
	inv_exportCity_country: {
		flag: "S17",
		value: "1",
		msg: "Please enter a valid city for country provided."
	},
	inv_exportCountry: {
		flag: "S17",
		value: "2",
		msg: "Please provide a valid country."
	},
	blank_numberOf_ship: {
		flag: "S30",
		value: "2",
		msg: "You entered 0 shipments. If this is not correct, please change your response."
	},
	zero_numberOf_ship: {
		flag: "S30",
		value: "6",
		msg: "You entered 0 shipments. If this is not correct, please change your response."
	},
	max_numberOf_ship: {
		flag: "S30",
		value: "20",
		msg: "You entered more than 100,000 shipments. If this is not correct, please change your response."
	},
	blank_tot_ship_value: {
		flag: "S31",
		value: "2",
		msg: "Please provide total value of shipments. Estimates are acceptable."
	},
	zero_tot_ship_value: {
		flag: "S31",
		value: "6",
		msg: "Please provide total value of shipments. Estimates are acceptable."
	},
	tot_ship_value_atv_sum: {
		flag: "S31",
		value: "28",
		msg: ""
	},//Not sure about the message for the error: ATV =  SUM ( YEARWGT * QTRWGT * WEEKWGT * SHIP_VALUE )
	tot_ship_value_atv_valueWeek_1billion: {
		flag: "S31",
		value: "29",
		msg: ""
	},//Not sure about the message for the error: (ATV*1000)–(TOT_VALUE_WEEK*52))|>$1 Billion and (TOT_VALUE_WEEK*52) / (ATV*1000)| < 0.2 or > 5, reference look up table Total-value-week and ATV
	tot_ship_value_atv_valueWeek_20million: {
		flag: "S31",
		value: "30",
		msg: ""
	},//Not sure about the message for the error: |(ATV*1000)–(TOT_VALUE_WEEK*52)|>$20 Million or ESTAB_WEIGHT>5] and |(TOT_VALUE_WEEK*52) / (ATV*1000)| < 0.1 or > 10
	checkBox_moreThan_40ship: {
		flag: "S32",
		value: "2",
		msg: "Please make a selection."
	},
	checkBox_moreThan_40ship_numberOfShip: {
		flag: "S32",
		value: "40",
		msg: "The total number of shipments entered should be ''. Please verify the number of shipments entered."
	},
	blank_ship_ID: {
		flag: "S33",
		value: "2",
		msg: "Please provide a shipment ID number."
	},
	blank_numberOf_ship_reported: {
		flag: "S34",
		value: "2",
		msg: "You entered 0 shipments. If this is not correct, please change your response."
	},
	numberOf_ship_reported_atv_mos_1billion: {
		flag: "S34",
		value: "28",
		msg: ""
	},//Not sure about the message for the error: |ATV - MOS| > $1 billion and (MOS/ATV) is < 0.2 or > 5
	numberOf_ship_reported_atv_mos_20million: {
		flag: "S34",
		value: "29",
		msg: ""
	},//Not sure about the message for the error: [|ATV - MOS| > $20 million or Estab Wgt > 5] and ratio of (MOS/ATV) < 0.1 or > 10
	blank_ship_date_month: {
		flag: "S35",
		value: "2",
		msg: "Please provide a shipment date."
	},
	inv_ship_date_month: {
		flag: "S35",
		value: "20",
		msg: "Please provide a shipment date within the reporting period."
	},
	blank_ship_date_day: {
		flag: "S36",
		value: "2",
		msg: "Please provide a shipment date."
	},
	inv_ship_date_day: {
		flag: "S36",
		value: "20",
		msg: "Please provide a shipment date within the reporting period."
	},
	blank_ship_value: {
		flag: "S37",
		value: "2",
		msg: "Please provide a shipment value."
	},
	ship_value_atv_sum: {
		flag: "S37",
		value: "28",
		msg: ""
	},//Not sure about the message for the error: ATV =  SUM ( YEARWGT * QTRWGT * WEEKWGT * SHIP_VALUE )
	ship_value_atv_valueWeek_1billion: {
		flag: "S37",
		value: "29",
		msg: ""
	},//Not sure about the message for the error: (ATV*1000)–(TOT_VALUE_WEEK*52))|>$1 Billion and (TOT_VALUE_WEEK*52) / (ATV*1000)| < 0.2 or > 5, reference look up table Total-value-week and ATV
	ship_value_atv_valueWeek_20million: {
		flag: "S37",
		value: "30",
		msg: ""
	},//Not sure about the message for the error: |(ATV*1000)–(TOT_VALUE_WEEK*52)|>$20 Million or ESTAB_WEIGHT>5] and |(TOT_VALUE_WEEK*52) / (ATV*1000)| < 0.1 or > 10
	blank_ship_weight: {
		flag: "S38",
		value: "2",
		msg: "Please provide a shipment weight."
	},
	vWeight_sctg_lessThanExpected: {
		flag: "S38",
		value: "34",
		msg: "Please provide a valid shipment weight. Shipment value to weight ratio is less than excpected for SCTG provided."
	},
	vWeight_sctg_greaterThanExpected: {
		flag: "S38",
		value: "35",
		msg: "Please provide a valid shipment weight. Shipment value to weight ratio is greater than excpected for SCTG provided."
	},
	vWeight_sctg16_17_18_lessThanExpected: {
		flag: "S38",
		value: "36",
		msg: "Please provide a valid shipment weight. Shipment value to weight ratio is less than excpected for SCTG provided."
	},
	vWeight_sctg16_17_18_greaterThanExpected: {
		flag: "S38",
		value: "37",
		msg: "Please provide a valid shipment weight. Shipment value to weight ratio is greater than excpected for SCTG provided."
	},
	vWeight_allSctg_lessThanExpected: {
		flag: "S38",
		value: "38",
		msg: "Please provide a valid shipment weight. Shipment value to weight ratio is less than excpected for SCTG provided."
	},
	vWeight_allSctg_greaterThanExpected: {
		flag: "S38",
		value: "39",
		msg: "Please provide a valid shipment weight. Shipment value to weight ratio is greater than excpected for SCTG provided."
	},
	ship_weight_mode0: {
		flag: "S38",
		value: "40",
		msg: "Please provide a valid shipment weight for the mode selected."
	},//If mode = 0 (Unknown mode), then shipments will be converted to 3 or 4 based on shipment weight.
	ship_weight_lessThanOrEqualTo_80000_mode0: {
		flag: "S38",
		value: "41",
		msg: "Please provide a valid shipment weight for the mode selected."
	},//If weight ≤ 80,000 lbs, then mode 0 will be converted to 3 (for-hire truck).
	ship_weight_greaterThan_80000_mode0: {
		flag: "S38",
		value: "42",
		msg: "Please provide a valid shipment weight for the mode selected."
	},//If weight > 80,000 lbs, then mode 0 will be coveted to 4 (rail).
	ship_weight_mode9: {
		flag: "S38",
		value: "43",
		msg: "Please provide a valid shipment weight for the mode selected."
	},//If mode = 9 (Other mode), then shipments will likely be converted to 3 or 4 based on shipment weight.
	blank_sctg: {
		flag: "S39",
		value: "2",
		msg: "Please provide a commodity code."
	},
	sctg_not5digit: {
		flag: "S39",
		value: "3",
		msg: "You have entered an invalid SCTG code. Please enter a valid code."
	},
	sctg_vw_lessThanExpected: {
		flag: "S39",
		value: "34",
		msg: "Please provide a valid SCTG code. Shipment value to weight ratio is less than excpected for SCTG provided."
	},
	sctg_vw_greaterThanExpected: {
		flag: "S39",
		value: "35",
		msg: "Please provide a valid SCTG code. Shipment value to weight ratio is greater than excpected for SCTG provided."
	},
	sctg16_17_18_vw_lessThanExpected: {
		flag: "S39",
		value: "36",
		msg: "Please provide a valid SCTG code. Shipment value to weight ratio is less than excpected for SCTG provided."
	},
	sctg16_17_18_vw_greaterThanExpected: {
		flag: "S39",
		value: "37",
		msg: "Please provide a valid SCTG code. Shipment value to weight ratio is greater than excpected for SCTG provided."
	},
	allSctg_vw_lessThanExpected: {
		flag: "S39",
		value: "38",
		msg: "Please provide a valid SCTG code. Shipment value to weight ratio is less than excpected for SCTG provided."
	},
	allSctg_vw_greaterThanExpected: {
		flag: "S39",
		value: "39",
		msg: "Please provide a valid SCTG code. Shipment value to weight ratio is greater than excpected for SCTG provided."
	},
	nonAlphabetic_sctg_descr: {
		flag: "S40",
		value: "1",
		msg: "Please provide a valid commodity description."
	},//When commodity description is not an alphabetic value.
	blank_sctg_descr: {
		flag: "S40",
		value: "2",
		msg: "Please provide a commodity description."
	},
	inv_sctg_descr: {
		flag: "S40",
		value: "5",
		msg: "Please provide a valid commodity description."
	},//When commodity description has invalid characters.
	blank_temp_cont: {
		flag: "S41",
		value: "2",
		msg: "Please make a selection."
	},
	inv_tempContY_sctg: {
		flag: "S41",
		value: "34",
		msg: "Please provide a valid commodity code for temperature controlled shipment selected."
	},
	inv_tempContN_sctg: {
		flag: "S41",
		value: "35",
		msg: "Please provide a valid commodity code if the shipmnet is not temperature controlled."
	},
	unna_not4digit: {
		flag: "S42",
		value: "3",
		msg: "You have entered an invalid 'UN' or 'NA' code. Please enter a valid code."
	},
	inv_unna: {
		flag: "S42",
		value: "22",
		msg: "You have entered an invalid 'UN' or 'NA' code. Please enter a valid code."
	},
	tempContY_mode7: {
		flag: "S42",
		value: "28",
		msg: "Please provide a valid transport mode for temperature controlled shipment selected."
	},
	balnk_unna_sctg: {
		flag: "S42",
		value: "34",
		msg: "Please enter the 4-digit 'UN' or 'NA' number for commodity code provided."
	},
	unna_notAllowed_sctg: {
		flag: "S42",
		value: "35",
		msg: "Please provide a valid 'UN' or 'NA' code for commodity code provided."
	},
	inv_unna_sctg: {
		flag: "S42",
		value: "36",
		msg: "Please provide a valid 'UN' or 'NA' code for commodity code provided."
	}, 
	nonAlphabetic_destinationCity: {
		flag: "S43",
		value: "1",
		msg: "Please provide a valid destination city."
	},
	blank_destinationCity: {
		flag: "S43",
		value: "2",
		msg: "Please provide a destination city."
	},
	inv_destinationCity: {
		flag: "S43",
		value: "22",
		msg: "Please provide a valid destination city."
	},
	blank_destinationState: {
		flag: "S44",
		value: "2",
		msg: "Please provide a destination state."
	},
	inv_destinationState_zip: {
		flag: "S44",
		value: "34",
		msg: "Please enter a valid zipcode for state selected."
	},
	blank_destinationZip: {
		flag: "S45",
		value: "2",
		msg: "Please enter a valid zipcode for state selected."
	},
	destinationZip_not5digit: {
		flag: "S45",
		value: "3",
		msg: "Please enter a valid zipcode for state selected."
	},
	blank_mode: {
		flag: "S46",
		value: "2",
		msg: "Please provide a transport mode."
	},
	blank_mode: {
		flag: "S46",
		value: "22",
		msg: "Please provide a transport mode."
	},
	mode7_inv_sctg: {
		flag: "S46",
		value: "28",
		msg: "Please enter a valid commodity code for mode provided."
	},
	mode_maxWeight_threshold: {
		flag: "S46",
		value: "29",
		msg: "Please enter a valid transport mode. Weight exceeds maximum weight for mode provided."
	},
	mode_minWeight_threshold: {
		flag: "S46",
		value: "30",
		msg: "Please enter a valid transport mode. Weight is less than minimum weight for mode provided."
	},
	mode7_inv_sctg: {
		flag: "S46",
		value: "34",
		msg: "Please enter a valid transport mode for SCTG code provided."
	},
	mode1_inv_sctg_weight150_orAK: {
		flag: "S46",
		value: "35",
		msg: "Please enter a valid transport mode for SCTG code, weight and state provided."
	},
	mode8_inv_sctg_weight1000_orAK: {
		flag: "S46",
		value: "36",
		msg: "Please enter a valid transport mode for SCTG code, weight and state provided."
	},
	inv_mode_sctg: {
		flag: "S46",
		value: "40",
		msg: "Please enter a valid transport mode for SCTG code provided."
	},
	checkbox_export: {
		flag: "S47",
		value: "2",	
		msg: "Please make a selection."
	},
	nonAlphabetic_exportCity: {
		flag: "S48",
		value: "1",
		msg: "Please provide a valid city."
	},
	blank_exportCity: {
		flag: "S48",
		value: "2",
		msg: "Please provide a city."
	},
	nonAlphabetic_exportCountry: {
		flag: "S49",
		value: "1",
		msg: "Please provide a valid country."
	},
	blank_exportCountry: {
		flag: "S49",
		value: "2",
		msg: "Please provide a country."
	},
	inv_exportCountry_mode: {
		flag: "S49",
		value: "28",
		msg: "Please provide a valid country for mode selected."
	},
	blank_exportMode: {
		flag: "S50",
		value: "2",
		msg: "Please provide an export mode."
	},	
};

//returns true if the string only has the allowed characters
function check_allowed_char(input,type,config){
	var filter = eval(config)[type].allowed;
	console.log(!filter.test(input));
	return(!filter.test(input));
}

//returns true if the string contains any illegal characters
function check_invalid_char(input, type, config){
	var filter = eval(config)[type].not_allowed;
	console.log(filter.test(input));
	return(filter.test(input));
}

//returns true if the string contains all required characters
function check_req_char(input, type, config){
	var filter = eval(config)[type].required;
	console.log(filter.test(input));
	return(filter.test(input));
}

//returns true if the date only has the allowed characters
function date_format(input, type, config){
	var filter = eval(config)[type].allowed;
	console.log(!filter.test(input));
	return(!filter.test(input));
}  

//returns true if the date contains any illegal characters
function date_format(input, type, config){
	var filter = eval(config)[type].not_allowed;
	console.log(filter.test(input));
	return(filter.test(input));
}

//returns true if the date matches the mm-dd-yyyy format
function date_format(input, type, config){
	var filter = eval(config)[type].required;
	console.log(filter.test(input));
	return(filter.test(input));
}

//returns true if the UNNA number only has the allowed characters
function unnaNumber(input, type, config){
	var filter = eval(config)[type].allowed;
	console.log(!filter.test(input));
	return(!filter.test(input))
}  

//returns true if the UNNA number contains any illegal characters
function unnaNumber(input, type, config){
	var filter = eval(config)[type].not_allowed;
	console.log(filter.test(input));
	return(filter.test(input));
} 
 
//returns true if the UNNA number matches the 4-digit format
function unnaNumber(input, type, config){
	var filter = eval(config)[type].required;
	console.log(filter.test(input));
	return(filter.test(input));
  
//returns true if the SCTG commodity code only has the allowed characters
function sctgCode(input, type, config){
	var filter = eval(config)[type].allowed;
	console.log(!filter.test(input));
	return(!filter.test(input))
} 

//returns true if the SCTG commodity code contains any illegal characters
function sctgCode(input, type, config){
	var filter = eval(config)[type].not_allowed;
	console.log(filter.test(input));
	return(filter.test(input));
} 

//returns true if the SCTG commodity code matches the 5-digit format
function sctgCode(input, type, config){
	var filter = eval(config)[type].required;
	console.log(filter.test(input));
	return(filter.test(input));
}

//Binary search function

function binarySearch(array,target) {

	let min = array[0];//minimum index of array elements
	let max = array.length - 1;//maximum index of array elements
	let guess;//index where we search for a value
	
	while(max => min) {
		guess = Math.floor((min + max) / 2 );
		if (array [guess] === target) { 
			return guess;
			}
		else 
			if (array [guess] < target) { 
			max = guess - 1;
			 }
		else {
			min = guess + 1;
			}
	}
		return -1;
}


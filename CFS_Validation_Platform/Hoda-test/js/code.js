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
};
//Variables for lookup tables
var lkup1_unna = [
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

var lkup6_invSctg_mode7 = ["17110", "17120", "17201", "17202", "17500"];

var lkup7_invSctg_mode1_weight150 = ["02100", "02200", "02902", "02903", "02904"];

var lkup8_invSctg_mode1_weight150_AK = ["17110", "17120", "17201", "17202", "17500"];
 	
var lkup9_invSctg_mode8_weight1000 = ["41130", "41210", "41220", "41291", "41299"];
	
var lkup10_invSctg_mode8_weight1000_AK = ["17110", "17120", "17201", "17202", "17500"];
	
var lkup13_invSctg_tempContY = ["10010", "10020", "11010", "11020", "12011"];
	
var lkup15_invSctg_tempContN = ["01009", "03100", "03211", "03219", "03311"];

var lkup16_invSctg_missUnna = ["08310", "08410", "17110", "17120", "17201"]; 
	
var lkup17_sctg_unna = ["08310", "08410", "17110", "17120", "17201"];

var lkup18_city_canada = ["Abbey", "Abbotsford", "Abercorn", "Aberdeen", "Abernethy"] ;
	
var lkup19_city_mexico = ["Aconchi", "Acteopan", "Acuamanala", "Acuitlapan", "Acula"];

//error flags object
var flags = {
	missing_req_char: {
		flag: "",
		msg: ""
	},	
	invalid_char: {
		flag: "",
		msg: ""
	}
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
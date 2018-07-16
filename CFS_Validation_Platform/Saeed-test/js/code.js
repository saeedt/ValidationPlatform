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
	//check_req_char("m.e@test.com","email","conf1");
	//check_allowed_char("PtO1?", "shippingAdress", "conf1");
	//console.log(lkup_exhaustive("city_state_zip","zip","01002"));
	console.log(lkup_binary("city_state_zip","zip","01009"));
}

//configuration object for verification functions
var conf1= {
	email: {
		allowed: /[^a-zA-Z0-9!@#$%&'*+-/=?^_`{|}~.]/g,
		not_allowed: /[(),:;<>[\]]/g,
		required: /^.+@{1}.+[.].+$/
	},
	shippingAdress: {
		allowed: /[^a-zA-Z0-9 _.-]/g,
		not_allowed: /(P_O_|P.O_|P..B|P.O_|P.O.|PO_B|PO_D|POB_|POST)/g,
		required: /^.*/
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
	alphnumeric:{
		allowed: /[^0-9a-zA-Z+$,():;<>[\ ]]/g,
		not_allowed: /^.*/,
		required:/^.*/
	}	
}
//error flags object
var flags = {
	sctg_blank: {
		flag: "S3",
		value:"1",
		msg: "SCTG field is blank"
	},	
	invalid_char: {
		flag: "",
		msg: ""
	}
}

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

//test lookup table
var city_state_zip = [
	{	"city" : "Agawam",
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
//lookup based on exhaustive
function lkup_exhaustive(table,column,index){
	var list = eval(table);
	var result = list[0];
	result.found = false;
	for (var i = 0; i < list.length; i++){
		if ((list[i])[column] == index){
			result = list[i];
			result.found = true;
			break;
		}
	}
	return result;
}

function lkup_binary(table,column,index){
	var list = eval(table);	
	var l_Index = 0;
	var h_Index = list.length-1;
	var m_Index;
	var result = list[l_Index];
	result.found = false;
	//console.log("initial assignment: "+ result);
	while (l_Index < h_Index -1) {
    	m_Index = l_Index + Math.floor((h_Index - l_Index)/2);
    	if (parseInt((list[m_Index])[column]) == parseInt(index)){
    		result = list[m_Index];
    		result.found = true;
			break;
    	} else if (parseInt((list[m_Index])[column]) < parseInt(index)) {
    		l_Index = m_Index;
    	} else {
    		h_Index = m_Index;
    	}
    }	
	return result;
}
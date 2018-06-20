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
/*
	check_allowed_char("poboxjjh 2.apt b_11b-12", "shippingAdress", conf1)
	check_invalid_char("mn2hhhh", "shippingAdress", conf1)
	check_req_char("mn2P_O_hhhh", "shippingAdress", conf1)
	check_allowed_char("123", "phone", conf1)
	check_invalid_char("mn2hhhh", "phone", conf1)
	check_req_char("740-818-8807", "phone", conf1)
	console.log(Empty_not_allowed(""))
	allnumeric("2333","numeric",conf1)
	alphabetic("sax ds","alphabetic",conf1)
	alphnumeric("sax()<vvv:ds","alphnumeric",conf1)
	
	console.log(lengthRange("ohe", "state", conf2))
	console.log(lengthRange("25368544", "zipcode", conf2))
	console.log(lengthRange("2536854422222", "faxnum", conf2))
	
	*/
	console.log(lkup6( "4231","Belgium", "BE"))
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
	},
	shippingAdress: {
		allowed: /[^a-zA-Z0-9 _.-]/g,
		not_allowed: /(P_O_|P.O_|P..B|P.O_|P.O.|PO_B|PO_D|POB_|POST)/g,
		required: /^.*/
	},
	phone:{
		allowed: /[^0-9+$]/g,
		not_allowed: /^.*/,
		required:/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/g,
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
	missing_req_char: {
		flag: "",
		msg: ""
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



//*check whether a field is empty or not 
function Empty_not_allowed(input) 	
{	
	if (input.length == 0)
	{ 
		return false;
	}  	
   return true; 
} 


//validating for numeric field

//returns true if the string only has the allowed characters
function allnumeric(input,type,config){
	var filter = eval(config)[type].allowed;
	console.log(!filter.test(input));
	return(!filter.test(input));
}

//Validating for alphabetic field

function alphabetic(input,type,config){
	var filter = eval(config)[type].allowed;
	console.log(!filter.test(input));
	return(!filter.test(input));
}

// validating for alphanumeric( letters and numbers)

function alphnumeric(input,type,config){
	var filter = eval(config)[type].allowed;
	console.log(!filter.test(input));
	return(!filter.test(input));
	
}
	
// lenght field validation
var conf2= {
		state: {
			minlenght:2 ,
			maxlenght:2
				},
		zipcode: {
			minlenght:10 ,
			maxlenght:10	
			},
		faxnum: {
				minlenght:0 ,
				maxlenght:10	
				}


}
 function lengthRange(input, type, config){  
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
 /*
 



// check the input data to be an integer number (method 1)
			
function isInteger(x) {
		    return x % 1 === 0;
		}
// check the input data to be an integer number (method 2)
function isInteger(x) {
    return Math.round(x) === x;
}
    





// look up tables 

// define config for look up tables

var conf3:{
	lookup1: {
		sheets rows header... ,
		
			}, 
	lookup2: 	
}

*/
function lkup6(zipecode, city, state){
	var workbook = new Excel.Workbook();
	workbook.xlsx.readfile("C:\Users\sa129715\git\ValidationPlatform\CFS_Validation_Platform\Sara-test\js\LKUP.xlsx");
	var worksheet = workbook.getWorksheet("LKUP6");
	var check;
	var a;
	var b;
	var c;
	var i;
	for (i = 2; i <= worksheet['!range'].e.r; i++)
	{
		a = worksheet.Cells(i,1).Value;
		b = worksheet.Cells(i,2).Value;
		c = worksheet.Cells(i,3).Value;
		if (a == zipecode&& b == city && c == state)
		{  	
			check = 1;
			}
			else
			{  	  		
			check = 0;  	
		} 
	}
	if (check == 1)
	{  	
		return true;
		}
		else
		{  	  		
		return false;  	
	} 
}


    
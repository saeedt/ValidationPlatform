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
<<<<<<< HEAD
	check_invalid_char("p.obox", "shippingAdress", conf1)
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
	
	
	console.log(lkup6( "4231","Belgium", "BE"))

	console.log(lkup("00501","Holtsville","NY")
	
	console.log(lkup("Florida","FL")
		
	console.log(lkup("Belgium","7210","Ak")	
			)
			
	console.log(lkup("2"))
	*/
	
=======
	check_invalid_char("mn2hhhh", "shippingAdress", conf1)
	check_req_char("mn2P_O_hhhh", "shippingAdress", conf1)
	check_allowed_char("123", "phone", conf1)
	check_invalid_char("mn2hhhh", "phone", conf1)
	check_req_char("740-818-8807", "phone", conf1)
	console.log(Empty_not_allowed(""))
	allnumeric("2333","numeric",conf1)
	alphabetic("sax ds","alphabetic",conf1)
	alphnumeric("sax()<vvv:ds","alphnumeric",conf1)
	*/
	console.log(lengthRange("ohe", "state", conf2))
	console.log(lengthRange("25368544", "zipcode", conf2))
	console.log(lengthRange("2536854422222", "faxnum", conf2))
>>>>>>> branch 'master' of https://github.com/saeedt/ValidationPlatform
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
<<<<<<< HEAD

var conf1= {
	email: {
		allowed: /[^a-zA-Z0-9!@#$%&'*+-/=?^_`{|}~.]/g,
		not_allowed: /[(),:;<>[\]]/g,
		required: /^.+@{1}.+[.].+$/
	},
	shippingAdress: {
		allowed: /[^a-zA-Z0-9 _.-]/g,
		not_allowed: /(P_O_|P[.]O_|P[..]B|P[.]O_|P[.]O[.]|PO_B|PO_D|POB_|POST)/g,
		required: /^.*/
/*
	},
	phone:{
		allowed: /[^0-9+$]/g,
		//not_allowed: /^.*/ 
	//	required:/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/g,
	//},
	/*
	numeric:{
		allowed: /[^0-9+$]/g,
		not_allowed: /^.*/
		//required:/^.*/
	//},
	//alphabetic:{
		//allowed: /[^A-Za-z+$ ]/g,
		//not_allowed: /^.*/,
		//required:/^.*/
	//},
	//alphnumeric:{
	//	allowed: /[^0-9a-zA-Z+$,():;<>[\ ]]/g,
		//not_allowed: /^.*/,
		//required:/^.*/
	//} 
//}

/*

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
/*
var conf3:{
	lookup1: {
		sheets rows header... ,
		
			}, 
	lookup2: 	
}

*/


/*
var conf3= 
{ "lkup4" :[
		{
		"zipeCode": "00501" ,
		"city": "Holtsville", 
		"state": "NY" 
			}, 
			{
		"zipeCode": "00544", 
		"city": "Holtsville", 
		"state": "NY", 
			}, 
			{
		"zipeCode": "01001", 
		"city": "Agawam", 
		"state": "MA", 
			},
			{
		"zipeCode": "01002", 
		"city": "Amherst", 
		"state": "MA", 
			},
			{
		"zipeCode": "01003", 
		"city": "Amherst", 
		"state": "MA", 
			}
			]
		
}
console.log(object.keys(conf3[lkup4]));

*/

// lookup6


var lkup6 = [
    		{
    	"zipeCode": "00501" ,
    	"city": "Holtsville", 
    	"state": "NY" 
    		}, 
    		{
    	"zipeCode": "00544", 
    	"city": "Holtsville", 
    	"state": "NY", 
    		}, 
    		{
    	"zipeCode": "01001", 
    	"city": "Agawam", 
    	"state": "MA", 
    		},
    		{
    	"zipeCode": "01002", 
    	"city": "Amherst", 
    	"state": "MA", 
    		},
    		{
    	"zipeCode": "01003", 
    	"city": "Amherst", 
    	"state": "MA", 
    		}
    ]
   






	
	// lookup table function for LKUp6
	
function lkup(a,b,c){
	var a;
	var b;
	var c;
	var check;
	check = 0;
	for (i = 0; i < lkup6.length; i++){
		if (a == lkup6[i].zipeCode) {
			check = 1
			if (b == lkup6[i].city) {
				if (c == lkup6[i].state) {
					return true;
				}
				else {
					console.log("State not found!");
				}
			}
			else {
				console.log("City not found!");
			}
		}
	}
	if (check == 0){
		console.log("Zipcode not found!");
	}
}
	
// function for lkup4
var lkup4 = [
	{
		"state": "Alabama" ,
		"postalCode": "AL", 
 	}, 
	{
 		"state": "Alaska" ,
 		"postalCode": "AK", 
	},
	{
		"state": "Arizona" ,
		"postalCode": "AR", 
	},
	{
		"state": "California" ,
		"postalCode": "CA", 
			 
	},
	{
		"state": "Florida" ,
		"postalCode": "FL", 
			 
	}
]

function lkup(a,b){
	var a;
	var b;
	var check;
	check = 0;
	for (i = 0; i < lkup4.length; i++){
		if (a == lkup4[i].state) {
			check = 1
			if (b == lkup4[i].postalCode) {
				return true;
			}
				else {
					console.log("Postal code not matched with state!");
				}
			
				}
	}
	if (check == 0){
		console.log("state is not found!");
	}
}
// look up 5

var lkup5 = [
    		{
    		"name": "Belgium" ,
    		"countryCode": "5310", 
    		"isoCode": "AF" 
    		}, 
    		{
    		"name": "Albania" ,
    		"countryCode": "4810", 
    		"isoCode": "AL" 
    	    }, 
    	    {
    		"name": "bahrain" ,
    	  	"countryCode": "5250", 
    	    "isoCode": "BH" 
    	   	}, 	
    	   	{
        	"name": "Colombia" ,
        	"countryCode": "3010", 
        	"isoCode": "Co" 
        	    		}, 
    ]
   


	
	// lookup table function for LKUp6
	
function lkup(a,b,c){
	var a;
	var b;
	var c;
	var check;
	check = 0;
	for (i = 0; i < lkup5.length; i++){
		if (a == lkup5[i].name) {
			check = 1
			if (b == lkup5[i].countryCode) {
				if (c == lkup5[i].isoCode) {
					return true;
				}
				else {
					console.log("Iso code is not found!");
				}
			}
			else {
				console.log("country code is not found!");
			}
		}
	}
	if (check == 0){
		console.log("Name of country is not found!");
	}
}

// lookup 3
var lkup3 = ["1","2","3","11","24", "244"]
	
	function lkup(a){
		var a;
		var check;
		check = 0;
		for (i = 0; i < lkup3.length; i++){
			if (a == lkup3[i]) {
				return true;
				}
				else {
					
				console.log("mode is not correct!");
					}
		}
}


// binary search in general
var a = [
    0,
    13,
    22,
    19,
    5,
    55,
    98,
    41,
    81,
    72,
    68
];
a.sort(function(a, b) {
    return a - b;
});
console.log('a,', a);
console.log(binarySearch(a, 41))

function binarySearch(arr, target) {
    lo = 1;
    hi = arr.length;
    while (lo < hi) {
    	mid = lo + Math.floor((hi - lo)/2);
    	if (arr[mid] == target){
    		console.log(mid, target);
    		lo = hi + 1;
    	}
    	else if (arr[mid] < target) {
    		lo = mid;
    	}
    	else {
    		hi = mid;
    	}
    }
}
=======
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


// Phone Number validation

// validate a phone number of 10 digits with no comma, no spaces, no punctuation and 
//there will be no + sign in front the number, and phone numbers with 10 digits xxx_xxx_xxxx
function phonenumber(x)
{
  var phoneno = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
  if(x.match(phoneno))
        {
      return true;
        }
      else
        {
        alert("the phone number is not valid");
        return false;
        }
}

// check the input data to be an integer number (method 1)
			
function isInteger(x) {
		    return x % 1 === 0;
		}
// check the input data to be an integer number (method 2)
function isInteger(x) {
    return Math.round(x) === x;
}
    



*/


    
>>>>>>> branch 'master' of https://github.com/saeedt/ValidationPlatform

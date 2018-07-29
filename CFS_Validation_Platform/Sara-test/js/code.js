//Global variables
/*var inputData = [];

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
		not_allowed: /(P_O_|P[.]O_|P[..]B|P[.]O_|P[.]O[.]|PO_B|PO_D|POB_|POST)/g,
		required: /^.*/
	//},
	//phone:{
		//allowed: /[^0-9+$]/g,
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
/*
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
//error flags object

var flags = {
// SHIPPING ADDRESS ATTRIBUTE
	E20_2: {
		name: "ShipCheck_blank"
		flag: "E20",
		value:"2",
		msg: "checkbox is not selected"
	},
	E21_1: {
		name:"ShipCompanyName1_dataType"
		flag: "E21",
		value:"1",
		msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
	},	
	E21_2: {
		name:"ShipCompanyName1_blank"
		flag: "E21",
		value:"2",
		msg: "ShipmentCompanyName1 is blank"
	},
		
	E22_1: {
	name:"ShipCompanyName2_dataType"
		flag: "E22",
		value:"1",
		msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
	},
	
	E23_1: {
	name:"shipAddress_dataType"
		flag: "E23",
		value:"1",
		msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
	},
	E23_2: {
	name:"shipAddress_blank"
		flag: "E23",
		value:"2",
		msg: "Adresss is blank"
	},
	
	E23_3: {
	name:"shipAddress_invalid_char_New"
		flag: "E23",
		value:"3",
		msg: " The respondent provided P_O_/P.O_/P..B/P.O_/P.O./PO_B/PO_D/POB_/POST} Box in their shipping address"
	},
	E4_1: {
	name:"shipAddress_invalid_char_Exist"
		flag: "E4",
		value:"2",
		msg: " The respondent provided P.O.Box Box in their shipping address"
		},
	E24_1: {
	name:"shipCity_dataType"
		flag: "E24",
		value:"1",
		msg: "None alphabetic charecter is entered or Incorrect data type is entered "
		},
	E24_2: {
	name:"shipCity_blank"
		flag: "E24",
		value:"2",
		msg: "City is blank"
	},
	E24_22: {
	name:"shipCity-lookuptableCross"
		flag: "E24",
		value:"22",
		msg: "The city is not matched with state and zip Code"
	},
	
	E25_1: {
	name:"shipState_dataType"
		flag: "E25",
		value:"1",
		msg: "None alphabetic charecter is entered or Incorrect data type is entered "
		},
	E25_2: {
	name:"shipState_blank"
		flag: "E25",
		value:"2",
		msg: "state is blank"
		},
	E25_4: {
	name:"shipState_fieldLenght"
		flag: "E25",
		value:"4",
		msg: "The lenght of state is not matched with it's abbreviation "
		},
	E25_22: {
	name:"shipState-lookuptablefind"
		flag: "E25",
		value:"22",
		msg: "The state is not exist"
		},
	E24_22: {
	name:"shipState-lookuptable_Cross_New"
		flag: "E24",
		value:"22",
		msg: "The state is not matched with city and zip Code"
		},
	E4_1: {
	name:"shipState-lookuptable_Cross_Exist"
		flag: "E4",
		value:"1",
		msg: "The state is not matched with zip Code"
	},
	E26_1: {
	name:"shipZipCode_dataType"
		flag: "E26",
		value:"1",
		msg: "None numeric charecter is entered or Incorrect data type is entered "
		},
	E26_2: {
	name:"shipZipCode_blank"
		flag: "E26",
		value:"2",
		msg: "zip Code is blank"
		},
	E26_4: {
	name:"shipZipCode_fieldLenght"
		flag: "E26",
		value:"4",
		msg: "The lenght of zip code is not 10 digit "
		},
	E26_22: {
	name:"shipZipCode-lookuptable_find"
		flag: "E26",
		value:"22",
		msg: "The zip code is not exist"
		},
	E24_22:{
	name:"shipZipCode-lookuptable_Cross_New"
		flag: "E24",
		value:"22",
		msg: "The zip code is not matched with city and state"
		},
	E4_1 :{
	name:"shipZipCode-lookuptable_Cross_Exist"
		flag: "E4",
		value:"1",
		msg: "The zip code is not matched with  state"
		},
		
		// MAILING ADDRESS ATRRIBUTE
	E27_2: {
	name:"mailCheck_blank"
		flag: "E27",
		value:"2",
		msg: "checkbox is not selected"
	},
	E28_2: {
	name:"mailCompanyName1_dataType"
		flag: "E28",
		value:"1",
		msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
	},	
	E28_2: {
	name:"mailCompanyName1_blank"
		flag: "E28",
		value:"2",
		msg: "ShipmentCompanyName1 is blank"
	},
	E29_1: {
	name:"mailCompanyName2_dataType"
		flag: "E29",
		value:"1",
		msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
	},
	
	E30_1: {
	name:"mailAddressAttention_dataType"
		flag: "E30",
		value:"1",
		msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
	},
	
	E31_1: {
	name:"mailAddress_dataType"
		flag: "E31",
		value:"1",
		msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
	},
	E31_2: {
	name:"mailAddress_blank"
		flag: "E31",
		value:"2",
		msg: "Adresss is blank"
	},
	
	
	E32_1: {
	name:"mailCity_dataType"
		flag: "E32",
		value:"1",
		msg: "None alphabetic charecter is entered or Incorrect data type is entered "
		},
	E32_2: {
	name:"mailCity_blank"
		flag: "E32",
		value:"2",
		msg: "City is blank"
	},
	E32_22: {
	name:"mailCity-lookuptableCross"
		flag: "E32",
		value:"22",
		msg: "The city is not matched with state and zip Code"
	},
	
	E31_2: {
	name:"mailState_dataType"
		flag: "E33",
		value:"1",
		msg: "None alphabetic charecter is entered or Incorrect data type is entered "
		},
	E33_2: {
	name:"mailState_blank"
		flag: "E33",
		value:"2",
		msg: "state is blank"
		},
	E33_3: {
	name:"mailState_fieldLenght"
		flag: "E33",
		value:"3",
		msg: "The lenght of state is not matched with it's abbreviation "
		},
	E33_22: {
	name:"mailState-lookuptablefind"
		flag: "E33",
		value:"22",
		msg: "The state is not exist"
		},
	E32_22: {
	name:"mailState-lookuptable_Cross_New"
		flag: "E32",
		value:"22",
		msg: "The state is not matched with city and zip Code"
		},
	E6_1: {
	name:"mailState-lookuptable_Cross_Exist"
		flag: "E6",
		value:"1",
		msg: "The state is not matched with zip Code"
	},
	E34_1: {
	name:"mailZipCode_dataType"
		flag: "E34",
		value:"1",
		msg: "None numeric charecter is entered or Incorrect data type is entered "
		},
	E34_2: {
	name:"mailZipCode_blank"
		flag: "E34",
		value:"2",
		msg: "Zip Code is blank"
		},
	E34_4: {
	name:"mailZipCode_fieldLenght"
		flag: "E34",
		value:"4",
		msg: "The lenght of zip code is not 10 digit "
		},
	E34_22: {
	name:"mailZipCode-lookuptable_find"
		flag: "E34",
		value:"22",
		msg: "The zip code is not exist"
		},
	E24_22:{
	name:"mailZipCode-lookuptable_Cross_New"
		flag: "E24",
		value:"22",
		msg: "The zip code is not matched with city and state"
		},
	E6_1:{
	name:"mailZipCode-lookuptable_Cross_Exist"
		flag: "E6",
		value:"1",
		msg: "The zip code is not matched with  state"
		},
		//OPERATING STATUS ATTRIBUTE
		
	E35_2: {
	name:"statusCheck_blank"
		flag: "E35",
		value:"2",
		msg: "check box is not selected"
		},
	E5_1:{
	name:"operatingStatus_CrossCons_DateOfCeased_Exist"
		flag: "E5",
		value:"1",
		msg: "Item C = 3 (ceased operation) or the respondent desn't provided a date for ceased operation"
		},
	E36_3:{
	name:"dateOf Ceased_Format"
		flag: "E36",
		value:"3",
		msg: "Date of ceased operation is not entered in MMDDYYYY format"
		},
	E37_2: {
	name:"primIndustCheck_blank"
		flag: "E37",
		value:"2",
		msg: "check box is not selected"
		},
	E38_2: {
	name:"primIndustAct_dataType"
		flag: "E38",
		value:"2",
		msg: "None numeric charecter is entered or Incorrect data type is entered "
		},
	E38_40: {
	name:"primIndustAct_CrossConst"
		flag: "E38",
		value:"40",
		msg: " "No" check box is selected  but the activity  is not entered "
		},
	// CONTACT INFORMATION ATTRIBUTE 
	
	E39_1: {
	name:"contactName_dataType"
		flag: "E39",
		value:"1",
		msg: "None alphabetic charecter is entered or Incorrect data type is entered "
	},
	E39_2: {
	name:"ContactName_blank"
		flag: "E39",
		value:"2",
		msg: "Contact name is blank"
	},	
	E40_1: {
	name:"contactTitle_dataType"
		flag: "E40",
		value:"1",
		msg: "None alphabetic charecter is entered or Incorrect data type is entered "
	},
	E40_2: {
	name:"ContactTitle_blank"
		flag: "40",
		value:"2",
		msg: "Contact Title is blank"
	},		
	E41_1: {
	name:"contacPhone_dataType"
		flag: "E41",
		value:"1",
		msg: "None anumeric charecter is entered or Incorrect data type is entered "
	},
	E41_2: {
	name:"ContactPhone_blank"
		flag: "41",
		value:"2",
		msg: "Contact Phone number is blank"
	},	
	E7_1: {
	name:"contacFax_dataType"
		flag: "E7",
		value:"1",
		msg: " Fax number contains other format than intiger numeric entries "
	},
	E42_2: {
	name:"contactFax_blank"
		flag: "E42",
		value:"2",
		msg: "Contact Fax number is blank"
	},
	E7_2: {
	name:"contactFax_fieldLenght"
		flag: "E7",
		value:"2",
		msg: "The lenght of fax number is less than 10 digit "
		},
	E42_3 :{
	name:"contactFaxd_Format"
		flag: "E42",
		value:"3",
		msg: "The format as area code-phone-extenstion is not provided"
		},
		//REMARKS ATTRIBUTE
	E43_41: {
	name:"Remark_CrossConst_OperatStatusCheck"
		flag: "E43",
		value:"41",
		msg: "  Operating status is checked as "in operation" but description of operation change is not entered   "
		},
	E43_42: {
	name:"Remark_CrossConst_ShipWeighttype"
		flag: "E43",
		value:"42",
		msg: "   Net shipment weight is not in pound and the weight unit in not mentioned in Remark    "
		},
		// COMPLETION TIME
	E10_1: {
	name:"completTime_dataType"
		flag: "E10",
		value:"1",
		msg: " Either hours or minutes have something other than a number  "
	},
	E10_2: {
	name:"completTime_blank"
		flag: "E10",
		value:"2",
		msg: "Both hour and minutes are blank"
	},
	E10_3: {
	name:"CompletTime_Range"
		flag: "E10",
		value:"3",
		msg: "The value of completion time is more than 10 hours "
		},
}
*/
// TESE FOLDER CODES
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
	console.log(lkup_exhaustive("city_state_zip","zip","01007"));
	console.log(lkup_binary("city_state_zip","zip","01007"));
}

//configuration object for verification functions
var conf1= {
	email: {
		allowed: /[^a-zA-Z0-9!@#$%&'*+-/=?^_`{|}~.]/g,
		not_allowed: /[(),:;<>[\]]/g,
		required: /^.+@{1}.+[.].+$/
	},
	shippingAddress: {
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
		// SHIPPING ADDRESS ATTRIBUTE
			E20_2: {
				name: "ShipCheck_blank"
				flag: "E20",
				value:"2",
				msg: "checkbox is not selected"
			},
			E21_1: {
				name:"ShipCompanyName1_dataType"
				flag: "E21",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},	
			E21_2: {
				name:"ShipCompanyName1_blank"
				flag: "E21",
				value:"2",
				msg: "ShipmentCompanyName1 is blank"
			},
				
			E22_1: {
			name:"ShipCompanyName2_dataType"
				flag: "E22",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},
			
			E23_1: {
			name:"shipAddress_dataType"
				flag: "E23",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},
			E23_2: {
			name:"shipAddress_blank"
				flag: "E23",
				value:"2",
				msg: "Adresss is blank"
			},
			
			E23_5: {
			name:"shipAddress_invalid_char_New"
				flag: "E23",
				value:"5",
				msg: " Invalid characters such as  P_O_/P.O_/P..B/P.O_/P.O./PO_B/PO_D/POB_/POST} Box is entered in shipping address"
			},
			E4_1: {
			name:"shipAddress_invalid_char_Exist"
				flag: "E4",
				value:"2",
				msg: " The respondent provided P.O.Box Box in their shipping address"
				},
			E24_1: {
			name:"shipCity_dataType"
				flag: "E24",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
				},
			E24_2: {
			name:"shipCity_blank"
				flag: "E24",
				value:"2",
				msg: "City is blank"
			},
			E24_22: {
			name:"shipCity-lookuptableCross"
				flag: "E24",
				value:"22",
				msg: "The city is not matched with state and zip Code"
			},
			
			E25_1: {
			name:"shipState_dataType"
				flag: "E25",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
				},
			E25_2: {
			name:"shipState_blank"
				flag: "E25",
				value:"2",
				msg: "state is blank"
				},
			E25_4: {
			name:"shipState_fieldLenght"
				flag: "E25",
				value:"4",
				msg: "The lenght of state is not matched with it's abbreviation "
				},
			E25_22: {
			name:"shipState-lookuptablefind"
				flag: "E25",
				value:"22",
				msg: "The state is not exist"
				},
			E24_22: {
			name:"shipState-lookuptable_Cross_New"
				flag: "E24",
				value:"22",
				msg: "The state is not matched with city and zip Code"
				},
			E4_1: {
			name:"shipState-lookuptable_Cross_Exist"
				flag: "E4",
				value:"1",
				msg: "The state is not matched with zip Code"
			},
			E26_1: {
			name:"shipZipCode_dataType"
				flag: "E26",
				value:"1",
				msg: "None numeric charecter is entered or Incorrect data type is entered "
				},
			E26_2: {
			name:"shipZipCode_blank"
				flag: "E26",
				value:"2",
				msg: "zip Code is blank"
				},
			E26_4: {
			name:"shipZipCode_fieldLenght"
				flag: "E26",
				value:"4",
				msg: "The lenght of zip code is not 10 digit "
				},
			E26_22: {
			name:"shipZipCode-lookuptable_find"
				flag: "E26",
				value:"22",
				msg: "The zip code is not exist"
				},
			E24_22:{
			name:"shipZipCode-lookuptable_Cross_New"
				flag: "E24",
				value:"22",
				msg: "The zip code is not matched with city and state"
				},
			E4_1 :{
			name:"shipZipCode-lookuptable_Cross_Exist"
				flag: "E4",
				value:"1",
				msg: "The zip code is not matched with  state"
				},
				
				// MAILING ADDRESS ATRRIBUTE
			E27_2: {
			name:"mailCheck_blank"
				flag: "E27",
				value:"2",
				msg: "checkbox is not selected"
			},
			E28_2: {
			name:"mailCompanyName1_dataType"
				flag: "E28",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},	
			E28_2: {
			name:"mailCompanyName1_blank"
				flag: "E28",
				value:"2",
				msg: "ShipmentCompanyName1 is blank"
			},
			E29_1: {
			name:"mailCompanyName2_dataType"
				flag: "E29",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},
			
			E30_1: {
			name:"mailAddressAttention_dataType"
				flag: "E30",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},
			
			E31_1: {
			name:"mailAddress_dataType"
				flag: "E31",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},
			E31_2: {
			name:"mailAddress_blank"
				flag: "E31",
				value:"2",
				msg: "Adresss is blank"
			},
			
			
			E32_1: {
			name:"mailCity_dataType"
				flag: "E32",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
				},
			E32_2: {
			name:"mailCity_blank"
				flag: "E32",
				value:"2",
				msg: "City is blank"
			},
			E32_22: {
			name:"mailCity-lookuptableCross"
				flag: "E32",
				value:"22",
				msg: "The city is not matched with state and zip Code"
			},
			
			E31_2: {
			name:"mailState_dataType"
				flag: "E33",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
				},
			E33_2: {
			name:"mailState_blank"
				flag: "E33",
				value:"2",
				msg: "state is blank"
				},
			E33_3: {
			name:"mailState_fieldLenght"
				flag: "E33",
				value:"3",
				msg: "The lenght of state is not matched with it's abbreviation "
				},
			E33_22: {
			name:"mailState-lookuptablefind"
				flag: "E33",
				value:"22",
				msg: "The state is not exist"
				},
			E33_22: {
			name:"mailState-lookuptable_Cross_New"
				flag: "E32",
				value:"22",
				msg: "The state is not matched with city and zip Code"
				},
			E6_1: {
			name:"mailState-lookuptable_Cross_Exist"
				flag: "E6",
				value:"1",
				msg: "The state is not matched with zip Code"
			},
			E34_1: {
			name:"mailZipCode_dataType"
				flag: "E34",
				value:"1",
				msg: "None numeric charecter is entered or Incorrect data type is entered "
				},
			E34_2: {
			name:"mailZipCode_blank"
				flag: "E34",
				value:"2",
				msg: "zip Code is blank"
				},
			E34_4: {
			name:"mailZipCode_fieldLenght"
				flag: "E34",
				value:"4",
				msg: "The lenght of zip code is not 10 digit "
				},
			E34_22: {
			name:"mailZipCode-lookuptable_find"
				flag: "E34",
				value:"22",
				msg: "The zip code is not exist"
				},
			E24_22:{
			name:"mailZipCode-lookuptable_Cross_New"
				flag: "E24",
				value:"22",
				msg: "The zip code is not matched with city and state"
				},
			E6_1:{
			name:"mailZipCode-lookuptable_Cross_Exist"
				flag: "E6",
				value:"1",
				msg: "The zip code is not matched with  state"
				},
				//OPERATING STATUS ATTRIBUTE
				
			E35_2: {
			name:"statusCheck_blank"
				flag: "E35",
				value:"2",
				msg: "checkbox is not selected"
				},
			E5_1:{
			name:"operatingStatus_CrossCons_DateOfCeased_Exist"
				flag: "E5",
				value:"1",
				msg: "Item C = 3 (ceased operation) or the respondent desn't provided a date for ceased operation"
				},
			E36_1:{
					name:"dateOf Ceased_datatype"
						flag: "E36",
						value:"1",
						msg: "None numeric charecter is entered or Incorrect data type is entered"
						},
			E36_3:{
			name:"dateOf Ceased_Format"
				flag: "E36",
				value:"3",
				msg: "Date of ceased operation is not entered in MMDDYYYY format"
				},
			E37_2: {
			name:"primIndustCheck_blank"
				flag: "E37",
				value:"2",
				msg: "checkbox is not selected"
				},
			E38_1: {
			name:"primIndustAct_dataType"
				flag: "E38",
				value:"2",
				msg: "None numeric charecter is entered or Incorrect data type is entered "
				},
			E38_40: {
			name:"primIndustAct_CrossConst"
				flag: "E38",
				value:"40",
				msg: " "No" check box is selected  but the activity  is not entered "
				},
			// CONTACT INFORMATION ATTRIBUTE 
			
			E39_1: {
			name:"contactName_dataType"
				flag: "E39",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
			},
			E39_2: {
			name:"ContactName_blank"
				flag: "E39",
				value:"2",
				msg: "Contact name is blank"
			},	
			E40_1: {
			name:"contactTitle_dataType"
				flag: "E40",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
			},
			E40_2: {
			name:"ContactTitle_blank"
				flag: "40",
				value:"2",
				msg: "Contact Title is blank"
			},		
			E41_1: {
			name:"contactPhone_dataType"
				flag: "E41",
				value:"1",
				msg: "None anumeric charecter is entered or Incorrect data type is entered "
			},
			E41_2: {
			name:"ContactPhone_blank"
				flag: "41",
				value:"2",
				msg: "Contact Phone number is blank"
			},	
			E7_1: {
			name:"contactFax_dataType"
				flag: "E7",
				value:"1",
				msg: " Fax number contains other format than intiger numeric entries "
			},
			E42_2: {
			name:"contactFax_blank"
				flag: "E42",
				value:"2",
				msg: "Contact Fax number is blank"
			},
			E7_2: {
			name:"contactFax_fieldLenght"
				flag: "E7",
				value:"2",
				msg: "The lenght of fax number is less than 10 digit "
				},
			E42_3 :{
			name:"contactFaxd_Format"
				flag: "E42",
				value:"3",
				msg: "The format as area code-phone-extenstion is not provided"
				},
				//REMARKS ATTRIBUTE
			E43_41: {
			name:"Remark_CrossConst_OperatStatusCheck"
				flag: "E43",
				value:"41",
				msg: "  Operating status is checked as "in operation" but description of operation change is not entered   "
				},
			E43_42: {
			name:"Remark_CrossConst_ShipWeighttype"
				flag: "E43",
				value:"42",
				msg: "   Net shipment weight is not in pound and the weight unit in not mentioned in Remark    "
				},
				// COMPLETION TIME
			E10_1: {
			name:"completTime_dataType"
				flag: "E10",
				value:"1",
				msg: " Either hours or minutes have something other than a number  "
			},
			E10_2: {
			name:"completTime_blank"
				flag: "E10",
				value:"2",
				msg: "Both hour and minutes are blankk"
			},
			E10_3: {
			name:"CompletTime_Range"
				flag: "E10",
				value:"3",
				msg: "The value of completation time is more than 10 hours "
				},
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
//sample integration function
function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_req_char("m.e@test.com","email","conf1")){
		ressult.flags.push("some flag and value");
		result.messages.push("some message");
		ressult.tests.push("some flag name");
	}
	if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}
// Integration functions FOr data type check of numeric fields
function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("45701 ","numeric","conf1")){
		ressult.flags.push("E26_1 );
		result.messages.push("None numeric charecter is entered or Incorrect data type is entered ");
		ressult.tests.push("shipZipCode_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}
function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("55701 ","numeric","conf1")){
		ressult.flags.push("E34_1 );
		result.messages.push("None numeric charecter is entered or Incorrect data type is entered ");
		ressult.tests.push("mailZipCode_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}
function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("02282018 ","numeric","conf1")){
		ressult.flags.push("E36_1 );
		result.messages.push("None numeric charecter is entered or Incorrect data type is entered ");
		ressult.tests.push("dateOfCeased_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}

function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("7408188808 ","numeric","conf1")){
		ressult.flags.push("E41_1 );
		result.messages.push("None numeric charecter is entered or Incorrect data type is entered ");
		ressult.tests.push("contactPhone_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}

function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("7020967634 ","numeric","conf1")){
		ressult.flags.push("E7_1 );
		result.messages.push("None numeric charecter is entered or Incorrect data type is entered ");
		ressult.tests.push("contactFax_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}

function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("8 ","numeric","conf1")){
		ressult.flags.push("E10_1 );
		result.messages.push("Either hours or minutes have something other than a number ");
		ressult.tests.push("completTime_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}

// Integration functions FOr data type check of alphabetic fields
function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("Athens","alphabetic","conf1")){
		ressult.flags.push("E24_1 );
		result.messages.push(" None alphabetic  charecter is entered or Incorrect data type is entered  ");
		ressult.tests.push("shipCity_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}
function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("OH","alphabetic","conf1")){
		ressult.flags.push("E25_1 );
		result.messages.push(" None alphabetic  charecter is entered or Incorrect data type is entered  ");
		ressult.tests.push("shipState_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}

function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("New York1","alphabetic","conf1")){
		ressult.flags.push("E32_1 );
		result.messages.push(" None alphabetic  charecter is entered or Incorrect data type is entered  ");
		ressult.tests.push("mailCity_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}

function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("North Carolina","alphabetic","conf1")){
		ressult.flags.push("E33_1 );
		result.messages.push(" None alphabetic  charecter is entered or Incorrect data type is entered  ");
		ressult.tests.push("mailState_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}    

function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("Sara","alphabetic","conf1")){
		ressult.flags.push("E39_1 );
		result.messages.push(" None alphabetic  charecter is entered or Incorrect data type is entered  ");
		ressult.tests.push("contactName_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
} 

function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("Manager","alphabetic","conf1")){
		ressult.flags.push("E40_1 );
		result.messages.push(" None alphabetic  charecter is entered or Incorrect data type is entered  ");
		ressult.tests.push("contactTitle_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
} 

//Integration functions For data type check of Alphanumeric fields
function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("Walmart store 2 ","alphanumeric","conf1")){
		ressult.flags.push("E21_1 );
		result.messages.push(" None alphanumeric  charecter is entered or Incorrect data type is entered  ");
		ressult.tests.push("ShipCompanyName1_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
} 

function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("Walmart store 2 ","alphanumeric","conf1")){
		ressult.flags.push("E22_1 );
		result.messages.push(" None alphanumeric  charecter is entered or Incorrect data type is entered  ");
		ressult.tests.push("ShipCompanyName2_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
} 

function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("2 andover st,no.33  ","alphanumeric","conf1")){
		ressult.flags.push("E23_1 );
		result.messages.push(" None alphanumeric  charecter is entered or Incorrect data type is entered  ");
		ressult.tests.push("shipAddress_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
} 

function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("Otavat @ 23 ","alphanumeric","conf1")){
		ressult.flags.push("E28_1 );
		result.messages.push(" None alphanumeric  charecter is entered or Incorrect data type is entered  ");
		ressult.tests.push("mailCompanyName1_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
} 
function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("Otavat @ 23 ","alphanumeric","conf1")){
		ressult.flags.push("E29_1 );
		result.messages.push(" None alphanumeric  charecter is entered or Incorrect data type is entered  ");
		ressult.tests.push("mailCompanyName2_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}
function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("This adreess would change in 2 years later ","alphanumeric","conf1")){
		ressult.flags.push("E30_1 );
		result.messages.push(" None alphanumeric  charecter is entered or Incorrect data type is entered  ");
		ressult.tests.push("mailAddressAttention_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}

function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("@ andover Rd, apt 45 ","alphanumeric","conf1")){
		ressult.flags.push("E31_1 );
		result.messages.push(" None alphanumeric  charecter is entered or Incorrect data type is entered  ");
		ressult.tests.push("mailAddress_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}

function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_allowed_char("Oil industry ","alphanumeric","conf1")){
		ressult.flags.push("E38_1 );
		result.messages.push(" None alphanumeric  charecter is entered or Incorrect data type is entered  ");
		ressult.tests.push("primIndustAct_dataType");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}
//INTEGRATION FUNCTION FOR INVALID CHARECTER CHECK
function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_invalid_char("2 Andover Rd, apt H11, p.o.box 3455 ","shippingAddress","conf1")){
		ressult.flags.push("E23_5 );
		result.messages.push("  Invalid characters such as  P_O_/P.O_/P..B/P.O_/P.O./PO_B/PO_D/POB_/POST} Box is entered in shipping address ");
		ressult.tests.push("shipAddress_invalid_char_New");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}
function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!check_invalid_char("2 Andover Rd, apt H11, p.o.box 3455 ","shippingAddress","conf1")){
		ressult.flags.push("E4_2 );
		result.messages.push("  The respondent provided P.O.Box Box in their shipping address ");
		ressult.tests.push("shipAddress_invalid_char-Exist");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}

// INTEGRATION FUNCTION FOR LKUP-exhustive functions
function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests= [];	
	if (!lkup_exhaustive("city_state_zip","city","Athens")){
		ressult.flags.push("E24_22 );
		result.messages.push("  The city is not matched with state and zip code ");
		ressult.tests.push("shipCity-lookuptableCross");
	}
		if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
	}
	return result;
}
	function test_int(input){
		var result;
		result.flags = [];
		result.messages= [];
		ressult.tests= [];	
		if (!lkup_exhaustive("city_state_zip","state","OH")){
			ressult.flags.push("E24_22 );
			result.messages.push("  The state is not matched with state and zip code ");
			ressult.tests.push("shipState-lookuptableCross");
		}
			if (result.flags.size>0){
			result.pass = false;
		} else {
			result.pass = true;
		}
		return result;
	}
		function test_int(input){
			var result;
			result.flags = [];
			result.messages= [];
			ressult.tests= [];	
			if (!lkup_binary("city_state_zip","Zip","45701")){
				ressult.flags.push("E24_22 );
				result.messages.push("  The Zip code is not matched with state and zip code ");
				ressult.tests.push("shipsZipCode-lookuptableCross");
			}
				if (result.flags.size>0){
				result.pass = false;
			} else {
				result.pass = true;
			}
			return result;
	}
		
		"city" : "Blandford",
		"state" : "MA",
		"zip" : "01008"

			function test_int(input){
				var result;
				result.flags = [];
				result.messages= [];
				ressult.tests= [];	
				if (!lkup_exhaustive("city_state_zip","city","Blandford")){
					ressult.flags.push("E33_22 );
					result.messages.push("  The city is not matched with state and zip code ");
					ressult.tests.push("mailCity-lookuptableCross");
				}
					if (result.flags.size>0){
					result.pass = false;
				} else {
					result.pass = true;
				}
				return result;
			}
				function test_int(input){
					var result;
					result.flags = [];
					result.messages= [];
					ressult.tests= [];	
					if (!lkup_exhaustive("city_state_zip","state","MA")){
						ressult.flags.push("E33_22 );
						result.messages.push("  The state is not matched with state and zip code ");
						ressult.tests.push("mailState-lookuptableCross");
					}
						if (result.flags.size>0){
						result.pass = false;
					} else {
						result.pass = true;
					}
					return result;
				}
					function test_int(input){
						var result;
						result.flags = [];
						result.messages= [];
						ressult.tests= [];	
						if (!lkup_binary("city_state_zip","Zip","01008")){
							ressult.flags.push("E33_22 );
							result.messages.push("  The Zip code is not matched with state and zip code ");
							ressult.tests.push("mailZipCode-lookuptableCross");
						}
							if (result.flags.size>0){
							result.pass = false;
						} else {
							result.pass = true;
						}
						return result;

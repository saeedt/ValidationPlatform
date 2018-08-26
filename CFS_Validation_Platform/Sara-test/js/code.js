

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
	console.log(input)
	//check_req_char("m.e@test.com","email","conf1");
	//check_allowed_char("PtO1?", "shippingAdress", "conf1");
	//console.log(lkup_exhaustive("city_state_zip","zip","01007"));
	//console.log(lkup_binary("city_state_zip","zip","01007"));
	//console.log(presence_check("null"));
	console.log (lkup_exhaustive_m("city_state_zip","zip","01007"));
	
}
var test1 = lkup_exhaustive_m("city_state_zip","zip","01001").data;
//creating the reference (input) object 
var test2 = {	
		"city" : "Agawam",
		"state" : "MA",
		"zip" : "01001"
	};
//console.log(matchObj(test2,test1,"zip"));

console.log(matchobj_integrate("Athens", "OH", "45701"))

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
	state: {
		allowed: /^.*/,
		not_allowed: /^.*/,
		required: /^.*/,
		minlenght:2 ,
		maxlenght:2
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
		allowed: /[^0-9a-zA-Z+$,():;<>[\ ]]/g,
		not_allowed: /^.*/,
		required:/^.*/
	},	
	state: {
		minlenght:2 ,
		maxlenght:2
	},
	zipcode: {
			minlenght:5,
			maxlenght:5	
	},
	faxnum: {
		minlenght:0 ,
		maxlenght:10
	}//,
	//shippingwWeight:{
	//	minRange:10000
	//	maxRange:20000
	//}
}

//error flags object

var flags = {
		// SHIPPING ADDRESS ATTRIBUTE
			E20_2: {
				name: "ShipCheck_blank",
				flag: "E20",
				value:"2",
				msg: "checkbox is not selected"
			},
			E21_1: {
				name:"ShipCompanyName1_dataType",
				flag: "E21",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},	
			E21_2: {
				name:"ShipCompanyName1_blank",
				flag: "E21",
				value:"2",
				msg: "ShipmentCompanyName1 is blank"
			},
				
			E22_1: {
				name:"ShipCompanyName2_dataType",
				flag: "E22",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},
			
			E23_1: {
				name:"shipAddress_dataType",
				flag: "E23",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},
			E23_2: {
				name:"shipAddress_blank",
				flag: "E23",
				value:"2",
				msg: "Adresss is blank"
			},
			
			E23_5: {
				name:"shipAddress_invalid_char_New",
				flag: "E23",
				value:"5",
				msg: " Invalid characters such as  P_O_/P.O_/P..B/P.O_/P.O./PO_B/PO_D/POB_/POST} Box is entered in shipping address"
			},
			E4_1: {
				name:"shipAddress_invalid_char_Exist",
				flag: "E4",,
				value:"2",
				msg: " The respondent provided P.O.Box Box in their shipping address",
				},
			E24_1: {
				name:"shipCity_dataType",
				flag: "E24",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered ",
				},
			E24_2: {
				name:"shipCity_blank",
				flag: "E24",
				value:"2",
				msg: "City is blank"
			},
			E24_22: {
				name:"shipCityStateZip-lookuptableCross",
				flag: "E24",
				value:"22",
				msg: "city state zipe code are not matched"
			},
			
			E25_1: {
				name:"shipState_dataType",
				flag: "E25",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
				},
			E25_2: {
				name:"shipState_blank",
				flag: "E25",
				value:"2",
				msg: "state is blank"
				},
			E25_4: {
				name:"shipState_fieldLenght",
				flag: "E25",
				value:"4",
				msg: "The lenght of state is not matched with it's abbreviation "
				},
			E25_22: {
				name:"shipState-lookuptablefind",
				flag: "E25",
				value:"22",
				msg: "The state is not exist"
				},
			//E24_22: {
				//name:"shipCityStateZip-lookuptableCross",
				//flag: "E24",
				//value:"22",
				//msg: "The state is not matched with city and zip Code"
				//},
			E4_1: {
				name:"shipState-lookuptable_Cross_Exist",
				flag: "E4",
				value:"1",
				msg: "The state is not matched with zip Code"
			},
			E26_1: {
				name:"shipZipCode_dataType",
				flag: "E26",
				value:"1",
				msg: "None numeric charecter is entered or Incorrect data type is entered "
				},
			E26_2: {
				name:"shipZipCode_blank",
				flag: "E26",
				value:"2",
				msg: "zip Code is blank"
				},
			E26_4: {
				name:"shipZipCode_fieldLenght",
				flag: "E26",
				value:"4",
				msg: "The lenght of zip code is not 10 digit "
				},
			E26_22: {
				name:"shipZipCode-lookuptable_find",
				flag: "E26",
				value:"22",
				msg: "The zip code is not exist"
				},
			//E24_22:{
			//	name:"shipZipCode-lookuptable_Cross_New",
				//flag: "E24",
				//value:"22",
				//msg: "The zip code is not matched with city and state"
				//},
			E4_1 :{
				name:"shipZipCode-lookuptable_Cross_Exist",
				flag: "E4",
				value:"1",
				msg: "The zip code is not matched with  state"
				},
				
				// MAILING ADDRESS ATRRIBUTE
			E27_2: {
				name:"mailCheck_blank",
				flag: "E27",
				value:"2",
				msg: "checkbox is not selected"
			},
			E28_2: {
				name:"mailCompanyName1_dataType",
				flag: "E28",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},	
			E28_2: {
				name:"mailCompanyName1_blank",
				flag: "E28",
				value:"2",
				msg: "ShipmentCompanyName1 is blank"
			},
			E29_1: {
				name:"mailCompanyName2_dataType",
				flag: "E29",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},
			
			E30_1: {
				name:"mailAddressAttention_dataType",
				flag: "E30",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},
			
			E31_1: {
				name:"mailAddress_dataType",
				flag: "E31",
				value:"1",
				msg: "None alphanumeric charecter is entered or Incorrect data type is entered "
			},
			E31_2: {
				name:"mailAddress_blank",
				flag: "E31",
				value:"2",
				msg: "Adresss is blank"
			},
			
			
			E32_1: {
				name:"mailCity_dataType",
				flag: "E32",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
				},
			E32_2: {
				name:"mailCity_blank",
				flag: "E32",
				value:"2",
				msg: "City is blank"
			},
			E32_22: {
				name:"mailCityStateZip-lookuptableCross",
				flag: "E32",
				value:"22",
				msg: "The city is not matched with state and zip Code"
			},
			
			E31_2: {
				name:"mailState_dataType",
				flag: "E33",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
				},
			E33_2: {
				name:"mailState_blank",
				flag: "E33",
				value:"2",
				msg: "state is blank"
				},
			E33_3: {
				name:"mailState_fieldLenght",
				flag: "E33",
				value:"3",
				msg: "The lenght of state is not matched with it's abbreviation "
				},
			E33_22: {
				name:"mailState-lookuptablefind",
				flag: "E33",
				value:"22",
				msg: "The state is not exist"
				},
			//E33_22: {
			//	name:"mailState-lookuptable_Cross_New",
				//flag: "E32",
				//value:"22",
				//msg: "The state is not matched with city and zip Code"
				//},
				// No use for E6-1
			//E6_1: {
				//name:"mailState-lookuptable_Cross_Exist",
			//	flag: "E6",
			//	value:"1",
				//msg: "The state is not matched with zip Code"
			},
			E34_1: {
				name:"mailZipCode_dataType",
				flag: "E34",
				value:"1",
				msg: "None numeric charecter is entered or Incorrect data type is entered "
				},
			E34_2: {
				name:"mailZipCode_blank",
				flag: "E34",
				value:"2",
				msg: "zip Code is blank"
				},
			E34_4: {
				name:"mailZipCode_fieldLenght",
				flag: "E34",
				value:"4",
				msg: "The lenght of zip code is not 10 digit "
				},
			E34_22: {
				name:"mailZipCode-lookuptable_find",
				flag: "E34",
				value:"22",
				msg: "The zip code is not exist"
				},
			//E32_22:{
			//	name:"mailZipCode-lookuptable_Cross_New",
				//flag: "E24",
				//value:"22",
				//msg: "The zip code is not matched with city and state"
			//	},
				// we don't use E6-1 
			//E6_1:{
			//	name:"mailZipCode-lookuptable_Cross_Exist",
				//flag: "E6",
				//value:"1",
				//msg: "The zip code is not matched with  state"
				//},
				//OPERATING STATUS ATTRIBUTE
				
			E35_2: {
				name:"statusCheck_blank",
				flag: "E35",
				value:"2",
				msg: "checkbox is not selected"
				},
			E5_1:{
				name:"operatingStatus_CrossCons_DateOfCeased_Exist",
				flag: "E5",
				value:"1",
				msg: "Item C = 3 (ceased operation) or the respondent desn't provided a date for ceased operation"
				},
			E36_1:{
					name:"dateOf Ceased_datatype",
					flag: "E36",
					value:"1",
					msg: "None numeric charecter is entered or Incorrect data type is entered"
				},
			E36_3:{
			name:"dateOf Ceased_Format",
				flag: "E36",
				value:"3",
				msg: "Date of ceased operation is not entered in MMDDYYYY format"
				},
			E37_2: {
			name:"primIndustCheck_blank",
				flag: "E37",
				value:"2",
				msg: "checkbox is not selected"
				},
			E38_1: {
			name:"primIndustAct_dataType",
				flag: "E38",
				value:"2",
				msg: "None numeric charecter is entered or Incorrect data type is entered "
				},
			E38_40: {
			name:"primIndustAct_CrossConst",
				flag: "E38",
				value:"40",
				msg: " "No" check box is selected  but the activity  is not entered "
				},
			// CONTACT INFORMATION ATTRIBUTE 
			
			E39_1: {
			name:"contactName_dataType",
				flag: "E39",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
			},
			E39_2: {
			name:"ContactName_blank",
				flag: "E39",
				value:"2",
				msg: "Contact name is blank"
			},	
			E40_1: {
			name:"contactTitle_dataType",
				flag: "E40",
				value:"1",
				msg: "None alphabetic charecter is entered or Incorrect data type is entered "
			},
			E40_2: {
			name:"ContactTitle_blank",
				flag: "40",
				value:"2",
				msg: "Contact Title is blank"
			},		
			E41_1: {
			name:"contactPhone_dataType",
				flag: "E41",
				value:"1",
				msg: "None anumeric charecter is entered or Incorrect data type is entered "
			},
			E41_2: {
			name:"ContactPhone_blank",
				flag: "41",
				value:"2",
				msg: "Contact Phone number is blank"
			},	
			E7_1: {
			name:"contactFax_dataType",
				flag: "E7",
				value:"1",
				msg: " Fax number contains other format than intiger numeric entries "
			},
			E42_2: {
			name:"contactFax_blank",
				flag: "E42",
				value:"2",
				msg: "Contact Fax number is blank"
			},
			E7_2: {
			name:"contactFax_fieldLenght",
				flag: "E7",
				value:"2",
				msg: "The lenght of fax number is less than 10 digit "
				},
			E42_3 :{
			name:"contactFaxd_Format",
				flag: "E42",
				value:"3",
				msg: "The format as area code-phone-extenstion is not provided"
				},
				//REMARKS ATTRIBUTE
			E43_41: {
			name:"Remark_CrossConst_OperatStatusCheck",
				flag: "E43",
				value:"41",
				msg: "  Operating status is checked but description of operation change is not entered   "
				},
			E43_42: {
			name:"Remark_CrossConst_ShipWeighttype",
				flag: "E43",
				value:"42",
				msg: "   Net shipment weight is not in pound and the weight unit in not mentioned in Remark    "
				},
				// COMPLETION TIME
			E10_1: {
				name:"completTime_dataType",
				flag: "E10",
				value:"1",
				msg: " Either hours or minutes have something other than a number  "
			},
			E10_2: {
				name:"completTime_blank",
				flag: "E10",
				value:"2",
				msg: "Both hour and minutes are blankk"
			},
			E10_3: {
				name:"CompletTime_Range",
				flag: "E10",
				value:"3",
				msg: "The value of completation time is more than 10 hours "
				},
*/
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


// lenght field validation function

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
//  Range value check function
function Range_value_check(input, type, config){  
	var lowerbound = eval(config)[type].minRange;
	var upperbound =eval(config)[type].maxRange;
    if(input.value >= lowerbound && input.value <=upperbound)
      {  	
	   return true;
      }
    else
      {  	  		
       return false;  	
      }  
}

// presence check function

function presence_check (input){	
	if (input.length == 0 || input == 'null' || input == 'NA' || typeof(input) == 'undefined') { 
		return false;
	}   	
	else {
		return true;
	}		 
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
 	return result;
 }
 
/*  
//sample integration function
function test_int(input){
	var result;
	result.flags = [];
	result.messages= [];
	ressult.tests = [];	
	if (!check_req_char("m.e@test.com","email","conf1")){
		result.flags.push("some flag and value");
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
*/
// Integration functions for Establishment attributes and their flags
 
function shipping_Company_name1 (input){
		var result;
		var error;
		result.flgname  =  [];
		result.flgflag  =  [];
		result.flgvalue =  [];
		result.flgmsg   =  [];
		
		if (!check_allowed_char("", "alphanumeric", "conf1")){
			error = "E21_1"
			ressult.flgname.push((flags)[error].name);
			ressult.flgname.push((flags)[error].flag);
			ressult.flgname.push((flags)[error].value);
			ressult.flgname.push((flags)[error].msg);
			}
		if (!presence_check(input)){
			error = "E21-2"
			ressult.flgname.push((flags)[error].name);
			ressult.flgname.push((flags)[error].flag);
			ressult.flgname.push((flags)[error].value);
			ressult.flgname.push((flags)[error].msg);
					}
		if (result.flags.size>0){
						result.pass = false;
		}
		else {
						result.pass = true;
		}
		return result;
}	

function shipping_Company_name2(input){
	var result;
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	if (!check_allowed_char("", "alphanumeric", "conf1")){
		error = "E22_1"
		ressult.flgname.push((flags)[error].name);
		ressult.flgname.push((flags)[error].flag);
		ressult.flgname.push((flags)[error].value);
		ressult.flgname.push((flags)[error].msg);
		}
	
	if (result.flags.size>0){
					result.pass = false;
	}
	else {
					result.pass = true;
	}
	return result;
}	

function street_shipping_address(input){
	var result;
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	if (!check_allowed_char("","alphanumeric", "conf1")){
		error = "E23_1"
		ressult.flgname.push((flags)[error].name);
		ressult.flgname.push((flags)[error].flag);
		ressult.flgname.push((flags)[error].value);
		ressult.flgname.push((flags)[error].msg);
		}
	if (!presence_check(input)){
		error = "E23-2"
		ressult.flgname.push((flags)[error].name);
		ressult.flgname.push((flags)[error].flag);
		ressult.flgname.push((flags)[error].value);
		ressult.flgname.push((flags)[error].msg);
		}
	if (check_invalid_char("", "shippingAddress", "conf1")){
		error = "E23_5"
		ressult.flgname.push((flags)[error].name);
		ressult.flgname.push((flags)[error].flag);
		ressult.flgname.push((flags)[error].value);
		ressult.flgname.push((flags)[error].msg);
			}			}
	if (result.flags.size>0){
					result.pass = false;
	}
	else {
					result.pass = true;
	}
	return result;
}	

function city_shipping_address(input){
	var result;
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	if (!check_allowed_char("", "alphabetic", "conf1")){
		error = "E24_1"
		ressult.flgname.push((flags)[error].name);
		ressult.flgname.push((flags)[error].flag);
		ressult.flgname.push((flags)[error].value);
		ressult.flgname.push((flags)[error].msg);
	}
	if (!presence-check(input)){
		error = "E24-2"
		ressult.flgname.push((flags)[error].name);
		ressult.flgname.push((flags)[error].flag);
		ressult.flgname.push((flags)[error].value);
		ressult.flgname.push((flags)[error].msg);
	}
	if (!lkup_exhaustive_m("city_state_zip","city","")){
		//error = "???"//
		//ressult.flgname.push((flags)[error].name);
		//ressult.flgname.push((flags)[error].flag);
		//ressult.flgname.push((flags)[error].value);
		//ressult.flgname.push((flags)[error].msg);
	}	
	if (result.flags.size>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}	

function state_shipping_address(input){
	var result;
	var error;
	result.flgname = [];
	result.flgflag = [];
	result.flgvalu = [];
	result.flgmesg = [];
	if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "E25_1"
		ressult.flgname.push((flags)[error].name);
		ressult.flgname.push((flags)[error].flag);
		ressult.flgname.push((flags)[error].value);
		ressult.flgname.push((flags)[error].msg);
	}
	if (!presence-check(input)){
		error = "E25-2"
		ressult.flgname.push((flags)[error].name);
		ressult.flgname.push((flags)[error].flag);
		ressult.flgname.push((flags)[error].value);
		ressult.flgname.push((flags)[error].msg);
	}
	if (!length_field_check(input)){
		error = "E25-5"
		ressult.flgname.push((flags)[error].name);
		ressult.flgname.push((flags)[error].flag);
		ressult.flgname.push((flags)[error].value);
		ressult.flgname.push((flags)[error].msg);
	}
	if (!lkup_exhaustive_m("city_state_zip","state",input)){
		//error = "E25_22"
		ressult.flgname.push((flags)[error].name);
		ressult.flgname.push((flags)[error].flag);
		ressult.flgname.push((flags)[error].value);
		ressult.flgname.push((flags)[error].msg);
	}			
	if (result.flags.size>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}	

function zip_shipping_address(input){
	var result;
	var error;
	result.flgname = [];
	result.flgflag = [];
	result.flgvalu = [];
	result.flgmesg = [];
	if (!check_allowed_char(input, "numeric", "conf1")){
		//error = "..."
		ressult.flgname.push((flags)[error].name);
		ressult.flgname.push((flags)[error].flag);
		ressult.flgname.push((flags)[error].value);
		ressult.flgname.push((flags)[error].msg);
	}
	if (!presence-check(input)){
		//error = "..."
		ressult.flgname.push((flags)[error].name);
		ressult.flgname.push((flags)[error].flag);
		ressult.flgname.push((flags)[error].value);
		ressult.flgname.push((flags)[error].msg);
	}
	if (!length_field_check(input)){
		//error = "E25_4"
		ressult.flgname.push((flags)[error].name);
		ressult.flgname.push((flags)[error].flag);
		ressult.flgname.push((flags)[error].value);
		ressult.flgname.push((flags)[error].msg);
	}
	if (!lkup_exhaustive_m("city_state_zip","zip",input)){
		//error = "E25_22"
		ressult.flgname.push((flags)[error].name);
		ressult.flgname.push((flags)[error].flag);
		ressult.flgname.push((flags)[error].value);
		ressult.flgname.push((flags)[error].msg);
	}			
	if (result.flags.size>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}	

function matchobj_integrate(city, state, zip){
	var result;
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	var ref = {	
			"city" : city,
			"state" : state,
			"zip" : zip,
	};
	//var test2 = lkup_exhaustive_m("city_state_zip","city", city).data
	//var test3= lkup_exhaustive_m("city_state_zip","state",state).data
	var test4 = lkup_exhaustive_m("city_state_zip","zip", zip).data
	if (!matchobj(ref, test2,"city")||!matchobj(ref, test3,"state")||!matchobj(ref, test4,"zip")){
		error = "E24-22"
		ressult.flgname.push((flags)[error].name);
		ressult.flgname.push((flags)[error].flag);
		ressult.flgname.push((flags)[error].value);
		ressult.flgname.push((flags)[error].msg);
	}
	//var test3= lkup_exhaustive_m("city_state_zip","state",state).data
	//if (!matchobj(state,"test3","city")){
	//	error = "..."
		//ressult.flgname.push((flags)[error].name);
		//ressult.flgname.push((flags)[error].flag);
		//ressult.flgname.push((flags)[error].value);
		//ressult.flgname.push((flags)[error].msg);
	//}
	
	//if (!matchobj(zip,"test4","city")){
		//error = "..."
		//ressult.flgname.push((flags)[error].name);
		//ressult.flgname.push((flags)[error].flag);
		//ressult.flgname.push((flags)[error].value);
		//ressult.flgname.push((flags)[error].msg);
	//}
	if (result.flags.size>0){
		result.pass = false;
	}
	else {
		result.pass = true;
	}
	return result;
}	
	


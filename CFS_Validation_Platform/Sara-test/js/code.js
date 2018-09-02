
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
	//console.log(lkup_exhaustive_m("city_state_zip","zip","01007") );
	//console.log(check_req_char("m.e@test.com","email","conf1"));
	//console.log(check_req_char("12/08/2014", "dateOfCeased", "conf1"));
	//console.log(check_allowed_char("12/08/2014", "dateOfCeased", "conf1"));	
	//console.log(check_allowed_char("126548", "numeric", "conf1"));
	//console.log(check_invalid_char("sa, p.o.23","shippingAddress", "conf1"));
	//console.log(shipping_address("Athens, andover,P.O."));
	//console.log(mailing_zip5("01001"));
	
}

//var test1 = lkup_exhaustive_m("city_state_zip","zip","01001").data;
//creating the reference (input) object 
//var test2 = {	
		//"city" : "Agawam",
		//"state" : "MA",
		//"zip" : "01001"
	//};
//console.log(matchObj(test2,test1,"zip"));



//configuration object for verification functions
var conf1= {
	email: {
		allowed: /[^a-zA-Z0-9!@#$%&'*+-/=?^_`{|}~.]/g,
		not_allowed: /[(),:;<>[\]]/g,
		required: /^.+@{1}.+[.].+$/
	},
	shippingAddress: {
		allowed: /[^a-zA-Z0-9 _.-]/g,
		not_allowed: /([P_O_]|[P.O_]|[P..B]|[P.O_]|[P.O.]|[PO_B]|[PO_D]|[POB_]|POST)/g,
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
	zipCode: {
			minlenght:5 ,
			maxlenght:5	
	},
	dateOfCeased:{
			allowed:/[^0-9/\ ]/g, 
			//required: /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g
			required:/^(0[1-9]|1[012])[\/](0[1-9]|[12][0-9]|3[01])[\/][0-9]{4}$/g
	},
	phone:{
		allowed: /[^0-9 - $]/g,
		//Required:
	},
	faxNum: {
		allowed: /[^0-9-$]/g,
		minlenght: 12 ,
		//required:    ,
		maxlenght: 12
	}
	//shippingwWeight:{
	//	minRange:10000
		//maxRange:20000
	//}
}

//Error flags object

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
			E4_3: {
				name:"shipAddress_invalid_char_Exist",
				flag: "E4",
				value:"4",
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
			E24_23: {
				name:"shipCity-state-zip-lukup-Cross",
				flag: "E24",
				value:"23",
				msg: "The combination of zip, state, city is invalid"
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
										
				// MAILING ADDRESS ATRRIBUTE
			E27_2: {
				name:"mailCheck_blank",
				flag: "E27",
				value:"2",
				msg: "checkbox is not selected"
			},
			E28_1: {
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
			E32_23: {
				name:"mailCity-state-zip-lukup-Cross",
				flag: "E32",
				value:"22",
				msg: "The combination of city, state, zipe is invalid"
			},
			
			E33_1: {
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
			E33_4: {
				name:"mailState_fieldLenght",
				flag: "E33",
				value:"3",
				msg: "The lenght of state is not contains only 2 characters   "
				},
			
			E6_1: {
				name:"mailState-lookuptable_Cross_Exist",
				flag: "E6",
				value:"1",
				msg: "The state is not matched with zip Code"
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
		//OPERATING STATUS ATTRIBUTE
				
			E35_2: {
				name:"statusCheck_blank",
				flag: "E35",
				value:"2",
				msg: "The check box is not the the only one selected status"
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
				msg: " 'No' check box is selected  but the activity  is not entered "},

			// CONTACT INFORMATION ATTRIBUTE 
		
			E39_1: {
				name:"contactName_dataType",
				flag : "E39",
				value: "1",
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
				}
}



//returns true if the string only has the allowed characters
			
function check_allowed_char(input,type,config){
	var filter = eval(config)[type].allowed;
	//console.log(filter.test(input))
	return(!filter.test(input));
}

//returns true if the string contains any illegal characters
function check_invalid_char(input, type, config){
	var filter = eval(config)[type].not_allowed;
	//console.log(filter.test(input))
	return(filter.test(input));
}

//returns true if the string contains all required characters

function check_req_char(input, type, config){
	var filter = eval(config)[type].required;
	//console.log(filter.test(input));
	return(!filter.test(input));
}


// length field validation function
//console.log( length_field_check("123-4567-5890", "faxNum", "conf1"));
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



// presence check for check marks

function check_box(input){	
	if (typeof(input) == 'undefined') { 
		return false;
	}   	
	else {
		return true;
	}		 
} 

//console.log(check_box("ceased"));
// presence check
function presence_check(input){	
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
var test1 = lkup_binary_m("city_state_zip","zip","01005").data;
//creating the reference (input) object 
var test2 ={
 		"city" : "Barre",
 		"state" : "FA",
 		"zip" : "01005"
 	};
 
//console.log(matchObj(test2,test1,"zip"));

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
 //console.log(lkup_exhaustive ("city_state_zip","01021","zip"));
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
 //console.log(lkup_exhaustive_m ("city_state_zip","01001","zip"));
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
 //console.log(lkup_binary_m("city_state_zip","zip","01001"));
// console.log(lkup_binary_m("city_state_zip","zip","01021"));
 
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
  



// Integration functions for Establishment attributes and their flags
// shipping address attributes
 
 function Verfication_companyName_Shipping_address (input){
		var result = new Object();
		var error;
		result.flgname  =  [];
		result.flgflag  =  [];
		result.flgvalue =  [];
		result.flgmsg   =  [];
		result.pass = true;
		if (!check_box(input)){
			error = "E20_2"
			result.flgname.push(flags[error].name);
			result.flgflag.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
			}
		console.log(result.flgname.length);
		if (result.flgname.length>0){
			result.pass = false;
		}
		return result;
}	
//console.log(shipping_Company_name_1("sar45"));
function shipping_Company_name_1 (input){
		var result = new Object();
		var error;
		result.flgname  =  [];
		result.flgflag  =  [];
		result.flgvalue =  [];
		result.flgmsg   =  [];
		result.pass = true;
		if (!check_allowed_char(input, "alphanumeric", "conf1")){
			error = "E21_1"
			result.flgname.push(flags[error].name);
			result.flgflag.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
			}
		if (!presence_check(input)){
			error = "E21_2"
			result.flgname.push(flags[error].name);
			result.flgflag.push(flags[error].flag);
			result.flgvalue.push(flags[error].value);
			result.flgmsg.push(flags[error].msg);
			}
		//console.log(result.flgname.length);
		if (result.flgname.length>0){
			result.pass = false;
		}
		return result;
}	

//console.log( shipping_Company_name_2("ann@123"));
function shipping_Company_name_2(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!check_allowed_char(input, "alphanumeric", "conf1")){
		error = "E21_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (result.flgname.lenght>0){
		result.pass = false;
	}
	return result;
}	
//console.log(shipping_address("Athens, andover,P.O."));
function shipping_address(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!check_allowed_char(input, "alphanumeric", "conf1")){
		error = "E23_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E23_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (check_invalid_char(input, "shippingAddress", "conf1")){
		error = "E23_5"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	//console.log(result.flgname.length);
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
//console.log(shipping_city("sa4445"));
function shipping_city(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	
	if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "E23_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E23_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	

function shipping_state(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	
	if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "E25_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E25_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	
	if(!length_field_check(input, "state", "conf1")){
		error = "E25_4"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
			}
	
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	

//console.log(shipping_zip5("Aga23wam", "Mh2","01001"));

function shipping_zip(input1, input2, input3){
	var result = new Object();
	var error;
	var input1;
	var input2;
	var input3;
	var test2 = lkup_binary_m("city_state_zip","zip", input3).data;
	var test1 = {
			"city" : input1 ,
			"state" : input2,
			"zip" : input3
	};
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!check_allowed_char(input3, "numeric", "conf1")){
		error = "E26_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if (!presence_check(input3)){
		error = "E26_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if(!length_field_check(input3, "zipCode", "conf1")){
		error = "E26_4"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if(!(lkup_binary_m("city_state_zip","zip",input3).data>0)){
		error = "E26_22"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}

	if(!matchObj(test1, test2, "zip")){
		error = "E24_23"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
// verification Mailing address integration functions
function Verfication_companyName_Shipping_address (input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check(input)){
		error = "E27_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	console.log(result.flgname.length);
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	

//mailing address attributes integration functions

function mailing_company_name_1(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true
	if (!check_allowed_char(input, "alphanumeric", "conf1")){
		error = "E28_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E28_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	


function mailing_company_name_2(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true

	if (!check_allowed_char(input, "alphanumeric", "conf1")){
		error = "E29_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	

function mailing_address(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true

	if (!check_allowed_char(input, "alphanumeric", "conf1")){
		error = "E31_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E31_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	

function mailing_city(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true
	
	if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "E32_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E32_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	

function mailing_state(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true
	
	if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "E33_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E33_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	
	if(!length_field_check(input, "state", "conf1")){
		error = "E33_4"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
			}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}

//console.log(mailing_zip("01026"));

//console.log(mailing_zip5("Astara", "OH", "01001"));

function mailing_zip(input1, input2, input3){
	var result = new Object();
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	var error;
	var input1;
	var input2;
	var input3;
	var test2 = lkup_binary_m("city_state_zip","zip", input3).data;
	var test1 = {
			"city" : input1 ,
			"state" : input2,
			"zip" : input3
	};
	
	result.pass = true;
	if (!check_allowed_char(input3, "numeric", "conf1")){
		error = "E34_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if (!presence_check(input3)){
		error = "E34_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if(!length_field_check(input3, "zipCode", "conf1")){
		error = "E34_4"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	
	if(!(lkup_binary_m("city_state_zip","zip",input3).data>0)){
		error = "E26_22"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if(!matchObj(test1, test2, "zip")){
		error = "E32_23"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);	
	}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	


//console.log( date_Of_Ceased("12/sa/2018"));	
function date_Of_Ceased(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true
	
	if (!check_allowed_char(input, "dateOfCeased", "conf1")){
		error = "E31_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	//if (!check_box(input)){
	//	error = "E31_2"
		//result.flgname.push(flags[error].name);
		//result.flgflag.push(flags[error].flag);
		//result.flgvalue.push(flags[error].value);
		//result.flgmsg.push(flags[error].msg);
		//}
	if (check_req_char(input, "dateOfCeased", "conf1")){
		error = "E36_3"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	


// integrated match function
/*

console.log(matchobj_integrate1("Agawam", "MA", "01001"));

function matchobj_integrate1(input1, input2, input3){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	var test1 = {
			"city" : input1 ,
			"state" : input2,
			"zip" : input3
	};
	var test2 = lkup_binary_m("city_state_zip","zip", input3).data;
	if (matchObj(test1,test2,"zip")){
		result.pass = true;
	}
	else {
		result.pass = false;
		error = "E24_23"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	return result;
}

var example = {
		"city" : "Agawam" ,
		"state" : "MH",
		"zip" : "01001"
};

console.log(matchobj_integrate2(example));
function matchobj_integrate2(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	var input3 = input.zip;
	var test2 = lkup_binary_m("city_state_zip","zip", input3).data;
	if (matchObj(input,test2,"zip")){
		result.pass = true;
	}
	else {
		result.pass = false;
		error = "E24_23"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	return result;
}

*/
// Integration function for operating Status check

//console.log(check_operating_Status("In_Operation","temp", "ceased"));
function check_operating_Status(input1, input2, input3){
	var result = new Object();
	var error;
	var input1;
	var input2;
	var input3;
	var test = {
		"In_Operation" : input1,
		"Inactive" : input2,
		"Ceased ":input3
	};
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (check_box(input1) && check_box(input2) && check_box(input3)){
		error = "E35_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	console.log(result.flgname.length);
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	

//console.log(CrossCheck_operatingStatus_dateOfCeased ("ceased",""));
//console.log(CrossCheck_operatingStatus_dateOfCeased ("","21/11/2014"));
function CrossCheck_operatingStatus_dateOfCeased (input1,input2){
	var result = new Object();
	var error;
	var input1;
	var input2;
	var test = {
		"Ceased Operation ": input1,
		"date of Ceased" : input2
	};
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if ((check_box(input1) && ! check_box(input2))||(!check_box(input1) && check_box(input2)) ){
		error = "E5_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	console.log(result.flgname.length);
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}
//  Integration functions for verification of Primary Industry Activities
//console.log(Verfication_priamaryIndustry_checkBox(""));
function Verfication_priamaryIndustry_checkBox (input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	if (!presence_check_box(input)){
		error = "E37_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	console.log(result.flgname.length);
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
// Integration function for Name of contact information

//console.log(contact_name("sa4445"));
function contact_name(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	
	if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "E39_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E23_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
//Integration function for title of contact information
//console.log(contact_name("manager senior"));
function contact_title(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	
	if (!check_allowed_char(input, "alphabetic", "conf1")){
		error = "E40_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E40_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	
//Integration function for phone number of contact information
//console.log(contact_phone("256-sdf-4562"));
function contact_phone(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	
	if (!check_allowed_char(input, "phone", "conf1")){
		error = "E41_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E41_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	//if (!check_required-char(input)){
		//error = "E41_3"
		//result.flgname.push(flags[error].name);
		//result.flgflag.push(flags[error].flag);
		//result.flgvalue.push(flags[error].value);
		//result.flgmsg.push(flags[error].msg);
		//}
	
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	

//Integration function for fax number of contact information
//console.log(contact_fax_number("256-sae-4562"));
function contact_fax_number(input){
	var result = new Object();
	var error;
	result.flgname  =  [];
	result.flgflag  =  [];
	result.flgvalue =  [];
	result.flgmsg   =  [];
	result.pass = true;
	
	if (!check_allowed_char(input, "faxNum", "conf1")){
		error = "E7_1"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	if (!presence_check(input)){
		error = "E42_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
		}
	//if (!check_required-char(input)){
		//error = "E42_3"
		//result.flgname.push(flags[error].name);
		//result.flgflag.push(flags[error].flag);
		//result.flgvalue.push(flags[error].value);
		//result.flgmsg.push(flags[error].msg);
		//}
	if(!length_field_check(input, "faxNum", "conf1")){
		error = "E7_2"
		result.flgname.push(flags[error].name);
		result.flgflag.push(flags[error].flag);
		result.flgvalue.push(flags[error].value);
		result.flgmsg.push(flags[error].msg);
	}
	if (result.flgname.length>0){
		result.pass = false;
	}
	return result;
}	

// Test objects company_form.js
var object = {
		shipping_comapny_name_1: "sa129715",
		shipping_comapny_name_2: "sa",
		shipping_address: "2 Andoveer, p.o.box34", 
		shipping_city: "agawama", 
		shipping_state: "DC",
		shipping_zip5: "01001",
		//shipping_zip4: "", 
		mailing_comapny_name_1: "apple23", 
		mailing_comapny_name_2: "",
		mailing_attention: "" ,
		mailing_address: "Putnam Sq, no.268",
		mailing_attention:"",
		mailing_comapny_name_1: "Apple34/kj",
		mailing_comapny_name_2: "",
		mailing_city: "blandford",
		mailing_state: "MA",
		mailing_zip5: "01005",
		//status_ceased_day: "12",
		//status_ceased_month: "32",
		//status_ceased_year: "2017",
		status_inoperation: "Ceased"
};


//console.log(Verfication_companyName_Shipping_address (input));
console.log(shipping_Company_name_1("sa129715"));
console.log(shipping_Company_name_2("sa"));
console.log(shipping_address("2 Andoveer, p.o.box34"));
console.log(shipping_city("agawama"));
console.log(shipping_state("DC"));
console.log(shipping_zip("agawama", "DC", "01265"));
console.log(mailing_company_name_1("apple23"));
console.log(mailing_company_name_2(""));
console.log(mailing_address("Athens, andover,P.O."));
console.log(mailing_city("sa4445"));
console.log(mailing_state("sa4445"));
console.log(mailing_zip("blandford", "MA","01021"));
console.log(date_Of_Ceased("15/12/2017"));
console.log(check_operating_Status ("In Operation","Temp", "Ceased"));
console.log(CrossCheck_operatingStatus_dateOfCeased ("","21/11/2014"));

/*
var Object2 = { 
		Mailing_address: "Putnam Sq, no.268",
		Mailing_attention: "",
		Mailing_city: "Amherest",
		Mailing_comapny_name_1: "apple34/kj",
		Mailing_comapny_name_2: "",
		Mailing_state: "MA",
		Mailing_zip4: "",
		Mailing_zip5: "01001",
		shipment_number: "126899",
		shipment_value: "66333",
		shipping_address: "Mill street ave, po_b 25668, num 23.",
		shipping_city: "agawama",
		shipping_comapny_name_1: "Oil gass 567",
		shipping_comapny_name_2: "Patburg",
		shipping_state: "DC",
		shipping_zip4: "",
		shipping_zip5: "01005",
		status_ceased_day: "15",
		status_ceased_month: "12",
		status_ceased_year: "2017",
		status_inoperation: "Inactive"
}
*/
//using name of attributes in objects for test

console.log(shipping_Company_name_1(object.shipping_comapny_name_1));
console.log(shipping_Company_name_2(object.shipping_comapny_name_2));
console.log(shipping_address(object.shipping_address));
console.log(shipping_city(object.shipping_city));
console.log(shipping_state(object.shipping_state));
console.log(shipping_zip(object.shipping_city, object.shipping_state, object.shipping_zip5));
console.log(mailing_company_name_1(object.mailing_comapny_name_1));
console.log(mailing_company_name_2(object.mailing_comapny_name_2));
console.log(mailing_address(object.mailing_address));
console.log(mailing_city(object.mailing_city));
console.log(mailing_state(object.mailing_state));
console.log(mailing_zip(object.mailing_city, object.mailing_state, object.mailing_zip5));
console.log(date_Of_Ceased("15/12/2017"));
console.log(check_operating_Status("In-operation","Inactive", "Ceased"));
console.log(CrossCheck_operatingStatus_dateOfCeased (object.status_inoperation,"15/12/2017"));

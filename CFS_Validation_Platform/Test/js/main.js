var shipment;
var company;
//binding the event listener to the file picker button
$(document).ready(function(e) {
	document.getElementById('cfile').addEventListener('change', readFile_c, false);
	document.getElementById('sfile').addEventListener('change', readFile_s, false);
	document.getElementById("submit").disabled = true;
});

function readFile_s (evt) {
    var file = evt.target.files[0];
    $("#cfiledetails").empty();   
    Papa.parse(file, {    	
    		delimiter: ",",
    		newline: "",	// auto-detect
    		quoteChar: '"',
    		escapeChar: '"',
    		header: true, //store in array - 
    		trimHeader: true,
    		dynamicTyping: false,
    		preview: 0,
    		encoding: "",
    		worker: false,
    		comments: false,
    		step: undefined,
    		complete: function(result) {
	    		shipment = result.data;	    		
	    		$('#sfiledetails').empty();
	    		var html = 'Shipment data file<br>' ;
	    		if (result.errors.length>0){
	    			html += 'Errors: '+ result.errors.join()+'<br>';		
	    		} else {
	    			html += result.data.length+' rows of data, '+result.meta.cursor+' characters <br>';
	    			html += 'File header: '+ result.meta.fields.join()+ '<br>';
	    		}
	    		$('#sfiledetails').append(html);    		
    		},
    		error: undefined,
    		download: false,
    		skipEmptyLines: true,
    		chunk: undefined,
    		fastMode: undefined,
    		beforeFirstChunk: undefined,
    		withCredentials: undefined   		
    });
 }

function readFile_c (evt) {
    var file = evt.target.files[0];
    var fr = new FileReader();
    fr.onload = function () {
    	//console.log(fr.result);
    	var result = JSON.parse(fr.result);
    	console.log(result);
	};
    fr.readAsText(file);        
 }

//processing the input and displaying the results
function log(input,loc){	
	$(loc).empty();
	var html = 'Shipment data file<br>' ;
	if (input.errors.length>0){
		html += 'Errors: '+ input.errors.join()+'<br>';		
	} else {
		html += input.data.length+' rows of data, '+input.meta.cursor+' characters <br>';
		html += 'File header: '+ input.meta.fields.join()+ '<br>';
	}
	$(loc).append(html);
	console.log(input)

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
	//check_allowed_char("PtO1?", "shippingAdress", "conf1");
	//console.log(lkup_exhaustive("city_state_zip","zip","01007"));
	if (result.flags.size>0){
		result.pass = false;
	} else {
		result.pass = true;
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
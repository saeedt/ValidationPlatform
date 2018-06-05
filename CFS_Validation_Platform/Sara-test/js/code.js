//Global variables
var inputData = [];

config = {
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
    console.log(required(sa));
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
	html += input.meta.delimiter+'</p>';
	$("#log-contect").append(html);
	console.log(input)
}


// check whether a field is empty or not 

function required(result) 	
{	
	
	if (result.value.length == 0){ 
		alert("blank field");  	
      return false; 
	}  	
   return true; 
} 

//validating for all numbers in a field

function allnumeric(inputData)
{
	var numbers = /^[0-9]+$/;
  	if(inputData.value.match(numbers))
  	{
  	return true;
  	}
  	else
  	{
  		alert(' input is not numeric characters only');

  		return false;
  	}
}

//Validating for all letters in a field

function allLetter(inputData)
{
	var letters = /^[A-Za-z]+$/;
	if(inputData.value.match(letters))
	{
	return true;
	}
	else
	{
		alert("input is not letters only");
   return false;
	}
}	

//Validating for all letters and space in a field
function allLetter(inputData)
{
	var letters = /^[A-Za-z ]+$/;
	if(inputData.value.match(letters))
	{
    return true;
	}
	else
	{
		alert("input is not letters only");
   return false;
	}
}

// validating for alphanumeric( letters and numbers)

function alphanumeric(inputData)
{
 var letterNumber = /^[0-9a-zA-Z]+$/;
 if(inputData.value.match(letterNumber))
  {
   return true;
  }
else
  { 
   alert("input is not letters and numbers only"); 
   return false; 
  }
  }
  
// Checking string length  
function lengthRange(inputData, minlength, maxlength)
{  	
   var userInput = inputData.value;  
   if(userInput.length >= minlength && userInput.length <= maxlength)
      {  	
        return true;  	
      }
   else
      {  	
	alert("Please input between " +minlength+ " and " +maxlength+ " characters");  		
        return false;  	
      }  
}
	
// Phone Number validation

// validate a phone number of 10 digits with no comma, no spaces, no punctuation and 
//there will be no + sign in front the number, and phone numbers with 10 digits xxx_xxx_xxxx
function phonenumber(inputData)
{
  var phoneno = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
  if(inputData.value.match(phoneno))
        {
      return true;
        }
      else
        {
        alert("message");
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
    


//Invalid character check:
function Inval(inputData)
{
	var splChars = "*|,\":<>[]{}`\';()@&$#%";
	var i;
	for (var i = 0; i < inputData.value.length; i++){
		if (splChars.indexOf(inputData.value.charAt(i)) != -1)
		{ 
		alert ("not valid characters detected!")
		}
	
		else
		{
		return true 
		}
	}
}
    // invalid Pattern of characters check for addrss
function pattern(inputData)
{
	var x;
	var string;
	
    for ( x in list {P_O_", "P.O_","P..B","P.O_","P.O.","PO_B","PO_D","POB_","POST"} ) {
    	
    		if( string.includs(x,0) is true ){
    		alert ("not valid characters detected!");
    		return false; 
    		}	
    } 
}
 
    // Invalid pattern for one specific pattern
  /*
	var patt= / "P_O_"/ ;
	var string ="";
			
		if(patt.test(str) is true ){
	 alert ("not valid characters detected!");
	return false;
		}
		
    
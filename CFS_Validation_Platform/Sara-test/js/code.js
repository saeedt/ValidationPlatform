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
	x = " rd 21 POST"
		console.log(pattern(x));
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

//check whether a field is empty or not 
function required(x) 	
{	
	if (x.length == 0)
	{ 
		alert("blank field");  	
		return false;
	}  	
   return true; 
} 

//validating for all numbers in a field

function allnumeric(x)
{
	var numbers = /^[0-9]+$/;
  	if(x.match(numbers))
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
function allLetter(x)
{
	var letters = /^[A-Za-z]+$/;
	if(x.match(letters))
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
function allLetterSpace(x)
{
	var letters = /^[A-Za-z ]+$/;
	if(x.match(letters))
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
function alphanumeric(x)
{
	var letterNumber = /^[0-9a-zA-Z]+$/;
	if(x.match(letterNumber))
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
function lengthRange(x, minlength, maxlength)
{  	
   //var userInput = inputData.value; // 
   if(x.length >= minlength && x.length <= maxlength)
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
    


//Invalid character check(need revise)
function Inval(x)
{
	var splChars = "*|,\":<>[]{}`\';()@&$#%";
	var i;
	for (var i = 0; i <x.length; i++){
		if (splChars.indexOf(x.charAt(i)) != -1)
		{ 
		alert ("not valid characters detected!")
		}
	
		else
		{
		return true 
		}
	}
}
  
// invalid Pattern of characters check for address (need revise)
function pattern(x)
{
	var y;
	var string;
}
    for ( y in  list {" P_O_", "P.O_","P..B","P.O_","P.O.","PO_B","PO_D","POB_","POST"}  ) 
    {
    	if(string.includs(y,0) is true )
    	{
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
		*/

    
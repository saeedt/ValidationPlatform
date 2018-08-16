//Global variables
var output;
//binding the event listener to the file picker button
$(document).ready(function(e) {
	document.getElementById('file').addEventListener('change', readFile, false);
	document.getElementById("download").disabled = true;
});

//file reader based on papaparse when the file picker is clicked
function readFile (evt) {
    var files = evt.target.files;
    var file = files[0]; 
    Papa.parse(file, {    	
    		delimiter: ",",
    		newline: "",	// auto-detect
    		quoteChar: '"',
    		escapeChar: '"',
    		header: true,
    		trimHeader: true,
    		dynamicTyping: false,
    		preview: 0,
    		encoding: "",
    		worker: false,
    		comments: false,
    		step: undefined,
    		complete: function(results) {
    		log(results);},
    		error: undefined,
    		download: false,
    		skipEmptyLines: true,
    		chunk: undefined,
    		fastMode: undefined,
    		beforeFirstChunk: undefined,
    		withCredentials: undefined   		
    });
 }

function log(input){
	inputData = input.data;
	$("#csvcontents").empty();
	var html = '<hr><p>'+input.data.length+' Rows in the input file (including the header)</p>';
	if (input.errors.length>0){//input file has error(s)
		html += '<p>Errors:<br>';
		for (var i=0; i<input.errors.length; i++){
			html += 'Line#: '+input.errors[i].row+' Type: '+input.errors[i].type+' Code: '+input.errors[i].code+' Message: '+input.errors[i].message+'<br>';
		}
		html +='</p>';
		document.getElementById("download").disabled = true;
	} else { //no error(s) in the input file
		html += '<p>No errors detected in the input file.</p>';
		document.getElementById("download").disabled = false;
	}	
	html += '<p>Header: '+input.meta.fields+'</p><hr>';
	$("#csvcontents").append(html);
	output = JSON.stringify(input.data);
	document.getElementById("download").onclick = download;
	//console.log(input)
	}

function download(){	   	
	var a         = document.createElement('a');
	a.href        = 'data:attachment/csv,' + encodeURIComponent(output);
	a.target      = '_blank';
	a.download    = 'output.json';
	document.body.appendChild(a);
	a.click();    	
};

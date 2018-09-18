//Global variables
var output = {};
//binding the event listener to the file picker button
$(document).ready(function(e) {
	document.getElementById('file').addEventListener('change', readFile, false);
	document.getElementById("download").disabled = true;
	
	addTypes();
});

//file reader based on papaparse when the file picker is clicked
function readFile (evt) {
    var files = evt.target.files;
    var combo = document.getElementById("type");
    document.getElementById("download").disabled = true;
    var file = files[0];
    var fileName = evt.target.value.split(/(\\|\/)/g).pop();
    var lkupFound = false;
    $("#csvcontents").empty();
    if(combo.value=='AD'){
    	for (var i=0; i<combo.options.length; i++){
        	if (fileName.toUpperCase().indexOf(combo.options[i].value.toUpperCase())!=-1){
        		combo.selectedIndex = i;
        		lkupFound = true;
        		break;
        	}
        }
    	if (!lkupFound){
        	var html = '<hr><p>Data file name does not match existing lookup table types. Rename the data file or select the lookup table type from the list.</p>';
        	$("#csvcontents").append(html);
        }
    }    
    Papa.parse(file, {    	
    		delimiter: ",",
    		newline: "",	// auto-detect
    		quoteChar: '"',
    		escapeChar: '"',
    		header: false, //store in array - 
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
function addTypes(){	
	var combo = document.getElementById("type");	
	for (var key in converter_config){
		var option = document.createElement("option");
		option.text = key;
		option.value = key;
		option.config_name = converter_config[key].config_name;
		option.flags = converter_config[key].flags;
		option.required_columns = converter_config[key].required_columns;
		combo.add(option);
	}
	var option = document.createElement("option");
	option.text = 'Auto Detect';
	option.value = 'AD';
	option.selected='selected';
	combo.add(option);
}

function log(input){
	var combo = document.getElementById("type");
	var fileError = false;
	var html = '';
	var header = input.data[0].slice(0);
	//console.log(combo.options[combo.selectedIndex].required_columns);
	//console.log(input.meta);
	//input.data.forEach(function(v){ delete v.State });
	//console.log(input.data);
	html += '<p>Columns: '+header.toString()+'</p>';
	html += '<p>'+(input.data.length -1 )+' Rows of data in the input file </p>';
	for (var i=1;i<input.data.length;i++){
		if (input.data[i].length != header.length){
			html += '<p>Number of columns in row '+i+' does not match the file header.</p>';
			fileError = true;			
		} else {
			for (var j=0;j<input.data[i].length;j++){
				if (!input.data[i][j].trim().length >0 || input.data[i][j].trim().toUpperCase() == 'NULL' || 
						input.data[i][j].trim().toUpperCase() == 'NA'|| input.data[i][j].trim().toUpperCase() == 'N/A'){
					html += '<p>Missing value for column '+header[j].trim()+' in row '+i+'.</p>';
					fileError = true;
				}
			}
		}		
	}
	/*if (input.errors.length>0){//input file has error(s)
		html += '<p>File Errors:<br>';
		for (var i=0; i<input.errors.length; i++){
			html += 'Line#: '+input.errors[i].row+' Type: '+input.errors[i].type+' Code: '+input.errors[i].code+' Message: '+input.errors[i].message+'<br>';
		}
		html +='</p>';
		document.getElementById("download").disabled = true;
	} else { //no error(s) in the input file
		html += '<p>No format errors detected in the submitted file.</p>';		
	}*/	
	if(combo.value!='AD'){
		var colFound;
		var colError = false;
		var columns = [];		
		for (var j=0; j<combo.options[combo.selectedIndex].required_columns.length; j++){
			colFound = false;
			for (var i=0;i<header.length;i++){
				if (header[i].toUpperCase().indexOf(combo.options[combo.selectedIndex].required_columns[j].trim().toUpperCase())!=-1){
					colFound = true;
					columns.push(i);
					header[i] = '';
					break;
				}
			}
			if (!colFound) {
				colError = true;
				html += '<p>Error: Column '+combo.options[combo.selectedIndex].required_columns[j]+' is required for lookup table '+combo.value+' but was not found in the submitted data file.</p><hr>';
			}
		}
		if (!colError && !fileError){
			output = {};
			output['data'] = 'var '+combo.options[combo.selectedIndex].config_name+'=[';
			for (var i=1; i<input.data.length;i++){
				output.data+='{';
				for (var j=0; j<columns.length; j++){
					output.data += '"'+combo.options[combo.selectedIndex].required_columns[j].trim().toUpperCase()+'":"'+input.data[i][columns[j]].trim()+'",'
				}
				output.data = output.data.slice(0, -1);
				output.data +='},';
			}
			output.data = output.data.slice(0, -1)
			output.data +='];'
			output['fileName'] = combo.options[combo.selectedIndex].config_name;
			//output = JSON.stringify(input.data);
			document.getElementById("download").disabled = false;
			document.getElementById("download").onclick = download;
		}
	}
	$("#csvcontents").append(html);		
}
function download(){	   	
	var a         = document.createElement('a');
	a.href        = 'data:attachment/csv,' + encodeURIComponent(output.data);
	a.target      = '_blank';
	a.download    = output.fileName+'.js';
	document.body.appendChild(a);
	a.click();    	
};

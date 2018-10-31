var shipment;
var company;
var sfile_ok;
var cfile_ok;
//binding the event listener to the file picker button
$(document).ready(function(e) {
	document.getElementById('cfile').addEventListener('change', readFile_c, false);
	document.getElementById('sfile').addEventListener('change', readFile_s, false);
	document.getElementById("submit").disabled = true;
	document.getElementById("submit").onclick = process;
});

function readFile_s (evt) {
	document.getElementById("submit").disabled = true;
    var file = evt.target.files[0];
    $("#sfiledetails").empty();   
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
	    		sfile_ok = false;
	    		var html = [];
	    		html.push('<p>Shipment data file<br>');
	    		if (result.errors.length>0){
	    			var errors = [];
	    			for (var i=0; i<result.errors.length;i++){
	    				errors.push('row:'+result.errors[i].row+
	    				' index:'+result.errors[i].index+' '+result.errors[i].type+
	    				':'+result.errors[i].message);
	    			}
	    			html.push('Errors: <br>'+ errors.join("<br />")+'<br>');	
	    		} else {
	    			sfile_ok = true;
	    			html.push(result.data.length+' rows of data, '+result.meta.cursor+' characters <br>');
	    			html.push('List of columns <br>'+ result.meta.fields.join("<br />")+ '<br>');
	    			if (sfile_ok && cfile_ok){
	    				document.getElementById("submit").disabled = false;
	    			}
	    		}
	    		$('#sfiledetails').append(html.join('')+'</p>');    		
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
	document.getElementById("submit").disabled = true;
    var file = evt.target.files[0];
    var fr = new FileReader();
    fr.onload = function () {
    	var result;
    	cfile_ok = false;
    	var html = [];
    	html.push('<p>Company data file<br>') ;
    	$('#cfiledetails').empty();
    	try {
    		result = JSON.parse(fr.result);
    		company = result;
    		var keys = [];
    		for (var i in result){
    			keys.push(i);
    		}
    		html.push(keys.length +' attributes in the JSON object<br>'+keys.join("<br />")+'<br>');
    		cfile_ok = true;
    	} catch(e) {
    		html.push('Errors: '+e+'<br>');
    		cfile_ok = false;
    	}
    	if (sfile_ok && cfile_ok){
			document.getElementById("submit").disabled = false;
		}
    	html.push('</p>');
    	$('#cfiledetails').append(html.join(''));
	};
    fr.readAsText(file);        
 }

function process(){
	var cresult = verify_company(company);
	var sresult = verify_shipment(shipment);
	$("#log-content").empty();
	var pass = true;
	var html = [];
	html.push('<p> Establishment data file validation<br>');
	Object.keys(cresult).forEach(function(key,index) {
		if (cresult[key].flags.length>0) {
			pass = false;
			html.push(key+'<br>');
			for (var i=0; i<cresult[key].flags.length; i++){
				html.push(cresult[key].flags[i]+'='+cresult[key].flagval[i]+' '+cresult[key].flagname[i]+' '+cresult[key].flagmsg[i]+'<br>');
			}
		}		
	});
	if (pass)
		html.push('No errors<br>');
	pass = true;
	html.push('</p><hr>');
	html.push('<p> Shipment data file validation<br>');
	for (var i=0; i<sresult.length-1; i++){
		Object.keys(sresult[i]).forEach(function(key,index) {
			if (sresult[i][key].flags.length>0) {
				html.push(key+'<br>');
				pass = false;
				for (var j=0; j<sresult[i][key].flags.length;j++){
					html.push('(Line '+ String(i+1)+') '+sresult[i][key].flags[j]+'='+sresult[i][key].flagval[j]+' '+sresult[i][key].flagname[j]+' '+sresult[i][key].flagmsg[j]+'<br>');
				}
			}
		});				
	}
	if (sresult[sresult.length-1].flags.length >0){
		pass = false;
		html.push(sresult[sresult.length-1].flags[0]+'='+sresult[sresult.length-1].flagval[0]+' '+sresult[sresult.length-1].flagname[0]+' '+sresult[sresult.length-1].flagmsg[0]+'<br>');
	}
	if (pass)
		html.push('No errors<br>');
	html.push('</p>');
	$("#log-content").append(html.join(''));
	
}
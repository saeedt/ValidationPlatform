var shipment;
var company;
var cfile_ok;
var log_e;
var log_s;
//binding the event listener to the file picker button
$(document).ready(function(e) {
	document.getElementById('cfile').addEventListener('change', readFile_e, false);
	document.getElementById('sfile').addEventListener('change', readFile_s, false);
	document.getElementById("submit-s").disabled = true;
	document.getElementById("submit-e").disabled = true;
	document.getElementById("dl-report").disabled = true;
	document.getElementById("submit-s").onclick = process_shp;
	document.getElementById("submit-e").onclick = process_est;
	document.getElementById("dl-report").onclick = download_report;
});

function readFile_s (evt) {
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
	    			html.push(result.data.length+' rows of data, '+result.meta.cursor+' characters <br>');
	    			html.push('List of columns <br>'+ result.meta.fields.join("<br />")+ '<br>');	    			
	    			document.getElementById("submit-s").disabled = false;	    			
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

function readFile_e (evt) {
    var file = evt.target.files[0];
    var fr = new FileReader();
    fr.onload = function () {
    	var result;
    	cfile_ok = false;
    	var html = [];
    	var log_e = [];
    	html.push('<p>Establishment data file<br>') ;
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
    	if (cfile_ok){
			document.getElementById("submit-e").disabled = false;
		}
    	html.push('</p>');
    	$('#cfiledetails').append(html.join(''));
	};
    fr.readAsText(file);        
 }

function process_est(){
	var cresult = verify_company(company);	
	$("#log-est").empty();
	var pass = true;
	var html = [];
	log_e = [];
	html.push('<p> Establishment data file validation<br>');
	log_e.push('Establishment data file validation\n');
	Object.keys(cresult).forEach(function(key,index) {
		if (cresult[key].flags.length>0) {
			pass = false;
			html.push(key+'<br>');
			log_e.push(key+'\n');
			for (var i=0; i<cresult[key].flags.length; i++){
				html.push(cresult[key].flags[i]+'='+cresult[key].flagval[i]+' '+cresult[key].flagname[i]+' '+cresult[key].flagmsg[i]+'<br>');
				log_e.push('\t'+cresult[key].flags[i]+'='+cresult[key].flagval[i]+' '+cresult[key].flagname[i]+' '+cresult[key].flagmsg[i]+'\n');
			}
		}		
	});
	if (pass){
		html.push('No error found in the establishment data file<br>');
		log_e.push('No error found in the establishment data file\n');	
	}		
	html.push('</p>');
	$("#log-est").append(html.join(''));
	document.getElementById("dl-report").disabled = false;	
}

function process_shp(){
	var sresult = verify_shipment(shipment);
	$("#log-shp").empty();
	var pass = true;
	var pass_i;
	var html = [];
	log_s = [];
	html.push('<p> Shipment data file validation<br>');
	log_s.push('Shipment data file validation\n');
	for (var i=0; i<sresult.length-1; i++){
		html.push('Line '+ String(i+1)+'<br>');
		log_s.push('Line '+ String(i+1)+'\n');
		pass_i = true;
		Object.keys(sresult[i]).forEach(function(key,index) {			
			if (sresult[i][key].flags.length>0) {				
				html.push('&nbsp'+key+'<br>');
				log_s.push('\t'+key+'\n');
				pass = false;
				pass_i = false;
				for (var j=0; j<sresult[i][key].flags.length;j++){
					html.push('&nbsp'+sresult[i][key].flags[j]+'='+sresult[i][key].flagval[j]+' '+sresult[i][key].flagname[j]+' '+sresult[i][key].flagmsg[j]+'<br>');
					log_s.push('\t'+sresult[i][key].flags[j]+'='+sresult[i][key].flagval[j]+' '+sresult[i][key].flagname[j]+' '+sresult[i][key].flagmsg[j]+'\n');
				}
			}			
		});	
		if (pass_i){
			html.pop();
			log_s.pop();
		}
	}
	if (sresult[sresult.length-1].flags.length >0){
		pass = false;
		html.push(sresult[sresult.length-1].flags[0]+'='+sresult[sresult.length-1].flagval[0]+' '+sresult[sresult.length-1].flagname[0]+' '+sresult[sresult.length-1].flagmsg[0]+'<br>');
		log_s.push(sresult[sresult.length-1].flags[0]+'='+sresult[sresult.length-1].flagval[0]+' '+sresult[sresult.length-1].flagname[0]+' '+sresult[sresult.length-1].flagmsg[0]+'\n');
	}
	if (pass){
		html.push('No error found in the shipment data file<br>');
		log_s.push('No error found in the shipment data file\n');
	}		
	html.push('</p>');
	$("#log-shp").append(html.join(''));
	document.getElementById("dl-report").disabled = false;
}

function download_report(){
	var output = log_e.concat(log_s);
	var a         = document.createElement('a');
	a.href        = 'data:attachment/txt,' + encodeURIComponent(output.join(''));
	a.target      = '_blank';
	a.download    = 'Report.txt';
	document.body.appendChild(a);
	a.click();
}
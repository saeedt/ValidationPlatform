var shipment;
var company;
var cfile_ok;
var log_e = [];
var log_s = [];
//binding the event listener to the file picker button
$(document).ready(function(e) {
	'use strict';
	;( function( $, window, document, undefined ) {
				$( '.inputfile' ).each( function() {
					var $input	 = $( this ),
						$label	 = $input.next( 'label' ),
						labelVal = $label.html();
					$input.on( 'change', function( e ) {
						var fileName = '';
						if( e.target.value )
							fileName = e.target.value.split( '\\' ).pop();
						if( fileName )
							$label.find( 'span' ).html( fileName );
						else
							$label.html( labelVal );
					});
					// Firefox bug fix
					$input
					.on( 'focus', function(){ $input.addClass( 'has-focus' ); })
					.on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
				});
			})( jQuery, window, document );
	document.getElementById('cfile').addEventListener('change', readFile_e, false);
	document.getElementById('sfile').addEventListener('change', readFile_s, false);
	document.getElementById("submit-s").style.display  = 'none';
	document.getElementById("submit-e").style.display  = 'none';
	document.getElementById("estTable").style.display  = 'none';
	document.getElementById("t1").style.display  = 'none';
	document.getElementById("shipTable").style.display  = 'none';
	document.getElementById("t2").style.display  = 'none';
	/*$( "#tabs" ).tabs();*/
	/*document.getElementById("dl-report").disabled = true;
	document.getElementById("submit-s").onclick = process_shp;
	document.getElementById("submit-e").onclick = process_est;
	document.getElementById("dl-report").onclick = download_report;*/
});
//load the shipment data file
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
	    		document.getElementById("sfiledetails").style.display  = 'block';
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
	    			document.getElementById("submit-s").style.display  = 'inline-block';
	    			document.getElementById("submit-s").onclick = process_shp;
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
//load the establishment file
function readFile_e (evt) {
    var file = evt.target.files[0];
    var fr = new FileReader();
    fr.onload = function () {
    	var result;
    	cfile_ok = false;
    	var html = [];
    	var log_e = [];
    	document.getElementById("cfiledetails").style.display  = 'block';
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
    		document.getElementById("submit-e").style.display  = 'inline-block';
    		document.getElementById("submit-e").onclick = process_est;
    	} catch(e) {
    		html.push('Errors: '+e+'<br>');
    		cfile_ok = false;
    	}
    	/*if (cfile_ok){
			document.getElementById("submit-e").disabled = false;
		}*/
    	html.push('</p>');
    	$('#cfiledetails').append(html.join(''));
	};
    fr.readAsText(file);        
 }
//process the establishment file
function process_est(){
	var cresult = verify_est(company);	
	/*$("#log-est").empty();*/
	var pass = true;
	/*var html = [];
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
	});*/
	document.getElementById("estTable").style.display  = 'block';
	document.getElementById("t1").style.display  = 'block';
	$( "#tabs" ).tabs();
	collapse(document.getElementById("p1"));
	 $('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
	        $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
	    } );	     
	    $('#estTable').DataTable( {
	        data:           cresult,	        
	        scrollCollapse: true,
	        paging: true,
	        autoWidth: true,
	        ordering: true,
	        dom: 'Bfrtip',
	        buttons: ['copy', 'csv', 'excel', 'pdf'],	        
	        columns: [
	            { data: "flag"}, 
	            { data: "flagval"}, 
	            { data: "flagname"}, 
	            { data: "flagmsg"}
	        ]
	    } );	   
	/*if (pass){
		html.push('No error found in the establishment data file<br>');
		log_e.push('No error found in the establishment data file\n');	
	}		
	html.push('</p>');
	$("#log-est").append(html.join(''));
	document.getElementById("dl-report").disabled = false;*/	
}
//process the shipment file
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

function collapse(obj){
	obj.addEventListener("click", function() {
	    //this.classList.toggle("active");
	    var content = this.getElementsByTagName('div')[0];
	    if (content.style.display === "block") {
	    	content.style.display = "none";
	    } else {
	      content.style.display = "block";
	    }
	  });
	obj.dispatchEvent(new Event("click"));
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

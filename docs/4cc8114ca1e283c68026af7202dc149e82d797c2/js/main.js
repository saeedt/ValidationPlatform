var shipment;
var establishment;
var cfile_ok;
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
	$.fn.dataTable.ext.search.push(
	    function( settings, data, dataIndex ) {
	    	var level = filters[settings.nTable.id+'_filter'];
	        var prio = parseFloat( data[3] ) || 10;		 
	        if (prio <= level) {
	            return true;
	        }
	        return false;
	    }
	);	
});
//load the shipment data file
function readFile_s (evt) {
    var file = evt.target.files[0];      
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
	    		try {
	    	    	$( '#sfiledetails' ).accordion( "destroy" );
	    	    	} catch(e){}
	    	    $("#sfiledetails").empty(); 
	    		if (result.errors.length>0){
	    			var errors = [];
	    			for (var i=0; i<result.errors.length;i++){
	    				errors.push('row:'+result.errors[i].row+
	    				' index:'+result.errors[i].index+' '+result.errors[i].type+
	    				':'+result.errors[i].message);
	    			}
	    			html.push('<h2>Errors</h2><div>'+ errors.join("<br/>")+'</div>');	
	    		} else {
	    			var attrib = processVars(result.meta.fields,'shp');	    			
	        		html.push('<h2>Attributes</h2><div><table class="atable">');    		
	        		for (var i =0; i<attrib.data.length; i++){
	        			html.push('<tr><td>'+attrib.data[i].varname+'</td><td>'+attrib.data[i].combo+'</td></tr>');
	        		}    		
	        		html.push('</table></div>');
	        		if (attrib.match){
	        			document.getElementById("submit-s").style.display  = 'inline-block';
		    			document.getElementById("submit-s").onclick = process_shp;
	        		}	    			
	    		}
	    		$('#sfiledetails').append(html.join(''));
	    		activate_combos();
	        	collapse_e('sfiledetails');
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
    var file = evt.target.files[0];      
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
    			establishment = result.data;	    		
	    		var html = [];
	    		try {
	    	    	$( '#efiledetails' ).accordion( "destroy" );
	    	    	} catch(e){}
	    	    $("#efiledetails").empty(); 
	    		if (result.errors.length>0){
	    			var errors = [];
	    			for (var i=0; i<result.errors.length;i++){
	    				errors.push('row:'+result.errors[i].row+
	    				' index:'+result.errors[i].index+' '+result.errors[i].type+
	    				':'+result.errors[i].message);
	    			}
	    			html.push('<h2>Errors</h2><div>'+ errors.join("<br/>")+'</div>');	
	    		} else {
	    			var attrib = processVars(result.meta.fields,'est');	    			
	        		html.push('<h2>Attributes</h2><div><table class="atable">');    		
	        		for (var i =0; i<attrib.data.length; i++){
	        			html.push('<tr><td>'+attrib.data[i].varname+' </td><td>'+attrib.data[i].combo+'</td></tr>');
	        		}    		
	        		html.push('</table></div>');
	        		if (attrib.match){
	        			document.getElementById("submit-e").style.display  = 'inline-block';
		    			document.getElementById("submit-e").onclick = process_est;
	        		}	    			
	    		}
	    		$('#efiledetails').append(html.join(''));
	    		activate_combos();
	        	collapse_e('efiledetails');
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
//process the establishment file
function process_est(){
	var cresult = verify_est(establishment);
	//console.log(cresult);
	var pass = true;	
	document.getElementById("estTable").style.display  = 'block';
	document.getElementById("t1").style.display  = 'block';
	document.getElementById("submit-e").style.display  = 'none';
	collapse_c('efiledetails');
	$( "#tabs" ).tabs();
	$("#tabs").tabs("option", "active", 0);
	$('#estTable').DataTable().destroy();
	$('#estTable').empty();	
	
    var table = $('#estTable').DataTable( {
        data: cresult,	        
        scrollCollapse: true,
        paging: true,
        autoWidth: true,
        ordering: true,
        select: false,
        dom: 'Blfrtip',
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        buttons: ['csv', 
                  {extend: 'excel',
                	  customize: function( xlsx ) {
                          var sheet = xlsx.xl.worksheets['sheet1.xml']; 
                          $('row', sheet).each( function (e) {
                        	  //console.log($('c[r^="D"]', this).text());
                        	  if ( $('c[r^="D"]', this).text() == 1 ){
                        		  $('row:nth-child('+(e+1)+') c', sheet).attr('s', '10');                        		  
                        	  } else if ( $('c[r^="D"]', this).text() == 2 ){
                        		  $('row:nth-child('+(e+1)+') c', sheet).attr('s', '5');                        		  
                        	  }   else if ( $('c[r^="D"]', this).text() == 3 ){
                        		  $('row:nth-child('+(e+1)+') c', sheet).attr('s', '20');                        		  
                        	  }});                          
                      }},
                  {extend: 'pdf',
                	  customize: function( pdf ) {
                		  var p = table.column(3).data().toArray();                		  
                		  for (var i = 0; i < p.length; i++) {
                	        if (p[i]==1) {
                	        	pdf.content[1].table.body[i+1].forEach(function(e,l){
                	        		e.fillColor = '#ffcccc';
                	        	});                	          
                	        } else if (p[i]==2){
                	        	pdf.content[1].table.body[i+1].forEach(function(e,l){
                	        		e.fillColor = '#ffd699';
                	        	});
                	        } else if (p[i]==3){
                	        	pdf.content[1].table.body[i+1].forEach(function(e,l){
                	        		e.fillColor = '#ffffcc';
                	        	});
                	        }
                	  }
                  }}],                  
        "columnDefs": [
            { "title": "Line#",   "targets": 0 ,  "data": "line"},
            { "title": "Flag",   "targets": 1 ,  "data": "flag"},
            { "title": "Value",  "targets": 2 , "data": "flagval"},
            { "title": "Priority",  "targets": 3 , "data": "priority"},
            { "title": "Flag Name", "targets": 4, "data":"flagname" },
            { "title": "Description",  "targets": 5 , "data": "flagmsg"}],
            "createdRow": function( row, data, dataIndex){        	
            	$(row).css('background-color', colors[data["priority"]].color);                
            }
    } );
    //console.log(pdftable);
    $('#estTable_length').append(' Error priority level <select id="estTable_cmb"><option value ="1">1</option><option value ="2">2</option><option value ="3" selected>3</option>');
	$('#estTable_cmb').change(function() {
		filters['estTable_filter'] = this.value;
		table.draw();			
	});
}
//process the shipment file
function process_shp(){
	var cresult = verify_shipment(shipment);
	//console.log(cresult);
	var pass = true;
	document.getElementById("shipTable").style.display  = 'block';
	document.getElementById("t2").style.display  = 'block';
	document.getElementById("submit-s").style.display  = 'none';	
	collapse_c('sfiledetails');
	$( "#tabs" ).tabs();
	$("#tabs").tabs("option", "active", 1);
	$('#shipTable').DataTable().destroy();
	$('#shipTable').empty();	
	var table = $('#shipTable').DataTable( {
	        data: cresult,	        
	        scrollCollapse: true,
	        paging: true,
	        autoWidth: true,
	        ordering: true,
	        select: false,
	        dom: 'Blfrtip',
	        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
	        buttons: ['csv', 
	                  {extend: 'excel',
	                	  customize: function( xlsx ) {
	                          var sheet = xlsx.xl.worksheets['sheet1.xml']; 
	                          $('row', sheet).each( function (e) {
	                        	  //console.log($('c[r^="D"]', this).text());
	                        	  if ( $('c[r^="D"]', this).text() == 1 ){
	                        		  $('row:nth-child('+(e+1)+') c', sheet).attr('s', '10');                        		  
	                        	  } else if ( $('c[r^="D"]', this).text() == 2 ){
	                        		  $('row:nth-child('+(e+1)+') c', sheet).attr('s', '5');                        		  
	                        	  }   else if ( $('c[r^="D"]', this).text() == 3 ){
	                        		  $('row:nth-child('+(e+1)+') c', sheet).attr('s', '20');                        		  
	                        	  }});                          
	                      }},
	                  {extend: 'pdf',
	                	  customize: function( pdf ) {
	                		  var p = table.column(3).data().toArray();                		  
	                		  for (var i = 0; i < p.length; i++) {
	                	        if (p[i]==1) {
	                	        	pdf.content[1].table.body[i+1].forEach(function(e,l){
	                	        		e.fillColor = '#ffcccc';
	                	        	});                	          
	                	        } else if (p[i]==2){
	                	        	pdf.content[1].table.body[i+1].forEach(function(e,l){
	                	        		e.fillColor = '#ffd699';
	                	        	});
	                	        } else if (p[i]==3){
	                	        	pdf.content[1].table.body[i+1].forEach(function(e,l){
	                	        		e.fillColor = '#ffffcc';
	                	        	});
	                	        }
	                	  }
	                  }}],
	        "columnDefs": [
	        	{ "title": "Line#",   "targets": 0 ,  "data": "line"},
	            { "title": "Flag",   "targets": 1 ,  "data": "flag"},
	            { "title": "Value",  "targets": 2 , "data": "flagval"},
	            { "title": "Priority",  "targets": 3 , "data": "priority"},
	            { "title": "Flag Name", "targets": 4, "data":"flagname" },
	            { "title": "Description",  "targets": 5 , "data": "flagmsg"}],
            "createdRow": function( row, data, dataIndex){        	
            	$(row).css('background-color', colors[data["priority"]].color);                
            }
	    } );
	$('#shipTable_length').append('&ensp; Error priority level <select id="shipTable_cmb"><option value ="1">1</option><option value ="2">2</option><option value ="3" selected>3</option>');
	$('#shipTable_cmb').change(function() {
		filters['shipTable_filter'] = this.value;
		table.draw();			
	});
}
function collapse_e(obj){
  var ref = document.getElementById(obj);
  $( function() {
	  $(ref).accordion({
		  header: 'h2',
		  icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" },
	      collapsible: true
	    });
	  });
}
function collapse_c(obj){
	var ref = document.getElementById(obj);
	var handle = ref.getElementsByTagName('h2')[0];	
	if ($(handle).hasClass('ui-state-active')){
		handle.dispatchEvent(new Event("click"));
	}
}
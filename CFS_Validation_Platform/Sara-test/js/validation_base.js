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
//Range value check function
function range_val_check(input, type, config){  
	var min_pass=true;
	var max_pass=true;
	var cfg=eval(config)[type];
	if (typeof(cfg.minRange)!= "undefined"){
		if (input < cfg.minRange) {
			min_pass=false;
		}
	}
	if (typeof(cfg.maxRange)!= "undefined"){
		if (input > cfg.maxRange) {
			max_pass=false;
		}
	}
	if (min_pass && max_pass){
		return true;
	}
	return false;
}
//Presence check
function presence_check(input){	
	if ( typeof(input) == 'undefined') { 
		return false;
	}else if (input.trim() == '' || input.trim() == 'null' || input.trim() == 'NA' || input == null) {
		return false;
	}   	
	return true;		 
} 
//Matches an object with an array of objects looked up from a lookup table
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
    	//console.log('m_index: '+ m_Index);
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
	if (h_Index-l_Index ==1){
		if (parseInt((list[l_Index])[column]) == parseInt(index)){
    		result.data[0] = list[l_Index];
    		result.found = true;
		} else if (parseInt((list[h_Index])[column]) == parseInt(index)){
			result.data[0] = list[h_Index];
    		result.found = true;
		}
	}
	return result;
}

//Lookup linear function
function lkup_linear(table,input){
	var tbl = eval(table);
	for (var i=0; i<tbl.length; i++){
		if (tbl[i]==input){
			return true;
	    }
	}	
	return false;	
}

//Character check
function check_char(table, input){
	var tbl = eval(table);
	for (var i = 0; i < tbl.length; i++){
		if (input.includes(tbl[i])){
			return true;
		}
	}
	return false;
}

//merges arrays in obj2 with those of obj1 and returns obj1
function merge_objs(obj1,obj2){
	for (var key in obj1){
		if (typeof(obj1[key])!="undefined" && typeof(obj2[key])!="undefined"){
			if (obj2[key].length>0){
				obj1[key].push.apply(obj1[key],obj2[key]);
			}
		}
	}
	return obj1;
}

function auto_fill(list,attrib){
	for (var i = 0; i < list.length-2; i++){
		if (list[i+1][attrib] - list[i][attrib] == 1){
			if (list[i+2][attrib]-list[i+1][attrib] == 1){
				return true;
				}
			}  		 	
	     } 
	return false;
}
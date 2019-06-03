//Matches each STD attribute names with the list of user input variables 
//input:array of strings - user attributes
function evalVars(input,type){ 
	var list = eval(type);
	var score;
	var tmp;
	var scr;
	var result = [];	 
	for (var id in list){
		tmp = new Object();
		tmp.id = id;
		tmp.varname = list[id].name;
		tmp.eval = [];
		for (var i=0; i<input.length; i++){
			score = 0;
			scr = new Object();		
			for (var kwd of list[id].keys){			
				if (input[i].toLowerCase().replace(/\s+/g,'').includes(kwd.toLowerCase())){
					score++;
				}				
			}
			scr.id = i;
			scr.name = input[i];
			scr.score = score;
			tmp.eval.push(scr);
		}	
		tmp.eval.sort(compare);
		if (tmp.eval[0].score > tmp.eval[1].score){
			tmp.match = true;		
		} else {
			tmp.match = false;
		}
		result.push(tmp);
	}
	for (var i=0; i<reslt.length; i++){	
		if (result[i].match){
			for (var j=0; j<result.length; j++){
				if (result[j].match && result[i].eval[0].id == result[j].eval[0].id){
					if (result[i].eval[0].score > result[j].eval[0].score){
						result[j].match = false;
					} else if (result[i].eval[0].score < result[j].eval[0].score){
						result[i].match = false;
					} else {
						result[i].match = false;
						result[j].match = false;
					}
				}				
			}							
		}
	}
	return result;
}

function compare(a, b) {	  
  if (a.score > b.score) {
    return -1;
  } 
  if (a.score < b.score) {
    return 1;
  }
  return 0;
}
//generates the combobox for a variable id
function getCombo(input, type){
	var buffer = '<select id="'+type+input.id+'">';
	if (!input.match){
		buffer += '<option value ="-1" selected disabled hidden>Make a selection</option>';
		for (var i=0; i<input.eval.length; i++){
			buffer += '<option value ="'+ input.eval[i].id +'">'+ input.eval[i].name + '</option>';
		}
	} else {
		buffer += '<option value ="'+input.eval[i].id+'" selected>'+ input.eval[0].name + '</option>';
		for (var i=1; i<input.eval.length; i++){
			buffer += '<option value ="'+ input.eval[i].id +'">'+ input.eval[i].name + '</option>';
		}
	}	
	buffer+= '</select>';
}
//takes an array of attribute names, matches them individually with the variable names and returns an object with matched variable names and combo boxes
//input is a string array
function processVars(input,type){
	var result = evalVars(input,type);		
	for (var i=0; i<input.length; i++){
		input[i].combo = getCombo(input[i]);	
	}	
	return result;
}
//verifies the variable configuration and returns the updated mapping
function verify_combos(type){
	var list = eval(type);
	var result = new Object();
	var valid = true;
	var vars = [];
	var tmp;
	for (var id in list)){
		tmp = new Object();
		tmp.id = id;
		tmp.name = list[id].name;
		tmp.match = true;
		for 
	}
}

//Checks whether multiple attributes are matched with the same variable 
//input: array of objs from evalvar() 
/*function corssChkVars(input){	//No longer needed - merged with evalvars
	for (var i=0; i<input.length; i++){	
		if (input[i].match){
			for (var j=0; j<input.length; j++){
				if (input[j].match && input[i].eval[0].id == input[j].eval[0].id){
					if (input[i].eval[0].score > input[j].eval[0].score){
						input[j].match = false;
					} else if (input[i].eval[0].score < input[j].eval[0].score){
						input[i].match = false;
					} else {
						input[i].match = false;
						input[j].match = false;
					}
				}				
			}							
		}
	}	
	return input;	
}*/
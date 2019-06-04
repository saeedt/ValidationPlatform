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
	for (var i=0; i<result.length; i++){	
		if (result[i].match){
			for (var j=0; j<result.length; j++){
				if (i==j)
					continue;
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
	//console.log(result);
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
	var buffer = [];	
	if (!input.match){
		buffer.push('<select id="'+type+input.id+'" class="ecombo">');
		buffer.push('<option value ="-1" selected disabled hidden>Make a selection</option>');
		for (var i=0; i<input.eval.length; i++){
			buffer.push('<option value ="'+ input.eval[i].id +'">'+ input.eval[i].name + '</option>');
		}
	} else {
		buffer.push('<select id="'+type+input.id+'" class="ocombo">');
		buffer.push('<option value ="'+input.eval[0].id+'" selected>'+ input.eval[0].name + '</option>');
		for (var i=1; i<input.eval.length; i++){
			buffer.push('<option value ="'+ input.eval[i].id +'">'+ input.eval[i].name + '</option>');
		}
	}	
	buffer.push('</select>');
	return buffer.join('');
}
//takes an array of attribute names, matches them individually with the variable names and returns an object with matched variable names and combo boxes
//input is a string array
function processVars(input,type){
	var result = new Object();
	var match = true;
	var tmp = evalVars(input,type);	
	for (var i=0; i<tmp.length; i++){
		if (!tmp[i].match) 
			match = false;
		tmp[i].combo = getCombo(tmp[i],type);	
	}	
	result.data = tmp;
	result.match = match;
	return result;
}
//verifies the variable configuration and returns the updated mapping
function verify_combos(type){
	var list = eval(type);
	var result = new Object();
	var valid = true;
	var vars = [];
	var tmp, scr, tid;
	var match = true;
	for (var id in list){
		tmp = new Object();
		tmp.id = id;
		tmp.name = list[id].name;						
		tid = parseInt(document.getElementById(type+id).value);
		if (tid==-1){
			tmp.match = false;
			match = false;
		}else{			
			tmp.match = true;
			scr = new Object();
			tmp.eval = [];
			scr.id = tid;
			scr.name = document.getElementById(type+id).options[document.getElementById(type+id).selectedIndex].text;
			tmp.eval.push(scr);
		}
		vars.push(tmp);
	}	
	if (match){
		for (var i=0; i<vars.length; i++){	
			if (vars[i].match){
				for (var j=0; j<vars.length; j++){
					if (i==j)
						continue;
					if (vars[j].match && vars[i].eval[0].id == vars[j].eval[0].id){
						if (vars[i].eval[0].score > vars[j].eval[0].score){
							vars[j].match = false;
						} else if (vars[i].eval[0].score < vars[j].eval[0].score){
							vars[i].match = false;
						} else {
							vars[i].match = false;
							vars[j].match = false;
						}
					}				
				}							
			}
		}
	}
	for (var i=0; i<vars.length; i++){
		if (vars[i].match){
			document.getElementById(type+vars[i].id).classList.remove("ecombo");
			document.getElementById(type+vars[i].id).classList.add("ocombo");
		} else {
			document.getElementById(type+vars[i].id).classList.remove("ocombo");
			document.getElementById(type+vars[i].id).classList.add("ecombo");
		}		
	}
	result.data = vars;
	result.match = match;
	return result;
}

function activate_combos(){
	$("select").each(function(){		
		$(this).change(function() {	
			//console.log($(this).attr('id').slice(0, 3));
			verify_combos($(this).attr('id').slice(0, 3));			
		});
	});	
}

function combo_change(type){
	
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
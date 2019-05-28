function evalVar(input,type){
	var list = eval(type);
	var score;
	var result = new Object();
	result.input = input;
	result.eval = [];
	var scr; 
	for (var id in list){
		score = 0;
		scr = new Object();		
		for (var kwd of list[id].keys){			
			if (input.includes(kwd)){
				score++;
			}				
		}
		scr.id = id;
		scr.name = list[id].name;
		scr.score = score;
		result.eval.push(scr);
	}	
	result.eval.sort(compare);
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
function getCombo(input,id,bind){
	var buffer = '<select id="'+id+'">';
	if (input.bind){
		buffer += '<option value ="NA">Make a selection</option>';
	}
	for (var scr of input.score){
		buffer += '<option value ="'+ scr.id +'">'+ scr.name + '</option>';
	}
	buffer+= '</select>';
}
//takes an array of attribute names, matches them individually with the variable names and returns an object with matched variable names and combo boxes
function evalVars(input,type){
	var result = new object();
	var varray = [];
	var tmp;	
	for (var field of input){
		varray.push(evalVar(field,type));		
	}
	for (var field of type){
		tmp = new Object();
		
	}
}
//Returns the key that matches a variable id, if there is one valid match, otherwise returns "none"
function findVar(id,input){
	var count = 0;
	for (var obj of input){		
		if (obj.eval[0].score>0){//this is an issue: it should find the max score and then count it
			if (obj.eval[0].id == id)
				count++
		}
	}
	
} 
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
			if (input.toLowerCase().includes(kwd.toLowerCase())){
				score++;
			}				
		}
		scr.id = id;
		scr.name = list[id].name;
		scr.score = score;
		result.eval.push(scr);
	}	
	result.eval.sort(compare);
	if (result.eval[0].score > result.eval[1].score){
		result.match = true;
	} else {
		result.match = false;
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
//Checks whether multiple attributes match the same variable or not
// we run evalvar on individual attributes first, then check them all together
function findVar(id,input){
	var maxScore = 0;
	var maxIndex = -1;
	for (var i=0; i<input.length; i++){	
		if (input[i].match){			
			if (input[i].eval[0].id == id && input[i].eval[0].id > maxScore){
				maxIndex = i;
				maxScore = input[i].eval[0].score;
			} else if (input[i].eval[0].id == id && input[i].eval[0].id == maxScore){
				maxIndex = -1;
				break;
			}				
		}
	}
	return maxIndex;	
} 
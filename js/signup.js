/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

document.addEventListener("DOMContentLoaded", get_states);

function get_states() {
	var code;
	var name;
	var states;
	var i;
	var form = document.getElementByClassName('')
	for (i = 0; i < usStates.length; ++i) {
		code = usStates[i]["code"];
		name = usStates[i]["name"];
		var x = document.createElement("OPTION");
		x.setAttribute(code, 'state');
		var t = document.createTextNode(name);
		x.appendChild(t);
		document.getElement().appendChild(x);
	}
}


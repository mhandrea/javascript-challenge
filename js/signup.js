/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

document.addEventListener("DOMContentLoaded", function() {
	var i;
	for (i = 0; i < usStates.length; ++i) {	
		var elem = document.createElement("OPTION");
		var state = usStates[i];
		elem.value = state["code"];
		elem.text = state["name"];
		document.getElementsByName('state')[0].appendChild(elem);
	}
});

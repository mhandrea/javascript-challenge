/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

document.addEventListener('DOMContentLoaded', function() {
	var i;
	for (i = 0; i < usStates.length; ++i) {	
		var elem = document.createElement('OPTION');
		var state = usStates[i];
		elem.value = state['code'];
		elem.text = state['name'];
		document.getElementsByName('state')[0].appendChild(elem);
	}

	document.addEventListener('change', function() {
		var other = document.getElementsByName('occupationOther')[0];
		other.style.display = 'block';
		if (document.getElementById('occupation').value == 'other') {
			other.style.visibility = 'visible';
		}
		else {
			other.style.visibility = 'hidden';
			other.value = '';
		}
	});

	document.getElementById('cancelButton').onclick = function() {
		if (window.confirm('You have not finished filling out the form. Are you sure you want to leave?')) {
			window.location.href = 'http://www.google.com';
		}	
	};	
});



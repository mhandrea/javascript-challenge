/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict"

document.addEventListener('DOMContentLoaded', function() {
	var i;
	// Populates the state list on the form with the states pulled from us-states.
	for (i = 0; i < usStates.length; ++i) {	
		var elem = document.createElement('OPTION');
		var state = usStates[i];
		elem.value = state['code'];
		elem.text = state['name'];
		document.getElementsByName('state')[0].appendChild(elem);
	}

	// Event raised when occupation menu changes.
	document.addEventListener('change', function() {
		var other = document.getElementsByName('occupationOther')[0];
		if (document.getElementById('occupation').value == 'other') {
			other.style.display = 'block';
		}
		else {
			other.style.display = 'none';
			other.value = '';
		}
	});

	// Event raised when the cancel button is clicked.
	document.getElementById('cancelButton').addEventListener('click', function() {
		if (window.confirm('You have not finished filling out the form. Are you sure you want to leave?')) {
			window.location = 'https://www.google.com';
		}	
	});	

	// firstName, lastName, address1, city, state, zip, and birthdate all required
	// Checks and returns the validity of the form.
	// listens for submission by user. Then checks the validity.
	document.getElementById('signup').addEventListener('submit', function(evt) {
		// runs when submit button is clicked. checks if valid data.
		var valid = true;
		try {
			valid = _validateForm(this);
		}
		catch(e) { //stop form submission to see error
			alert(e);
			console.log(e);
			valid = false; //stop form submission to see error
		}
		//use new standard preventDefault() if available
		if (!valid && evt.preventDefault) {
			evt.preventDefault();
		}
		evt.returnValue = valid; //for older browsers
		return valid;
	});
});

// function that returns if the form is valid or not.
// if sections are not valid, they will be highlighted until valid.
function _validateForm(form) {
	var elems = form.elements;
	var valid = true;
	// Required fields. If 'other' is selected as the occupation, it is also now required.
	var fields = ['firstName', 'lastName', 'address1', 'birthdate', 'state', 'city', 'zip', 'occupation'];
	if (elems['occupation'].value == 'other') {
		fields.push('occupationOther');
	}

	// check to see if any required text fields are blank, or only contain spaces.
	// if so, they are invalid and a red border is put around them.
	for (var i = 0; i < fields.length; i++) {
		var elem = elems[fields[i]];
		if (!elem.value.trim()) {
			elem.className = 'form-control invalid';
			valid = false;
		}
		else {
			elem.className = 'form-control';		
		}
	}

	// checks for a valid ZIP code. Adds red border if invalid.
	var zip = new RegExp('^\\d{5}$'); // Valid ZIPs.
	if (!zip.test(elems['zip'].value)) {
		elems['zip'].className = 'form-control invalid';
		valid = false;
	}
	else {
		elems['zip'].className = 'form-control';
	}

	if (elems['birthdate'].value) {
		var elem = elems['birthdate'];
		var dob = new Date(elem.value);
		var age = _getAge(dob);
		if (!age || age < 13) {
			_bdayMessage(false);
			elem.className = 'form-control invalid';
			valid = false;
		}
		else {
			_bdayMessage(true);
			elem.className = 'form-control';
		}
	}
	return valid;
}

// returns the user's age from epoch and UTC time, not local time.
function _getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getUTCFullYear() - birthDate.getFullYear();
    var m = today.getUTCMonth() - birthDate.getUTCMonth();
    if (m < 0 || (m === 0 && today.getUTCDate() < birthDate.getUTCDate())) {
        age--;
    }
    return age;
}

//displays or hides the bithdate message warning
function _bdayMessage(valid) {
    var elem = document.getElementById('birthdateMessage');
    if (!valid) {
        elem.innerHTML = "Invalid entry. Must be 13 years of age or older.";
        elem.style.display = 'block';
    } else {
        elem.style.display = 'none';
    }
}

'use strict';

let full_name = document.getElementById('name');
let email = document.getElementById('email');
let password = document.getElementById('password');
let cpassword = document.getElementById('cpassword');
let address = document.getElementById('address');
let city = document.getElementById('city');
let state = document.getElementById('state');
let pincode = document.getElementById('pincode');
let gender = document.getElementsByClassName('gender');
let mobile = document.getElementById('mobile');
let skills = document.getElementsByClassName('skills');
let error_message = document.querySelectorAll('.error-message');
let table = document.querySelector('.table');

/*
01 - Create a common function to check if a field contains value or not, either if it is a input, textarea, select. Store the value of textarea, select, input to values variable, if the input type of radio and checkbox, tagname cannot be identified. So, it should be looped and store the checked value in the value. For checkbox, store a last checked item in value variable and store all values in a seperate array variable. Based on length, identify the field value is empty or not. Else display the error for the selected field.
*/

function check_required(field, message) {
    let values = '';
    let name_attr = '';
    let checkbox_array = [];

    if(field.tagName == 'TEXTAREA' || field.tagName == 'SELECT' || field.tagName == 'INPUT') {
        values = field.value;
    } else {
        for(var i=0; i<field.length; i++) {
            name_attr = field[i].attributes["name"].value;
            name_attr = name_attr.replace('[]', '');
            
            if(field[i].attributes.type.value == 'radio') {
                if(field[i].checked) {
                    values = field[i].value;
                    continue;
                }
            } else if(field[i].attributes.type.value == 'checkbox') {
                if(field[i].checked) {
                    values = field[i].value;
                    checkbox_array.push(values);
                    continue;
                }
            }
        }
    }

    if(values.length == 0) {
        if(name_attr == '') {
            name_attr = field.attributes["name"].value;
        }

        document.getElementById(name_attr+'-error').innerText = message;
    } else if(checkbox_array.length > 0) {
        return checkbox_array;
    } else {
        return values;
    }
}

/*
02 - Get all the fields and pass the values to check_required function. Once the values passed the test, validate email using regex pattern, check password with character limit and digit condition, check confirm password that equals the password, pincode and telephone check  with character limit and digit condition. FInally, append the values to the screen.
*/

document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();

    error_message.forEach(error => {
        error.innerText = '';
    });
    table.style.display = 'none';

    let full_name_val = check_required(full_name, 'Name is required');
    let email_val = check_required(email, 'Email is required');
    let password_val = check_required(password, 'Password is required');
    let cpassword_val = check_required(cpassword, 'Confirm Password is required');
    let address_val = check_required(address, 'Address is required');
    let city_val = check_required(city, 'City is required');
    let state_val = check_required(state, 'State is required');
    let pincode_val = check_required(pincode, 'Pincode is required');
    let gender_val = check_required(gender, 'Gender is required');
    let mobile_val = check_required(mobile, 'Mobile is required');
    let skills_val = check_required(skills, 'Skills is required');

    if(email_val) {
        let email_pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
        if (!email_pattern.test(email_val)) {
            document.getElementById('email-error').innerText = 'Invalid email address';
            email_val = '';
        }
    }

    if(password_val) {
        let password_error = document.getElementById('password-error');
        if(password_val.length < 3) {
            password_error.innerText = 'Password length should be minimum 3 characters';
            password_val = '';
        } else if(password_val.length > 10) {
            password_error.innerText = 'Password length should be maximum of 10 characters';
            password_val = '';
        } else if (password_val.search(/[0-9]/i) < 0) {
            password_error.innerText = 'Password must contain atleast one number';
            password_val = '';
        }
    }

    if(cpassword_val) {
        let cpassword_error = document.getElementById('cpassword-error');
        if(password_val != cpassword_val) {
            cpassword_error.innerText = 'Confirm Password should be same as Password';
            password_val = '';
            cpassword_val = '';
        }
    }

    if(pincode_val) {
        let pincode_error = document.getElementById('pincode-error');
        let pattern = new RegExp(/[^0-9\.]/g);

        if (pattern.test(pincode_val)) {
            pincode_error.innerText = 'Pincode should be numbers only';
            pincode_val = '';
        } else if(pincode_val.length != 6) {
            pincode_error.innerText = 'Pincode should contain 6 digits';
            pincode_val = '';
        }
    }

    if(mobile_val) {
        let mobile_error = document.getElementById('mobile-error');
        let pattern = new RegExp(/[^0-9\.]/g);

        if (pattern.test(mobile_val)) {
            mobile_error.innerText = 'Mobile Number should be numbers only';
            mobile_val = '';
        } else if(mobile_val.length != 10) {
            mobile_error.innerText = 'Mobile Number should contain 10 digits';
            mobile_val = '';
        }
    }
    

    if(full_name_val && email_val && password_val && cpassword_val && address_val && city_val && state_val && pincode_val && gender_val && mobile_val && skills_val) {
        table.style.display = 'table';

        document.querySelector('.fullname').innerText = full_name_val;
        document.querySelector('.email').innerText = email_val;
        document.querySelector('.password').innerText = password_val;
        document.querySelector('.address').innerText = address_val;
        document.querySelector('.city').innerText = city_val;
        document.querySelector('.state').innerText = state_val;
        document.querySelector('.pincode').innerText = pincode_val;
        document.querySelector('.gender_display').innerText = gender_val;
        document.querySelector('.mobile').innerText = mobile_val;
        document.querySelector('.skills_display').innerText = skills_val;

        alert('Validation Success');
    }
});
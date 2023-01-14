# Simple Form Validation using JavaScript

**DEMO :** https://bejewelled-platypus-2b16ae.netlify.app/

Developed a responsive website for Form Validation using JavaScript

> **Technologies used:** HTML, CSS, JS, Bootstrap

# Pseudo Code

 - Create a common function to check if a field contains value or not, either if it is a input, textarea, select. Store the value of textarea, select, input to values variable, if the input type of radio and checkbox, tagname cannot be identified. So, it should be looped and store the checked value in the value. For checkbox, store a last checked item in value variable and store all values in a seperate array variable. Based on length, identify the field value is empty or not. Else display the error for the selected field.

 - Get all the fields and pass the values to check_required function. Once the values passed the test, validate email using regex pattern, check password with character limit and digit condition, check confirm password that equals the password, pincode and telephone check  with character limit and digit condition. FInally, append the values to the screen.
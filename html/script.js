
//********************************************/
/*USER INFORMATION FUNCTIONS START - *Jason */
function getUserInfoStart(){
$('#updateBtn').click(function(e){
    //to disable the click from going to next page
    e.preventDefault();
    $.ajax(
         'autofillUserInfo.php', function(data){
               //set the value of your input field with the data received
               $('#serviceTag').val(data);
         }
    );
});
}

function google() {
window.location = "shppng-cart.html";
}


function validatePhoneNumber(){
	var phoneNumberInfo = document.getElementById("pNumber").value;
	var phoneNumberValidation = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
	if( (phoneNumberInfo.match(phoneNumberValidation)))
	{
		return true;
	}
	else
	{
		alert("Phone Number is Invalid Format. Required format = xxx-xxx-xxxx");
		document.getElementById("userInfoForm").action = "UserInformation.html";
		return false;
	}
}

function validateEmailAddress() {
  var str = document.getElementById("emailUserInfo").value;
  var patt = new RegExp("@");
  var res = patt.test(str);
  if (res == true)
      {
          return true;
      }
    else {
        alert("The Email Address is Invalid. Email Address Needs '@' symbol to be valid.");
				document.getElementById("userInfoForm").action = "UserInformation.html";
        return false;
    }
}


function onClickUserInformation(){

	

	validatePhoneNumber();
	validateEmailAddress();
	var inputFullName = document.getElementById("uname");
	localStorage.setItem("uname", inputFullName.value);

	var inputAddress1 = document.getElementById("a1name");
	localStorage.setItem("a1name", inputAddress1.value);

	var inputAddress2 = document.getElementById("a2name");
	localStorage.setItem("a2name", inputAddress2.value);

	var inputCity = document.getElementById("ctyname");
	localStorage.setItem("ctyname", inputCity.value);

	var inputStateName = document.getElementById("myStates");
	localStorage.setItem("myStates", inputStateName.value);

	var inputZipCode = document.getElementById("zname");
	localStorage.setItem("zname", inputZipCode.value);

	var inputPhoneNumber = document.getElementById("pNumber");
	localStorage.setItem("pNumber", inputPhoneNumber.value);

	var inputEmail= document.getElementById("emailUserInfo");
	localStorage.setItem("emailUserInfo", inputEmail.value);
}

function sameAddress(){
	var sameAddress1 = localStorage.getItem("a1name");
	var sameAddress2 = localStorage.getItem("a2name");
	var sameCity = localStorage.getItem("ctyname");
	var sameState = localStorage.getItem("myStates");
	var sameZipCode = localStorage.getItem("zname");

	if (document.getElementById("checkbox-one").checked){
		alert("populating shipping info from user information");
    document.getElementById("address-1").value = sameAddress1;
		document.getElementById("address-2").value = sameAddress2;
		document.getElementById("city").value = sameCity;
		document.getElementById("state").value = sameState;
		document.getElementById("zip").value = sameZipCode;
	}

	if (document.getElementById("checkbox-two").checked){
		document.getElementById("address-1").value = "";
		document.getElementById("address-2").value = "";
		document.getElementById("city").value = "";
		document.getElementById("state").value = "";
		document.getElementById("zip").value = "";
	}

}

function cbChange(obj) {
    var cbs = document.getElementsByClassName("cb");
    for (var i = 0; i < cbs.length; i++) {
        cbs[i].checked = false;
    }
    obj.checked = true;
		sameAddress();
}

function shippingSubmitFunction(){
	/*var shippingAddress1 = document.getElementById("address-1");
	localStorage.setItem("address-1", shippingAddress1.value);

	var shippingAddress2 = document.getElementById("address-2");
	localStorage.setItem("address-2", shippingAddress2.value);

	var shippingCity = document.getElementById("city");
	localStorage.setItem("city", shippingCity.value);

	var shippingStateName = document.getElementById("state");
	localStorage.setItem("state", shippingStateName.value);

	var shippingZipCode = document.getElementById("zip");
	localStorage.setItem("zip", shippingZipCode.value);
	document.getElementById("address-1").value = shippingAddress1;
	document.getElementById("address-2").value = shippingAddress2;
	document.getElementById("city").value = shippingCity;
	document.getElementById("state").value = shippingState;
	document.getElementById("zip").value = shippingZipCode;*/
}
//******************************************/
/*USER INFORMATION FUNCTIONS END - *Jason */

/********Start Checkout Functions***********/
//validates keypressed is only a number
function isNumber(evt){
	var ch = String.fromCharCode(evt.which);
	if(!(/[0-9]/.test(ch))){
		evt.preventDefault();
	}
}

//validates expiration date
function validateExp(){
	var mon = document.getElementById("expmonth").value;
	var year = document.getElementById("expyear").value;
	var expo = mon.concat('/', year);
	var validFormat = false;

	if(/^\d{1,2}\/\d{4}$/.test(expo)){ //check format is MM/YYYY
		validFormat = true;
	}else{alert("Please enter year as YYYY. Ex: 2019")}

	if(validFormat){
		if(year < 2019){ //check to make sure is current or future
			alert("Year is expired. Please try different card.")
			return false;
		}else if(mon > 12){ //check month is a correct number
			alert("Card expiration month is invalid.")
		}else{return true;}
	}else{return false;}
}

//validates credit card information
function validateCC(){
	var x, brand, frstnum, secnum, num;
	x = document.getElementById("ccnum").value; //get user input
	brand = document.getElementById("ccbrand").value; //get card type
	frstnum = x.charAt(0); //get first number in card
	secnum = x.charAt(1); //get second number in card

	//verify brand with card number
	if(brand == "visa"){
		if(frstnum == 4 && x.length > 13){ //validate visa card number
			return true;
		}else{
			alert("The card you input is not a valid visa card");
			return false
		}
	}else if(brand =="amex"){ //validate American Express card number

		if(frstnum == 3 && (secnum == 4 || secnum == 7) && x.length == 15){
			return true;
		}else{
			alert("The card you input is not a valid American Express card");
			return false;
		}

	}else if(brand == "mascard"){ //validate Mastercard number

		if(frstnum == 5 && secnum >0 && secnum <5 && x.length == 16){
			return true;
		}else{
			alert("The card you input is not a valid Mastercard");
			return false;
		}

	}else if(brand == "discard"){ //validate Discover card number

		if(frstnum == 6 && (secnum == 0||secnum == 1||secnum == 4||secnum == 5) && x.length == 16){
			//alert("discover");
			return true;
		}else{
			alert("The card you input is not a valid Discover card");
			return false;
		}

	}else{alert("Please choose a payment type")} //if user didn't select a card type, display message
}

/* function to calculate the sum of 4 numbers*/
function sumFunction(p1, p2, p3, p4) {
	var num = (+ parseFloat(p1).toFixed(2))+ (+ parseFloat(p2).toFixed(2)+ (+ parseFloat(p3).toFixed(2))+ (+ parseFloat(p4).toFixed(2)));
 	return num;
}

/*function to initialize subtotal from prices of items in checkout*/
function initialize(){
	productsObject.setSubtotal(sumFunction(getPriceOne(),getPriceTwo(),0,0));
	getSubtotal();
}

//function to get total amount after tax and shipping*/
function total(){
	var num = sumFunction(getSubtotal(),tax(),shipping(),0);
	document.getElementById("total").innerHTML = num;
}
/* function to calculate tax*/
function tax(){
	var num = productsObject.subtotal * .08
	var n = num.toFixed(2);
	document.getElementById("tax").innerHTML = n;
	return n;
}

/* function to calculate shipping*/
function shipping(){
	var num = productsObject.subtotal * .03;
	var n = num.toFixed(2);
	document.getElementById("shipping").innerHTML = n;
	return n;
}

/*confirmation page for checkout page*/
function submission() {
	
	if(validateCC() && validateExp()){
		var myWindow = window.open("", "", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
		myWindow.document.write("<h1>Thank you for ordering through us! We are working on your order.</h1>");
		myWindow.document.write("<h2><u>Your Order: </h2></u>");
		myWindow.document.write(productsObject.productOne);
		myWindow.document.write("<br>");
		myWindow.document.write(productsObject.productTwo);
		myWindow.document.write("<br>");
		//for starting to write summary submission of store
	//	myWindow.document.write("hello" + localStorage.getItem("uname") + localStorage.getItem("address-1") + localStorage.getItem("address-2")
		//+localStorage.getItem("city")+localStorage.getItem("state")+
		//localStorage.getItem("zip"));
		myWindow.document.write("<h2> <u>Your Contact and Shipping Info:</u> </h2>");
		myWindow.document.write(" Full Name: " + localStorage.getItem("uname") + "<br>"+"<br>");
		myWindow.document.write(" Phone Number: " + localStorage.getItem("pNumber") + "<br>"+"<br>");
		myWindow.document.write(" Email: " + localStorage.getItem("emailUserInfo") + "<br>"+"<br>");
		myWindow.document.write(" Address 1: " + localStorage.getItem("address-1") + "<br>"+"<br>");
		myWindow.document.write(" Address 2: " + localStorage.getItem("address-2") + "<br>"+"<br>");
		myWindow.document.write(" City: "+ localStorage.getItem("city") + "<br>"+"<br>");
		myWindow.document.write(" State:  " + localStorage.getItem("state") + "<br>"+"<br>");
		myWindow.document.write(" Zip Code: " + localStorage.getItem("zip") + "<br>"+"<br>");
		myWindow.document.write(" Total Charged: " + sumFunction(getSubtotal(),tax(),shipping(),0) + "<br>"+"<br>");
		myWindow.document.write(" Your Order Confirmation Number: " + Math.floor(Math.random() * 9999999999999999));
	}else{
		alert("credit card information invalid. Please check your information and try again.")
	}
}

/* object to hold product names, prices, and set functions for the checkout page*/
var productsObject = {
  productOne:"iPhone 12",
  productTwo: "Snickers",
  priceOne: 1199.99,
  priceTwo: 5.99,
  subtotal: 0.00,
  getProducts: function() {
    document.write(this.productOne + " " + this.productTwo);
  },
  setProductOne: function(input, proprice) {
  	this.productOne = input;
  	this.priceOne = proprice;
  },
  setProductTwo: function(input, proprice) {
  	this.productTwo = input;
  	this.priceTwo = proprice;
  },
  setSubtotal: function(input) {
  	this.subtotal = input;
  }
}
//Get funtions for getting information from products object//
function getProductOne(){
	document.getElementById("p1").innerHTML = productsObject.productOne;
}
function getPriceOne(){
	document.getElementById("pr1").innerHTML = productsObject.priceOne;
	return productsObject.priceOne;
}
function getProductTwo(){
	document.getElementById("p2").innerHTML = productsObject.productTwo;
}
function getPriceTwo(){
	document.getElementById("pr2").innerHTML = productsObject.priceTwo;
	return productsObject.priceTwo;
}
function getSubtotal(){
	document.getElementById("subtotal").innerHTML = productsObject.subtotal;
	return productsObject.subtotal;
}
/********End Checkout Functions***********/


/********* Cart/Table functions **********/

/* Adding items to cart */
function showProd(str) {
    if (str == "") {
		// check if the input field is empty (str.length == 0)
		// if it is, clear content of txtEmpttyCart placeholder
        document.getElementById("txtEmptyCart").innerHTML = "";
        return;
    } else { 
		// create an XMLHttpRequest object
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		// Create the function to be executed when the server response is ready
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("txtEmptyCart").innerHTML = this.responseText;
            }
		};
		// Send the request off to getprod.php on the server
		// notice the q parameter is added to the url and str variable holds input field
		// which will be used in the php file
        xmlhttp.open("GET","getprod.php?q=" + str,true);
        xmlhttp.send();
    }
}


/* Implement a function to remove items from the cart
$(document).ready(function remove() {
	var x = document.getElementById("productTable");
	x.deleteRow(0);
} */

/********* Cart/Table functions End **********/

//load the states for the drop down list
function loadStates() {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            	
            	document.getElementById("States").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("GET","showStates.php",true);
        xmlhttp.send();  
}
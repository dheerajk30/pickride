function registerUser() {
	var registrationDetails = document.forms["registration"];
	var fullname = registrationDetails["fullname"].value;
	var email = registrationDetails["email"].value;
	var mobile = registrationDetails["mobile"].value;
	var password = registrationDetails["password"].value;
	var repassword = registrationDetails["repassword"].value;
	var carmodel = registrationDetails["carmodel"].value;
	var isValid = password == repassword;

	if (isValid) {
		var users = JSON.parse(window.localStorage.getItem("users")) || [];
		users.push({
			fullname,
			email,
			mobile,
			password,
			carmodel,
		});
        window.localStorage.setItem("users", JSON.stringify(users));
        window.location.assign('../login/index.html')
		alert("Registration succesfull!!");
	} else {
		alert("Passwords dont match, try again.");
	}
}

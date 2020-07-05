function loginUser() {
	var loginDetails = document.forms["login"];
	var username = loginDetails["username"].value;
	var password = loginDetails["password"].value;

	var users = JSON.parse(window.localStorage.getItem("users")) || [];

	var foundUser = users.find((user) => user.mobile == username);
	if (foundUser) {
		if (foundUser.password == password) {
			window.location.assign("../homepage/index.html");
			alert("Login Successful");
		} else {
			alert("Password is incorrect");
		}
	} else {
		alert("No User found");
	}
}

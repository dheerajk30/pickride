/* load data on body load into internal storage */
function loadData() {
	var rides = JSON.stringify(data);
	window.localStorage.setItem("rides", rides);
}

/* handle search of commuter with start point and end point */
function searchRide() {
	/*
	Input search parameters
	*/
	var startPoint = document.getElementById("rideStartPoint").value;
	var endPoint = document.getElementById("rideEndPoint").value;
	/*
	Fetch rides from storage
	*/
	var rides = JSON.parse(window.localStorage.getItem("rides")) || [];

	/*
	Iterate through rides and update each in UI
	*/
	var matchingRides = rides.filter((ride) => {
		var startPointIndex = ride.routePoints.findIndex(
			(point) => point == startPoint
		);
		var endPointIndex = ride.routePoints.findIndex(
			(point) => point == endPoint
		);

		if (
			startPointIndex !== -1 &&
			endPointIndex !== -1 &&
			endPointIndex > startPointIndex
		) {
			return ride;
		}
	});

	var container = document.getElementsByClassName("homepage-body")[0];
	var ul = document.getElementById("search-result-container");
	ul.innerHTML = "";
	matchingRides.forEach((ride) => {
		/* creating a templete list item*/
		var li = document.createElement("li");
		var searchItem = document.createElement("button");
		searchItem.setAttribute("class", "search-item");

		/* assigning default profile picture*/
		var profilepic = document.createElement("img");
		profilepic.src = "../assets/defaultprofilepic.png";
		profilepic.width = 100;
		profilepic.height = 100;

		/* assigning rider name*/
		var heading = document.createElement("h3");
		heading.appendChild(document.createTextNode(ride.name));

		/* assigning rider rating*/
		var rating = document.createElement("p");
		rating.appendChild(document.createTextNode("Rating:  " + ride.rating));
		rating.setAttribute("class", "rating-div");

		/* assigning rider time to reach*/
		var time = document.createElement("p");
		time.appendChild(document.createTextNode(ride.startTime + " minutes away"));
		time.setAttribute("class", "time-div");

		/* assigning rider route details*/
		var routedetail = document.createElement("p");
		routedetail.appendChild(
			document.createTextNode("Route " + startPoint + " to " + endPoint + ".")
		);

		/* assigning rider vehicle details*/
		var vehicledetail = document.createElement("p");
		vehicledetail.appendChild(
			document.createTextNode(
				"Car: " + ride.vehicle + " , Seats Available: " + ride.vacancies + "."
			)
		);

		/* assigning rider confirmation action*/
		var confirm = document.createElement("button");
		confirm.setAttribute("class", "confirm-btn");
		searchItem.onclick = function () {
			alert("Congratulation!! Your ride is now confirmed with " + ride.name);
		};
		confirm.appendChild(document.createTextNode("Ride with " + ride.name));

		/* appending all the items to the template list item */
		searchItem.appendChild(profilepic);
		searchItem.appendChild(heading);
		searchItem.appendChild(rating);
		searchItem.appendChild(time);
		searchItem.appendChild(routedetail);
		searchItem.appendChild(vehicledetail);
		searchItem.appendChild(confirm);

		li.appendChild(searchItem);
		ul.appendChild(li);
	});
	container.appendChild(ul);
}

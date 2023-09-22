const logout = document.getElementById("btn_logout");

logout.addEventListener("click", async () => {
	await fetch("/api/sessions/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	}).then(() => {
		window.location.replace("/login");
	}).catch(err => {return `Catch error: ${err}`});
});
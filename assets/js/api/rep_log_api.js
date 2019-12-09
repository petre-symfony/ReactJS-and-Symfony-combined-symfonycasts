export function getRepLogs() {
	return fetch('/reps')
		.then(response => {
			return response.json();
		});
}
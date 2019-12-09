export function getRepLogs() {
	return fetch('/reps', {
		credentials: 'same-origin'
	})
		.then(response => {
			return response.json().then((data) => data.items);
		});
}

export function deleteRepLog(id) {
	return fetch(`/reps/${id}`, {
		credentials: 'same-origin',
		method: 'DELETE'
	});
}
console.log('js');
	
$(document).ready(onReady);
	
function onReady(){
	console.log('JQ')
	// click listener for add button
	$('#submitButton').on('click', getInput)
	$(document).ready(getList);
}

function getInput() {
	console.log('in getInput function');
	// pull values from input and set as variable
	newTask = $('#taskInput').val();
	//trigger addTask function
	addTask(newTask);
}

function addTask(newTask) {
	console.log('in addTask function');
	// addTask function
	// POST request to send newTask to database
	// .then clear input
	// trigger renderList function
	getList();
}

function getList() {
	console.log('in getList function');
	// get request
	// should get all tasks in db
	// ordered by REVERSE ID order
	$.ajax({
		method: 'GET',
		url: '/list'
	}).then((listRes) => {
		console.log('got response server for get request:', listRes);
		// call renderList function on the listRes info from server
		renderList(listRes);
	})

}

function renderList(list) {
	console.log('in renderList function');
	
	// .then loop through the array received
	// append a new row for each

	for(item of list) {
		$('#listDisplay').append(`
        <tr data-id=${item.id}>
			<td class="checkbox">✅ ${item.complete}</td>
        	<td>${item.task}</td>
			<td class="deleteCell"> 
			<button class="deleteButton">🗑</button>
			</td>
        </tr>
      `);
    }
	}

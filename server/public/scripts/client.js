console.log('js');
	
$(document).ready(onReady);
	
function onReady(){
	console.log('JQ')
	// show list when page loads
	$(document).ready(getList);
	// click listener for add button
	$('#submitButton').on('click', getInput)
	// click listener for delete buttons
	$(document).on('click', '.deleteButton', getDeleteID);
	// click event for checkbox
	$(document).on('click', '.checkbox', getPutID);
}

function getInput() {
	console.log('in getInput function');
	// pull value from input and set as variable
	let newTask = $('#taskInput').val();
	let isUrgent;
	let isImportant;
	// pull urgent value and set as variable
	if($('#inlineCheckbox1').is(":checked")) {
		isUrgent = true;
	}
	else{
		isUrgent = false;
	}
	// pull important value and set as variable
	if($('#inlineCheckbox2').is(":checked")) {
		isImportant = true;
	}
	else{
		isImportant = false;
	}
	//trigger addTask function
	addTask(newTask, isUrgent, isImportant);
}

function addTask(newTask, isUrgent, isImportant) {
	console.log('in addTask function');
	// create object
	let newListItem = {
		complete: false,
		urgent: isUrgent,
		important: isImportant,
		task: newTask
	}
	// POST request to send newTask to database
	$.ajax({
		type: 'POST',
		url: '/list',
		data: newListItem
	}).then((postResponse) => {
		console.log('POST to /list successful', postResponse);
		// clear inputs
		$('#taskInput').val('');
		$('#inlineCheckbox1').is(':unchecked');
		$('#inlineCheckbox2').is(':unchecked');
		// call getList function
		getList();
	}).catch((error) => {
		console.log('The POST to /list was unsuccessful:', error);
	  });
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
	// clear existing display to avoid duplicates
	$('#both').empty();
	$('#justUrgent').empty();
	$('#justImportant').empty();
	$('#neither').empty();
	// loop through the array received
	// append a new row for each
	for(item of list) {
		let id = item.id;
		let completed = item.complete;
		let urgent = item.urgent;
		let important = item.important;
		console.log(`${id} is ${completed}`);
		// if urgent and important
		if(urgent && important){
			if(completed) {
				$('#both').append(`
				<tr data-id=${item.id}>
					<td>
						<div class="form-check">
							<input class="form-check-input checkbox" type="checkbox" checked>
						</div>
					</td>
					<td>${item.task}</td>
					<td class="deleteCell"> 
					<button type="button" class="deleteButton btn btn-light">🗑</button>
					</td>
				</tr>
			  `)
			}
			else {
				$('#both').append(`
				<tr data-id=${item.id}>
					<td>
						<div class="form-check">
							<input class="form-check-input center checkbox" type="checkbox">
						</div>
					</td>
					<td>${item.task}</td>
					<td class="deleteCell"> 
					<button type="button" class="deleteButton btn btn-light">🗑</button>
					</td>
				</tr>
			  `)
			}
		}
		// if urgent and not important
		if(urgent && !important){
			if(completed) {
				$('#justUrgent').append(`
				<tr data-id=${item.id}>
					<td>
						<div class="form-check">
							<input class="form-check-input checkbox" type="checkbox" checked>
						</div>
					</td>
					<td>${item.task}</td>
					<td class="deleteCell"> 
					<button type="button" class="deleteButton btn btn-light">🗑</button>
					</td>
				</tr>
			  `)
			}
			else {
				$('#justUrgent').append(`
				<tr data-id=${item.id}>
					<td>
						<div class="form-check">
							<input class="form-check-input center checkbox" type="checkbox">
						</div>
					</td>
					<td>${item.task}</td>
					<td class="deleteCell"> 
					<button type="button" class="deleteButton btn btn-light">🗑</button>
					</td>
				</tr>
			  `)
			}
		}
		// if not urgent and important
		if(!urgent && important){
			if(completed) {
				$('#justImportant').append(`
				<tr data-id=${item.id}>
					<td>
						<div class="form-check">
							<input class="form-check-input checkbox" type="checkbox" checked>
						</div>
					</td>
					<td>${item.task}</td>
					<td class="deleteCell"> 
					<button type="button" class="deleteButton btn btn-light">🗑</button>
					</td>
				</tr>
			  `)
			}
			else {
				$('#justImportant').append(`
				<tr data-id=${item.id}>
					<td>
						<div class="form-check">
							<input class="form-check-input center checkbox" type="checkbox">
						</div>
					</td>
					<td>${item.task}</td>
					<td class="deleteCell"> 
					<button type="button" class="deleteButton btn btn-light">🗑</button>
					</td>
				</tr>
			  `)
			}
		}
		// if not urgent and not important
		if(!urgent && !important){
			if(completed) {
				$('#neither').append(`
				<tr data-id=${item.id}>
					<td>
						<div class="form-check">
							<input class="form-check-input checkbox" type="checkbox" checked>
						</div>
					</td>
					<td>${item.task}</td>
					<td class="deleteCell"> 
					<button type="button" class="deleteButton btn btn-light">🗑</button>
					</td>
				</tr>
			  `)
			}
			else {
				$('#neither').append(`
				<tr data-id=${item.id}>
					<td>
						<div class="form-check">
							<input class="form-check-input center checkbox" type="checkbox">
						</div>
					</td>
					<td>${item.task}</td>
					<td class="deleteCell"> 
					<button type="button" class="deleteButton btn btn-light">🗑</button>
					</td>
				</tr>
			  `)
			}
		}
    }
}

function getDeleteID(){
	console.log('in getDeleteID function');
	let idToDelete = $(this).closest('tr').data('id');
	console.log('delete row with id:', idToDelete);
	// call deleteItem function
	deleteItem(idToDelete);
}

function deleteItem(taskID) {
	$.ajax({
		method: 'DELETE',
		url: `/list/${taskID}`
	}).then((response) => {
		console.log('successfully deleted item', response);
		getList();
	}).catch((error) => {
		console.log('Error:', error);
	})
}

function getPutID() {
	console.log('in getPutID');
	// get ID to update
	let idToUpdate = $(this).closest('tr').data('id');
	// call updateComplete function for idToUpdate
	updateComplete(idToUpdate);
}

function updateComplete(idToUpdate) {
	console.log('in updateComplete function');
	$.ajax({
		method: 'PUT',
		url: `/list/${idToUpdate}`
	}).then((response) => {
		console.log('successfully updated item', response);
		getList();
	}).catch((error) => {
		console.log('Error:', error);
	})
}
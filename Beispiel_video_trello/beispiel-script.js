window.addEventListener("load", () => {
	todos = JSON.parse(localStorage.getItem("todos")) || [];
	const nameInput = document.querySelector("#name");
	const newTodoForm = document.querySelector("#new-todo-form");

	const username = localStorage.getItem("username") || "";

	nameInput.value = username;

	nameInput.addEventListener("change", (e) => {
		localStorage.setItem("username", e.target.value);
	});

	newTodoForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime(),
		};

		todos.push(todo);

		localStorage.setItem("todos", JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos();
	});

	DisplayTodos();
});

function DisplayTodos() {
	const todoList = document.querySelector("#todo-list");
	todoList.innerHTML = "";

	todos.forEach((todo) => {
		const todoItem = document.createElement("div");
		todoItem.classList.add("todo-item");

		const label = document.createElement("label");
		const input = document.createElement("input");
		const span = document.createElement("span");
		const content = document.createElement("div");
		const actions = document.createElement("div");
		const edit = document.createElement("button");
		const deleteButton = document.createElement("button");

		input.type = "checkbox";
		input.checked = todo.done;
		span.classList.add("bubble");
		if (todo.category == "other") {
			span.classList.add("other");
		} else {
			span.classList.add("shopping");
		}
		content.classList.add("todo-content");
		actions.classList.add("actions");
		edit.classList.add("edit");
		deleteButton.classList.add("delete");

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = "Edit";
		deleteButton.innerHTML = "Delete";

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add("done");
		}

		input.addEventListener("change", (e) => {
			todo.done = e.target.checked;
			localStorage.setItem("todos", JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add("done");
			} else {
				todoItem.classList.remove("done");
			}

			DisplayTodos();
		});

		edit.addEventListener("click", (e) => {
			const input = content.querySelector("input");
			input.removeAttribute("readonly");
			input.focus();
			input.addEventListener("blur", (e) => {
				input.setAttribute("readonly", true);
				todo.content = e.target.value;
				localStorage.setItem("todos", JSON.stringify(todos));
				DisplayTodos();
			});
		});

		deleteButton.addEventListener("click", (e) => {
			todos = todos.filter((t) => t != todo);
			localStorage.setItem("todos", JSON.stringify(todos));
			DisplayTodos();
		});

		// Delete Button Erklärung:
		// 	todos = todos.filter((t) => t != todo);  => Diese Zeile aktualisiert das todos Array, indem sie das Element todo entfernt. Die filter-Methode erstellt ein neues Array mit allen Elementen, die die Bedingung erfüllen – in diesem Fall alle todos, die nicht gleich dem zu löschenden todo sind
		// 	localStorage.setItem("todos", JSON.stringify(todos)); =>Hier wird das aktualisierte todos Array im localStorage gespeichert. localStorage ist ein Web-Speicher, der es ermöglicht, Daten lokal im Browser des Benutzers zu speichern. JSON.stringify(todos) konvertiert das Array in einen String, da localStorage nur Strings speichern kann.
		// 	DisplayTodos(); => Funktion hat  dieAufgabe , die Liste der Todos neu  anzuzeigen, sodass die Änderungen sichtbar werden.
		// });
	});
}

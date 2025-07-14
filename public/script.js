let title = document.querySelector("#title");
let description = document.querySelector("#description");
let list = document.querySelector("#list");
let isEditing = false;
let currentEditId = null;
let arr = [];

const getData = async () => {
    let res = await fetch("http://localhost:5000/tasks", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    let data = await res.json();
    if(data.length == 0) {
        arr = [];
    }
    else {
        arr = data;
    }
    if(data.success){
        alert(data.message);
    }
    showDetails();
}
getData();

const postData = async (id = null) => {
    if(!title.value || !description.value) {
        return alert("title and description are required");
    }

    title.value = title.value[0].toUpperCase() + title.value.slice(1);
    description.value = description.value[0].toUpperCase() + description.value.slice(1);

    let url = isEditing ? `http://localhost:5000/tasks/${id}` : `http://localhost:5000/tasks`;
    let method = isEditing ? "PUT" : "POST";
    let res = await fetch(url , {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title.value,
            description: description.value,
        })
    });
    let data = await res.json();
    alert(data.message);
    isEditing = false;
    getData();
}

const deleteData = async (id) => {
    let res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    let data = await res.json();
    alert(data.message);
    getData();
}

const editFunc = (id) => {
    const task = arr.find((item) => item._id == id);
    if(!task) {
        return;
    }
    title.value = task.title;
    description.value = task.description;    
    isEditing = true;
    currentEditId = task._id;
}


const completedFunc = async (id) => {
    let res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }
    });
    let data = await res.json();
    alert(data.message);
    getData();
}

const submitform = (e) => {
    e.preventDefault();
    postData(currentEditId);
    title.value = "";
    description.value = "";
    currentEditId = null;
    showDetails();
}

const showDetails = () => {
    if (arr.length == 0) {
        list.innerHTML = `<h1 class="text-2xl font-semibold text-center">No Data Found</h1>`;
        return;
    }
    else {
        list.innerHTML = "";
        arr.forEach((item) => {
            let li = document.createElement("li");
            li.innerHTML = `
            <li class="border-2 my-5 p-5 rounded-lg">
                <h3 class="text-2xl font-semibold">${item.title}</h3>
                <p>${item.description}</p>
                <div class="flex items-center gap-10 mt-3">
                    <button class="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg" type="button" onclick="editFunc('${item._id}')">Edit</button>
                    <button class="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg" type="button" onclick="deleteData('${item._id}')">Delete</button>
                    <button class="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg" type="button" onclick="completedFunc('${item._id}')">${item.completed ? "Completed" : "Not Completed"}</button>
                </div>
            </li>
        `;
            list.appendChild(li);
        })
    }
}


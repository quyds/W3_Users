

var usersApi = 'http://localhost:3000/Users';

function start() {
    getUsers(renderUsers);

    saveForm();
}

start();

function getUsers(callback) {
    fetch(usersApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function createUser(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(usersApi, options)
        .then(function(response) {
            response.json();
            alert('Thêm thành công');
            location.reload();
        })
        .then(callback);
}

function renderFormUsers(users) {
    var listUsers = document.querySelector('.reg-content');
    var htmls = users.map(function(user) {
        return `
            <form class="form-user-${user.id}">
                <div class="form-group">
                    <label>User Name:</label>
                    <input class="form-control" name="name" value="${user.name}">
                </div>
                <div class="form-group">
                    <label>Full Name:</label>
                    <input class="form-control" name="fullName" value="${user.fullName}">
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input class="form-control" name="email" value="${user.email}">
                </div>
                <div class="form-group">
                    <label>Birthday:</label>
                    <input class="form-control" name="birthDay" type="date" value="${user.birthDay}">
                </div>
                <div class="form-btn">
                    <button class="btn" type="button" id="save">Save</button>
                    <button class="btn" type="reset" id="reset">Reset</button>
                </div>
            </form>
            `;
    });
    listUsers.innerHTML = htmls.join('');

}

function renderUsers(users) {
    var listUsers = document.querySelector('#list-users');
    var htmls = users.map(function(user) {
        return `
                <tr class="user-${user.id}">
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.fullName}</td>
                    <td>${user.email}</td>
                    <td>${user.birthDay}</td>
                    <td><button class="btn" onclick="editUser(${user.id})" id="edit">Edit</button></td>
                    <td><button class="btn" onclick="deleteUser(${user.id})" id="delete">Delete</button></td>
                </tr>
            `;
    });
    listUsers.innerHTML = htmls.join('');

}

function editUser(id) {
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(usersApi + "/" + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            // var userId = document.querySelector('.form-user-' + id);

            // if (userId > 0) {
            //     // userId.getUsers(renderFormUsers);
            //     alert('hello')
            // }
            // var name = document.querySelector('input[name="name"]').value;
            // var fullName = document.querySelector('input[name="fullName"]').value;
            // var email = document.querySelector('input[name="email"]').value;
            // var birthDay = document.querySelector('input[name="birthDay"]').value;

            // var userForm = {
            // name: name,
            // fullName: fullName,
            // email: email,
            // birthDay: birthDay
            // };

            
            getUsers(renderFormUsers);
            // alert('hello')
        });
        
        // getUsers(renderFormUsers);
}

function deleteUser(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(usersApi + "/" + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            var userId = document.querySelector('.user-' + id);
            if (userId) {
                userId.remove();
            }
        });
}

function saveForm() {
    var saveBtn = document.querySelector('#save');

    saveBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var fullName = document.querySelector('input[name="fullName"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var birthDay = document.querySelector('input[name="birthDay"]').value;

        var userForm = {
            name: name,
            fullName: fullName,
            email: email,
            birthDay: birthDay
        };

        createUser(userForm, function() {
            getUsers(renderUsers);
        });
    };
    
};

var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    post = document.getElementById("post"),
    gender = document.getElementById("gender"),
    course = document.getElementById("course"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser");

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];

let isEdit = false, editId;
showInfo();

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit';
    modalTitle.innerText = "Fill the Form";
    isEdit = false;
    imgInput.src = "./image/Profile Icon.webp";
    form.reset();
});

file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result;
            imgInput.src = imgUrl;
        };

        fileReader.readAsDataURL(file.files[0]);
    }
    else{
        alert("This file is too large!");
    }
};

function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove());
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>${element.employeePost}</td>
            <td>${element.employeegender}</td>
            <td>${element.employeecourse}</td>
            <td>${element.startDate}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.employeegender}', '${element.employeecourse}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.employeegender}', '${element.employeecourse}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;

        userInfo.innerHTML += createElement;
    });
}

function readInfo(pic, name, email, phone, post, gender, course, sDate){
    document.querySelector('.showImg').src = pic;
    document.querySelector('#showName').value = name;
    document.querySelector("#showEmail").value = email;
    document.querySelector("#showPhone").value = phone;
    document.querySelector("#showPost").value = post;
    document.querySelector("#showGender").innerText = gender; // Corrected line
    document.querySelector("#showCourse").innerText = course; // Corrected line
    document.querySelector("#showsDate").value = sDate;
}

function editInfo(index, pic, name, Email, Phone, Post, gender, course, Sdate){
    isEdit = true;
    editId = index;
    imgInput.src = pic;
    userName.value = name;
    email.value = Email;
    phone.value = Phone;
    post.value = Post;
    gender.value = gender; // Corrected line
    course.value = course; // Corrected line
    sDate.value = Sdate;

    submitBtn.innerText = "Update";
    modalTitle.innerText = "Update The Form";
}
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html'; 
});


var isLoggedIn = localStorage.getItem('isLoggedIn');
if (!isLoggedIn) {
    window.location.href = 'login.html'; 
}
function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(getData));
        showInfo();
    }
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();

    const information = {
        picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        employeeName: userName.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        employeePost: post.value,
        employeegender: gender.value, // Corrected line
        employeecourse: course.value, // Corrected line
        startDate: sDate.value
    };

    if(!isEdit){
        getData.push(information);
    }
    else{
        isEdit = false;
        getData[editId] = information;
    }

    localStorage.setItem('userProfile', JSON.stringify(getData));

    submitBtn.innerText = "Submit";
    modalTitle.innerHTML = "Fill The Form";

    showInfo();

    form.reset();
    imgInput.src = "./image/Profile Icon.webp";  
});





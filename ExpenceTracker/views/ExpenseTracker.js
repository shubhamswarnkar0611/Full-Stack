let expense = document.getElementById("post");
let editButton = document.getElementById("patch");
expense.addEventListener("click", addToDb);
editButton.addEventListener("click", editButtonFunction);

 

function editButtonFunction() {
//   e.preventDefault();
  
  let objId = document.getElementById("obj_id").value;
  let newExpense = document.getElementById("expense").value;
  let newDescription = document.getElementById("description").value;
  let newCategory = document.getElementById("category").value;

  let obj = {
    objId,
    newExpense,
    newDescription,
    newCategory,
  };

  axios
  .put("http://localhost:3000/edit-expense",obj)
  .then((res)=>{
    showUserExpenseToScreen(res.data);
    alert("Edit successfully added")
  })
  .catch(err => {
    console.log(err.message);
  })
}

getDataAndShowOnscreen();
function getDataAndShowOnscreen() {
  axios
    .get("http://localhost:3000/get-expense")
    .then((res) => {
      console.log(res.data);
      res.data.map((item) => {
        showUserExpenseToScreen(item);
      });
    })
    .catch((err) => {
      console.log(err.mess);
    });
}

function addToDb(e) {
  e.preventDefault();
  let expense = document.getElementById("expense").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;

  let obj = {
    expense,
    description,
    category,
  };

  axios
    .post("http://localhost:3000/add-expense", obj)
    .then((res) => {
      console.log(res.data);
      showUserExpenseToScreen(res.data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function showUserExpenseToScreen(obj) {
  //showung on screen code
  let parentElement = document.getElementById("parentEle");
  let childElement = document.createElement("li");
  // childElement.className="list-group";

  childElement.textContent =
    obj.expense + "-" + obj.description + "-" + obj.category;

  //delete code
  let deleteChild = document.createElement("button");
  deleteChild.textContent = "Delete";
  deleteChild.className = "btn btn-danger  w-2";
  deleteChild.id = obj.id;

  deleteChild.onclick = (event) => {
    let Id=event.target.id
    axios
      .post('http://localhost:3000/delete-expense',{Id})
      .then(() => {
        alert("Deleted successfully");
      })
      .catch((error) => {
        console.log(error.msg);
      });

    parentElement.removeChild(childElement);
  };
  childElement.appendChild(deleteChild);

  //edit code
  let editChild = document.createElement("button");
  editChild.textContent = "Edit";
  editChild.className = "btn btn-info";
  editChild.id = obj._id;
  editChild.onclick = () => {
    // editButtonFunction(obj._id);
    parentElement.removeChild(childElement);

    document.getElementById("expense").value = obj.expense;
    document.getElementById("description").value = obj.description;
    document.getElementById("category").value = obj.category;
    document.getElementById("obj_id").value = obj.id;
  };

  childElement.appendChild(editChild);

  parentElement.appendChild(childElement);
}

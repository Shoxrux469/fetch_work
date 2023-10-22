let dashboard = document.forms.dashboard;
let form = document.forms.add_form;
let title = document.querySelector(".title_inp");
let descr = document.querySelector(".description");
let time = document.querySelector(".time");
let date = document.querySelector(".date");
let status1 = document.querySelector(".status");
let title_edit = document.querySelector(".title_inp_edit");
let descr_edit = document.querySelector(".descr_edit");
let time_edit = document.querySelector(".time_edit");
let date_edit = document.querySelector(".date_edit");
let status1_edit = document.querySelector(".status_edit");
let table = document.querySelector("table");
let config = document.querySelector(".config");
let add_task = document.querySelector(".add_task");
let change_task = document.querySelector(".change_task");
let close_add = document.querySelector(".close_add");
let inp_search = document.querySelector(".search");
let add_btn = document.querySelector(".add_btn");
let change_btn = document.querySelector(".change_btn");
let delete_btn = document.querySelector(".delete_btn");
let table_view = document.querySelector(".table_view");
let grid_view = document.querySelector(".grid_view");
let box = document.querySelector(".box");
let base_url = "http://localhost:8080";
console.log(descr);
function updateData() {
  fetch(base_url + "/users")
    .then((res) => res.json())
    .then((res) => reload(res, table));
}
updateData();

inp_search.onkeyup = () => {
  let val = inp_search.value.toLowerCase().trim();

  let filtered = arr.filter((item) => {
    let title = item.title.toLowerCase().trim();

    if (title.includes(val)) {
      return item;
    }
  });

  reload(filtered);
};

inp_search.onblur = () => {
  location.reload();
};

add_btn.onclick = () => {
  add_task.classList.remove("show", "fade");
};

close_add.onclick = () => {
  add_task.classList.remove("show", "fade");
};

config.onclick = () => {
  add_task.classList.add("show", "fade");
};
form.onsubmit = (e) => {
  e.preventDefault();

  let users = {};

  let fm = new FormData(form);

  fm.forEach((value, key) => {
    users[key] = value;
  });

  fetch(base_url + "/users", {
    method: "post",
    body: JSON.stringify(users),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        updateData();
        form.reset();
      }
    });
};

function reload(arr, place) {
  place.innerHTML = "";

  for (let item of arr) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td4 = document.createElement("td");
    let td3 = document.createElement("td");
    let td5 = document.createElement("td");

    td1.innerHTML = item.title;
    td2.innerHTML = item.descr;
    td3.innerHTML = item.time;
    td4.innerHTML = item.date;
    td5.innerHTML = item.status;

    tr.append(td1, td2, td3, td4, td5);
    table.append(tr);

    tr.onclick = () => {
      change_task.classList.add("show", "fade");

      change_btn.onclick = (e) => {
        e.preventDefault();
        action();
      };
    };
    delete_btn.onclick = () => {
      fetch(base_url + "/users/" + item.id, {
        method: "delete",
      }).then((res) => {
        if (res.status === 200 || res.status === 201) {
          tr.remove();
        }
      });
    };

    if (td5.innerHTML == "Не выполнено") {
      td5.style.color = "#ff3d00";
    } else if (td5.innerHTML == "В прогрессе") {
      td5.style.color = "#fcb458";
    } else {
      td5.style.color = "#6dda79";
    }
  }
  for (let item of arr) {
    let mainDiv = document.createElement("div");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let ul = document.createElement("ul");
    let li_date = document.createElement("li");
    let li_time = document.createElement("li");
    let span = document.createElement("span");

    h2.innerHTML = item.title;
    p.innerHTML = item.descr;
    li_date.innerHTML = item.date;
    li_time.innerHTML = item.time;
    span.innerHTML = item.status;

    box.append(mainDiv);
    mainDiv.append(h2, p, ul, span);
    ul.append(li_date, li_time);

    mainDiv.onclick = () => {
      change_task.classList.add("show", "fade");

      change_btn.onclick = (e) => {
        e.preventDefault();
        action();
      };
    };
	if (span.innerHTML == "Не выполнено") {
		span.style.color = "#ff3d00";
	  } else if (span.innerHTML == "В прогрессе") {
		span.style.color = "#fcb458";
	  } else {
		span.style.color = "#6dda79";
	  }
  }
}

function action() {
  fetch(base_url + "/users/" + item.id, {
    method: "patch",
    body: JSON.stringify({
      title: title_edit.value,
      descr: descr_edit.value,
      time: time_edit.value,
      date: date_edit.value,
      status: status1_edit.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => console.log(res));
}

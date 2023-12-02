var task_counter = 0;
var r = document.querySelector(':root');
var task_margin = 0;
var todo_px = 60;
var try_table = document.getElementById("try_table");
var try_rows = try_table.rows;
var add_counter = -1;
var engagement_value = 0;
var mood_value = 0;
var save_counter;

document.getElementById("gem_count").innerHTML = "◆: " + gem_value;
document.getElementById("engagement_count").innerHTML = "E: " + engagement_value/save_counter;
document.getElementById("mood_count").innerHTML = "M: " + mood_value/save_counter;

function loadCookies() {
  var engagement_cookie = getCookie("engagement_value");
  var mood_cookie = getCookie("mood_value");
  save_counter = getCookie("save_counter");
  save_counter = save_counter ? parseInt(save_counter) : 0;

  if (engagement_cookie) {
    engagement_value = parseInt(engagement_cookie);
    document.getElementById("engagement_count").innerHTML = "E: " + engagement_value;
  }

  if (mood_cookie) {
    mood_value = parseInt(mood_cookie);
    document.getElementById("mood_count").innerHTML = "M: " + mood_value;
  }
}

window.onload = function () {
  var gem_count_cookie = getCookie("gem_count");
  loadCookies();
  gem_value = gem_count_cookie ? parseInt(gem_count_cookie) : 0;
  document.getElementById("gem_count").innerHTML = "◆: " + gem_value;
  document.getElementById("engagement_count").innerHTML = "E: " + (engagement_value / save_counter).toFixed(2);
  document.getElementById("mood_count").innerHTML = "M: " + (mood_value / save_counter).toFixed(2);
};

var gem_count_cookie = getCookie("gem_count");
var gem_value = gem_count_cookie ? parseInt(gem_count_cookie) : 0;

function add_task() {
  task_counter += 1;
  if (task_counter > 7) {
    todo_px += 7.5;
    var task_height = 70 / task_counter + "vh";
    r.style.setProperty('--task_height', task_height);
    r.style.setProperty('--todo_height', "calc(75vh + " + todo_px + "px" + ")");
  }
  var task = document.createElement("div");
  task.className = "task";

  var label = document.createElement("label");
  label.className = "container";

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onclick = cleartest;

  var checkmarkSpan = document.createElement("span");
  checkmarkSpan.className = "checkmark";

  var textbox = document.createElement("input");
  textbox.type = "text";
  textbox.className = "textbox";

  label.appendChild(checkbox);
  label.appendChild(checkmarkSpan);
  task.appendChild(label);
  task.appendChild(textbox);

  var todo = document.getElementById("todo");

  var add = document.getElementById("add");

  todo.insertBefore(task, add.nextSibling);
}

function cleartest() {
  var task = document.querySelector(".task");

  var todo = document.getElementById("todo");
  todo.removeChild(task);

  gem_value += 10;
  document.getElementById("gem_count").innerHTML = "◆: " + gem_value;

  updateGemCountCookie();
}

var sliderE = document.getElementById("Engagement");
var Engagement_out = document.getElementById("Engagement_val");
Engagement_out.innerHTML = sliderE.value;

sliderE.oninput = function () {
  Engagement_out.innerHTML = this.value;
  engagement_value = this.value;
};

var sliderM = document.getElementById("Mood");
var Mood_out = document.getElementById("Mood_val");
Mood_out.innerHTML = sliderM.value;

sliderM.oninput = function () {
  Mood_out.innerHTML = this.value;
  mood_value = this.value;
};

let secondsElapsed = 0;
row_num = Math.floor(Math.random() * try_table.rows.length) + 1;
var try_imageitem = try_table.rows[row_num - 1].cells[1].innerHTML;
document.getElementById("try_image").src = try_imageitem;
document.getElementById("try_link").href = try_table.rows[row_num - 1].cells[0].innerHTML;

const intervalId = setInterval(function () {
  secondsElapsed++;
  if (secondsElapsed === 3) {
    row_num = Math.floor(Math.random() * try_table.rows.length) + 1;
    var try_imageitem = try_table.rows[row_num - 1].cells[1].innerHTML;
    document.getElementById("try_image").src = try_imageitem;
    document.getElementById("try_link").href = try_table.rows[row_num - 1].cells[0].innerHTML;
    secondsElapsed = 0;
  }
}, 1000);

function toggleWidget(element) {
  var widget = element.closest('.widgets');
  if (widget) {
    if (element.innerHTML == "ADD") {
      var textbox = document.createElement("input");
      textbox.type = "text";
      textbox.id = "add_text";
      textbox.className = "add_textbox";
      textbox.placeholder = "Add a website: (Ex. youtube.com)";
      widget.appendChild(textbox);
      element.innerHTML = "DELETE";

      textbox.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          var link = document.createElement("a");
          link.style.marginBottom = "50%";
          link.href = "https://" + textbox.value;
          link.innerText = link.href;
          link.target = "_blank";
          link.className = "link";
          widget.appendChild(link);
          element.innerHTML = "DELETE";
          deleteTextbox(widget);
        }
      });
    } else if (element.innerHTML == "DELETE") {
      var linkToDelete = widget.querySelector('.link');
      if (linkToDelete) {
        linkToDelete.remove();
      }
      element.innerHTML = "ADD";
      deleteTextbox(widget);
    }
  }
}

function deleteTextbox(widget) {
  var textbox = widget.querySelector('.add_textbox');

  if (textbox) {
    textbox.remove();
  }
}

function save_survey() {
  gem_value += 50;
  save_counter += 1;

  var savedEngagement = getCookie("engagement_value");
  var savedMood = getCookie("mood_value");

  savedEngagement = savedEngagement ? parseInt(savedEngagement) : 0;
  savedMood = savedMood ? parseInt(savedMood) : 0;

  savedEngagement += parseInt(engagement_value);
  savedMood += parseInt(mood_value);

  document.getElementById("gem_count").innerHTML = "◆: " + gem_value;
  document.getElementById("engagement_count").innerHTML = "E: " + (savedEngagement / save_counter).toFixed(2);
  document.getElementById("mood_count").innerHTML = "M: " + (savedMood / save_counter).toFixed(2);
  r.style.setProperty('--survey_display', "none");

  updateCookie("save_counter", save_counter);
  updateCookie("engagement_value", savedEngagement);
  updateCookie("mood_value", savedMood);
  updateGemCountCookie();
}

function updateCookie(name, value) {
  setCookie(name, value, 365);
}

function updateGemCountCookie() {
  setCookie("gem_count", gem_value, 365);
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
    if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length);
  }
  return null;
}

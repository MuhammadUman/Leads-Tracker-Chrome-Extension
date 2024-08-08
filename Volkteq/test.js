let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
//const tabs = [{ user: "https://www.linkedin.com" }];   object inside an array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("Leads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //chrome.tabs is an API that works only on the condition that we are running it as an extension
    myLeads.push(tabs[0].url);
    localStorage.setItem("Leads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    /*   const li = document.createElement("li");
        li.textContent = leads[i];  //another way of doing the same thing I did above
        ulEl.append(li);
      */
    //listItems += "<li><a href='#'>" + leads[i] + "</a></li>";
    //listItems += "<li>" + "<a href='#'> leads[i]</a>" + "</li>";
    listItems += `
    <li>
    <a target='_blank' href='${leads[i]}'>
     ${leads[i]}
     </a>
    </li>
    `;
  }
  ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = " ";
  localStorage.setItem("Leads", JSON.stringify(myLeads));
  render(myLeads);
});

inputEl.addEventListener("keydown", function () {
  if (event.key === "Enter") {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("Leads", JSON.stringify(myLeads));
    render(myLeads);
  }
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  //location.reload(); for reloading page
  myLeads = [];
  render(myLeads);
});

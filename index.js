const circle = document.getElementById("circle");
const spiner = document.getElementById("spiner");
const form = document.getElementById("form");
const rewardTitle = document.querySelector("#reward");

const name = document.getElementById("name");
const email = document.getElementById("email");
const submit = document.getElementById("submit");

let countMac = 0;
async function checkMac() {
  let response = await fetch(
    "https://script.google.com/macros/s/AKfycbxlamywiWi9xppc80Xt8s4imOVP8i7oNsAYx799tUQUvAdfxSUkdPL7XDlN7gtQRhvV/exec"
  );
  let data = await response.json();
  return (countMac = data.data);
}
checkMac();
document.addEventListener("DOMContentLoaded", () => {
  const spined = localStorage.getItem("spined");
  const reward = localStorage.getItem("reward");
  if (spined) {
    spiner.style = "pointer-event:none";
    rewardTitle.innerText = reward;
    form.classList.add("active");
  }
});
let reward = "chúc bạn may mắn";

spiner.addEventListener("click", () => {
  const random = Math.floor(Math.random() * 101);
  if (countMac < 10 && random >= 0 && random < 5) {
    circle.style = "rotate: 1133deg;";
    reward = "macbook";
  } else if (random > 5 && random <= 25) {
    circle.style = "rotate: 1200deg;";
    reward = "100$";
  } else if (random > 25 && random <= 45) {
    circle.style = "rotate: 1436deg;";
    reward = "200$";
  } else if (random > 45 && random <= 70) {
    circle.style = "rotate: 1322deg;";
    reward = "300$";
  } else if (random > 70 && random <= 80) {
    circle.style = "rotate: 1260deg;";
    reward = "500$";
  } else {
    circle.style = "rotate: 1370deg;";
  }
  setTimeout(() => {
    rewardTitle.innerText = reward;
    form.classList.add("active");
    localStorage.setItem("spined", true);
    localStorage.setItem("reward", reward);
  }, 5000);
});
submit.addEventListener("click", () => {
  let data = {
    nameData: name.value,
    emailData: email.value,
    rewardData: reward,
  };
  postGoogleForm(data);
});
async function postGoogleForm(data) {
  const formURL =
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLSetIUU6UIXun6L-o_CO5eJbJn7z7OkPMUa1WKX-Wc3H6CU-2g/formResponse";
  const Postname = "entry.1543833885";
  const Postemail = "entry.1027449200";
  const Postreward = "entry.1023477880";
  const formData = new FormData();
  formData.append(Postname, data.nameData);
  formData.append(Postemail, data.emailData);
  formData.append(Postreward, data.rewardData);
  try {
    await fetch(formURL, {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    console.log(error);
  }
}

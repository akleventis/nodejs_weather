const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const Msg1 = document.querySelector('#Msg1')
const Msg2 = document.querySelector('#Msg2')

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  fetch(`http://34.227.157.219:3000/weather?address=${encodeURIComponent(location)}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        Msg2.textContent = '';
        Msg1.textContent = data.error;

      } else {
        Msg1.textContent = data.location;
        Msg2.textContent = data.forecast;
      }
    });
  });
});

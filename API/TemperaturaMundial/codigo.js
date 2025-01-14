
const searcshow = (e) => {

e.preventDefault();

    fetch('https://www.weatherapi.com/')

        .then(Response => Response.json())
        .then(data => {

        })

}

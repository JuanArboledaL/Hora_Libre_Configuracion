async function getWeather() {
    const apiKey = 'f082fd6a3f8149ef861114639251601';
    const location = document.getElementById('locationInput').value;
    const resultDiv = document.getElementById('result');
    
    if (!location) {
        resultDiv.innerHTML = '<p class="error">Ingrese una ubicación   .</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);

        if (!response.ok) {
            throw new Error('No se ha encontrado la ubicación');
        }

        const data = await response.json();
        const { location: loc, current } = data;

        resultDiv.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="${current.condition.icon}" style="margin-right: 10px;"/>
                <div>
                    <p><strong>${loc.name}</strong> (${current.condition.text}). Temp: ${current.temp_c}°C</p>
                </div>
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = '<p class="error">No se ha encontrado una ubicación con ese nombre.</p>';
    }
}

 
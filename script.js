const manufacturerCodes = {
    'MAT': 'Tata',
    'MA1': 'Mahindra',
    'MA3': 'Maruti Suzuki',
    'KMH': 'Hyundai',
    'MAL': 'Hyundai',
    'MLH': 'Honda',
    'JT': 'Toyota',
    'MAJ': 'Ford',
    'WVW': 'Volkswagen',
    'VF1': 'Renault',
    'JN': 'Nissan',
    'KNA': 'Kia',
    'TMB': 'Skoda',
    '1C4': 'Jeep',
    'WBA': 'BMW',
    'WDB': 'Mercedes-Benz',
    'WAU': 'Audi',
    // bikes
    'ME3': 'Royal Enfield'
    // Add more as needed
};

const yearCodes = {
    'A': 1980, 'B': 1981, 'C': 1982, 'D': 1983, 'E': 1984, 'F': 1985, 'G': 1986, 'H': 1987, 'J': 1988, 'K': 1989,
    'L': 1990, 'M': 1991, 'N': 1992, 'P': 1993, 'R': 1994, 'S': 1995, 'T': 1996, 'V': 1997, 'W': 1998, 'X': 1999,
    'Y': 2000, '1': 2001, '2': 2002, '3': 2003, '4': 2004, '5': 2005, '6': 2006, '7': 2007, '8': 2008, '9': 2009,
    'A': 2010, 'B': 2011, 'C': 2012, 'D': 2013, 'E': 2014, 'F': 2015, 'G': 2016, 'H': 2017, 'J': 2018, 'K': 2019,
    'L': 2020, 'M': 2021, 'N': 2022, 'P': 2023, 'R': 2024, 'S': 2025, 'T': 2026, 'V': 2027, 'W': 2028, 'X': 2029,
    'Y': 2030, '1': 2031, '2': 2032, '3': 2033, '4': 2034, '5': 2035, '6': 2036, '7': 2037, '8': 2038, '9': 2039
};

const engineSeriesCodes = {
    'J': 'J Series Engine',
    'U': 'U Series Engine'
};

const engineSizeCodes = {
    '3': '350cc Engine',
    '4': '400cc Engine',
    '6': '650cc Engine'
};

const coolingTypeCodes = {
    'A': 'Air Cooled',
    'O': 'Oil Cooled',
    'L': 'Liquid Cooled'
};

const gearsCodes = {
    '4': '4 Gears',
    '5': '5 Gears',
    '6': '6 Gears',
    '8': '8 Gears',
    'A': 'Automatic',
    'M': 'Manual'
};

const fuelTypeCodes = {
    'F': 'Petrol/Diesel',
    'G': 'Gas'
};

const monthCodes = {
    'A': 'January', 'B': 'February', 'C': 'March', 'D': 'April', 'E': 'May', 'F': 'June',
    'G': 'July', 'H': 'August', 'J': 'September', 'K': 'October', 'N': 'November', 'P': 'December'
};

function decodeVIN() {
    const vin = document.getElementById('vinInput').value.toUpperCase();
    if (vin.length !== 17) {
        document.getElementById('output').innerHTML = '<p class="error">Error: VIN must be exactly 17 characters long.</p>';
        return;
    }

    // Check if Node.js server is running (optional API call)
    fetch(`/api/decode-vin/${vin}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('output').innerHTML = `<p class="error">${data.error}</p>`;
                return;
            }
            // Use API data for basic fields, then compute others client-side
            const country = data.country;
            const manufacturer = data.manufacturer;
            // Compute other fields as before
            const wmi = vin.substring(0, 3);
            
            // Plant decoding for Royal Enfield 11th Character
            let plant;
            if (manufacturer === 'Royal Enfield') {
                const plantCodes = {
                    '1': 'Oragadam',
                    '2': 'Vallam Vadagal'
                };
                plant = plantCodes[vin.charAt(10)] || 'Unknown';
            } else {
                plant = vin.charAt(10);
            }
            
            const vds = vin.substring(3, 9);
            const model = vds; // Using VDS as model code
            
            // Engine Series: 4th character
            const engineSeries = engineSeriesCodes[vin.charAt(3)] || 'Unknown';
            
            // Engine Size: 5th character
            const engineSize = engineSizeCodes[vin.charAt(4)] || 'Unknown';
            
            // Cooling Type: 6th character
            const coolingType = coolingTypeCodes[vin.charAt(5)] || 'Unknown';
            
            // Number of Gears: 7th character
            const gears = gearsCodes[vin.charAt(6)] || 'Unknown';
            
            // Fuel Type: 8th character
            const fuelType = fuelTypeCodes[vin.charAt(7)] || 'Unknown';
            
            // Month: 9th character
            const month = monthCodes[vin.charAt(8)] || 'Unknown';
            
            const yearCode = vin.charAt(9);
            const year = yearCodes[yearCode] || 'Unknown';
            
function decodeVINClientSide(vin) {
    const country = (vin.substring(0, 2) === 'MA' || vin.substring(0, 2) === 'ME') ? 'India' : 'Unknown';
    const wmi = vin.substring(0, 3);
    const manufacturer = manufacturerCodes[wmi] || 'Unknown';
    
    // Plant decoding for Royal Enfield 11th Character
    let plant;
    if (manufacturer === 'Royal Enfield') {
        const plantCodes = {
            '1': 'Oragadam',
            '2': 'Vallam Vadagal'
        };
        plant = plantCodes[vin.charAt(10)] || 'Unknown';
    } else {
        plant = vin.charAt(10);
    }
    
    const vds = vin.substring(3, 9);
    const model = vds; // Using VDS as model code
    
    // Engine Series: 4th character
    const engineSeries = engineSeriesCodes[vin.charAt(3)] || 'Unknown';
    
    // Engine Size: 5th character
    const engineSize = engineSizeCodes[vin.charAt(4)] || 'Unknown';
    
    // Cooling Type: 6th character
    const coolingType = coolingTypeCodes[vin.charAt(5)] || 'Unknown';
    
    // Number of Gears: 7th character
    const gears = gearsCodes[vin.charAt(6)] || 'Unknown';
    
    // Fuel Type: 8th character
    const fuelType = fuelTypeCodes[vin.charAt(7)] || 'Unknown';
    
    // Month: 9th character
    const month = monthCodes[vin.charAt(8)] || 'Unknown';
    
    const yearCode = vin.charAt(9);
    const year = yearCodes[yearCode] || 'Unknown';
    
    const serial = vin.substring(11, 17);
    const output = `
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Manufacturer:</strong> ${manufacturer}</p>
        <p><strong>Engine Series:</strong> ${engineSeries}</p>
        <p><strong>Engine Size:</strong> ${engineSize}</p>
        <p><strong>Cooling Type:</strong> ${coolingType}</p>
        <p><strong>Number of Gears:</strong> ${gears}</p>
        <p><strong>Fuel Type:</strong> ${fuelType}</p>
        <p><strong>Year:</strong> ${year}</p>
        <p><strong>Month:</strong> ${month}</p>
        <p><strong>Plant:</strong> ${plant}</p>
        <p><strong>Serial:</strong> ${serial}</p>
    `;
    document.getElementById('output').innerHTML = output;
}

function decodeVINClientSide(vin) {
    
    // Plant decoding for Royal Enfield 11th Character
    let plant;
    if (manufacturer === 'Royal Enfield') {
        const plantCodes = {
            '1': 'Oragadam',
            '2': 'Vallam Vadagal'
        };
        plant = plantCodes[vin.charAt(10)] || 'Unknown';
    } else {
        plant = vin.charAt(10);
    }
    
    const vds = vin.substring(3, 9);
    const model = vds; // Using VDS as model code
    
    // Engine Series: 4th character
    const engineSeries = engineSeriesCodes[vin.charAt(3)] || 'Unknown';
    
    // Engine Size: 5th character
    const engineSize = engineSizeCodes[vin.charAt(4)] || 'Unknown';
    
    // Cooling Type: 6th character
    const coolingType = coolingTypeCodes[vin.charAt(5)] || 'Unknown';
    
    // Number of Gears: 7th character
    const gears = gearsCodes[vin.charAt(6)] || 'Unknown';
    
    // Fuel Type: 8th character
    const fuelType = fuelTypeCodes[vin.charAt(7)] || 'Unknown';
    
    // Month: 9th character
    const month = monthCodes[vin.charAt(8)] || 'Unknown';
    
    const yearCode = vin.charAt(9);
    const year = yearCodes[yearCode] || 'Unknown';
    
    const serial = vin.substring(11, 17);
    const output = `
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Manufacturer:</strong> ${manufacturer}</p>
        <p><strong>Engine Series:</strong> ${engineSeries}</p>
        <p><strong>Engine Size:</strong> ${engineSize}</p>
        <p><strong>Cooling Type:</strong> ${coolingType}</p>
        <p><strong>Number of Gears:</strong> ${gears}</p>
        <p><strong>Fuel Type:</strong> ${fuelType}</p>
        <p><strong>Year:</strong> ${year}</p>
        <p><strong>Month:</strong> ${month}</p>
        <p><strong>Plant:</strong> ${plant}</p>
        <p><strong>Serial:</strong> ${serial}</p>
    `;
    document.getElementById('output').innerHTML = output;
}
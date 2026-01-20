const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Manufacturer codes
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
    'ME3': 'Royal Enfield'
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
    'U': 'U Series Engine',
    'P': 'Parallel Twin Engine'
};

const engineSizeCodes = {
    '3': '350cc Engine',
    '4': '400cc Engine',
    '7': '650cc Engine'
};

const coolingTypeCodes = {
    'A': 'Air Cooled',
    'O': 'Oil Cooled',
    'L': 'Liquid Cooled',
    'E': 'Air/Oil Cooled'
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
    'F': 'Fuel Injection',
    'C': 'Carburetor'
};

const monthCodes = {
    'A': 'January', 'B': 'February', 'C': 'March', 'D': 'April', 'E': 'May', 'F': 'June',
    'G': 'July', 'H': 'August', 'J': 'September', 'K': 'October', 'N': 'November', 'P': 'December'
};

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Function to decode VIN
function decodeVIN(vin) {
    vin = vin.toUpperCase();
    
    if (vin.length !== 17) {
        return { error: 'VIN must be exactly 17 characters long.' };
    }

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
    const model = vds;
    const engineSeries = engineSeriesCodes[vin.charAt(3)] || 'Unknown';
    const engineSize = engineSizeCodes[vin.charAt(4)] || 'Unknown';
    const coolingType = coolingTypeCodes[vin.charAt(5)] || 'Unknown';
    const gears = gearsCodes[vin.charAt(6)] || 'Unknown';
    const fuelType = fuelTypeCodes[vin.charAt(7)] || 'Unknown';
    const month = monthCodes[vin.charAt(8)] || 'Unknown';
    
    const yearCode = vin.charAt(9);
    const year = yearCodes[yearCode] || 'Unknown';
    
    const serial = vin.substring(11, 17);
    
    return {
        success: true,
        vin: vin,
        country: country,
        manufacturer: manufacturer,
        modelCode: model,
        engineSeries: engineSeries,
        engineSize: engineSize,
        coolingType: coolingType,
        numberOfGears: gears,
        fuelType: fuelType,
        year: year,
        month: month,
        plant: plant,
        serial: serial
    };
}

// API endpoint for VIN decoding - Accept VIN via query parameter or URL path
app.get('/api/decode-vin/:vin', (req, res) => {
    const vin = req.params.vin.toUpperCase();
    const result = decodeVIN(vin);
    
    if (result.error) {
        return res.status(400).json(result);
    }
    
    res.json(result);
});

// Alternative API endpoint accepting POST request with VIN in body
app.post('/api/decode-vin', (req, res) => {
    const { vin } = req.body;
    
    if (!vin) {
        return res.status(400).json({ error: 'VIN parameter is required.' });
    }
    
    const result = decodeVIN(vin);
    
    if (result.error) {
        return res.status(400).json(result);
    }
    
    res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Endpoint: GET http://localhost:${PORT}/api/decode-vin/{VIN}`);
  console.log(`API Endpoint: POST http://localhost:${PORT}/api/decode-vin (with body: {"vin": "YOUR_VIN"})`);
});
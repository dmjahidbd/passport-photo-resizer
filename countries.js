// Country-specific passport and visa photo requirements
const countryRequirements = {
    'USA': {
        name: 'United States',
        type: 'Passport',
        widthMM: 51,
        heightMM: 51,
        widthInch: 2,
        heightInch: 2,
        dpi: 600,
        background: 'white',
        faceHeightPercent: 65,
        description: 'Head height must be between 1-1.375 inches (25-35mm)'
    },
    'USA_VISA': {
        name: 'United States Visa',
        type: 'Visa',
        widthMM: 51,
        heightMM: 51,
        widthInch: 2,
        heightInch: 2,
        dpi: 600,
        background: 'white',
        faceHeightPercent: 65,
        description: 'Same as passport requirements'
    },
    'UK': {
        name: 'United Kingdom',
        type: 'Passport',
        widthMM: 35,
        heightMM: 45,
        dpi: 600,
        background: 'light grey or cream',
        faceHeightPercent: 70,
        description: 'Face must be 29-34mm from chin to crown'
    },
    'CANADA': {
        name: 'Canada',
        type: 'Passport',
        widthMM: 50,
        heightMM: 70,
        dpi: 600,
        background: 'white',
        faceHeightPercent: 65,
        description: 'Head from crown to chin must be 31-36mm'
    },
    'INDIA': {
        name: 'India',
        type: 'Passport',
        widthMM: 35,
        heightMM: 45,
        dpi: 600,
        background: 'white',
        faceHeightPercent: 70,
        description: 'Face must occupy 70-80% of the photograph'
    },
    'INDIA_VISA': {
        name: 'India Visa',
        type: 'Visa',
        widthMM: 51,
        heightMM: 51,
        widthInch: 2,
        heightInch: 2,
        dpi: 600,
        background: 'white',
        faceHeightPercent: 65,
        description: '2x2 inches, white background'
    },
    'CHINA': {
        name: 'China',
        type: 'Passport',
        widthMM: 33,
        heightMM: 48,
        dpi: 600,
        background: 'white',
        faceHeightPercent: 70,
        description: 'Head height 28-33mm'
    },
    'AUSTRALIA': {
        name: 'Australia',
        type: 'Passport',
        widthMM: 35,
        heightMM: 45,
        dpi: 600,
        background: 'light grey or cream',
        faceHeightPercent: 70,
        description: 'Face 32-36mm from chin to crown'
    },
    'SCHENGEN': {
        name: 'Schengen (EU) Visa',
        type: 'Visa',
        widthMM: 35,
        heightMM: 45,
        dpi: 600,
        background: 'light grey',
        faceHeightPercent: 70,
        description: 'Face must be 70-80% of the photo'
    },
    'GERMANY': {
        name: 'Germany',
        type: 'Passport',
        widthMM: 35,
        heightMM: 45,
        dpi: 600,
        background: 'light grey',
        faceHeightPercent: 70,
        description: 'Biometric photo required'
    },
    'FRANCE': {
        name: 'France',
        type: 'Passport',
        widthMM: 35,
        heightMM: 45,
        dpi: 600,
        background: 'light grey',
        faceHeightPercent: 70,
        description: 'Head 32-36mm'
    },
    'JAPAN': {
        name: 'Japan',
        type: 'Passport',
        widthMM: 35,
        heightMM: 45,
        dpi: 600,
        background: 'white',
        faceHeightPercent: 70,
        description: 'Taken within 6 months'
    },
    'SINGAPORE': {
        name: 'Singapore',
        type: 'Passport',
        widthMM: 35,
        heightMM: 45,
        dpi: 600,
        background: 'white',
        faceHeightPercent: 70,
        description: 'Head 25-35mm'
    },
    'BANGLADESH': {
        name: 'Bangladesh',
        type: 'Passport',
        widthMM: 35,
        heightMM: 45,
        dpi: 600,
        background: 'white',
        faceHeightPercent: 70,
        description: 'Face must be clearly visible'
    },
    'PAKISTAN': {
        name: 'Pakistan',
        type: 'Passport',
        widthMM: 35,
        heightMM: 45,
        dpi: 600,
        background: 'white',
        faceHeightPercent: 70,
        description: 'White background required'
    },
    'MEXICO': {
        name: 'Mexico',
        type: 'Passport',
        widthMM: 35,
        heightMM: 45,
        dpi: 600,
        background: 'white',
        faceHeightPercent: 70,
        description: 'Recent photo, white background'
    },
    'BRAZIL': {
        name: 'Brazil',
        type: 'Passport',
        widthMM: 50,
        heightMM: 70,
        dpi: 600,
        background: 'white',
        faceHeightPercent: 65,
        description: '5x7cm, white background'
    },
    'SOUTH_AFRICA': {
        name: 'South Africa',
        type: 'Passport',
        widthMM: 35,
        heightMM: 45,
        dpi: 600,
        background: 'white',
        faceHeightPercent: 70,
        description: 'White or light grey background'
    },
    'UAE': {
        name: 'United Arab Emirates',
        type: 'Passport',
        widthMM: 43,
        heightMM: 55,
        dpi: 600,
        background: 'white',
        faceHeightPercent: 70,
        description: 'White background required'
    },
    'SAUDI_ARABIA': {
        name: 'Saudi Arabia',
        type: 'Passport',
        widthMM: 40,
        heightMM: 60,
        dpi: 600,
        background: 'white',
        faceHeightPercent: 70,
        description: '4x6cm, white background'
    }
};

// Initialize country selector
function initCountrySelector() {
    const select = document.getElementById('countrySelect');
    
    // Sort countries alphabetically
    const sortedCountries = Object.keys(countryRequirements).sort((a, b) => {
        return countryRequirements[a].name.localeCompare(countryRequirements[b].name);
    });
    
    sortedCountries.forEach(key => {
        const country = countryRequirements[key];
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `${country.name} - ${country.type}`;
        select.appendChild(option);
    });
}

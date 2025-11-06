// Global variables
let uploadedImage = null;
let faceDetectionModel = null;
let canvas = null;
let ctx = null;
let selectedCountry = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize country selector
    initCountrySelector();
    
    // Get canvas context
    canvas = document.getElementById('previewCanvas');
    ctx = canvas.getContext('2d');
    
    // Load face detection model
    await loadFaceDetectionModel();
    
    // Setup event listeners
    setupEventListeners();
});

// Load BlazeFace model for face detection
async function loadFaceDetectionModel() {
    try {
        faceDetectionModel = await blazeface.load();
        console.log('Face detection model loaded successfully');
    } catch (error) {
        console.error('Error loading face detection model:', error);
    }
}

// Setup all event listeners
function setupEventListeners() {
    const photoInput = document.getElementById('photoInput');
    const processBtn = document.getElementById('processBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');
    const countrySelect = document.getElementById('countrySelect');
    
    photoInput.addEventListener('change', handlePhotoUpload);
    processBtn.addEventListener('click', processPhoto);
    downloadBtn.addEventListener('click', downloadPhoto);
    resetBtn.addEventListener('click', resetAll);
    countrySelect.addEventListener('change', handleCountryChange);
    
    // Drag and drop support
    const uploadBox = document.getElementById('uploadBox');
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = '#764ba2';
    });
    
    uploadBox.addEventListener('dragleave', () => {
        uploadBox.style.borderColor = '#667eea';
    });
    
    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = '#667eea';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            photoInput.files = e.dataTransfer.files;
            handlePhotoUpload({ target: photoInput });
        }
    });
}

// Handle photo upload
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            uploadedImage = img;
            document.getElementById('controlsSection').style.display = 'block';
            displayImage(img);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Display image on canvas
function displayImage(img) {
    const maxWidth = 800;
    const maxHeight = 600;
    let width = img.width;
    let height = img.height;
    
    if (width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
    }
    if (height > maxHeight) {
        width = (maxHeight / height) * width;
        height = maxHeight;
    }
    
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
}

// Handle country selection
function handleCountryChange(event) {
    const countryKey = event.target.value;
    if (!countryKey) return;
    
    selectedCountry = countryRequirements[countryKey];
    displayPhotoSpecs(selectedCountry);
}

// Display photo specifications
function displayPhotoSpecs(specs) {
    const specsDiv = document.getElementById('photoSpecs');
    specsDiv.innerHTML = `
        <h3>📝 Photo Requirements</h3>
        <p><strong>Size:</strong> ${specs.widthMM} x ${specs.heightMM} mm</p>
        <p><strong>Background:</strong> ${specs.background}</p>
        <p><strong>DPI:</strong> ${specs.dpi}</p>
        <p><strong>Details:</strong> ${specs.description}</p>
    `;
}

// Process photo with face detection and resizing
async function processPhoto() {
    if (!uploadedImage || !selectedCountry) {
        alert('Please upload a photo and select a country!');
        return;
    }
    
    try {
        // Detect face
        const predictions = await faceDetectionModel.estimateFaces(uploadedImage, false);
        
        if (predictions.length === 0) {
            alert('No face detected! Please upload a clear photo with a visible face.');
            return;
        }
        
        // Get face bounding box
        const face = predictions[0];
        const [x, y, width, height] = [face.topLeft[0], face.topLeft[1], 
                                       face.bottomRight[0] - face.topLeft[0],
                                       face.bottomRight[1] - face.topLeft[1]];
        
        // Calculate crop dimensions based on country requirements
        const targetWidth = selectedCountry.widthMM * (selectedCountry.dpi / 25.4);
        const targetHeight = selectedCountry.heightMM * (selectedCountry.dpi / 25.4);
        
        // Create output canvas
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        
        // Calculate positioning to center face
        const faceHeightPx = height * 1.3; // Include some head space
        const scale = (targetHeight * selectedCountry.faceHeightPercent / 100) / faceHeightPx;
        
        const offsetX = (targetWidth / 2) - ((x + width / 2) * scale);
        const offsetY = (targetHeight * 0.3) - (y * scale); // Position face in upper portion
        
        // Draw background
        const bgColor = document.getElementById('bgSelect').value;
        ctx.fillStyle = getBackgroundColor(bgColor);
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        
        // Draw and scale image
        ctx.drawImage(uploadedImage, offsetX, offsetY, 
                     uploadedImage.width * scale, uploadedImage.height * scale);
        
        // Apply enhancement if checked
        if (document.getElementById('enhanceCheck').checked) {
            enhanceImage();
        }
        
        // Show download button
        document.getElementById('downloadBtn').style.display = 'inline-block';
        
        alert('Photo processed successfully! \u2705');
    } catch (error) {
        console.error('Error processing photo:', error);
        alert('Error processing photo. Please try again.');
    }
}

// Get background color
function getBackgroundColor(color) {
    const colors = {
        white: '#FFFFFF',
        blue: '#B0C4DE',
        gray: '#E0E0E0',
        remove: 'transparent'
    };
    return colors[color] || '#FFFFFF';
}

// Enhance image (simple brightness/contrast adjustment)
function enhanceImage() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    const brightness = 10;
    const contrast = 10;
    
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    
    for (let i = 0; i < data.length; i += 4) {
        data[i] = factor * (data[i] - 128) + 128 + brightness;     // Red
        data[i + 1] = factor * (data[i + 1] - 128) + 128 + brightness; // Green
        data[i + 2] = factor * (data[i + 2] - 128) + 128 + brightness; // Blue
    }
    
    ctx.putImageData(imageData, 0, 0);
}

// Download processed photo
function downloadPhoto() {
    const format = document.getElementById('formatSelect').value;
    const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`;
    
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `passport_photo_${selectedCountry.name.replace(/\s+/g, '_')}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, mimeType);
}

// Reset all
function resetAll() {
    uploadedImage = null;
    selectedCountry = null;
    document.getElementById('photoInput').value = '';
    document.getElementById('countrySelect').value = '';
    document.getElementById('photoSpecs').innerHTML = '';
    document.getElementById('controlsSection').style.display = 'none';
    document.getElementById('downloadBtn').style.display = 'none';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

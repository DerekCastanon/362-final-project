// --- Profile Image Upload ---
const addPhotoButton = document.querySelector('.add-photo');
const fileInput = document.getElementById('profile-image-input');
const profileCircle = document.querySelector('.profile-circle');

// Only click "Add" button
addPhotoButton.addEventListener('click', (e) => {
  e.stopPropagation();
  fileInput.click();
});

// When a file is selected
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageUrl = e.target.result;
      setProfileImage(imageUrl);
      localStorage.setItem('profileImage', imageUrl);
    };
    reader.readAsDataURL(file);
  }
});

function setProfileImage(imageUrl) {
  profileCircle.style.backgroundImage = `url('${imageUrl}')`;
  profileCircle.style.backgroundSize = 'cover';
  profileCircle.style.backgroundPosition = 'center';
  
  const initialLetter = profileCircle.querySelector('span');
  if (initialLetter) {
    initialLetter.style.display = 'none';
  }
}

// --- Popup for Questions and About You ---
const popup = document.createElement('div');
popup.id = 'popup';
popup.style.display = 'none';
popup.innerHTML = `
  <div class="popup-content">
    <h2 id="popup-question"></h2>
    <input type="text" id="popup-input" placeholder="Type your answer..." />
    <div class="popup-buttons">
      <button id="popup-save">Save</button>
      <button id="popup-cancel">Cancel</button>
    </div>
  </div>
`;
document.body.appendChild(popup);

// Click Question
document.querySelectorAll('.question').forEach(question => {
  question.addEventListener('click', () => {
    const label = question.getAttribute('data-question');
    document.getElementById('popup-question').innerText = label;
    document.getElementById('popup-input').value = '';
    popup.style.display = 'flex';
    popup.dataset.target = label;
  });
});

// Click Add Intro
document.getElementById('add-intro').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('popup-question').innerText = "About You";
  document.getElementById('popup-input').value = '';
  popup.style.display = 'flex';
  popup.dataset.target = 'about';
});

// Save Popup
document.getElementById('popup-save').addEventListener('click', () => {
  const answer = document.getElementById('popup-input').value.trim();
  const target = popup.dataset.target;

  if (answer) {
    if (target === 'about') {
      document.getElementById('about-text').innerText = answer;
      localStorage.setItem('profileAbout', answer);
    } else {
      const questionElement = document.querySelector(`[data-question="${target}"]`);
      if (questionElement) {
        let answerSpan = questionElement.querySelector('.answer');
        if (!answerSpan) {
          answerSpan = document.createElement('div');
          answerSpan.className = 'answer';
          questionElement.appendChild(answerSpan);
        }
        answerSpan.innerText = answer;

        // ✅ Save each question answer
        localStorage.setItem(`profileAnswer-${target}`, answer);
      }
    }
  }
  popup.style.display = 'none';
});

// Cancel Popup
document.getElementById('popup-cancel').addEventListener('click', () => {
  popup.style.display = 'none';
});

// --- Toggle Destinations ---
const toggle = document.getElementById('visibility-toggle');
const destinations = document.querySelectorAll('.destination');

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    destinations.forEach(dest => dest.classList.add('highlighted'));
  } else {
    destinations.forEach(dest => dest.classList.remove('highlighted'));
  }
});

// --- Interests Popup ---
const interestsPopup = document.createElement('div');
interestsPopup.id = 'interests-popup';
interestsPopup.style.display = 'none';
interestsPopup.innerHTML = `
  <div class="popup-content interests-content">
    <h2>What are you into?</h2>
    <p>Pick some interests you enjoy that you want to show on your profile.</p>

    <div class="interests-grid">
      <div class="interest-option">Food</div>
      <div class="interest-option">Outdoors</div>
      <div class="interest-option">Live music</div>
      <div class="interest-option">Shopping</div>
      <div class="interest-option">Animals</div>
      <div class="interest-option">Photography</div>
      <div class="interest-option">Movies</div>
      <div class="interest-option">Cooking</div>
      <div class="interest-option">Museums</div>
      <div class="interest-option">Reading</div>
      <div class="interest-option">Live sports</div>
      <div class="interest-option">Wine</div>
      <div class="interest-option">History</div>
      <div class="interest-option">Architecture</div>
      <div class="interest-option">Water sports</div>
      <div class="interest-option">Theater</div>
    </div>

    <p id="selected-count">0/20 selected</p>

    <div class="popup-buttons">
      <button id="save-interests">Save</button>
      <button id="cancel-interests">Cancel</button>
    </div>
  </div>
`;
document.body.appendChild(interestsPopup);

// Open Interests Popup
function openInterestsPopup() {
  interestsPopup.style.display = 'flex';
}

document.getElementById('plus1').addEventListener('click', openInterestsPopup);
document.getElementById('plus2').addEventListener('click', openInterestsPopup);
document.getElementById('plus3').addEventListener('click', openInterestsPopup);
document.getElementById('add-interests-link').addEventListener('click', (e) => {
  e.preventDefault();
  openInterestsPopup();
});

// Select interests
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('interest-option')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

function updateSelectedCount() {
  const selected = document.querySelectorAll('.interest-option.selected').length;
  document.getElementById('selected-count').innerText = `${selected}/20 selected`;
}

// Cancel interests
document.getElementById('cancel-interests').addEventListener('click', () => {
  interestsPopup.style.display = 'none';
});

// Save Interests
document.getElementById('save-interests').addEventListener('click', () => {
  const selectedOptions = [...document.querySelectorAll('.interest-option.selected')].map(option => option.innerText);
  const selectedInterestsContainer = document.getElementById('selected-interests');

  // Save to localStorage
  localStorage.setItem('profileInterests', JSON.stringify(selectedOptions));

  // Update display
  selectedInterestsContainer.innerHTML = '';
  selectedOptions.forEach(option => {
    const div = document.createElement('div');
    div.className = 'interest-tag';
    div.innerText = option;
    selectedInterestsContainer.appendChild(div);
  });

  // Fill up to 3 with plus signs
  const remaining = 3 - selectedOptions.length;
  for (let i = 0; i < remaining; i++) {
    const plusDiv = document.createElement('div');
    plusDiv.className = 'interest';
    plusDiv.innerText = '+';
    plusDiv.addEventListener('click', openInterestsPopup);
    selectedInterestsContainer.appendChild(plusDiv);
  }

  interestsPopup.style.display = 'none';
});

// --- Load Saved Data on Page Load ---
window.addEventListener('DOMContentLoaded', () => {
  // Load profile image
  const savedImage = localStorage.getItem('profileImage');
  if (savedImage) {
    setProfileImage(savedImage);
  }

  // Load About You
  const savedAbout = localStorage.getItem('profileAbout');
  if (savedAbout) {
    document.getElementById('about-text').innerText = savedAbout;
  }

  // Load all profile answers
  document.querySelectorAll('.question').forEach(question => {
    const label = question.getAttribute('data-question');
    const savedAnswer = localStorage.getItem(`profileAnswer-${label}`);
    if (savedAnswer) {
      let answerSpan = question.querySelector('.answer');
      if (!answerSpan) {
        answerSpan = document.createElement('div');
        answerSpan.className = 'answer';
        question.appendChild(answerSpan);
      }
      answerSpan.innerText = savedAnswer;
    }
  });

  // Load interests
  const savedInterests = JSON.parse(localStorage.getItem('profileInterests') || '[]');
  if (savedInterests.length > 0) {
    const selectedInterestsContainer = document.getElementById('selected-interests');
    selectedInterestsContainer.innerHTML = '';

    savedInterests.forEach(option => {
      const div = document.createElement('div');
      div.className = 'interest-tag';
      div.innerText = option;
      selectedInterestsContainer.appendChild(div);
    });

    const remaining = 3 - savedInterests.length;
    for (let i = 0; i < remaining; i++) {
      const plusDiv = document.createElement('div');
      plusDiv.className = 'interest';
      plusDiv.innerText = '+';
      plusDiv.addEventListener('click', openInterestsPopup);
      selectedInterestsContainer.appendChild(plusDiv);
    }
  }
});
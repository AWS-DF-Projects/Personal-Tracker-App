// Function to update personal info box
function updatePersonalInfo(data) {
  const profileData = data.find((item) => item.SK === 'PROFILE');
  if (profileData) {
    // Helper function to safely update element
    const safeUpdate = (id, value) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = value;
      }
    };

    // Update all personal info elements
    safeUpdate('user-name', profileData.name);
    safeUpdate('user-age', profileData.age);
    safeUpdate('weight-day-info', profileData.weight_day);
    safeUpdate('start-weight', profileData.start_weight);
    safeUpdate('current-weight', profileData.current_weight);
    safeUpdate('last-week-weight', profileData.last_week_weight);
    safeUpdate('total-lost-x', profileData.total_lost);
  }
}

// Function to update goals box
function updateGoals(data) {
  console.log('🐛 updateGoals function called');
  const goalsData = data.find((item) => item.SK === 'GOALS');
  console.log('🐛 Goals data found:', goalsData);
  if (goalsData) {
    const goalsList = document.querySelector('.box ol');
    console.log('🐛 Goals list element found:', goalsList);
    if (goalsList) {
      goalsList.innerHTML = ''; // Clear existing list items

      // ✅ Loop from 1 to 5 in order
      for (let i = 1; i <= 5; i++) {
        const key = `goal_${i}`;
        const goalDescription = goalsData[key];
        if (goalDescription) {
          const li = document.createElement('li');
          li.textContent = goalDescription;
          goalsList.appendChild(li);
        }
      }
    } else {
      console.error('❌ Goals list element not found!');
    }
  } else {
    console.error('❌ GOALS data not found in mock data!');
  }
}


// Function to update goal stats box
function updateGoalStats(data) {
  const progressData = data.find((item) => item.SK === 'PROGRESS');
  const profileData = data.find((item) => item.SK === 'PROFILE');

  if (progressData && profileData) {
    // Update This Week goals
    const goalElements = document.querySelectorAll('.goal-percent');
    for (let i = 1; i <= 5; i++) {
      const goalKey = `goal_${i}`;
      if (progressData[goalKey] && goalElements[i - 1]) {
        goalElements[i - 1].textContent = progressData[goalKey].percent;
      }
    }

    // Update overall stats
    // Helper function to safely update element
    const safeUpdate = (id, value) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = value;
      }
    };

    // Update the new elements in the two-row structure
    safeUpdate('overall-score', '69'); // Overall score is not in mock data, keeping hardcoded for now
    safeUpdate('seven-day-score', progressData.last_5_percent);
    safeUpdate('total-loss-stats', profileData.total_lost);
    safeUpdate('seven-day-loss', profileData['7_day_loss']);
  }
}

// Function to update goal descriptions in Goal Stats and Goal Input sections
function updateGoalDescriptions(goalsData) {
  if (goalsData) {
    // Helper function to safely update element
    const safeUpdate = (id, value) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = value;
      }
    };

    for (let i = 1; i <= 5; i++) {
      const goalKey = `goal_${i}`;
      const goalDescription = goalsData[goalKey];

      if (goalDescription) {
        // Update in Goal Stats - Last Week
        safeUpdate(`goal-desc-last-week-${i}`, goalDescription);
        // Update in Goal Stats - This Week
        safeUpdate(`goal-desc-this-week-${i}`, goalDescription);
        // Update in Goal Input section
        safeUpdate(`goal-input-desc-${i}`, goalDescription);
      }
    }
  }
}

// Main function to update all data
function updateAllData() {
  fetch('mock/progress-data.json')
    .then((res) => res.json())
    .then((data) => {
      console.log('📦 Mock JSON loaded:', data);

      const parsed = JSON.parse(data.body);
      console.log('📦 Parsed body array:', parsed);

      console.log(Array.isArray(parsed)); // should be true

      parsed.forEach((item, index) => {
        console.log(`Item ${index} SK:`, item.SK);
      });
      

      const personalInfoData = parsed.find((item) => item.SK === 'PROFILE');
      const goalsData        = parsed.find((item) => item.SK === 'GOALS');
      const progressData     = parsed.find((item) => item.SK === 'PROGRESS');

      if (personalInfoData) updatePersonalInfo([personalInfoData]);
      if (goalsData) updateGoals([goalsData]);
      if (progressData) updateGoalStats([progressData, personalInfoData]);

      // Call the new function to update goal descriptions
      updateGoalDescriptions(goalsData);
    })
    .catch((err) => {
      console.error('❌ API Call Failed:', err);
    });
}

// Initialize data when page loads
document.addEventListener('DOMContentLoaded', updateAllData);

// Add your safeUpdate helper function here if not already present
function safeUpdate(elementId, textContent) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = textContent;
  } else {
    console.warn(`Element with ID "${elementId}" not found.`);
  }
}

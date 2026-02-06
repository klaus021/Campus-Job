// Authentication handling
function showTab(tabName) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    
    if (tabName === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        tabs[1].classList.add('active');
    }
}

// Handle login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate authentication
    const user = {
        email: email,
        name: email.split('@')[0],
        role: 'student' // Default for demo
    };
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'dashboard.html';
});

// Handle registration
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;
    
    if (!role) {
        alert('Please select a role');
        return;
    }
    
    // Simulate user creation
    const user = {
        email: email,
        name: name,
        role: role
    };
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect based on role
    window.location.href = 'dashboard.html';
});

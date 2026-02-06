// Initialize applications page
let allApplications = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    const user = checkAuth();
    if (user) {
        loadUserInfo();
        loadApplications();
    }
});

function loadUserInfo() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userRole').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    document.getElementById('userAvatar').textContent = initials;
}

function loadApplications() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    
    allApplications = applications.filter(app => app.studentEmail === user.email);
    displayApplications();
}

function filterApplications(status) {
    currentFilter = status;
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(status + 'Tab').classList.add('active');
    
    displayApplications();
}

function displayApplications() {
    const filteredApps = currentFilter === 'all' ? 
        allApplications : 
        allApplications.filter(app => app.status === currentFilter);
    
    const appsList = document.getElementById('applicationsList');
    
    if (filteredApps.length === 0) {
        appsList.innerHTML = `
            <div class="card" style="text-align: center; padding: 60px 20px;">
                <svg width="64" height="64" fill="none" stroke="var(--gray-300)" viewBox="0 0 24 24" style="margin: 0 auto 16px;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3 style="color: var(--gray-600); margin-bottom: 8px;">No applications found</h3>
                <p style="color: var(--gray-500); margin-bottom: 20px;">Start applying to jobs to see them here</p>
                <a href="browse.html" class="btn btn-primary">Browse Jobs</a>
            </div>
        `;
        return;
    }
    
    const appsHTML = filteredApps.map(app => createApplicationCard(app)).join('');
    appsList.innerHTML = appsHTML;
}

function createApplicationCard(app) {
    const statusClass = app.status === 'pending' ? 'status-pending' :
                       app.status === 'accepted' ? 'status-accepted' : 'status-rejected';
    
    const appliedDate = new Date(app.appliedDate).toLocaleDateString();
    
    return `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
                <div>
                    <h3 style="font-size: 20px; margin-bottom: 4px;">${app.jobTitle}</h3>
                    <p style="color: var(--gray-600);">${app.company}</p>
                </div>
                <span class="status-badge ${statusClass}">${app.status}</span>
            </div>
            
            <div style="background: var(--gray-50); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <p style="font-weight: 600; margin-bottom: 8px; font-size: 14px;">Cover Message:</p>
                <p style="color: var(--gray-700); line-height: 1.6; font-size: 14px;">${app.coverMessage}</p>
            </div>
            
            <div style="display: flex; gap: 24px; flex-wrap: wrap; font-size: 14px; color: var(--gray-600);">
                <div>
                    <span style="font-weight: 600;">Applied:</span> ${appliedDate}
                </div>
                <div>
                    <span style="font-weight: 600;">Resume:</span> ${app.resumeFileName}
                </div>
            </div>
            
            ${app.status === 'pending' ? `
                <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--gray-200);">
                    <button class="btn btn-secondary btn-sm" onclick="withdrawApplication(${app.id})">Withdraw Application</button>
                </div>
            ` : ''}
            
            ${app.status === 'accepted' ? `
                <div style="margin-top: 16px; padding: 12px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; color: var(--success);">
                    <strong>🎉 Congratulations!</strong> Your application has been accepted. The employer will contact you soon.
                </div>
            ` : ''}
            
            ${app.status === 'rejected' ? `
                <div style="margin-top: 16px; padding: 12px; background: rgba(239, 68, 68, 0.1); border-radius: 8px; color: var(--danger);">
                    Unfortunately, your application was not selected this time. Keep applying to other opportunities!
                </div>
            ` : ''}
        </div>
    `;
}

function withdrawApplication(appId) {
    if (!confirm('Are you sure you want to withdraw this application?')) {
        return;
    }
    
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    const updatedApps = applications.filter(app => app.id !== appId);
    localStorage.setItem('applications', JSON.stringify(updatedApps));
    
    loadApplications();
}

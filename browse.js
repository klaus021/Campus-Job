// Initialize browse page
let allJobs = [];
let filteredJobs = [];
let selectedJob = null;

document.addEventListener('DOMContentLoaded', function() {
    const user = checkAuth();
    if (user) {
        loadUserInfo();
        loadJobs();
    }
});

function loadUserInfo() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userRole').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    document.getElementById('userAvatar').textContent = initials;
    
    if (user.role === 'employer' || user.role === 'admin') {
        document.getElementById('postJobNav').style.display = 'block';
    }
}

function loadJobs() {
    allJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    filteredJobs = [...allJobs];
    displayJobs();
    updateResultsCount();
}

function displayJobs() {
    const jobsGrid = document.getElementById('jobsGrid');
    
    if (filteredJobs.length === 0) {
        jobsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <svg width="64" height="64" fill="none" stroke="var(--gray-300)" viewBox="0 0 24 24" style="margin: 0 auto 16px;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <h3 style="color: var(--gray-600); margin-bottom: 8px;">No jobs found</h3>
                <p style="color: var(--gray-500);">Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    const jobsHTML = filteredJobs.map(job => createJobCard(job)).join('');
    jobsGrid.innerHTML = jobsHTML;
}

function createJobCard(job) {
    const badgeClass = job.category === 'job' ? 'badge-job' : 
                       job.category === 'internship' ? 'badge-internship' : 'badge-gig';
    
    // Check if user already applied
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const hasApplied = applications.some(app => 
        app.jobId === job.id && app.studentEmail === user.email
    );
    
    const buttonHTML = hasApplied ? 
        '<button class="btn btn-secondary btn-sm" disabled>Already Applied</button>' :
        `<button class="btn btn-primary btn-sm" onclick="openApplyModal(${job.id})">Apply Now</button>`;
    
    return `
        <div class="job-card" id="job-${job.id}">
            <div class="job-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <p class="job-company">${job.company}</p>
                </div>
                <span class="job-badge ${badgeClass}">${job.category}</span>
            </div>
            
            <div class="job-meta">
                <span class="meta-item">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    ${job.salary}
                </span>
                <span class="meta-item">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    ${job.duration}
                </span>
                <span class="meta-item">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    ${job.location}
                </span>
            </div>
            
            <p class="job-description">${job.description}</p>
            
            <div class="job-skills">
                ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            
            <div class="job-footer">
                <div>
                    <span class="job-date">Posted ${formatDate(job.postedDate)}</span>
                    <br>
                    <span class="job-date" style="color: var(--danger);">Deadline: ${new Date(job.deadline).toLocaleDateString()}</span>
                </div>
                ${buttonHTML}
            </div>
        </div>
    `;
}

function filterJobs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    
    filteredJobs = allJobs.filter(job => {
        const matchesSearch = !searchTerm || 
            job.title.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchTerm));
        
        const matchesCategory = !categoryFilter || job.category === categoryFilter;
        const matchesLocation = !locationFilter || job.location === locationFilter;
        
        return matchesSearch && matchesCategory && matchesLocation;
    });
    
    displayJobs();
    updateResultsCount();
}

function updateResultsCount() {
    const count = filteredJobs.length;
    const total = allJobs.length;
    const text = count === total ? 
        `Showing all ${total} opportunities` :
        `Showing ${count} of ${total} opportunities`;
    
    document.getElementById('resultsCount').textContent = text;
}

function openApplyModal(jobId) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (user.role !== 'student') {
        alert('Only students can apply to jobs');
        return;
    }
    
    selectedJob = allJobs.find(job => job.id === jobId);
    if (!selectedJob) return;
    
    // Populate job details in modal
    document.getElementById('jobDetails').innerHTML = `
        <h3 style="margin-bottom: 8px;">${selectedJob.title}</h3>
        <p style="color: var(--gray-600); margin-bottom: 8px;">${selectedJob.company}</p>
        <p style="font-size: 14px; color: var(--gray-700);">${selectedJob.description}</p>
    `;
    
    document.getElementById('applyModal').classList.add('active');
}

function closeApplyModal() {
    document.getElementById('applyModal').classList.remove('active');
    document.getElementById('applyForm').reset();
    selectedJob = null;
}

// Close modal on outside click
document.getElementById('applyModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeApplyModal();
    }
});

// Handle application submission
document.getElementById('applyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const coverMessage = document.getElementById('coverMessage').value;
    const resumeFile = document.getElementById('resumeFile').files[0];
    
    if (!resumeFile) {
        alert('Please upload your resume');
        return;
    }
    
    // Create application object
    const application = {
        id: Date.now(),
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        company: selectedJob.company,
        studentName: user.name,
        studentEmail: user.email,
        coverMessage: coverMessage,
        resumeFileName: resumeFile.name,
        status: 'pending',
        appliedDate: new Date().toISOString(),
        employer: selectedJob.employer
    };
    
    // Save application
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    applications.push(application);
    localStorage.setItem('applications', JSON.stringify(applications));
    
    // Show success message
    alert('Application submitted successfully! You can track your application status in "My Applications".');
    
    closeApplyModal();
    loadJobs(); // Refresh to update "Already Applied" status
});

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
}

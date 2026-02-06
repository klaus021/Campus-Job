// Check authentication
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }
    return user;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Initialize dashboard
const currentUser = checkAuth();
if (currentUser) {
    // Update user info in UI
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userEmail').textContent = currentUser.email;
    document.getElementById('userRole').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
    
    // Set avatar initials
    const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
    document.getElementById('userAvatar').textContent = initials;
    
    // Show/hide nav items based on role
    if (currentUser.role === 'employer' || currentUser.role === 'admin') {
        document.getElementById('postJobNav').style.display = 'block';
        document.getElementById('myPostingsNav').style.display = 'block';
    }
    
    // Load stats
    loadStats();
    
    // Load recent jobs
    loadRecentJobs();
}

// Sample data
const sampleJobs = [
    {
        id: 1,
        title: 'Frontend Developer Intern',
        company: 'Tech Club',
        category: 'internship',
        description: 'Looking for a frontend developer to help build our new club website using React and Tailwind CSS.',
        salary: '$15/hour',
        duration: '3 months',
        location: 'Remote',
        skills: ['React', 'JavaScript', 'CSS'],
        postedDate: '2024-02-05',
        deadline: '2024-02-20',
        employer: 'Tech Club'
    },
    {
        id: 2,
        title: 'Research Assistant',
        company: 'Computer Science Dept',
        category: 'job',
        description: 'Assist with machine learning research project. Must have experience with Python and PyTorch.',
        salary: '$20/hour',
        duration: '6 months',
        location: 'On Campus',
        skills: ['Python', 'Machine Learning', 'PyTorch'],
        postedDate: '2024-02-04',
        deadline: '2024-02-15',
        employer: 'CS Department'
    },
    {
        id: 3,
        title: 'Event Photographer',
        company: 'Student Union',
        category: 'gig',
        description: 'Need a photographer for upcoming spring festival. 2-day event with photo editing required.',
        salary: '$300 total',
        duration: '2 days',
        location: 'Campus Center',
        skills: ['Photography', 'Photoshop', 'Event Coverage'],
        postedDate: '2024-02-03',
        deadline: '2024-02-10',
        employer: 'Student Union'
    },
    {
        id: 4,
        title: 'Content Writer',
        company: 'Marketing Club',
        category: 'gig',
        description: 'Write blog posts and social media content for our club activities. 5 posts per week.',
        salary: '$100/week',
        duration: '1 month',
        location: 'Remote',
        skills: ['Writing', 'Social Media', 'Content Creation'],
        postedDate: '2024-02-06',
        deadline: '2024-02-25',
        employer: 'Marketing Club'
    }
];

// Store jobs in localStorage if not exists
if (!localStorage.getItem('jobs')) {
    localStorage.setItem('jobs', JSON.stringify(sampleJobs));
}

// Load stats based on user role
function loadStats() {
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    
    let statsHTML = '';
    
    if (currentUser.role === 'student') {
        const myApplications = applications.filter(app => app.studentEmail === currentUser.email);
        const pending = myApplications.filter(app => app.status === 'pending').length;
        const accepted = myApplications.filter(app => app.status === 'accepted').length;
        
        statsHTML = `
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Available Jobs</span>
                    <div class="stat-icon">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">${jobs.length}</div>
                <div class="stat-change">↑ 5 new this week</div>
            </div>
            
            <div class="stat-card success">
                <div class="stat-header">
                    <span class="stat-title">My Applications</span>
                    <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1);">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">${myApplications.length}</div>
                <div class="stat-change">${pending} pending</div>
            </div>
            
            <div class="stat-card warning">
                <div class="stat-header">
                    <span class="stat-title">Accepted</span>
                    <div class="stat-icon" style="background: rgba(245, 158, 11, 0.1);">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">${accepted}</div>
                <div class="stat-change">Great job!</div>
            </div>
            
            <div class="stat-card secondary">
                <div class="stat-header">
                    <span class="stat-title">Messages</span>
                    <div class="stat-icon" style="background: rgba(14, 165, 233, 0.1);">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">12</div>
                <div class="stat-change">3 unread</div>
            </div>
        `;
    } else if (currentUser.role === 'employer') {
        const myPostings = jobs.filter(job => job.employer === currentUser.name);
        const allApplications = applications.filter(app => 
            myPostings.some(job => job.id === app.jobId)
        );
        
        statsHTML = `
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Active Postings</span>
                    <div class="stat-icon">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">${myPostings.length}</div>
                <div class="stat-change">Your job listings</div>
            </div>
            
            <div class="stat-card success">
                <div class="stat-header">
                    <span class="stat-title">Total Applications</span>
                    <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1);">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">${allApplications.length}</div>
                <div class="stat-change">From students</div>
            </div>
            
            <div class="stat-card warning">
                <div class="stat-header">
                    <span class="stat-title">Pending Review</span>
                    <div class="stat-icon" style="background: rgba(245, 158, 11, 0.1);">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">${allApplications.filter(a => a.status === 'pending').length}</div>
                <div class="stat-change">Needs action</div>
            </div>
            
            <div class="stat-card secondary">
                <div class="stat-header">
                    <span class="stat-title">Messages</span>
                    <div class="stat-icon" style="background: rgba(14, 165, 233, 0.1);">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">8</div>
                <div class="stat-change">2 unread</div>
            </div>
        `;
    } else {
        // Admin stats
        statsHTML = `
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Total Jobs</span>
                    <div class="stat-icon">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">${jobs.length}</div>
                <div class="stat-change">Platform-wide</div>
            </div>
            
            <div class="stat-card success">
                <div class="stat-header">
                    <span class="stat-title">Total Applications</span>
                    <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1);">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">${applications.length}</div>
                <div class="stat-change">All time</div>
            </div>
            
            <div class="stat-card warning">
                <div class="stat-header">
                    <span class="stat-title">Active Users</span>
                    <div class="stat-icon" style="background: rgba(245, 158, 11, 0.1);">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">245</div>
                <div class="stat-change">↑ 12% this month</div>
            </div>
            
            <div class="stat-card secondary">
                <div class="stat-header">
                    <span class="stat-title">Engagement Rate</span>
                    <div class="stat-icon" style="background: rgba(14, 165, 233, 0.1);">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">78%</div>
                <div class="stat-change">Excellent!</div>
            </div>
        `;
    }
    
    document.getElementById('statsGrid').innerHTML = statsHTML;
}

// Load recent jobs
function loadRecentJobs() {
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const recentJobs = jobs.slice(0, 3);
    
    const jobsHTML = recentJobs.map(job => createJobCard(job)).join('');
    document.getElementById('recentJobs').innerHTML = jobsHTML || '<p style="text-align: center; color: var(--gray-500); padding: 40px;">No jobs available yet.</p>';
}

// Create job card HTML
function createJobCard(job) {
    const badgeClass = job.category === 'job' ? 'badge-job' : 
                       job.category === 'internship' ? 'badge-internship' : 'badge-gig';
    
    return `
        <div class="job-card">
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
                <span class="job-date">Posted ${formatDate(job.postedDate)}</span>
                <button class="btn btn-primary btn-sm" onclick="applyJob(${job.id})">Apply Now</button>
            </div>
        </div>
    `;
}

// Format date
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

// Apply to job
function applyJob(jobId) {
    if (currentUser.role !== 'student') {
        alert('Only students can apply to jobs');
        return;
    }
    
    localStorage.setItem('applyingToJob', jobId);
    window.location.href = 'browse.html#job-' + jobId;
}

# University Job Portal - Frontend MVP

A responsive web application for university job postings, built with vanilla HTML, CSS, and JavaScript.

## Features

### Core Features Implemented

1. **Authentication & User Management**
   - Login and Registration
   - Role-based access (Student, Employer, Admin)
   - Session management using localStorage
   - User profiles

2. **Dashboard**
   - Role-specific statistics
   - Recent job listings
   - Quick access navigation

3. **Browse & Apply**
   - Job listings with filters (category, location)
   - Search functionality
   - Detailed job cards with skills and metadata
   - Application modal with cover message and resume upload
   - Application status tracking

4. **My Applications**
   - View all submitted applications
   - Filter by status (pending, accepted, rejected)
   - Withdraw applications
   - Status badges

5. **Messaging System**
   - Conversation list
   - Real-time-like chat interface
   - Auto-responses (simulated)
   - Unread message indicators

6. **Profile Management**
   - Edit personal information
   - Add bio, major, graduation year
   - Skills and portfolio links

## File Structure

```
├── index.html              # Login/Registration page
├── dashboard.html          # Main dashboard
├── browse.html            # Browse jobs page
├── applications.html      # My applications page
├── messages.html          # Messaging interface
├── profile.html           # User profile page
├── styles.css             # Global styles
├── auth.js               # Authentication logic
├── dashboard.js          # Dashboard & shared functions
├── browse.js             # Job browsing & application
├── applications.js       # Application management
├── messages.js           # Messaging functionality
└── README.md             # This file
```

## Getting Started

### Installation

No installation required! Simply open `index.html` in a modern web browser.

### Usage

1. **First Time Users**
   - Open `index.html` in your browser
   - Click "Register" tab
   - Create an account with:
     - Full Name
     - Email
     - Password
     - Role (Student/Employer/Admin)

2. **Login**
   - Use your registered email and password
   - Click "Login"

3. **Demo Credentials**
   You can register with any email/password. The system uses localStorage for data persistence.

## Features by Role

### Student
- Browse all job postings
- Apply to jobs with cover message and resume
- Track application status
- Message with employers
- Manage profile

### Employer
- View all postings
- See application statistics
- (Post Job feature ready for implementation)
- Message with students

### Admin
- View platform-wide statistics
- Monitor all activities
- (Admin controls ready for implementation)

## Data Storage

The application uses browser localStorage for data persistence:

- `currentUser`: Current logged-in user
- `jobs`: All job postings
- `applications`: Student applications
- `conversations`: Message threads
- `userProfile`: Extended profile information

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #2563eb;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    /* ... more colors */
}
```

### Sample Data
Sample jobs are automatically created on first load. Edit `sampleJobs` array in `dashboard.js` to customize.

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

Requires a modern browser with ES6 support.

## Mobile Responsive

The interface is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## Known Limitations

1. **Data Persistence**: Uses localStorage only - data is browser-specific
2. **File Uploads**: Resume upload is simulated (only filename is stored)
3. **Real-time**: Messages use simulated auto-responses
4. **Authentication**: No backend - sessions are browser-local

## Future Enhancements

### Ready to Add:
- Post Job functionality for employers
- Job editing and deletion
- Application review for employers
- Rating & review system
- Notifications panel
- Advanced search filters
- Profile pictures
- Email notifications
- Export applications to PDF

### Backend Integration:
To connect with a real backend:
1. Replace localStorage calls with API endpoints
2. Add proper authentication tokens
3. Implement real file upload
4. Add WebSocket for real-time messaging

## Development Notes

### Adding a New Page

1. Create HTML file following the existing structure
2. Include sidebar and topbar
3. Add navigation link in sidebar
4. Create corresponding JS file
5. Link both files

### Adding New Features

1. Update data models in respective JS files
2. Add UI components in HTML
3. Implement logic in JS
4. Update localStorage structure if needed

## License

This is a demo/MVP project. Free to use and modify.

## Credits

Built with:
- Vanilla JavaScript
- CSS3 (Flexbox & Grid)
- SVG icons (inline)
- No external dependencies

---

**Note**: This is a frontend-only MVP. For production use, integrate with a proper backend API, implement security measures, and use a database for data persistence.

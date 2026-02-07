-- SQL dump for ugv_marketplace database
-- Run: mysql -u root -p < ugv_marketplace.sql

CREATE DATABASE IF NOT EXISTS `ugv_marketplace` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ugv_marketplace`;

-- Users table
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(512) DEFAULT '',
  `department` VARCHAR(100),
  `bio` TEXT,
  `skills` LONGTEXT,
  `university` VARCHAR(255),
  `rating` DECIMAL(3,2) DEFAULT 0.00,
  `reviewCount` INT DEFAULT 0,
  `joinedDate` DATE,
  `balance` INT DEFAULT 0,
  `completedJobs` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`name`,`email`,`password`,`department`,`bio`,`skills`,`university`,`rating`,`reviewCount`,`joinedDate`,`balance`,`completedJobs`) VALUES
('Rahim Ahmed', 'rahim@ugv.edu', '123456', 'CSE', 'Full-stack developer specializing in React & Node.js. 3rd year CSE student passionate about building web applications.', 'React,Node.js,Python,MongoDB,TypeScript', 'University of Green Valley', 4.8, 24, '2024-01-15', 15000, 24),
('Fatima Khan', 'fatima@ugv.edu', '123456', 'EEE', 'EEE student with expertise in circuit design, PCB layout, and embedded systems programming.', 'Circuit Design,MATLAB,Arduino,PCB Design,Embedded C', 'University of Green Valley', 4.9, 18, '2024-02-20', 22000, 18),
('Arif Hassan', 'arif@ugv.edu', '123456', 'Civil', 'Civil engineering student proficient in AutoCAD, structural analysis, and project estimation.', 'AutoCAD,ETABS,Revit,Structural Analysis,Estimation', 'University of Green Valley', 4.7, 12, '2024-03-10', 8500, 12),
('Nusrat Jahan', 'nusrat@ugv.edu', '123456', 'CSE', 'UI/UX designer and frontend developer. I create beautiful, user-friendly interfaces.', 'Figma,UI/UX,React,Tailwind CSS,Adobe XD', 'University of Green Valley', 4.9, 31, '2023-11-05', 28000, 31),
('Kamal Uddin', 'kamal@ugv.edu', '123456', 'Mechanical', 'Mechanical engineering student skilled in SolidWorks, 3D modeling, and thermodynamics.', 'SolidWorks,3D Modeling,ANSYS,AutoCAD,MATLAB', 'University of Green Valley', 4.6, 9, '2024-04-01', 5200, 9),
('Sara Begum', 'sara@ugv.edu', '123456', 'Cyber Security', 'Cybersecurity enthusiast with expertise in network security, penetration testing, and ethical hacking.', 'Penetration Testing,Network Security,Python,Kali Linux,OSINT', 'University of Green Valley', 4.8, 15, '2024-01-30', 12000, 15);

-- Gigs table
DROP TABLE IF EXISTS `gigs`;
CREATE TABLE `gigs` (
  `id` VARCHAR(50) PRIMARY KEY,
  `sellerId` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` LONGTEXT,
  `department` VARCHAR(100),
  `price` INT,
  `deliveryDays` INT,
  `tags` LONGTEXT,
  `rating` DECIMAL(3,2) DEFAULT 0.00,
  `reviewCount` INT DEFAULT 0,
  `orders` INT DEFAULT 0,
  `image` VARCHAR(512),
  `createdAt` DATE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`sellerId`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `gigs` VALUES
('g1', 1, 'I will build a full-stack web application using React & Node.js', 'I will develop a complete web application with React frontend and Node.js backend. Includes responsive design, database integration, authentication, and deployment. Perfect for course projects, personal websites, or startup MVPs.\n\nWhat you get:\n- Clean, modern UI with React\n- RESTful API with Node.js/Express\n- MongoDB database setup\n- User authentication\n- Deployment assistance\n- 3 rounds of revisions', 'CSE', 5000, 7, 'React,Node.js,Web Development,Full Stack', 4.8, 24, 30, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop', '2024-06-01', CURRENT_TIMESTAMP),
('g2', 2, 'I will design and simulate electronic circuits using MATLAB', 'Professional circuit design and simulation services. I can help with analog/digital circuits, control systems, and signal processing assignments.\n\nServices include:\n- Circuit schematic design\n- MATLAB/Simulink simulation\n- Detailed analysis report\n- Component selection guidance\n- Lab report preparation', 'EEE', 3000, 5, 'MATLAB,Circuit Design,Simulation,Electronics', 4.9, 18, 22, 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop', '2024-06-05', CURRENT_TIMESTAMP),
('g3', 3, 'I will create detailed AutoCAD drawings and structural designs', 'Professional AutoCAD drafting and structural design services for civil engineering projects. Floor plans, elevations, sections, and structural details.\n\nIncludes:\n- 2D AutoCAD drawings\n- Structural layout\n- Bill of quantities\n- Design calculations\n- Multiple revisions', 'Civil', 4000, 6, 'AutoCAD,Structural Design,Drafting,Civil Engineering', 4.7, 12, 15, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop', '2024-06-10', CURRENT_TIMESTAMP),
('g4', 4, 'I will design stunning UI/UX for your web and mobile apps', 'I create beautiful, intuitive user interfaces that users love. From wireframes to high-fidelity prototypes, I handle the complete design process.\n\nDeliverables:\n- User research & analysis\n- Wireframes\n- High-fidelity mockups in Figma\n- Interactive prototype\n- Design system/style guide\n- Developer handoff ready files', 'CSE', 3500, 5, 'UI/UX,Figma,Web Design,Mobile Design', 4.9, 31, 38, 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop', '2024-05-20', CURRENT_TIMESTAMP),
('g5', 5, 'I will create 3D models and engineering drawings in SolidWorks', 'Professional 3D modeling and engineering drawings using SolidWorks. Perfect for course projects, prototypes, and manufacturing drawings.\n\nServices:\n- 3D part modeling\n- Assembly design\n- Engineering drawings with GD&T\n- FEA analysis (basic)\n- Rendering and animation', 'Mechanical', 4500, 7, 'SolidWorks,3D Modeling,Engineering Drawing,CAD', 4.6, 9, 11, 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop', '2024-06-15', CURRENT_TIMESTAMP),
('g6', 6, 'I will perform security audits and penetration testing', 'Comprehensive security assessment for your web applications and networks. Identify vulnerabilities before they are exploited.\n\nIncludes:\n- Vulnerability assessment\n- Web application security testing\n- Network security audit\n- Detailed report with remediation steps\n- Follow-up consultation', 'Cyber Security', 6000, 10, 'Penetration Testing,Security Audit,Ethical Hacking,Network Security', 4.8, 15, 18, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop', '2024-06-08', CURRENT_TIMESTAMP),
('g7', 1, 'I will build a responsive portfolio website', 'Get a professional portfolio website to showcase your work. Built with modern technologies and optimized for all devices.\n\nFeatures:\n- Responsive design\n- Portfolio gallery\n- Contact form\n- SEO optimized\n- Fast loading\n- Free hosting setup', 'CSE', 2500, 4, 'Portfolio,Website,Responsive,HTML/CSS', 4.7, 16, 20, 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop', '2024-07-01', CURRENT_TIMESTAMP),
('g8', 4, 'I will create professional presentations and infographics', 'Eye-catching presentations and infographics for your academic projects, thesis defense, or any purpose.\n\nIncludes:\n- Custom designed slides\n- Data visualization\n- Infographic design\n- Icon and illustration\n- Print-ready files', 'Other', 1500, 3, 'Presentation,Infographic,Design,PowerPoint', 4.8, 22, 28, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop', '2024-07-05', CURRENT_TIMESTAMP);

-- Jobs table
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `id` VARCHAR(50) PRIMARY KEY,
  `clientId` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` LONGTEXT,
  `department` VARCHAR(100),
  `budget` INT,
  `deadline` DATE,
  `skills` LONGTEXT,
  `status` VARCHAR(50) DEFAULT 'open',
  `applicants` LONGTEXT,
  `assignedTo` INT,
  `createdAt` DATE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`clientId`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `jobs` VALUES
('j1', 4, 'Need a Backend Developer for E-commerce Project', 'Looking for an experienced backend developer to build REST APIs for an e-commerce platform. The project is part of our final year project and needs proper authentication, payment integration, and inventory management.\n\nRequirements:\n- Node.js/Express or Django experience\n- Database design skills\n- API documentation\n- Git version control', 'CSE', 8000, '2025-02-15', 'Node.js,MongoDB,REST API,Express', 'open', '', NULL, '2024-12-01', CURRENT_TIMESTAMP),
('j2', 3, 'MATLAB Simulation for Control Systems Assignment', 'Need help with MATLAB simulation for a control systems assignment. The task involves designing PID controllers and analyzing system stability.\n\nTopics:\n- Transfer function modeling\n- PID controller design\n- Bode plot analysis\n- Step response analysis\n- MATLAB code with comments', 'EEE', 2500, '2025-01-20', 'MATLAB,Control Systems,Simulink', 'open', '2', NULL, '2024-12-05', CURRENT_TIMESTAMP),
('j3', 1, 'AutoCAD Floor Plan for Architecture Course', 'Need a detailed floor plan drawn in AutoCAD for my architecture elective course. The building is a 3-story residential complex.\n\nDeliverables:\n- Ground, first, and second floor plans\n- Elevation views (front and side)\n- Section drawing\n- Dimension annotations', 'Civil', 3500, '2025-01-25', 'AutoCAD,Floor Planning,Architecture', 'open', '3', NULL, '2024-12-08', CURRENT_TIMESTAMP),
('j4', 5, 'Website Security Assessment for Course Project', 'Looking for someone to perform a security audit on a web application we built for our course project. Need a detailed vulnerability report.\n\nScope:\n- OWASP Top 10 assessment\n- SQL injection testing\n- XSS testing\n- Authentication bypass testing\n- Written report with findings', 'Cyber Security', 5000, '2025-02-01', 'Penetration Testing,OWASP,Security Testing', 'open', '', NULL, '2024-12-10', CURRENT_TIMESTAMP),
('j5', 2, 'SolidWorks Model for Robot Arm Design', 'Need a complete SolidWorks model of a 4-DOF robot arm for our robotics course. Including assembly and motion simulation.\n\nRequirements:\n- Individual part files\n- Complete assembly\n- Motion study/animation\n- Engineering drawings\n- BOM (Bill of Materials)', 'Mechanical', 6000, '2025-02-10', 'SolidWorks,3D Modeling,Assembly Design', 'open', '5', NULL, '2024-12-12', CURRENT_TIMESTAMP),
('j6', 6, 'Mobile App UI Design for Campus Navigation', 'Need UI/UX design for a campus navigation mobile app. Should include map integration, building directory, and event notifications.\n\nScreens needed:\n- Splash & onboarding\n- Home/Map view\n- Building details\n- Event listing\n- Profile & settings\n- Search functionality', 'CSE', 4000, '2025-01-30', 'Figma,UI/UX,Mobile Design', 'open', '4', NULL, '2024-12-15', CURRENT_TIMESTAMP);

-- Orders table
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` VARCHAR(50) PRIMARY KEY,
  `gigId` VARCHAR(50),
  `jobId` VARCHAR(50),
  `buyerId` INT,
  `sellerId` INT,
  `amount` INT,
  `status` VARCHAR(50),
  `createdAt` DATE,
  `deliveryDate` DATE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `orders` VALUES
('o1', 'g1', NULL, 4, 1, 5000, 'completed', '2024-11-01', '2024-11-08', CURRENT_TIMESTAMP),
('o2', 'g4', NULL, 1, 4, 3500, 'completed', '2024-11-05', '2024-11-10', CURRENT_TIMESTAMP),
('o3', 'g2', NULL, 3, 2, 3000, 'active', '2024-12-10', '2024-12-15', CURRENT_TIMESTAMP),
('o4', 'g6', NULL, 5, 6, 6000, 'delivered', '2024-12-08', '2024-12-18', CURRENT_TIMESTAMP);

-- Messages table
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` VARCHAR(50) PRIMARY KEY,
  `senderId` INT,
  `receiverId` INT,
  `content` LONGTEXT,
  `timestamp` DATETIME,
  `read` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `messages` VALUES
('m1', 4, 1, 'Hi Rahim! I saw your web development gig. Can you also include a blog section?', '2024-12-15 10:30:00', 1, CURRENT_TIMESTAMP),
('m2', 1, 4, 'Hi Nusrat! Yes, I can add a blog section with a CMS. It would be within the same price.', '2024-12-15 10:45:00', 1, CURRENT_TIMESTAMP),
('m3', 4, 1, 'That sounds great! I will place the order then. Thanks!', '2024-12-15 11:00:00', 0, CURRENT_TIMESTAMP),
('m4', 3, 2, 'Hi Fatima, how is the circuit simulation going?', '2024-12-16 09:00:00', 1, CURRENT_TIMESTAMP),
('m5', 2, 3, 'Almost done! I will share the results by tomorrow.', '2024-12-16 09:15:00', 0, CURRENT_TIMESTAMP);

-- Notifications table
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` VARCHAR(50) PRIMARY KEY,
  `userId` INT,
  `type` VARCHAR(50),
  `title` VARCHAR(255),
  `content` LONGTEXT,
  `read` TINYINT(1) DEFAULT 0,
  `timestamp` DATETIME,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `notifications` VALUES
('n1', 1, 'order', 'New Order Received', 'Nusrat Jahan ordered your "Full-stack web application" gig.', 0, '2024-12-15 11:05:00', CURRENT_TIMESTAMP),
('n2', 1, 'message', 'New Message', 'You have a new message from Nusrat Jahan.', 0, '2024-12-15 11:00:00', CURRENT_TIMESTAMP),
('n3', 2, 'application', 'Application Update', 'Your application for "MATLAB Simulation" has been viewed.', 1, '2024-12-07 14:00:00', CURRENT_TIMESTAMP),
('n4', 4, 'review', 'New Review', 'Rahim Ahmed left a 5-star review on your gig.', 1, '2024-11-12 16:30:00', CURRENT_TIMESTAMP);

-- Reviews table
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` VARCHAR(50) PRIMARY KEY,
  `orderId` VARCHAR(50),
  `reviewerId` INT,
  `revieweeId` INT,
  `gigId` VARCHAR(50),
  `rating` INT,
  `comment` LONGTEXT,
  `createdAt` DATE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `reviews` VALUES
('r1', 'o1', 4, 1, 'g1', 5, 'Excellent work! Rahim delivered a perfectly working web app. Very professional and responsive.', '2024-11-10', CURRENT_TIMESTAMP),
('r2', 'o2', 1, 4, 'g4', 5, 'Nusrat is incredibly talented. The UI design exceeded my expectations. Highly recommended!', '2024-11-12', CURRENT_TIMESTAMP),
('r3', 'o1', 1, 4, 'g4', 4, 'Great designs. Communication could be a bit faster, but overall very satisfied.', '2024-11-15', CURRENT_TIMESTAMP);

-- Transactions table
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `id` VARCHAR(50) PRIMARY KEY,
  `fromId` INT,
  `toId` INT,
  `amount` INT,
  `type` VARCHAR(50),
  `description` LONGTEXT,
  `status` VARCHAR(50),
  `createdAt` DATE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `transactions` VALUES
('t1', 4, 1, 5000, 'payment', 'Payment for Full-stack web application gig', 'completed', '2024-11-08', CURRENT_TIMESTAMP),
('t2', 1, 4, 3500, 'payment', 'Payment for UI/UX design gig', 'completed', '2024-11-10', CURRENT_TIMESTAMP),
('t3', 3, 2, 3000, 'payment', 'Payment for Circuit simulation gig', 'pending', '2024-12-10', CURRENT_TIMESTAMP),
('t4', 5, 6, 6000, 'payment', 'Payment for Security audit gig', 'pending', '2024-12-08', CURRENT_TIMESTAMP);

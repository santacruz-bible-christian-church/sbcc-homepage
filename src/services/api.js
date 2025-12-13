// Mock API Service for SBCC Homepage

// Mock Data
const announcementsData = [
    {
        id: 1,
        title: "Annual Community Picnic",
        date: "Oct 15, 2023",
        location: "City Park",
        description: "Join us for a day of fun, food, and fellowship at the city park. Everyone is welcome! We will have games for kids, a BBQ lunch, and a time of worship in the afternoon. Please bring a side dish to share.",
        thumbnail: "/assets/announcement-1.png",
        category: "Event"
    },
    {
        id: 2,
        title: "New Bible Study Series: Romans",
        date: "Nov 01, 2023",
        location: "Main Hall",
        description: "Dive deep into the book of Romans with our new 6-week study series starting this November. We will explore the themes of grace, faith, and righteousness. Study guides will be provided.",
        thumbnail: null,
        category: "Education"
    },
    {
        id: 3,
        title: "Christmas Charity Drive",
        date: "Dec 10, 2023",
        location: "Church Lobby",
        description: "Help us spread joy this season by donating non-perishable food and toys for local families. We are partnering with local shelters to ensure everyone has a warm meal and a gift this Christmas.",
        thumbnail: null,
        category: "Outreach"
    },
    {
        id: 4,
        title: "Youth Summer Camp Registration",
        date: "Jun 15, 2024",
        location: "Camp Cedar",
        description: "Registration is now open for our annual Youth Summer Camp! It's going to be an amazing week of adventure, worship, and growing closer to God. Early bird rates apply until May 1st.",
        thumbnail: "/assets/ministry-youth.png",
        category: "Youth"
    }
];

const ministriesData = [
    {
        id: "music",
        title: "Music Ministry",
        description: "Leading the congregation in worship through music and song.",
        schedule: "Rehearsals: Thursdays 7:00 PM",
        image: "/assets/ministry-worship.png",
        icon: "Music",
        color: "bg-blue-50 text-blue-600"
    },
    {
        id: "visitation",
        title: "Visitation Ministry",
        description: "Visiting the sick, elderly, and those in need of encouragement.",
        schedule: "Weekly",
        image: null,
        icon: "Heart",
        color: "bg-pink-50 text-pink-600"
    },
    {
        id: "multimedia",
        title: "Multimedia Ministry",
        description: "Managing audio, visual, and digital aspects of our services.",
        schedule: "Sundays 8:30 AM",
        image: "/assets/ministry-multimedia.png",
        icon: "Camera",
        color: "bg-purple-50 text-purple-600"
    },
    {
        id: "missions",
        title: "Missions Ministry",
        description: "Spreading the Gospel locally and globally through mission trips and support.",
        schedule: "Monthly",
        image: "/assets/ministry-outreach.png",
        icon: "Globe",
        color: "bg-green-50 text-green-600"
    },
    {
        id: "ushers",
        title: "Ushers",
        description: "Welcoming guests and assisting with seating and service flow.",
        schedule: "Sundays 9:30 AM",
        image: null,
        icon: "Users",
        color: "bg-orange-50 text-orange-600"
    },
    {
        id: "sunday-program",
        title: "Sunday Program Ministry",
        description: "Coordinating the order of service and special presentations.",
        schedule: "Weekly Planning",
        image: null,
        icon: "Calendar",
        color: "bg-yellow-50 text-yellow-600"
    },
    {
        id: "audio-sound",
        title: "Audio and Sound System Ministry",
        description: "Ensuring clear and high-quality sound for all services and events.",
        schedule: "Sundays 8:00 AM",
        image: null,
        icon: "Mic",
        color: "bg-indigo-50 text-indigo-600"
    },
    {
        id: "kitchen",
        title: "Kitchen Ministry",
        description: "Preparing and serving food for fellowship and special events.",
        schedule: "As Needed",
        image: null,
        icon: "Utensils",
        color: "bg-red-50 text-red-600"
    },
    {
        id: "cleaning",
        title: "Cleaning Ministry",
        description: "Maintaining the cleanliness and beauty of our church facilities.",
        schedule: "Saturdays 9:00 AM",
        image: null,
        icon: "Sparkles",
        color: "bg-cyan-50 text-cyan-600"
    },
    {
        id: "driving",
        title: "Driving Ministry",
        description: "Providing transportation for members and guests to attend services.",
        schedule: "Sundays 9:00 AM",
        image: null,
        icon: "Car",
        color: "bg-slate-50 text-slate-600"
    },
    {
        id: "prayer-warriors",
        title: "Prayer Warriors",
        description: "Interceding for the needs of the church and community.",
        schedule: "Wednesdays 6:00 PM",
        image: null,
        icon: "Hand",
        color: "bg-teal-50 text-teal-600"
    },
    {
        id: "sunday-school",
        title: "Sunday School Teacher",
        description: "Teaching biblical truths to children and youth.",
        schedule: "Sundays 10:00 AM",
        image: "/assets/ministry-kids.png",
        icon: "BookOpen",
        color: "bg-rose-50 text-rose-600"
    }
];

// API Service Object
export const api = {
    // Fetch Announcements
    getAnnouncements: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return [...announcementsData];
    },

    // Fetch Ministries
    getMinistries: async () => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return [...ministriesData];
    },

    // Submit Prayer Request
    submitPrayerRequest: async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Prayer Request Submitted:", data);

        // Simulate success
        return { success: true, message: "Prayer request received successfully." };
    },

    // Join Ministry Request
    joinMinistry: async (ministryId, contactInfo) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Join Request for ${ministryId}:`, contactInfo);
        return { success: true, message: "Interest registered. A leader will contact you soon." };
    }
};

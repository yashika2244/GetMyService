import dotenv from 'dotenv';
dotenv.config();
import dns from 'node:dns';
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import UserModels from './Models/UserModels.js';
import ServiceProviderModel from './Models/ServiceProviderModel.js';

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    const dbConnectionUrl = `${mongoUri}/serviceDatabase`;
    console.log(`Connecting to MongoDB at: ${dbConnectionUrl}`);
    await mongoose.connect(dbConnectionUrl);
    console.log("Connected to database successfully.\n");

    const db = mongoose.connection.db;

    // 1. Check existing counts
    const oldUsersCount = await UserModels.countDocuments();
    const oldProvidersCount = await ServiceProviderModel.countDocuments();

    console.log(`Found ${oldUsersCount} existing users.`);
    console.log(`Found ${oldProvidersCount} existing service providers.`);

    // 2. Delete existing users and service providers ONLY
    console.log("\nClearing old users and service providers...");
    const userDeleteResult = await UserModels.deleteMany({});
    const providerDeleteResult = await ServiceProviderModel.deleteMany({});

    console.log(`Deleted ${userDeleteResult.deletedCount} users.`);
    console.log(`Deleted ${providerDeleteResult.deletedCount} service providers.`);

    // 3. Prepare hashed password
    const userHashedPassword = await bcrypt.hash("User@123", 10);
    const providerHashedPassword = await bcrypt.hash("Provider@123", 10);

    // 4. Fresh realistic Indian Users
    const freshUsersData = [
      {
        name: "Amit Sharma",
        email: "amit.sharma@gmail.com",
        password: userHashedPassword,
        phone: 9810123456,
        age: 29,
        gender: "male",
        location: "Connaught Place, New Delhi",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Regular home owner looking for trusted local maintenance technicians."
      },
      {
        name: "Priya Singh",
        email: "priya.singh@gmail.com",
        password: userHashedPassword,
        phone: 9820234567,
        age: 27,
        gender: "female",
        location: "Koramangala, Bengaluru, Karnataka",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "IT professional frequently booking deep cleaning and appliance services."
      },
      {
        name: "Rahul Verma",
        email: "rahul.verma@gmail.com",
        password: userHashedPassword,
        phone: 9830345678,
        age: 32,
        gender: "male",
        location: "Andheri West, Mumbai, Maharashtra",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Relies on prompt electrical and plumbing services for apartment upkeep."
      },
      {
        name: "Neha Gupta",
        email: "neha.gupta@gmail.com",
        password: userHashedPassword,
        phone: 9840456789,
        age: 26,
        gender: "female",
        location: "Kothrud, Pune, Maharashtra",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Looking for top-rated salon and beautician services at home."
      },
      {
        name: "Arjun Kumar",
        email: "arjun.kumar@gmail.com",
        password: userHashedPassword,
        phone: 9850567890,
        age: 35,
        gender: "male",
        location: "Banjara Hills, Hyderabad, Telangana",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Prefers certified AC and appliance technicians with quick turnaround."
      },
      {
        name: "Pooja Yadav",
        email: "pooja.yadav@gmail.com",
        password: userHashedPassword,
        phone: 9860678901,
        age: 30,
        gender: "female",
        location: "DLF Phase 4, Gurugram, Haryana",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Home maker who values verified professionals and transparent pricing."
      },
      {
        name: "Rohit Mishra",
        email: "rohit.mishra@gmail.com",
        password: userHashedPassword,
        phone: 9870789012,
        age: 31,
        gender: "male",
        location: "Gomti Nagar, Lucknow, Uttar Pradesh",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Need reliable computer, laptop repair and home electrical assistance."
      },
      {
        name: "Anjali Singh",
        email: "anjali.singh@gmail.com",
        password: userHashedPassword,
        phone: 9880890123,
        age: 28,
        gender: "female",
        location: "Salt Lake, Kolkata, West Bengal",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Frequently orders pest control and home painting services."
      },
      {
        name: "Karan Mehta",
        email: "karan.mehta@gmail.com",
        password: userHashedPassword,
        phone: 9890901234,
        age: 34,
        gender: "male",
        location: "Satellite, Ahmedabad, Gujarat",
        photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Focuses on verified reviews and experienced carpenters & technicians."
      },
      {
        name: "Sneha Verma",
        email: "sneha.verma@gmail.com",
        password: userHashedPassword,
        phone: 9901012345,
        age: 25,
        gender: "female",
        location: "Vaishali Nagar, Jaipur, Rajasthan",
        photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Passionate about gardening and indoor terrace plant maintenance."
      },
      {
        name: "Vikram Malhotra",
        email: "vikram.malhotra@gmail.com",
        password: userHashedPassword,
        phone: 9912123456,
        age: 38,
        gender: "male",
        location: "Sector 35, Chandigarh, Punjab",
        photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Requires commercial packing & shifting and CCTV surveillance setup."
      },
      {
        name: "Kavita Iyer",
        email: "kavita.iyer@gmail.com",
        password: userHashedPassword,
        phone: 9923234567,
        age: 33,
        gender: "female",
        location: "T. Nagar, Chennai, Tamil Nadu",
        photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Always looks for punctuality and professional service quality."
      },
      {
        name: "Aditya Joshi",
        email: "aditya.joshi@gmail.com",
        password: userHashedPassword,
        phone: 9934345678,
        age: 30,
        gender: "male",
        location: "Vijay Nagar, Indore, Madhya Pradesh",
        photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Interested in smart home automation and water purifier service."
      },
      {
        name: "Ritu Patel",
        email: "ritu.patel@gmail.com",
        password: userHashedPassword,
        phone: 9945456789,
        age: 29,
        gender: "female",
        location: "Adajan, Surat, Gujarat",
        photo: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Seeking certified electricians for rewiring and inverter service."
      },
      {
        name: "Manish Tiwari",
        email: "manish.tiwari@gmail.com",
        password: userHashedPassword,
        phone: 9956567890,
        age: 36,
        gender: "male",
        location: "Sector 62, Noida, Uttar Pradesh",
        photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Regularly books home sanitization and sofa fabric shampooing."
      },
      {
        name: "Sunita Rao",
        email: "sunita.rao@gmail.com",
        password: userHashedPassword,
        phone: 9967678901,
        age: 31,
        gender: "female",
        location: "MVP Colony, Visakhapatnam, Andhra Pradesh",
        photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Prefers eco-friendly home cleaning and water tank disinfection."
      },
      {
        name: "Deepanshu Saxena",
        email: "deepanshu.saxena@gmail.com",
        password: userHashedPassword,
        phone: 9978789012,
        age: 28,
        gender: "male",
        location: "Arera Colony, Bhopal, Madhya Pradesh",
        photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Young professional who values quick digital booking and transparent estimates."
      },
      {
        name: "Meera Nambiar",
        email: "meera.nambiar@gmail.com",
        password: userHashedPassword,
        phone: 9989890123,
        age: 34,
        gender: "female",
        location: "Kakkanad, Kochi, Kerala",
        photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
        role: "customer",
        bio: "Passionate about quality home repairs, reliable plumbing, and green living."
      }
    ];

    console.log(`\nInserting ${freshUsersData.length} fresh users...`);
    const createdUsers = await UserModels.insertMany(freshUsersData);
    console.log(`Successfully created ${createdUsers.length} users.`);

    // 5. Fresh realistic Service Providers
    const freshProvidersData = [
      {
        name: "Rajesh Kumar",
        email: "rajesh.electrician@gmail.com",
        password: providerHashedPassword,
        phone: 9811223344,
        age: 34,
        gender: "male",
        location: "Indira Nagar, Lucknow, Uttar Pradesh",
        photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["Electrician", "Wiring & Rewiring", "Appliance Installation"],
        experience: [
          {
            startdate: "2017-02-01",
            enddate: "2024-01-31",
            role: "Master Electrician",
            locations: "Lucknow, Uttar Pradesh"
          }
        ],
        bio: "Certified Electrician with 7+ yrs experience",
        about: "Expert in domestic and commercial electrical wiring, short-circuit troubleshooting, fuse box upgrades, and high-efficiency LED setups. Dedicated to safety protocols and high quality workmanship.",
        timeSlots: [
          { day: "Monday", startTime: "09:00", endTime: "18:00" },
          { day: "Wednesday", startTime: "09:00", endTime: "18:00" },
          { day: "Friday", startTime: "09:00", endTime: "18:00" },
          { day: "Saturday", startTime: "10:00", endTime: "16:00" }
        ],
        reviews: [],
        averageRating: 4.9,
        totalRating: 28,
        isApproved: "approved",
        TicketPrice: 299,
        consultationFee: 199
      },
      {
        name: "Suresh Patel",
        email: "suresh.plumber@gmail.com",
        password: providerHashedPassword,
        phone: 9822334455,
        age: 37,
        gender: "male",
        location: "Navrangpura, Ahmedabad, Gujarat",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["Plumber", "Pipe Leak Repair", "Bathroom Fitting"],
        experience: [
          {
            startdate: "2015-05-10",
            enddate: "2024-03-15",
            role: "Senior Plumbing Specialist",
            locations: "Ahmedabad, Gujarat"
          }
        ],
        bio: "Master Plumber & Pipe Leakage Specialist",
        about: "Over 9 years of hands-on experience solving complex pipeline blockages, sanitary fixture installations, water pressure balancing, and emergency pipe repair with modern non-invasive diagnostic tools.",
        timeSlots: [
          { day: "Monday", startTime: "08:30", endTime: "18:00" },
          { day: "Tuesday", startTime: "08:30", endTime: "18:00" },
          { day: "Thursday", startTime: "08:30", endTime: "18:00" },
          { day: "Saturday", startTime: "09:00", endTime: "15:00" }
        ],
        reviews: [],
        averageRating: 4.8,
        totalRating: 34,
        isApproved: "approved",
        TicketPrice: 349,
        consultationFee: 249
      },
      {
        name: "Sunita Devi",
        email: "sunita.cleaning@gmail.com",
        password: providerHashedPassword,
        phone: 9833445566,
        age: 31,
        gender: "female",
        location: "Whitefield, Bengaluru, Karnataka",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["Home Cleaner", "Deep Cleaning", "Kitchen Sanitization"],
        experience: [
          {
            startdate: "2018-08-01",
            enddate: "2024-02-28",
            role: "Lead Sanitization Supervisor",
            locations: "Bengaluru, Karnataka"
          }
        ],
        bio: "Residential & Commercial Deep Cleaning Pro",
        about: "Specialized in hospital-grade deep sanitization, comprehensive kitchen degreasing, bathroom descaling, and move-in/move-out apartment cleaning using pet-safe, eco-friendly cleaning agents.",
        timeSlots: [
          { day: "Tuesday", startTime: "08:00", endTime: "17:00" },
          { day: "Wednesday", startTime: "08:00", endTime: "17:00" },
          { day: "Friday", startTime: "08:00", endTime: "17:00" },
          { day: "Sunday", startTime: "09:00", endTime: "14:00" }
        ],
        reviews: [],
        averageRating: 4.9,
        totalRating: 41,
        isApproved: "approved",
        TicketPrice: 499,
        consultationFee: 299
      },
      {
        name: "Manoj Sharma",
        email: "manoj.hvac@gmail.com",
        password: providerHashedPassword,
        phone: 9844556677,
        age: 35,
        gender: "male",
        location: "Dwarka, New Delhi",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["AC Technician", "AC Servicing", "Gas Refill", "HVAC Repair"],
        experience: [
          {
            startdate: "2016-03-01",
            enddate: "2024-02-15",
            role: "Senior HVAC Technician",
            locations: "New Delhi & NCR"
          }
        ],
        bio: "HVAC & AC Repair Specialist with 8 yrs exp",
        about: "Certified split and inverter AC engineer. Expertise in deep jet-pump cleaning, refrigerant leak detection, PCB chip repairs, compressor diagnostics, and high-efficiency seasonal maintenance.",
        timeSlots: [
          { day: "Monday", startTime: "09:00", endTime: "19:00" },
          { day: "Wednesday", startTime: "09:00", endTime: "19:00" },
          { day: "Thursday", startTime: "09:00", endTime: "19:00" },
          { day: "Saturday", startTime: "09:00", endTime: "18:00" }
        ],
        reviews: [],
        averageRating: 4.7,
        totalRating: 39,
        isApproved: "approved",
        TicketPrice: 449,
        consultationFee: 299
      },
      {
        name: "Ramesh Vishwakarma",
        email: "ramesh.carpenter@gmail.com",
        password: providerHashedPassword,
        phone: 9855667788,
        age: 41,
        gender: "male",
        location: "Bandra West, Mumbai, Maharashtra",
        photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["Carpenter", "Furniture Assembly", "Woodwork & Polish"],
        experience: [
          {
            startdate: "2012-06-01",
            enddate: "2024-01-10",
            role: "Master Craftsman & Carpenter",
            locations: "Mumbai, Maharashtra"
          }
        ],
        bio: "Custom Furniture & Expert Woodwork Specialist",
        about: "Generational woodcraft artisan experienced in custom modular kitchen fittings, precision door lock repairs, wardrobe hardware alignment, and premium PU/melamine furniture polishing.",
        timeSlots: [
          { day: "Monday", startTime: "09:00", endTime: "18:30" },
          { day: "Tuesday", startTime: "09:00", endTime: "18:30" },
          { day: "Friday", startTime: "09:00", endTime: "18:30" },
          { day: "Saturday", startTime: "09:00", endTime: "15:00" }
        ],
        reviews: [],
        averageRating: 4.8,
        totalRating: 25,
        isApproved: "approved",
        TicketPrice: 399,
        consultationFee: 249
      },
      {
        name: "Anil Chauhan",
        email: "anil.painter@gmail.com",
        password: providerHashedPassword,
        phone: 9866778899,
        age: 33,
        gender: "male",
        location: "Baner, Pune, Maharashtra",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["Painter", "Interior Wall Painting", "Waterproofing"],
        experience: [
          {
            startdate: "2017-09-01",
            enddate: "2024-02-20",
            role: "Lead Coating Specialist",
            locations: "Pune, Maharashtra"
          }
        ],
        bio: "Interior & Exterior Wall Painting Specialist",
        about: "Professional residential and office painting specialist. Expert in wall putty application, texture wall design, damp wall waterproofing treatments, and spotless masking protection.",
        timeSlots: [
          { day: "Monday", startTime: "08:30", endTime: "17:30" },
          { day: "Wednesday", startTime: "08:30", endTime: "17:30" },
          { day: "Thursday", startTime: "08:30", endTime: "17:30" },
          { day: "Friday", startTime: "08:30", endTime: "17:30" }
        ],
        reviews: [],
        averageRating: 4.8,
        totalRating: 21,
        isApproved: "approved",
        TicketPrice: 499,
        consultationFee: 299
      },
      {
        name: "Deepak Verma",
        email: "deepak.repairs@gmail.com",
        password: providerHashedPassword,
        phone: 9877889900,
        age: 36,
        gender: "male",
        location: "Kondapur, Hyderabad, Telangana",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["Appliance Repair Technician", "Washing Machine Repair", "Refrigerator Service"],
        experience: [
          {
            startdate: "2016-01-15",
            enddate: "2024-02-10",
            role: "Appliance Engineer",
            locations: "Hyderabad, Telangana"
          }
        ],
        bio: "Multi-brand Appliance Diagnostics & Repair",
        about: "Certified home appliance expert for front-load/top-load washing machines, frost-free refrigerators, microwaves, and dishwashers. Genuine spare parts guaranteed with warranty.",
        timeSlots: [
          { day: "Tuesday", startTime: "09:00", endTime: "18:00" },
          { day: "Thursday", startTime: "09:00", endTime: "18:00" },
          { day: "Saturday", startTime: "09:00", endTime: "18:00" },
          { day: "Sunday", startTime: "10:00", endTime: "15:00" }
        ],
        reviews: [],
        averageRating: 4.7,
        totalRating: 32,
        isApproved: "approved",
        TicketPrice: 349,
        consultationFee: 199
      },
      {
        name: "Shweta Mukherjee",
        email: "shweta.beauty@gmail.com",
        password: providerHashedPassword,
        phone: 9888990011,
        age: 29,
        gender: "female",
        location: "Park Street, Kolkata, West Bengal",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["Beautician", "Facial & Skincare", "Hair Spa"],
        experience: [
          {
            startdate: "2018-04-01",
            enddate: "2024-03-01",
            role: "Senior Aesthetician",
            locations: "Kolkata, West Bengal"
          }
        ],
        bio: "Certified Salon & Skin Wellness Specialist",
        about: "Certified aesthetician offering premium salon services at home. Organic facials, gold/diamond skin therapy, pain-free waxing, hair spas, and mani-pedi treatments with sterile single-use kits.",
        timeSlots: [
          { day: "Monday", startTime: "10:00", endTime: "19:00" },
          { day: "Wednesday", startTime: "10:00", endTime: "19:00" },
          { day: "Friday", startTime: "10:00", endTime: "19:00" },
          { day: "Saturday", startTime: "10:00", endTime: "18:00" }
        ],
        reviews: [],
        averageRating: 4.9,
        totalRating: 47,
        isApproved: "approved",
        TicketPrice: 599,
        consultationFee: 299
      },
      {
        name: "Tanvi Kapoor",
        email: "tanvi.makeup@gmail.com",
        password: providerHashedPassword,
        phone: 9899001122,
        age: 28,
        gender: "female",
        location: "Golf Course Road, Gurugram, Haryana",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["Makeup Artist", "Bridal Makeup", "Party Makeup"],
        experience: [
          {
            startdate: "2019-01-10",
            enddate: "2024-02-15",
            role: "Lead Bridal Stylist",
            locations: "Delhi NCR"
          }
        ],
        bio: "Bridal & Occasion Makeup Artist with 6 yrs exp",
        about: "Internationally trained makeup artist specializing in HD bridal makeovers, reception glam, airbrush techniques, and bespoke saree/lehenga draping for celebrations and photo shoots.",
        timeSlots: [
          { day: "Thursday", startTime: "09:00", endTime: "20:00" },
          { day: "Friday", startTime: "09:00", endTime: "20:00" },
          { day: "Saturday", startTime: "08:00", endTime: "21:00" },
          { day: "Sunday", startTime: "08:00", endTime: "21:00" }
        ],
        reviews: [],
        averageRating: 5.0,
        totalRating: 36,
        isApproved: "approved",
        TicketPrice: 999,
        consultationFee: 499
      },
      {
        name: "Ramu Yadav",
        email: "ramu.gardener@gmail.com",
        password: providerHashedPassword,
        phone: 9900112233,
        age: 44,
        gender: "male",
        location: "Civil Lines, Jaipur, Rajasthan",
        photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["Gardener", "Lawn Maintenance", "Plant Pruning", "Terrace Garden"],
        experience: [
          {
            startdate: "2014-07-01",
            enddate: "2024-02-28",
            role: "Horticulture Specialist",
            locations: "Jaipur, Rajasthan"
          }
        ],
        bio: "Landscape & Terrace Garden Maintenance Pro",
        about: "Over a decade of experience in ornamental lawn maintenance, seasonal flower transplantation, bonsai pruning, vermicompost soil enrichment, and drip irrigation setup for terrace greenery.",
        timeSlots: [
          { day: "Monday", startTime: "07:00", endTime: "16:00" },
          { day: "Tuesday", startTime: "07:00", endTime: "16:00" },
          { day: "Thursday", startTime: "07:00", endTime: "16:00" },
          { day: "Saturday", startTime: "07:00", endTime: "15:00" }
        ],
        reviews: [],
        averageRating: 4.8,
        totalRating: 22,
        isApproved: "approved",
        TicketPrice: 299,
        consultationFee: 199
      },
      {
        name: "Vinod Nair",
        email: "vinod.pestcontrol@gmail.com",
        password: providerHashedPassword,
        phone: 9911223344,
        age: 38,
        gender: "male",
        location: "Marine Drive, Kochi, Kerala",
        photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["Pest Control Professional", "Termite Control", "Cockroach Control"],
        experience: [
          {
            startdate: "2015-11-01",
            enddate: "2024-02-01",
            role: "Certified Pest Exterminator",
            locations: "Kochi, Kerala"
          }
        ],
        bio: "Certified Pest Management & Sanitization Pro",
        about: "Govt-approved eco-friendly odorless gel treatments for cockroaches, anti-termite subterranean drilling barrier treatments, bed bug thermal control, and rodent proofing with written service warranty.",
        timeSlots: [
          { day: "Monday", startTime: "08:30", endTime: "18:00" },
          { day: "Wednesday", startTime: "08:30", endTime: "18:00" },
          { day: "Friday", startTime: "08:30", endTime: "18:00" },
          { day: "Saturday", startTime: "09:00", endTime: "17:00" }
        ],
        reviews: [],
        averageRating: 4.8,
        totalRating: 29,
        isApproved: "approved",
        TicketPrice: 699,
        consultationFee: 349
      },
      {
        name: "Sameer Khan",
        email: "sameer.techrepair@gmail.com",
        password: providerHashedPassword,
        phone: 9922334455,
        age: 30,
        gender: "male",
        location: "Sector 18, Noida, Uttar Pradesh",
        photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["Computer/Laptop Technician", "OS Installation", "Hardware Repair", "Data Recovery"],
        experience: [
          {
            startdate: "2017-06-01",
            enddate: "2024-03-01",
            role: "Hardware & Chipset Engineer",
            locations: "Noida & Delhi NCR"
          }
        ],
        bio: "Laptop & Computer Hardware Repair Specialist",
        about: "Expert diagnostics for Windows laptops and MacBooks: broken display screen replacements, SSD upgrades, thermal paste re-application, logic board chip soldering, and emergency data retrieval.",
        timeSlots: [
          { day: "Monday", startTime: "10:00", endTime: "20:00" },
          { day: "Tuesday", startTime: "10:00", endTime: "20:00" },
          { day: "Thursday", startTime: "10:00", endTime: "20:00" },
          { day: "Saturday", startTime: "10:00", endTime: "19:00" }
        ],
        reviews: [],
        averageRating: 4.9,
        totalRating: 38,
        isApproved: "approved",
        TicketPrice: 399,
        consultationFee: 199
      },
      {
        name: "Harpreet Singh",
        email: "harpreet.packers@gmail.com",
        password: providerHashedPassword,
        phone: 9933445566,
        age: 39,
        gender: "male",
        location: "Sector 17, Chandigarh, Punjab",
        photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["Packers & Movers", "House Relocation", "Office Shifting"],
        experience: [
          {
            startdate: "2014-02-15",
            enddate: "2024-01-20",
            role: "Logistics Operations Lead",
            locations: "Chandigarh, Punjab"
          }
        ],
        bio: "Fast & Safe House Relocation Specialist",
        about: "Full-service packing and shifting with multi-layer bubble wrapping, cardboard crating for fragile electronics, furniture dismantling/reassembly, and insured transportation with real-time GPS fleet tracking.",
        timeSlots: [
          { day: "Monday", startTime: "07:30", endTime: "19:00" },
          { day: "Wednesday", startTime: "07:30", endTime: "19:00" },
          { day: "Friday", startTime: "07:30", endTime: "19:00" },
          { day: "Sunday", startTime: "08:00", endTime: "17:00" }
        ],
        reviews: [],
        averageRating: 4.8,
        totalRating: 43,
        isApproved: "approved",
        TicketPrice: 899,
        consultationFee: 499
      },
      {
        name: "Pradeep Pillai",
        email: "pradeep.cctv@gmail.com",
        password: providerHashedPassword,
        phone: 9944556677,
        age: 33,
        gender: "male",
        location: "Adyar, Chennai, Tamil Nadu",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["CCTV Technician", "CCTV Camera Installation", "Security Setup"],
        experience: [
          {
            startdate: "2018-03-01",
            enddate: "2024-02-15",
            role: "Security Surveillance Engineer",
            locations: "Chennai, Tamil Nadu"
          }
        ],
        bio: "CCTV Security Systems & Surveillance Expert",
        about: "Installation and troubleshooting of IP cameras, HD analog setups, NVR/DVR cloud remote viewing on smartphones, video doorbells, biometric access controls, and structured security cabling.",
        timeSlots: [
          { day: "Tuesday", startTime: "09:00", endTime: "18:30" },
          { day: "Thursday", startTime: "09:00", endTime: "18:30" },
          { day: "Friday", startTime: "09:00", endTime: "18:30" },
          { day: "Saturday", startTime: "09:30", endTime: "16:00" }
        ],
        reviews: [],
        averageRating: 4.9,
        totalRating: 31,
        isApproved: "approved",
        TicketPrice: 499,
        consultationFee: 249
      },
      {
        name: "Santosh Gupta",
        email: "santosh.rowater@gmail.com",
        password: providerHashedPassword,
        phone: 9955667788,
        age: 35,
        gender: "male",
        location: "Palasia, Indore, Madhya Pradesh",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["RO/Water Purifier Technician", "Water Filter Replacement", "RO Installation"],
        experience: [
          {
            startdate: "2016-09-01",
            enddate: "2024-02-28",
            role: "Water Purification Technician",
            locations: "Indore, Madhya Pradesh"
          }
        ],
        bio: "RO Water Purifier & Filter Service Specialist",
        about: "Certified RO, UV, and UF water purifier maintenance specialist. TDS level adjustments, sediment/carbon candle replacements, booster pump repairs, and genuine membrane replacements for all brands.",
        timeSlots: [
          { day: "Monday", startTime: "09:00", endTime: "18:00" },
          { day: "Wednesday", startTime: "09:00", endTime: "18:00" },
          { day: "Thursday", startTime: "09:00", endTime: "18:00" },
          { day: "Saturday", startTime: "09:00", endTime: "17:00" }
        ],
        reviews: [],
        averageRating: 4.8,
        totalRating: 27,
        isApproved: "approved",
        TicketPrice: 299,
        consultationFee: 149
      },
      {
        name: "Arvind Rathore",
        email: "arvind.inverter@gmail.com",
        password: providerHashedPassword,
        phone: 9966778899,
        age: 36,
        gender: "male",
        location: "Varachha, Surat, Gujarat",
        photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["Electrician", "Inverter Installation", "Electrical Maintenance"],
        experience: [
          {
            startdate: "2015-08-01",
            enddate: "2024-01-30",
            role: "Power Backup & Electrical Specialist",
            locations: "Surat, Gujarat"
          }
        ],
        bio: "Licensed Inverter & Home Wiring Electrician",
        about: "Specialized in home power backup setups, tubular battery maintenance, sine-wave inverter installations, solar inverter integration, and complete electrical panel circuit testing.",
        timeSlots: [
          { day: "Tuesday", startTime: "08:30", endTime: "18:00" },
          { day: "Wednesday", startTime: "08:30", endTime: "18:00" },
          { day: "Friday", startTime: "08:30", endTime: "18:00" },
          { day: "Saturday", startTime: "09:00", endTime: "16:00" }
        ],
        reviews: [],
        averageRating: 4.7,
        totalRating: 26,
        isApproved: "approved",
        TicketPrice: 349,
        consultationFee: 199
      },
      {
        name: "Mohan Lal",
        email: "mohan.sanitary@gmail.com",
        password: providerHashedPassword,
        phone: 9977889900,
        age: 42,
        gender: "male",
        location: "MP Nagar, Bhopal, Madhya Pradesh",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["Plumber", "Water Tank Cleaning", "Drainage Solutions"],
        experience: [
          {
            startdate: "2013-04-01",
            enddate: "2024-02-15",
            role: "Sanitation & Drainage Specialist",
            locations: "Bhopal, Madhya Pradesh"
          }
        ],
        bio: "Drainage & Sanitary Fitting Specialist",
        about: "Over 11 years solving sewer line blockages, mechanized water tank high-pressure jet cleaning, anti-bacterial sludge extraction, and underground drain line rehabilitation.",
        timeSlots: [
          { day: "Monday", startTime: "08:00", endTime: "17:00" },
          { day: "Thursday", startTime: "08:00", endTime: "17:00" },
          { day: "Friday", startTime: "08:00", endTime: "17:00" },
          { day: "Saturday", startTime: "08:30", endTime: "15:00" }
        ],
        reviews: [],
        averageRating: 4.8,
        totalRating: 30,
        isApproved: "approved",
        TicketPrice: 399,
        consultationFee: 249
      },
      {
        name: "Lakshmi Narayanan",
        email: "lakshmi.sofacare@gmail.com",
        password: providerHashedPassword,
        phone: 9988990011,
        age: 32,
        gender: "female",
        location: "Gajuwaka, Visakhapatnam, Andhra Pradesh",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80",
        role: "service-provider",
        specialization: ["Home Cleaner", "Sofa Cleaning", "Carpet Cleaning"],
        experience: [
          {
            startdate: "2018-10-01",
            enddate: "2024-03-01",
            role: "Upholstery & Fabric Care Specialist",
            locations: "Visakhapatnam, Andhra Pradesh"
          }
        ],
        bio: "Eco-friendly Sofa & Carpet Sanitization Pro",
        about: "Specialized in fabric sofa deep-vacuum extraction, stain lifting, leather conditioning, wool carpet shampooing, and mattress allergen neutralization using non-toxic imported foaming solutions.",
        timeSlots: [
          { day: "Tuesday", startTime: "09:00", endTime: "18:00" },
          { day: "Wednesday", startTime: "09:00", endTime: "18:00" },
          { day: "Friday", startTime: "09:00", endTime: "18:00" },
          { day: "Sunday", startTime: "09:00", endTime: "16:00" }
        ],
        reviews: [],
        averageRating: 4.9,
        totalRating: 35,
        isApproved: "approved",
        TicketPrice: 549,
        consultationFee: 299
      }
    ];

    console.log(`\nInserting ${freshProvidersData.length} fresh service providers...`);
    const createdProviders = await ServiceProviderModel.insertMany(freshProvidersData);
    console.log(`Successfully created ${createdProviders.length} service providers.`);

    // 6. Check and update existing references (e.g. reviews collection) so no broken ObjectIds remain
    let updatedReferencesCount = 0;
    const existingReviews = await db.collection('reviews').find({}).toArray();

    if (existingReviews && existingReviews.length > 0) {
      console.log(`\nChecking ${existingReviews.length} existing review references...`);
      for (let i = 0; i < existingReviews.length; i++) {
        const review = existingReviews[i];
        // Assign to a valid real provider and user
        const targetProvider = createdProviders[i % createdProviders.length];
        const targetUser = createdUsers[i % createdUsers.length];

        await db.collection('reviews').updateOne(
          { _id: review._id },
          {
            $set: {
              serviceProvider: targetProvider._id,
              user: targetUser._id
            }
          }
        );

        // Add review id to target provider's reviews array if not already present
        await ServiceProviderModel.updateOne(
          { _id: targetProvider._id },
          { $addToSet: { reviews: review._id } }
        );

        updatedReferencesCount++;
      }
      console.log(`Updated ${updatedReferencesCount} reviews with valid provider & user ObjectIds.`);
    }

    // 7. Check if any standalone 'services' collection exists in DB and update references if found
    const allCollections = await db.listCollections().toArray();
    const servicesColl = allCollections.find(c => c.name === 'services');
    if (servicesColl) {
      const servicesInDb = await db.collection('services').find({}).toArray();
      console.log(`Found 'services' collection with ${servicesInDb.length} documents.`);
      for (let i = 0; i < servicesInDb.length; i++) {
        const s = servicesInDb[i];
        const assignedProvider = createdProviders[i % createdProviders.length];
        await db.collection('services').updateOne(
          { _id: s._id },
          { $set: { provider: assignedProvider._id, serviceProvider: assignedProvider._id } }
        );
        updatedReferencesCount++;
      }
    } else {
      console.log("\nNote: Platform services are maintained directly in the 'service-providers' collection (queried by /api/services).");
    }

    // 8. Output clear summary
    console.log("\n==================================================");
    console.log("             DATABASE SEED SUMMARY                ");
    console.log("==================================================");
    console.log(`Old users deleted: ${oldUsersCount}`);
    console.log(`Old service providers deleted: ${oldProvidersCount}`);
    console.log("");
    console.log(`New users created: ${createdUsers.length}`);
    console.log(`New service providers created: ${createdProviders.length}`);
    console.log("");
    console.log(`Service references updated: ${updatedReferencesCount}`);
    console.log("==================================================\n");

    console.log("All tasks completed successfully. Disconnecting from database...");
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error during database seeding:", error);
    process.exit(1);
  }
}

seedDatabase();

export const SEED_PATIENTS = [
  { id:'p1', name:'Priya Sharma', age:34, gender:'Female', blood:'B+', phone:'9876543210', email:'priya@gmail.com', address:'12 Rose Lane, Mumbai', note:'Priya came in anxious about her first diagnosis. Her courage to face her fears inspires us every day.', createdAt:'2024-01-10' },
  { id:'p2', name:'Arjun Mehta', age:58, gender:'Male', blood:'O-', phone:'9812345678', email:'arjun@gmail.com', address:'45 Nehru Nagar, Delhi', note:'A retired teacher who always brings sweets for the staff. His positivity lights up the clinic.', createdAt:'2024-02-15' },
  { id:'p3', name:'Sunita Verma', age:27, gender:'Female', blood:'A+', phone:'9934567890', email:'sunita@gmail.com', address:'78 Park Street, Kolkata', note:'Young mother battling thyroid issues. She fights hard for her daughter every single day.', createdAt:'2024-03-01' },
  { id:'p4', name:'Rajan Patel', age:45, gender:'Male', blood:'AB+', phone:'9823456789', email:'rajan@gmail.com', address:'23 Gandhi Road, Ahmedabad', note:'Came in with chronic back pain from years of hard work. Every session brings him closer to relief.', createdAt:'2024-03-20' },
  { id:'p5', name:'Kavya Nair', age:22, gender:'Female', blood:'O+', phone:'9745678901', email:'kavya@gmail.com', address:'56 MG Road, Bangalore', note:'College student dealing with severe migraines. Despite everything, never misses a class.', createdAt:'2024-04-05' },
];

export const SEED_DOCTORS = [
  { id:'d1', name:'Dr. Sarah Johnson', specialization:'Cardiologist', experience:12, motto:'Every heartbeat is a second chance at life.', available:true, avatar:'SJ' },
  { id:'d2', name:'Dr. Rohit Kapoor', specialization:'Neurologist', experience:8, motto:'The brain holds secrets the heart already knows.', available:true, avatar:'RK' },
  { id:'d3', name:'Dr. Meera Iyer', specialization:'Gynaecologist', experience:15, motto:'Bringing life into the world, one miracle at a time.', available:false, avatar:'MI' },
  { id:'d4', name:'Dr. Aakash Singh', specialization:'Orthopedist', experience:10, motto:'We don't just fix bones — we restore freedom.', available:true, avatar:'AS' },
];

export const SEED_APPOINTMENTS = [
  { id:'a1', patientId:'p1', patientName:'Priya Sharma', doctorId:'d1', doctorName:'Dr. Sarah Johnson', date:'2024-04-03', time:'10:00', reason:'Routine cardiac checkup', status:'scheduled' },
  { id:'a2', patientId:'p2', patientName:'Arjun Mehta', doctorId:'d2', doctorName:'Dr. Rohit Kapoor', date:'2024-04-03', time:'11:30', reason:'Headache & memory concerns', status:'done' },
  { id:'a3', patientId:'p3', patientName:'Sunita Verma', doctorId:'d3', doctorName:'Dr. Meera Iyer', date:'2024-04-04', time:'09:00', reason:'Thyroid follow-up', status:'scheduled' },
  { id:'a4', patientId:'p4', patientName:'Rajan Patel', doctorId:'d4', doctorName:'Dr. Aakash Singh', date:'2024-04-04', time:'14:00', reason:'Lower back pain review', status:'cancelled' },
  { id:'a5', patientId:'p5', patientName:'Kavya Nair', doctorId:'d2', doctorName:'Dr. Rohit Kapoor', date:'2024-04-05', time:'16:00', reason:'Migraine consultation', status:'scheduled' },
  { id:'a6', patientId:'p1', patientName:'Priya Sharma', doctorId:'d1', doctorName:'Dr. Sarah Johnson', date:'2024-04-06', time:'10:30', reason:'Echo test review', status:'scheduled' },
];

export const SEED_RECORDS = [
  { id:'r1', patientId:'p1', date:'2024-01-15', diagnosis:'Mild mitral valve regurgitation', prescription:'Amlodipine 5mg daily', notes:'Patient advised to reduce sodium intake and exercise moderately.', doctorName:'Dr. Sarah Johnson' },
  { id:'r2', patientId:'p2', date:'2024-02-20', diagnosis:'Tension headaches, early-stage memory lapses', prescription:'Amitriptyline 10mg, B12 supplements', notes:'Recommend cognitive exercises and sleep hygiene.', doctorName:'Dr. Rohit Kapoor' },
  { id:'r3', patientId:'p3', date:'2024-03-05', diagnosis:'Hypothyroidism', prescription:'Levothyroxine 50mcg', notes:'Review TSH levels in 6 weeks.', doctorName:'Dr. Meera Iyer' },
];

export const SEED_DONATIONS = [
  { id:'dn1', name:'Vikram Anand', email:'vikram@gmail.com', amount:1000, message:'For every child who deserves a healthy life.', date:'2024-03-15' },
  { id:'dn2', name:'Pooja Reddy', email:'pooja@gmail.com', amount:500, message:'In loving memory of my father.', date:'2024-03-22' },
  { id:'dn3', name:'Anonymous', email:'', amount:2500, message:'Keep up the beautiful work, CuraFlow.', date:'2024-04-01' },
];

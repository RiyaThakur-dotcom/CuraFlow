import React, { useState, useEffect, useContext, createContext } from 'react';
import { 
  Users, Activity, Calendar, FileText, Heart, Menu, X, Plus, 
  Search, Trash2, CheckCircle, Clock, XCircle, Search as SearchIcon,
  Stethoscope, Quote, UserPlus, Gift, HeartHandshake, Phone, Mail, MapPin, Droplet
} from 'lucide-react';

const defaultPatients = [
  { id: 1, name: "Aarav Sharma", age: 45, gender: "Male", blood: "O+", phone: "9876543210", email: "aarav@example.com", address: "Mumbai", story: "Recovering from unexpected heart surgery. Needs gentle care." },
  { id: 2, name: "Priya Patel", age: 28, gender: "Female", blood: "A+", phone: "9876543211", email: "priya@example.com", address: "Delhi", story: "First-time mother, expecting twins. Requires close monitoring." },
  { id: 3, name: "Rohan Verma", age: 12, gender: "Male", blood: "B-", phone: "9876543212", email: "rohan@example.com", address: "Pune", story: "Brave young boy battling asthma. Loves comic books." },
  { id: 4, name: "Meera Reddy", age: 62, gender: "Female", blood: "AB+", phone: "9876543213", email: "meera@example.com", address: "Bangalore", story: "Managing arthritis with a positive spirit. Former dancer." },
  { id: 5, name: "Vikram Singh", age: 35, gender: "Male", blood: "O-", phone: "9876543214", email: "vikram@example.com", address: "Chennai", story: "Athletic injury rehabilitation. Highly motivated." }
];

const defaultDoctors = [
  { id: 1, name: "Dr. Sarah Khan", spec: "Cardiologist", exp: "15 years", motto: "Healing hearts with compassion.", avail: true },
  { id: 2, name: "Dr. Rahul Gupta", spec: "Pediatrician", exp: "10 years", motto: "Every child deserves a healthy start.", avail: false },
  { id: 3, name: "Dr. Anita Desai", spec: "Orthopedic", exp: "20 years", motto: "Restoring movement, restoring life.", avail: true },
  { id: 4, name: "Dr. Karan Mehta", spec: "Neurologist", exp: "12 years", motto: "Unlocking the mysteries of the mind.", avail: true }
];

const defaultAppointments = [
  { id: 1, patId: 1, docId: 1, date: "2026-04-04", time: "10:00", reason: "Follow-up", status: "pending" },
  { id: 2, patId: 2, docId: 2, date: "2026-04-04", time: "11:30", reason: "Routine Check", status: "completed" },
  { id: 3, patId: 3, docId: 2, date: "2026-04-05", time: "09:00", reason: "Asthma Review", status: "pending" },
  { id: 4, patId: 4, docId: 3, date: "2026-04-05", time: "14:00", reason: "Joint Pain", status: "pending" },
  { id: 5, patId: 5, docId: 3, date: "2026-04-06", time: "16:00", reason: "Therapy", status: "cancelled" },
  { id: 6, patId: 1, docId: 1, date: "2026-04-07", time: "10:00", reason: "Tests", status: "pending" }
];

const defaultDonations = [
  { id: 1, name: "Anita Bose", amount: 1500, msg: "For the brave little fighter." },
  { id: 2, name: "Rajiv Menon", amount: 5000, msg: "In memory of my mother." },
  { id: 3, name: "Suresh P.", amount: 800, msg: "A small drop to help someone heal." }
];

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const loadData = (key, fallback) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  };

  const [patients, setPatients] = useState(() => loadData('curaflow_patients', defaultPatients));
  const [doctors, setDoctors] = useState(() => loadData('curaflow_doctors', defaultDoctors));
  const [appointments, setAppointments] = useState(() => loadData('curaflow_appointments', defaultAppointments));
  const [donations, setDonations] = useState(() => loadData('curaflow_donations', defaultDonations));
  const [records, setRecords] = useState(() => loadData('curaflow_records', []));
  const [toasts, setToasts] = useState([]);

  useEffect(() => localStorage.setItem('curaflow_patients', JSON.stringify(patients)), [patients]);
  useEffect(() => localStorage.setItem('curaflow_doctors', JSON.stringify(doctors)), [doctors]);
  useEffect(() => localStorage.setItem('curaflow_appointments', JSON.stringify(appointments)), [appointments]);
  useEffect(() => localStorage.setItem('curaflow_donations', JSON.stringify(donations)), [donations]);
  useEffect(() => localStorage.setItem('curaflow_records', JSON.stringify(records)), [records]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const value = {
    patients, setPatients,
    doctors, setDoctors,
    appointments, setAppointments,
    donations, setDonations,
    records, setRecords,
    showToast
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(t => (
          <div key={t.id} className={`glass-card p-4 flex items-center justify-between text-sm min-w-[250px] toast-enter ${
            t.type === 'error' ? 'border-red-300 bg-red-50' : 'border-teal-300 bg-white'
          }`}>
            <span>{t.message}</span>
            <button onClick={() => setToasts(ts => ts.filter(x => x.id !== t.id))}><X size={16}/></button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

const Dashboard = () => {
  const { patients, doctors, appointments, donations } = useContext(AppContext);
  const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0);
  const todayApps = appointments.filter(a => a.date === new Date().toISOString().split('T')[0]);
  
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="page-enter p-4 md:p-8 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-outfit font-bold text-teal-900">
          {greeting}, Dr. Sarah 👋 You have {todayApps.length} lives to touch today.
        </h1>
        <p className="text-teal-700 opacity-80 italic">"Your clinic's pulse, at a glance"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="stat-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-teal-600 mb-1">Total Patients</p>
              <h3 className="text-3xl font-bold text-teal-900">{patients.length}</h3>
            </div>
            <div className="p-3 bg-teal-50 rounded-xl text-teal-500"><Users size={24}/></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-teal-600 mb-1">Today's Appointments</p>
              <h3 className="text-3xl font-bold text-teal-900">{todayApps.length}</h3>
            </div>
            <div className="p-3 bg-sky-50 rounded-xl text-sky-500"><Calendar size={24}/></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-teal-600 mb-1">Available Doctors</p>
              <h3 className="text-3xl font-bold text-teal-900">{doctors.filter(d => d.avail).length}</h3>
            </div>
            <div className="p-3 bg-violet-50 rounded-xl text-violet-500"><Stethoscope size={24}/></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-teal-600 mb-1">Funds Raised</p>
              <h3 className="text-3xl font-bold text-teal-900">₹{totalRaised}</h3>
            </div>
            <div className="p-3 bg-rose-50 rounded-xl text-rose-500"><Heart size={24}/></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-teal-900 mb-4 flex items-center gap-2">
            <Activity className="text-teal-500" size={20}/> Recent Appointments
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-teal-100 text-sm text-teal-600">
                  <th className="pb-3 px-2 font-medium">Patient</th>
                  <th className="pb-3 px-2 font-medium">Doctor</th>
                  <th className="pb-3 px-2 font-medium">Date & Time</th>
                  <th className="pb-3 px-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0,5).map(app => (
                  <tr key={app.id} className="border-b border-teal-50 hover:bg-teal-50/50 transition-colors">
                    <td className="py-3 px-2">{patients.find(p=>p.id===app.patId)?.name || 'Unknown'}</td>
                    <td className="py-3 px-2">{doctors.find(d=>d.id===app.docId)?.name || 'Unknown'}</td>
                    <td className="py-3 px-2 text-sm text-gray-500">{app.date} / {app.time}</td>
                    <td className="py-3 px-2">
                      <span className={`badge ${app.status==='completed'?'badge-green':app.status==='cancelled'?'badge-rose':'badge-amber'}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {appointments.length === 0 && <p className="text-center text-gray-400 py-6 text-sm">No appointments scheduled.</p>}
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -top-10 text-teal-50 opacity-20 transform rotate-12"><HeartHandshake size={150}/></div>
          <div>
            <h3 className="text-lg font-semibold text-teal-900 mb-4">Patient Spotlight</h3>
            {patients.length > 0 ? (
              <div className="space-y-4 relative z-10">
                <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
                  <Quote size={20} className="text-teal-300 mb-2" />
                  <p className="text-sm text-teal-800 italic">"Every great story has a turning point. We are here to ensure it's a positive one."</p>
                </div>
                <div>
                  <p className="font-semibold text-teal-900">{patients[0].name}</p>
                  <p className="text-xs text-gray-500 mt-1">{patients[0].story}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic relative z-10">No patients yet — every great story has a first page.</p>
            )}
          </div>
          <div className="mt-6 flex gap-2 relative z-10">
             <button className="btn-secondary flex-1 text-xs py-2 text-center" onClick={() => window.dispatchEvent(new CustomEvent('nav',{detail:'donations'}))}>View Funds</button>
             <button className="btn-primary flex-1 text-xs py-2 text-center" onClick={() => window.dispatchEvent(new CustomEvent('nav',{detail:'appointments'}))}>Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PatientsCard = ({ patient, onDelete }) => (
  <div className="glass-card p-5 group">
    <div className="flex justify-between items-start mb-3">
      <div>
         <h4 className="font-bold text-teal-900 text-lg flex items-center gap-2">
            {patient.name}
            {patient.gender==='Male' ? <span className="text-xs font-normal text-sky-500">M/{patient.age}</span> : <span className="text-xs font-normal text-rose-500">F/{patient.age}</span>}
         </h4>
         <div className="flex gap-3 text-xs text-gray-500 mt-1">
            <span className="flex items-center gap-1"><Phone size={12}/> {patient.phone}</span>
            <span className="flex items-center gap-1"><Droplet size={12} className="text-rose-500"/> {patient.blood}</span>
         </div>
      </div>
      <button onClick={() => onDelete(patient)} className="text-rose-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
         <Trash2 size={18}/>
      </button>
    </div>
    <div className="bg-teal-50/50 p-3 rounded-lg text-sm text-teal-800 italic border border-teal-100/50">
       "{patient.story}"
    </div>
  </div>
);

const PatientsPage = () => {
  const { patients, setPatients, showToast } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [form, setForm] = useState({ name: '', age: '', gender: 'Male', blood: '', phone: '', email: '', address: '', story: '' });

  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPatient = { ...form, id: Date.now(), age: parseInt(form.age) };
    setPatients([...patients, newPatient]);
    showToast(`Welcome to CuraFlow, ${form.name}. Your care journey starts here.`);
    setIsModalOpen(false);
    setForm({ name: '', age: '', gender: 'Male', blood: '', phone: '', email: '', address: '', story: '' });
  };

  const handleDelete = (p) => {
    if(confirm(`Are you sure? This will erase ${p.name}'s entire journey.`)){
      setPatients(patients.filter(x => x.id !== p.id));
      showToast(`${p.name}'s records have been carefully archived.`, 'error');
    }
  };

  return (
    <div className="page-enter p-4 md:p-8 space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-outfit font-bold text-teal-900">Patients</h1>
            <p className="text-teal-700 opacity-80 italic">"Every patient has a story worth remembering"</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
            <Plus size={18}/> Add Patient
          </button>
       </div>

       <div className="relative max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
          <input 
            type="text" placeholder="Search patients..." 
            className="input-field pl-10"
            value={search} onChange={e => setSearch(e.target.value)}
          />
       </div>

       {filtered.length === 0 ? (
         <div className="text-center py-12">
            <HeartHandshake size={48} className="mx-auto text-teal-200 mb-4 pulse-soft"/>
            <p className="text-gray-500 italic">No patients found. Every great story has a first page.</p>
         </div>
       ) : (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
           {filtered.map(p => <PatientsCard key={p.id} patient={p} onDelete={handleDelete} />)}
         </div>
       )}

       {isModalOpen && (
         <div className="modal-overlay">
           <div className="modal-box">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
               <h3 className="text-xl font-bold text-teal-900">New Patient Story</h3>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
             </div>
             <form onSubmit={handleSubmit} className="p-6 space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <input className="input-field col-span-2 md:col-span-1" placeholder="Full Name" required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
                 <input className="input-field col-span-2 md:col-span-1" placeholder="Age" type="number" required value={form.age} onChange={e=>setForm({...form, age: e.target.value})} />
                 <select className="input-field" value={form.gender} onChange={e=>setForm({...form, gender: e.target.value})}>
                   <option>Male</option><option>Female</option><option>Other</option>
                 </select>
                 <input className="input-field" placeholder="Blood Group (e.g. O+)" required value={form.blood} onChange={e=>setForm({...form, blood: e.target.value})} />
                 <input className="input-field" placeholder="Phone" required value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} />
                 <input className="input-field" placeholder="Email (Optional)" type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
               </div>
               <textarea className="input-field min-h-[100px]" placeholder="Brief personal note or story..." required value={form.story} onChange={e=>setForm({...form, story: e.target.value})} />
               <div className="flex justify-end gap-3 mt-6">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                 <button type="submit" className="btn-primary">Save Patient</button>
               </div>
             </form>
           </div>
         </div>
       )}
    </div>
  );
};

const DoctorsPage = () => {
    const { doctors, setDoctors, showToast } = useContext(AppContext);
    
    return (
      <div className="page-enter p-4 md:p-8 space-y-6">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-outfit font-bold text-teal-900">Doctors</h1>
              <p className="text-teal-700 opacity-80 italic">"The healers behind every recovery"</p>
            </div>
         </div>
  
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {doctors.map(d => (
                 <div key={d.id} className="glass-card p-6 flex flex-col justify-between">
                     <div className="flex items-center gap-4 mb-4">
                         <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xl border-2 border-white shadow-sm">
                             {d.name.split(' ').map(n=>n[0]).join('').replace('.','')}
                         </div>
                         <div>
                             <h3 className="font-bold text-lg text-teal-900">{d.name}</h3>
                             <span className="badge badge-sky">{d.spec}</span>
                         </div>
                     </div>
                     <p className="text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg flex-1">
                         <Quote size={14} className="inline mr-1 text-teal-300"/>
                         {d.motto}
                     </p>
                     <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                         <span className="text-xs font-semibold text-gray-500">{d.exp} Exp.</span>
                         <button 
                            onClick={() => {
                                setDoctors(doctors.map(x => x.id === d.id ? {...x, avail: !x.avail} : x));
                                showToast(`${d.name} is now ${!d.avail ? 'Available' : 'Busy'}`);
                            }}
                            className={`badge cursor-pointer transition-colors ${d.avail ? 'badge-green' : 'badge-rose'}`}>
                             {d.avail ? 'Available' : 'Busy'}
                         </button>
                     </div>
                 </div>
             ))}
         </div>
      </div>
    );
};

const AppointmentsPage = () => {
    const { appointments, patients, doctors, setAppointments, showToast } = useContext(AppContext);
    
    return (
      <div className="page-enter p-4 md:p-8 space-y-6">
         <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-outfit font-bold text-teal-900">Appointments</h1>
              <p className="text-teal-700 opacity-80 italic">"Seamless scheduling, zero confusion"</p>
            </div>
         </div>
         <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-teal-50 border-b border-teal-100">
                     <tr>
                        <th className="p-4 font-semibold text-teal-800 text-sm">Patient</th>
                        <th className="p-4 font-semibold text-teal-800 text-sm">Doctor</th>
                        <th className="p-4 font-semibold text-teal-800 text-sm">Date & Time</th>
                        <th className="p-4 font-semibold text-teal-800 text-sm">Reason</th>
                        <th className="p-4 font-semibold text-teal-800 text-sm text-center">Status</th>
                        <th className="p-4 font-semibold text-teal-800 text-sm text-center">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                      {appointments.map(app => (
                          <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                              <td className="p-4 font-medium">{patients.find(p=>p.id===app.patId)?.name || 'Unknown Patient'}</td>
                              <td className="p-4 text-gray-600">{doctors.find(d=>d.id===app.docId)?.name || 'Unknown Doctor'}</td>
                              <td className="p-4 text-sm text-gray-500">{app.date} <br/><span className="text-xs text-gray-400">{app.time}</span></td>
                              <td className="p-4 text-sm text-gray-600">{app.reason}</td>
                              <td className="p-4 text-center">
                                  <span className={`badge ${app.status==='completed'?'badge-green':app.status==='cancelled'?'badge-rose':'badge-amber'}`}>
                                      {app.status}
                                  </span>
                              </td>
                              <td className="p-4 text-center flex justify-center gap-2">
                                  {app.status === 'pending' && (
                                     <>
                                        <button onClick={() => {
                                            setAppointments(appointments.map(a => a.id === app.id ? {...a, status: 'completed'} : a));
                                            showToast("Appointment saved. Someone just got a little closer to feeling better.");
                                        }} className="p-1.5 text-teal-500 hover:bg-teal-50 rounded"><CheckCircle size={18}/></button>
                                        <button onClick={() => {
                                            setAppointments(appointments.map(a => a.id === app.id ? {...a, status: 'cancelled'} : a));
                                            showToast("Appointment cancelled.", "error");
                                        }} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"><XCircle size={18}/></button>
                                     </>
                                  )}
                              </td>
                          </tr>
                      ))}
                      {appointments.length === 0 && <tr><td colSpan="6" className="text-center p-8 text-gray-400">No appointments found.</td></tr>}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    );
};

const MedicalRecordsPage = () => {
    const { patients, records, setRecords, showToast } = useContext(AppContext);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [form, setForm] = useState({ diagnosis: '', prescription: '', notes: '' });

    const selectedPatient = patients.find(p => p.id === selectedPatientId);
    const patientRecords = records.filter(r => r.patId === selectedPatientId).sort((a,b) => b.id - a.id);

    const handleAddRecord = (e) => {
        e.preventDefault();
        if(!selectedPatientId) return;
        const newRecord = {
            id: Date.now(),
            patId: selectedPatientId,
            date: new Date().toLocaleDateString('en-GB'),
            ...form
        };
        setRecords([newRecord, ...records]);
        setForm({ diagnosis: '', prescription: '', notes: '' });
        showToast(`A new chapter added to ${selectedPatient.name}'s journey.`);
    };

    return (
      <div className="page-enter p-4 md:p-8 space-y-6">
         <div>
            <h1 className="text-2xl md:text-3xl font-outfit font-bold text-teal-900">Medical Records</h1>
            <p className="text-teal-700 opacity-80 italic">"Health history, organized forever"</p>
         </div>
         
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass-card p-4 h-fit">
                <h3 className="font-bold text-teal-900 mb-4 px-2">Select Patient</h3>
                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                    {patients.map(p => (
                        <button 
                          key={p.id}
                          onClick={() => setSelectedPatientId(p.id)}
                          className={`w-full text-left p-3 rounded-xl transition-all ${selectedPatientId === p.id ? 'bg-teal-500 text-white shadow-md' : 'hover:bg-teal-50 text-teal-900'}`}
                        >
                            <div className="font-semibold">{p.name}</div>
                            <div className={`text-xs ${selectedPatientId === p.id ? 'text-teal-100' : 'text-gray-500'}`}>{p.phone}</div>
                        </button>
                    ))}
                    {patients.length === 0 && <p className="text-xs text-center text-gray-400 p-4">No patients available.</p>}
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                {!selectedPatient ? (
                    <div className="text-center py-16 glass-card border-dashed">
                        <FileText size={48} className="mx-auto text-teal-200 mb-4"/>
                        <h3 className="text-lg font-bold text-teal-800 mb-2">Select a patient to view their care journey</h3>
                        <p className="text-sm text-gray-500 max-w-md mx-auto">Every record entry is a chapter in someone's recovery story.</p>
                    </div>
                ) : (
                    <div className="fade-in-up">
                        <div className="glass-card p-6 border-l-4 border-l-teal-500 mb-6">
                            <h3 className="text-xl font-bold text-teal-900 mb-1">{selectedPatient.name}'s Care Journey</h3>
                            <p className="text-sm text-teal-700 italic">"{selectedPatient.story}"</p>
                        </div>

                        <div className="glass-card p-6 bg-teal-50/30">
                            <h4 className="font-semibold text-teal-900 mb-4 flex items-center gap-2">
                                <Plus size={18}/> Write a New Chapter
                            </h4>
                            <form onSubmit={handleAddRecord} className="space-y-4">
                                <input className="input-field bg-white" placeholder="Diagnosis (e.g., Mild Hypertension)" required value={form.diagnosis} onChange={e=>setForm({...form, diagnosis: e.target.value})} />
                                <input className="input-field bg-white" placeholder="Prescription (e.g., Amlodipine 5mg)" required value={form.prescription} onChange={e=>setForm({...form, prescription: e.target.value})} />
                                <textarea className="input-field bg-white min-h-[80px]" placeholder="Doctor's gentle notes..." required value={form.notes} onChange={e=>setForm({...form, notes: e.target.value})}></textarea>
                                <button type="submit" className="btn-primary">Save to History</button>
                            </form>
                        </div>

                        <div className="relative pl-6 space-y-8 mt-8 pb-4">
                            <div className="timeline-line"></div>
                            {patientRecords.map((r, i) => (
                                <div key={r.id} className="relative z-10 fade-in-up" style={{animationDelay: `${i*0.05}s`}}>
                                    <div className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-teal-500 ring-4 ring-teal-50"></div>
                                    <div className="glass-card p-5 ml-2 hover:-translate-y-1 transition-transform">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="badge badge-teal"><Calendar size={12}/> {r.date}</span>
                                        </div>
                                        <h4 className="font-bold text-teal-900 text-lg mb-1">{r.diagnosis}</h4>
                                        <p className="text-sm font-medium text-rose-500 mb-3 flex items-center gap-1"><Activity size={14} /> Prescription: {r.prescription}</p>
                                        <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 italic border border-gray-100">
                                            "{r.notes}"
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {patientRecords.length === 0 && (
                                <p className="text-sm text-gray-400 italic pl-4">The journey begins here. No past records found.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
         </div>
      </div>
    );
};

const DonationsPage = () => {
    const { donations, setDonations, showToast } = useContext(AppContext);
    const goal = 50000;
    const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0);
    const percentage = Math.min(100, Math.round((totalRaised / goal) * 100));
    const [form, setForm] = useState({ name: '', amount: '', msg: '' });

    const handleDonate = (e) => {
        e.preventDefault();
        const amt = parseFloat(form.amount);
        if(!amt || amt <= 0) return;
        setDonations([{ id: Date.now(), name: form.name || 'Anonymous', amount: amt, msg: form.msg || 'A kind donation.' }, ...donations]);
        setForm({ name: '', amount: '', msg: '' });
        showToast("Thank you. Your kindness will heal someone today.");
        
        for(let i=0; i<30; i++) {
            const conf = document.createElement('div');
            conf.className = 'confetti-piece';
            conf.style.left = Math.random() * 100 + 'vw';
            conf.style.backgroundColor = ['#14b8a6','#f43f5e','#f59e0b','#3b82f6'][Math.floor(Math.random()*4)];
            conf.style.animationDuration = (Math.random() * 2 + 1) + 's';
            document.body.appendChild(conf);
            setTimeout(() => conf.remove(), 3000);
        }
    };

    return (
      <div className="page-enter p-4 md:p-8 space-y-6">
         <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-50 mb-4">
               <Heart size={32} className="text-rose-500 pulse-soft"/>
            </div>
            <h1 className="text-2xl md:text-4xl font-outfit font-bold text-teal-900 mb-2">"Small acts of kindness, massive impact"</h1>
            <p className="text-teal-700">Your generosity funds care for those who can't afford it.</p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-6 md:p-8">
               <h3 className="text-xl font-bold text-teal-900 mb-6">Make a Donation</h3>
               <form onSubmit={handleDonate} className="space-y-5">
                   <input className="input-field" placeholder="Your Name (Optional)" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
                   <div>
                       <div className="flex gap-2 mb-3">
                           {[100, 500, 1000].map(amt => (
                               <button type="button" key={amt}
                                  onClick={() => setForm({...form, amount: amt.toString()})}
                                  className={`preset-amount flex-1 ${form.amount==amt ? 'selected' : ''}`}
                               >₹{amt}</button>
                           ))}
                       </div>
                       <input className="input-field font-bold text-teal-700" type="number" placeholder="Custom Amount (₹)" required value={form.amount} onChange={e=>setForm({...form, amount: e.target.value})} />
                   </div>
                   <textarea className="input-field" placeholder="Leave a message or dedication..." rows="3" value={form.msg} onChange={e=>setForm({...form, msg: e.target.value})}></textarea>
                   <button type="submit" className="w-full btn-primary py-3 text-lg mt-2">Donate Healing</button>
               </form>
            </div>
            
            <div className="space-y-6">
                <div className="glass-card p-6 bg-gradient-to-br from-teal-50 to-white">
                   <h3 className="text-sm font-semibold text-teal-800 uppercase tracking-wider mb-2">Campaign Progress</h3>
                   <div className="flex items-end gap-2 mb-4">
                      <span className="text-4xl font-black text-teal-600">₹{totalRaised.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 mb-1">raised of ₹{goal.toLocaleString()} goal</span>
                   </div>
                   <div className="h-3 bg-teal-100 rounded-full overflow-hidden">
                       <div className="h-full progress-bar-fill" style={{width: `${percentage}%`}}></div>
                   </div>
                   <p className="text-xs text-center text-teal-700 mt-3 italic">"Every rupee brings us closer to a healthier world"</p>
                </div>

                <div className="glass-card p-0 overflow-hidden">
                    <h3 className="p-4 border-b border-gray-50 font-semibold text-teal-900 bg-white">Recent Donors</h3>
                    <div className="max-h-[250px] overflow-y-auto">
                        {donations.map(d => (
                            <div key={d.id} className="p-4 border-b border-gray-50 hover:bg-teal-50/30 transition-colors">
                               <div className="flex justify-between items-start mb-1">
                                  <strong className="text-sm text-teal-900">{d.name}</strong>
                                  <span className="badge badge-teal">₹{d.amount}</span>
                               </div>
                               <p className="text-xs text-gray-500 italic">"{d.msg}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
         </div>
      </div>
    );
};

const AnalyticsPage = () => {
    const { patients, doctors, appointments, donations } = useContext(AppContext);
    
    // Some mock/calculation logic
    const topDonors = [...donations].sort((a,b)=>b.amount-a.amount).slice(0,3);
    const maleCount = patients.filter(p=>p.gender==='Male').length;
    const femaleCount = patients.filter(p=>p.gender==='Female').length;
    
    // mini bar chart for appointments this week
    const barData = [4, 7, 3, 5, 8, 2, 6];
    const maxBar = 8;

    return (
      <div className="page-enter p-4 md:p-8 space-y-6">
         <div>
            <h1 className="text-2xl md:text-3xl font-outfit font-bold text-teal-900">Analytics Board</h1>
            <p className="text-teal-700 opacity-80 italic">"Gaining insights for better care"</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="glass-card p-6">
                 <h3 className="text-lg font-bold text-teal-900 mb-4">Patient Demographics</h3>
                 <div className="flex items-center justify-around h-32">
                     <div className="text-center">
                         <div className="text-4xl font-black text-sky-500">{maleCount}</div>
                         <div className="text-sm text-gray-500 font-medium">Male</div>
                     </div>
                     <div className="h-16 w-px bg-teal-100"></div>
                     <div className="text-center">
                         <div className="text-4xl font-black text-rose-500">{femaleCount}</div>
                         <div className="text-sm text-gray-500 font-medium">Female</div>
                     </div>
                 </div>
             </div>

             <div className="glass-card p-6">
                 <h3 className="text-lg font-bold text-teal-900 mb-4">Top Benefactors</h3>
                 <div className="space-y-4">
                     {topDonors.map((d, i) => (
                         <div key={d.id} className="flex justify-between items-center bg-teal-50/50 p-2 rounded-lg">
                             <div className="flex gap-2 items-center">
                                 <span className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold">{i+1}</span>
                                 <span className="font-semibold text-teal-800">{d.name}</span>
                             </div>
                             <span className="font-bold text-teal-600">₹{d.amount}</span>
                         </div>
                     ))}
                 </div>
             </div>

             <div className="glass-card p-6 md:col-span-2">
                 <h3 className="text-lg font-bold text-teal-900 mb-6">Weekly Appointment Load</h3>
                 <div className="flex items-end justify-between h-48 px-2">
                     {barData.map((val, idx) => (
                         <div key={idx} className="flex flex-col items-center gap-2 group h-full justify-end">
                             <div className="w-8 md:w-16 bg-teal-50 rounded-t-lg relative flex items-end overflow-hidden" style={{height: '100%'}}>
                                 <div className="w-full bg-teal-500 transition-all duration-1000 ease-out group-hover:bg-teal-400" style={{height: `${(val/maxBar)*100}%`}}></div>
                             </div>
                             <span className="text-xs font-semibold text-gray-400">Day {idx+1}</span>
                         </div>
                     ))}
                 </div>
             </div>
         </div>
      </div>
    );
};

const IntroPage = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
         <Heart className="absolute -top-20 -left-20 w-96 h-96 text-teal-500 animate-pulse" />
         <Activity className="absolute bottom-10 right-10 w-64 h-64 text-teal-400 opacity-30 pulse-soft" />
      </div>
      
      <div className="z-10 text-center max-w-3xl fade-in-up">
         <div className="inline-flex items-center justify-center p-6 bg-white/10 rounded-full backdrop-blur-md mb-8 border border-white/20 shadow-2xl pulse-soft">
            <HeartHandshake size={64} className="text-teal-200" />
         </div>
         <h1 className="text-5xl md:text-7xl font-outfit font-black tracking-tight mb-6 drop-shadow-lg">
            CuraFlow
         </h1>
         <p className="text-xl md:text-3xl font-light text-teal-100 mb-8 italic drop-shadow-md">
            "Every heartbeat has a story.<br/> We help you tell it."
         </p>
         
         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <button 
              onClick={onEnter} 
              className="px-8 py-4 bg-white text-teal-900 font-bold rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] flex items-center gap-2 cursor-pointer shadow-lg"
            >
              Enter Clinic <Activity size={20}/>
            </button>
         </div>

         <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-teal-100/70 text-sm font-medium">
            <div className="flex items-center justify-center gap-2"><Users size={16}/> Patient Journies</div>
            <div className="flex items-center justify-center gap-2"><Stethoscope size={16}/> Expert Healers</div>
            <div className="flex items-center justify-center gap-2"><Calendar size={16}/> Easy Scheduling</div>
            <div className="flex items-center justify-center gap-2"><Heart size={16}/> Kindness Funded</div>
         </div>
      </div>
    </div>
  );
};

const AppCode = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleNav = (e) => setActiveTab(e.detail);
    window.addEventListener('nav', handleNav);
    return () => window.removeEventListener('nav', handleNav);
  }, []);

  const navItems = [
    { id: 'dashboard', icon: Activity, label: 'Dashboard' },
    { id: 'patients', icon: Users, label: 'Patients' },
    { id: 'doctors', icon: Stethoscope, label: 'Doctors' },
    { id: 'appointments', icon: Calendar, label: 'Appointments' },
    { id: 'records', icon: FileText, label: 'Records' },
    { id: 'donations', icon: HeartHandshake, label: 'Donations' },
    { id: 'analytics', icon: Activity, label: 'Analytics' }
  ];

  if (activeTab === 'intro') {
    return <IntroPage onEnter={() => setActiveTab('dashboard')} />;
  }

  return (
    <div className="flex min-h-screen bg-[#f0fdfa] font-inter">
      {isSidebarOpen && <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={()=>setIsSidebarOpen(false)}></div>}
      
      <aside className={`sidebar flex flex-col ${isSidebarOpen ? 'w-[260px] translate-x-0' : '-translate-x-full md:translate-x-0 w-[260px]'}`}>
        <div className="p-6 mb-2 flex items-center justify-between">
           <div className="flex items-center gap-2 text-white">
              <Heart className="fill-emerald-400 text-emerald-400" size={28}/>
              <span className="text-2xl font-outfit font-black tracking-wide">CuraFlow</span>
           </div>
           <button className="md:hidden text-white/70" onClick={()=>setIsSidebarOpen(false)}><X/></button>
        </div>
        <nav className="flex-1 px-3 space-y-1">
           {navItems.map(item => (
              <button 
                 key={item.id}
                 onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                 className={`w-full sidebar-link ${activeTab === item.id ? 'active' : ''}`}
              >
                 <item.icon size={20}/>
                 {item.label}
              </button>
           ))}
        </nav>
        <div className="p-5 mt-auto border-t border-white/10 m-3 rounded-2xl bg-black/10">
           <p className="text-xs text-teal-100/70 italic text-center">"Every heartbeat has a story. We help you tell it."</p>
        </div>
      </aside>

      <main className="flex-1 md:ml-[260px] w-full min-h-screen transition-all duration-300 flex flex-col">
          <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-teal-100 flex items-center px-4 py-3 md:hidden">
              <button onClick={()=>setIsSidebarOpen(true)} className="p-2 text-teal-800"><Menu size={24}/></button>
              <h1 className="ml-2 text-lg font-outfit font-bold text-teal-900">CuraFlow</h1>
          </header>
          
          <div className="flex-1 overflow-x-hidden">
             {activeTab === 'dashboard' && <Dashboard />}
             {activeTab === 'patients' && <PatientsPage />}
             {activeTab === 'doctors' && <DoctorsPage />}
             {activeTab === 'appointments' && <AppointmentsPage />}
             {activeTab === 'records' && <MedicalRecordsPage />}
             {activeTab === 'donations' && <DonationsPage />}
             {activeTab === 'analytics' && <AnalyticsPage />}
          </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppCode />
    </AppProvider>
  );
}

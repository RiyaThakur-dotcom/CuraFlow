import React, { createContext, useState, useEffect } from 'react';
import { SEED_PATIENTS, SEED_DOCTORS, SEED_APPOINTMENTS, SEED_RECORDS, SEED_DONATIONS } from './data';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => JSON.parse(localStorage.getItem('cura_patients')) || SEED_PATIENTS);
  const [doctors, setDoctors] = useState(() => JSON.parse(localStorage.getItem('cura_doctors')) || SEED_DOCTORS);
  const [appointments, setAppointments] = useState(() => JSON.parse(localStorage.getItem('cura_appointments')) || SEED_APPOINTMENTS);
  const [records, setRecords] = useState(() => JSON.parse(localStorage.getItem('cura_records')) || SEED_RECORDS);
  const [donations, setDonations] = useState(() => JSON.parse(localStorage.getItem('cura_donations')) || SEED_DONATIONS);
  const [toast, setToast] = useState(null);

  useEffect(() => localStorage.setItem('cura_patients', JSON.stringify(patients)), [patients]);
  useEffect(() => localStorage.setItem('cura_doctors', JSON.stringify(doctors)), [doctors]);
  useEffect(() => localStorage.setItem('cura_appointments', JSON.stringify(appointments)), [appointments]);
  useEffect(() => localStorage.setItem('cura_records', JSON.stringify(records)), [records]);
  useEffect(() => localStorage.setItem('cura_donations', JSON.stringify(donations)), [donations]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  const addPatient = (patient) => {
    setPatients([{ ...patient, id: `p${Date.now()}`, createdAt: new Date().toISOString().split('T')[0] }, ...patients]);
    showToast(`Welcome to CuraFlow, ${patient.name}. Your care journey starts here.`);
  };

  const deletePatient = (id, name) => {
    setPatients(patients.filter(p => p.id !== id));
    setAppointments(appointments.filter(a => a.patientId !== id));
    setRecords(records.filter(r => r.patientId !== id));
    showToast(`We've removed ${name}'s records. Every story eventually finds its close.`, 'danger');
  };

  const addDoctor = (doctor) => {
    setDoctors([{ ...doctor, id: `d${Date.now()}`, avatar: doctor.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase(), available: true }, ...doctors]);
    showToast(`Dr. ${doctor.name} has joined the healing team.`);
  };

  const toggleDoctorStatus = (id) => {
    setDoctors(doctors.map(d => d.id === id ? { ...d, available: !d.available } : d));
  };

  const bookAppointment = (app) => {
    setAppointments([{ ...app, id: `a${Date.now()}`, status: 'scheduled' }, ...appointments]);
    showToast(`Appointment saved. Someone just got a little closer to feeling better.`);
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
    if (status === 'done') showToast('Appointment completed. Another step forward.');
    if (status === 'cancelled') showToast('Appointment cancelled. Hope they feel better soon.', 'danger');
  };

  const addRecord = (record) => {
    setRecords([{ ...record, id: `r${Date.now()}`, date: new Date().toISOString().split('T')[0] }, ...records]);
    showToast(`Health record added. The story continues.`);
  };

  const addDonation = (donation) => {
    setDonations([{ ...donation, id: `dn${Date.now()}`, date: new Date().toISOString().split('T')[0] }, ...donations]);
    showToast(`Thank you, ${donation.name || 'Friend'}. Your kindness will heal someone today.`);
  };

  return (
    <AppContext.Provider value={{
      patients, doctors, appointments, records, donations,
      addPatient, deletePatient, addDoctor, toggleDoctorStatus,
      bookAppointment, updateAppointmentStatus, addRecord, addDonation,
      toast
    }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`glass-card toast-enter px-6 py-4 flex items-start gap-4 max-w-sm
            ${toast.type === 'danger' ? 'border-red-200' : 'border-teal-200'}`}>
            <div className={`mt-1 h-3 w-3 rounded-full shrink-0 ${toast.type === 'danger' ? 'bg-red-500' : 'bg-teal-500'}`}></div>
            <p className="text-gray-800 font-medium text-sm leading-relaxed">{toast.message}</p>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};

import React, { useContext, useState, useEffect } from 'react';
import { Users, HeartPulse, Stethoscope, Calendar, Search, Plus, MapPin, Phone, Droplet, User, Quote, AlertCircle, CalendarCheck, Clock, FileText, Gift, LayoutDashboard, ChevronRight, Menu, Activity, ShieldCheck, Heart } from 'lucide-react';
import { AppContext } from './AppContext';

const Dashboard = () => {
  const { patients, appointments, doctors, donations } = useContext(AppContext);
  const todaysApps = appointments.filter(a => a.date === new Date().toISOString().split('T')[0]);
  const availableDocs = doctors.filter(d => d.available).length;
  const totalRaised = donations.reduce((sum, d) => sum + Number(d.amount), 0);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="page-enter pb-10">
      <div className="mb-8 p-8 rounded-[2rem] bg-gradient-to-br from-teal-600 to-teal-900 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-10 -mt-20 blur-2xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-outfit mb-2 flex items-center gap-3">
              {getGreeting()}, Dr. Sarah <span className="animate-bounce">👋</span>
            </h1>
            <p className="text-teal-100 text-lg">You have {todaysApps.length} lives to touch today.</p>
          </div>
          <div className="flex gap-3 bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/20">
            <div className="text-center px-4 py-2">
              <span className="block text-2xl font-bold">{patients.length}</span>
              <span className="text-xs text-teal-200 uppercase tracking-wider font-semibold">Total Patients</span>
            </div>
            <div className="w-px bg-white/20"></div>
            <div className="text-center px-4 py-2">
              <span className="block text-2xl font-bold">₹{totalRaised.toLocaleString('en-IN')}</span>
              <span className="text-xs text-teal-200 uppercase tracking-wider font-semibold">Funds Raised</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Today's Focus</h3>
            <div className="p-3 rounded-xl bg-teal-50 text-teal-600 group-hover:scale-110 transition-transform">
              <CalendarCheck size={24} />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800 font-outfit">{todaysApps.length}</p>
          <p className="text-sm text-gray-500 mt-2">Scheduled appointments</p>
        </div>
        <div className="stat-card group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Ready to Help</h3>
            <div className="p-3 rounded-xl bg-sky-50 text-sky-600 group-hover:scale-110 transition-transform">
              <Stethoscope size={24} />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800 font-outfit">{availableDocs}<span className="text-xl text-gray-400">/{doctors.length}</span></p>
          <p className="text-sm text-gray-500 mt-2">Doctors currently available</p>
        </div>
        <div className="stat-card group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Patient Care</h3>
            <div className="p-3 rounded-xl bg-rose-50 text-rose-600 group-hover:scale-110 transition-transform pulse-soft">
              <HeartPulse size={24} />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800 font-outfit border-b border-rose-100 inline-block pb-1">98%</p>
          <p className="text-sm text-gray-500 mt-2">Recovery rate this month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="text-xl font-bold font-outfit mb-6 flex items-center gap-2 text-gray-800">
            <Activity className="text-teal-500" /> Recent Appointments
          </h2>
          {todaysApps.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-sm text-gray-400 uppercase tracking-wider">
                    <th className="pb-4 font-semibold pl-4">Patient</th>
                    <th className="pb-4 font-semibold">Time</th>
                    <th className="pb-4 font-semibold">Doctor</th>
                    <th className="pb-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todaysApps.slice(0, 5).map((app, i) => (
                    <tr key={i} className="hover:bg-teal-50/50 transition-colors border-b border-gray-50 last:border-0">
                      <td className="py-4 pl-4 font-medium text-gray-800">{app.patientName}</td>
                      <td className="py-4">
                        <span className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-md w-fit">
                          <Clock size={14} /> {app.time}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold">
                          {app.doctorName.replace('Dr. ', '').split(' ').map(n=>n[0]).join('')}
                        </div>
                        {app.doctorName}
                      </td>
                      <td className="py-4">
                        {app.status === 'scheduled' && <span className="badge badge-sky"><Activity size={12}/> Scheduled</span>}
                        {app.status === 'done' && <span className="badge badge-green"><ShieldCheck size={12}/> Completed</span>}
                        {app.status === 'cancelled' && <span className="badge badge-rose"><AlertCircle size={12}/> Cancelled</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <Calendar size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium font-outfit">No appointments for today.</p>
              <p className="text-sm text-gray-400 mt-1">A quiet day is a healthy day.</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {patients.length > 0 && (
            <div className="relative p-[2px] rounded-2xl bg-gradient-to-br from-teal-400 via-sky-400 to-rose-400">
              <div className="bg-white rounded-[14px] p-6 h-full text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-teal-400 to-rose-400"></div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                  <Heart className="text-rose-400" size={16} /> Patient Spotlight
                </h3>
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-100 to-teal-50 rounded-full flex items-center justify-center shadow-inner mb-4">
                  <span className="text-2xl font-bold text-teal-700">{patients[0].name[0]}</span>
                </div>
                <h4 className="font-outfit font-bold text-xl text-gray-800">{patients[0].name}</h4>
                <div className="mt-4 relative">
                  <Quote size={24} className="text-teal-100 absolute -top-2 -left-2 transform -scale-x-100" />
                  <p className="text-gray-600 text-sm italic relative z-10 px-4 leading-relaxed">"{patients[0].note}"</p>
                  <Quote size={24} className="text-teal-100 absolute -bottom-2 -right-2" />
                </div>
              </div>
            </div>
          )}

          <div className="glass-card p-6 outline outline-1 outline-teal-100">
            <h3 className="font-bold text-gray-800 mb-4 font-outfit">Weekly Activity</h3>
            <div className="flex items-end justify-between h-32 gap-2">
              {[40, 70, 45, 90, 65, 30, 50].map((h, i) => (
                <div key={i} className="w-1/7 flex flex-col items-center gap-2 group">
                  <div className="w-full bg-teal-50 rounded-t-md relative overflow-hidden h-[100px] flex items-end">
                    <div 
                      className="w-full bg-gradient-to-t from-teal-600 to-teal-400 rounded-t-md transition-all duration-500 group-hover:from-teal-500 group-hover:to-teal-300"
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{'SMTWTFS'[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pages = { Dashboard };
export default Pages;

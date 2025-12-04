import React, { useState } from 'react';
import { UserProfile, Language } from '../types';

interface ProfileEditorProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onCancel: () => void;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, onSave, onCancel }) => {
  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isSi = formData.language === Language.SINHALA;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-brand-50">
          <h2 className="text-xl font-bold text-brand-900">
            {isSi ? 'පැතිකඩ සකසන්න' : 'Edit Profile'}
          </h2>
          <button onClick={onCancel} className="text-neutral-400 hover:text-neutral-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-4 scrollbar-hide">
            {/* Name */}
            <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">{isSi ? 'නම' : 'Name'}</label>
                <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-black placeholder-neutral-400 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                />
            </div>
            
            {/* Email */}
            <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">{isSi ? 'විද්‍යුත් තැපෑල' : 'Email'}</label>
                <input 
                    type="email" 
                    value={formData.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-black placeholder-neutral-400 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                    placeholder="example@mail.com"
                />
            </div>

            {/* Birthday */}
            <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">{isSi ? 'උපන් දිනය' : 'Birthday'}</label>
                <input 
                    type="date" 
                    value={formData.birthday || ''}
                    onChange={(e) => handleChange('birthday', e.target.value)}
                    className="w-full p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-black placeholder-neutral-400 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                />
            </div>

            {/* Sex & Civil Status Row */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">{isSi ? 'ස්ත්‍රී/පුරුෂ භාවය' : 'Sex'}</label>
                    <div className="relative">
                        <select 
                            value={formData.sex || ''}
                            onChange={(e) => handleChange('sex', e.target.value)}
                            className="w-full p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-black appearance-none focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                        >
                            <option value="">{isSi ? 'තෝරන්න' : 'Select'}</option>
                            <option value="Male">{isSi ? 'පුරුෂ' : 'Male'}</option>
                            <option value="Female">{isSi ? 'ස්ත්‍රී' : 'Female'}</option>
                            <option value="Other">{isSi ? 'වෙනත්' : 'Other'}</option>
                            <option value="Prefer not to say">{isSi ? 'පැවසීමට අකමැතිය' : 'Prefer not to say'}</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-neutral-500">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                             </svg>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">{isSi ? 'විවාහක අවිවාහක බව' : 'Civil Status'}</label>
                    <div className="relative">
                        <select 
                            value={formData.civilStatus || ''}
                            onChange={(e) => handleChange('civilStatus', e.target.value)}
                            className="w-full p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-black appearance-none focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                        >
                            <option value="">{isSi ? 'තෝරන්න' : 'Select'}</option>
                            <option value="Single">{isSi ? 'අවිවාහක' : 'Single'}</option>
                            <option value="Married">{isSi ? 'විවාහක' : 'Married'}</option>
                            <option value="Divorced">{isSi ? 'දික්කසාද' : 'Divorced'}</option>
                            <option value="Widowed">{isSi ? 'වැන්දඹු' : 'Widowed'}</option>
                            <option value="Other">{isSi ? 'වෙනත්' : 'Other'}</option>
                        </select>
                         <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-neutral-500">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                             </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* City */}
            <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">{isSi ? 'නගරය' : 'City'}</label>
                <input 
                    type="text" 
                    value={formData.city || ''}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-black placeholder-neutral-400 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                    placeholder="Colombo"
                />
            </div>

            {/* Language */}
             <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">{isSi ? 'භාෂාව' : 'Language'}</label>
                <div className="flex gap-2">
                    <button 
                        onClick={() => handleChange('language', Language.SINHALA)}
                        className={`flex-1 p-3 rounded-xl border transition-all font-semibold ${formData.language === Language.SINHALA ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-200' : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'}`}
                    >
                        සිංහල
                    </button>
                    <button 
                         onClick={() => handleChange('language', Language.ENGLISH)}
                        className={`flex-1 p-3 rounded-xl border transition-all font-semibold ${formData.language === Language.ENGLISH ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-200' : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'}`}
                    >
                        English
                    </button>
                </div>
            </div>
        </div>

        <div className="p-6 border-t border-neutral-100 flex gap-3 bg-neutral-50">
             <button onClick={onCancel} className="flex-1 py-3 rounded-xl font-bold text-neutral-600 hover:bg-neutral-200 transition bg-white border border-neutral-200">
                {isSi ? 'අවලංගු කරන්න' : 'Cancel'}
             </button>
             <button onClick={() => onSave(formData)} className="flex-1 py-3 rounded-xl font-bold bg-brand-600 text-white hover:bg-brand-700 transition shadow-lg shadow-brand-200">
                {isSi ? 'සුරකින්න' : 'Save Changes'}
             </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
import { useState } from 'react';
import { useStore, Department } from '../store';
import { ArrowLeft } from 'lucide-react';

const departments: Department[] = ['CSE', 'EEE', 'Civil', 'Mechanical', 'Cyber Security', 'Other'];

const gigImages = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
];

export function CreateGigPage() {
  const { currentUser, createGig, setPage } = useStore();
  const [form, setForm] = useState({
    title: '', description: '', department: 'CSE' as Department,
    price: '', deliveryDays: '', tags: '', imageIndex: 0,
  });

  if (!currentUser) { setPage('login'); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createGig({
      sellerId: currentUser.id,
      title: form.title,
      description: form.description,
      department: form.department,
      price: parseInt(form.price),
      deliveryDays: parseInt(form.deliveryDays),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      image: gigImages[form.imageIndex],
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => setPage('gigs')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create a New Gig</h1>
        <p className="text-gray-500 mb-6">Showcase your skills and start earning</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gig Title</label>
            <input
              type="text" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="I will..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={form.department} onChange={e => setForm({ ...form, department: e.target.value as Department })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (BDT)</label>
              <input
                type="number" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. 3000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Days</label>
              <input
                type="number" required value={form.deliveryDays} onChange={e => setForm({ ...form, deliveryDays: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. 5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
              <input
                type="text" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="React, Web Design..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Describe your gig in detail..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Choose a Cover Image</label>
            <div className="grid grid-cols-3 gap-3">
              {gigImages.map((img, i) => (
                <button
                  key={i} type="button" onClick={() => setForm({ ...form, imageIndex: i })}
                  className={`rounded-xl overflow-hidden border-2 transition-all ${
                    form.imageIndex === i ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full py-3.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
            Publish Gig
          </button>
        </form>
      </div>
    </div>
  );
}

export function CreateJobPage() {
  const { currentUser, createJob, setPage } = useStore();
  const [form, setForm] = useState({
    title: '', description: '', department: 'CSE' as Department,
    budget: '', deadline: '', skills: '',
  });

  if (!currentUser) { setPage('login'); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createJob({
      clientId: currentUser.id,
      title: form.title,
      description: form.description,
      department: form.department,
      budget: parseInt(form.budget),
      deadline: form.deadline,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => setPage('jobs')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Post a New Job</h1>
        <p className="text-gray-500 mb-6">Find talented students to help with your project</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input
              type="text" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. Need a Backend Developer for..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={form.department} onChange={e => setForm({ ...form, department: e.target.value as Department })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget (BDT)</label>
              <input
                type="number" required value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. 5000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
              <input
                type="date" required value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills (comma separated)</label>
            <input
              type="text" value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="React, Node.js, MongoDB..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Describe the job requirements in detail..."
            />
          </div>

          <button type="submit" className="w-full py-3.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}

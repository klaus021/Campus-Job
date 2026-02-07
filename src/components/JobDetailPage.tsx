import { ArrowLeft, Calendar, Clock, Users, Star, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store';

export function JobDetailPage() {
  const { selectedJobId, getJobById, getUserById, currentUser, setPage, applyToJob, applications, acceptApplication } = useStore();
  const [coverLetter, setCoverLetter] = useState('');
  const [proposedBudget, setProposedBudget] = useState('');
  const [showApply, setShowApply] = useState(false);

  const job = selectedJobId ? getJobById(selectedJobId) : null;
  if (!job) return <div className="text-center py-20 text-gray-500">Job not found</div>;

  const client = getUserById(job.clientId);
  const jobApps = applications.filter(a => a.jobId === job.id);
  const hasApplied = currentUser && job.applicants.includes(currentUser.id);
  const isOwner = currentUser?.id === job.clientId;

  const handleApply = () => {
    if (!currentUser) { setPage('login'); return; }
    if (!coverLetter.trim() || !proposedBudget) return;
    applyToJob(job.id, coverLetter, parseInt(proposedBudget));
    setCoverLetter('');
    setProposedBudget('');
    setShowApply(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => { useStore.getState().setSelectedJob(null); }} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Jobs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                job.status === 'open' ? 'bg-green-100 text-green-700' :
                job.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                {job.department}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{job.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Deadline: {new Date(job.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Posted: {job.createdAt}
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {job.applicants.length} proposals
              </div>
            </div>

            <div className="text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm rounded-full font-medium">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Apply Section */}
          {!isOwner && job.status === 'open' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              {hasApplied ? (
                <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 rounded-xl p-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">You have already applied to this job!</span>
                </div>
              ) : showApply ? (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Submit Your Proposal</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                      <textarea
                        value={coverLetter}
                        onChange={e => setCoverLetter(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Tell the client why you're the best fit for this job..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Proposed Budget (BDT)</label>
                      <input
                        type="number"
                        value={proposedBudget}
                        onChange={e => setProposedBudget(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder={`Client's budget: ৳${job.budget.toLocaleString()}`}
                      />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={handleApply} className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2">
                        <Send className="w-4 h-4" /> Submit Proposal
                      </button>
                      <button onClick={() => setShowApply(false)} className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => currentUser ? setShowApply(true) : setPage('login')}
                  className="w-full py-3.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Apply Now
                </button>
              )}
            </div>
          )}

          {/* Applications (for job owner) */}
          {isOwner && jobApps.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Applications ({jobApps.length})</h3>
              <div className="space-y-4">
                {jobApps.map(app => {
                  const freelancer = getUserById(app.freelancerId);
                  return (
                    <div key={app.id} className="border border-gray-100 rounded-xl p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold">
                            {freelancer?.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{freelancer?.name}</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="text-sm text-gray-500">{freelancer?.rating} • {freelancer?.department}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">৳{app.proposedBudget.toLocaleString()}</div>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            app.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>{app.status}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-3">{app.coverLetter}</p>
                      {app.status === 'pending' && (
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); acceptApplication(app.id); }}
                            className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700"
                          >
                            Accept
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-center mb-4">
                <div className="text-sm text-gray-500 mb-1">Budget</div>
                <div className="text-3xl font-bold text-gray-900">৳{job.budget.toLocaleString()}</div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Posted by</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
                    {client?.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{client?.name}</p>
                    <p className="text-sm text-gray-500">{client?.department}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-gray-500">{client?.rating} ({client?.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

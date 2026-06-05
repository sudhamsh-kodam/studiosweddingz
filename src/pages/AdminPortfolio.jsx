import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, Download, Upload, X, ChevronDown, ChevronUp, Image, Users, Calendar, MapPin, FolderPlus } from 'lucide-react';

const AdminPortfolio = () => {
  const [couples, setCouples] = useState([]);
  const [expandedCouple, setExpandedCouple] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');
  const fileInputRef = useRef(null);

  // Load data on mount
  useEffect(() => {
    fetch('/portfolio/data.json')
      .then(res => res.json())
      .then(data => setCouples(data.couples || []))
      .catch(() => setCouples([]));
  }, []);

  const generateSlug = (names) => {
    return names.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const addCouple = () => {
    const newCouple = {
      id: `couple-${Date.now()}`,
      names: '',
      date: '',
      location: '',
      thumbnail: '',
      events: [{ name: 'Wedding', photos: [] }]
    };
    setCouples(prev => [...prev, newCouple]);
    setExpandedCouple(newCouple.id);
  };

  const updateCouple = (coupleId, field, value) => {
    setCouples(prev => prev.map(c => {
      if (c.id !== coupleId) return c;
      const updated = { ...c, [field]: value };
      if (field === 'names') {
        updated.id = generateSlug(value) || coupleId;
      }
      return updated;
    }));
  };

  const removeCouple = (coupleId) => {
    if (confirm('Are you sure you want to delete this couple entry?')) {
      setCouples(prev => prev.filter(c => c.id !== coupleId));
    }
  };

  const addEvent = (coupleId) => {
    setCouples(prev => prev.map(c => {
      if (c.id !== coupleId) return c;
      return { ...c, events: [...c.events, { name: '', photos: [] }] };
    }));
  };

  const updateEventName = (coupleId, eventIndex, newName) => {
    setCouples(prev => prev.map(c => {
      if (c.id !== coupleId) return c;
      const events = [...c.events];
      events[eventIndex] = { ...events[eventIndex], name: newName };
      return { ...c, events };
    }));
  };

  const removeEvent = (coupleId, eventIndex) => {
    setCouples(prev => prev.map(c => {
      if (c.id !== coupleId) return c;
      return { ...c, events: c.events.filter((_, i) => i !== eventIndex) };
    }));
  };

  const addPhotoPath = (coupleId, eventIndex, path) => {
    setCouples(prev => prev.map(c => {
      if (c.id !== coupleId) return c;
      const events = [...c.events];
      events[eventIndex] = { ...events[eventIndex], photos: [...events[eventIndex].photos, path] };
      return { ...c, events };
    }));
  };

  const removePhoto = (coupleId, eventIndex, photoIndex) => {
    setCouples(prev => prev.map(c => {
      if (c.id !== coupleId) return c;
      const events = [...c.events];
      events[eventIndex] = { ...events[eventIndex], photos: events[eventIndex].photos.filter((_, i) => i !== photoIndex) };
      return { ...c, events };
    }));
  };

  const handleSave = () => {
    const data = JSON.stringify({ couples }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
    setSaveStatus('Downloaded! Replace public/portfolio/data.json with this file.');
    setTimeout(() => setSaveStatus(''), 5000);
  };

  const handleImportJson = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.couples) {
          setCouples(data.couples);
          setSaveStatus('Imported successfully!');
          setTimeout(() => setSaveStatus(''), 3000);
        }
      } catch {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const scanFolder = (coupleId, eventIndex) => {
    const couple = couples.find(c => c.id === coupleId);
    if (!couple) return;
    const folderPath = prompt(
      'Enter the folder path relative to public/portfolio/couples/\n\n' +
      `e.g., ${couple.id}/\n\n` +
      'Photos in this folder will be auto-detected.'
    );
    if (!folderPath) return;
    alert(
      'To add photos from a folder:\n\n' +
      '1. Copy your photos to:\n' +
      `   public/portfolio/couples/${folderPath}\n\n` +
      '2. Then manually add the photo paths below, one per line:\n' +
      `   /portfolio/couples/${folderPath}/filename.jpg`
    );
  };

  const bulkAddPhotos = (coupleId, eventIndex) => {
    const couple = couples.find(c => c.id === coupleId);
    if (!couple) return;
    const input = prompt(
      'Enter photo paths (one per line).\n\n' +
      `Tip: For folder "${couple.id}", use:\n` +
      `/portfolio/couples/${couple.id}/filename.jpg\n\n` +
      'You can paste multiple lines:'
    );
    if (!input) return;
    const paths = input.split('\n').map(p => p.trim()).filter(Boolean);
    setCouples(prev => prev.map(c => {
      if (c.id !== coupleId) return c;
      const events = [...c.events];
      events[eventIndex] = { ...events[eventIndex], photos: [...events[eventIndex].photos, ...paths] };
      return { ...c, events };
    }));
  };

  return (
    <main className="pt-24 pb-20 bg-noir min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="font-cormorant text-gold text-xs uppercase tracking-[0.3em] mb-2">Admin</p>
          <h1 className="font-playfair text-ivory text-3xl md:text-4xl mb-3">Portfolio Manager</h1>
          <p className="text-ivory/40 font-inter text-sm">Manage wedding couple galleries. Add couples, organize events, and reference photo paths.</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={addCouple}
            className="flex items-center gap-2 px-5 py-2.5 bg-gold text-noir text-sm font-inter font-medium rounded-sm hover:shadow-lg hover:shadow-gold/20 transition-all"
          >
            <Plus size={16} /> Add Couple
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 border border-gold/30 text-gold text-sm font-inter rounded-sm hover:bg-gold/10 transition-all"
          >
            <Download size={16} /> Download data.json
          </button>
          <label className="flex items-center gap-2 px-5 py-2.5 border border-ivory/15 text-ivory/60 text-sm font-inter rounded-sm hover:border-ivory/30 hover:text-ivory transition-all cursor-pointer">
            <Upload size={16} /> Import JSON
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
            />
          </label>
        </div>

        {/* Save Status */}
        <AnimatePresence>
          {saveStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 px-4 py-3 bg-gold/10 border border-gold/30 rounded-sm text-gold text-sm font-inter"
            >
              {saveStatus}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Couples List */}
        <div className="space-y-4">
          {couples.length === 0 && (
            <div className="text-center py-20 border border-dashed border-ivory/10 rounded-sm">
              <Users size={40} className="mx-auto text-ivory/15 mb-4" />
              <p className="text-ivory/30 font-inter text-sm mb-4">No couples yet. Add your first wedding story!</p>
              <button onClick={addCouple} className="text-gold text-sm font-inter hover:underline">+ Add Couple</button>
            </div>
          )}

          {couples.map((couple, coupleIdx) => {
            const isExpanded = expandedCouple === couple.id;
            const totalPhotos = couple.events.reduce((s, e) => s + e.photos.length, 0);

            return (
              <motion.div
                key={couple.id}
                layout
                className="border border-ivory/10 rounded-sm overflow-hidden bg-noir-900"
              >
                {/* Couple Header */}
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-ivory/5 transition-colors"
                  onClick={() => setExpandedCouple(isExpanded ? null : couple.id)}
                >
                  <div className="flex items-center gap-4">
                    {couple.thumbnail ? (
                      <img src={couple.thumbnail} alt="" className="w-12 h-12 rounded-full object-cover border border-gold/20" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-ivory/5 flex items-center justify-center">
                        <Users size={18} className="text-ivory/30" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-playfair text-ivory text-lg">{couple.names || 'New Couple'}</h3>
                      <div className="flex items-center gap-3 text-ivory/40 text-xs font-inter mt-0.5">
                        <span>{couple.events.length} event{couple.events.length !== 1 ? 's' : ''}</span>
                        <span>·</span>
                        <span>{totalPhotos} photo{totalPhotos !== 1 ? 's' : ''}</span>
                        {couple.location && <><span>·</span><span>{couple.location}</span></>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); removeCouple(couple.id); }}
                      className="p-2 text-ivory/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    {isExpanded ? <ChevronUp size={18} className="text-ivory/40" /> : <ChevronDown size={18} className="text-ivory/40" />}
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-ivory/10"
                    >
                      <div className="p-5 space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-ivory/40 text-xs font-inter mb-1.5 uppercase tracking-wider">Couple Names</label>
                            <input
                              type="text"
                              value={couple.names}
                              onChange={(e) => updateCouple(couple.id, 'names', e.target.value)}
                              placeholder="e.g., Priya & Arjun"
                              className="w-full bg-noir border border-ivory/15 rounded-sm px-3 py-2.5 text-ivory font-inter text-sm focus:border-gold/50 focus:outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-ivory/40 text-xs font-inter mb-1.5 uppercase tracking-wider">Location</label>
                            <input
                              type="text"
                              value={couple.location}
                              onChange={(e) => updateCouple(couple.id, 'location', e.target.value)}
                              placeholder="e.g., Hyderabad"
                              className="w-full bg-noir border border-ivory/15 rounded-sm px-3 py-2.5 text-ivory font-inter text-sm focus:border-gold/50 focus:outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-ivory/40 text-xs font-inter mb-1.5 uppercase tracking-wider">Wedding Date</label>
                            <input
                              type="date"
                              value={couple.date}
                              onChange={(e) => updateCouple(couple.id, 'date', e.target.value)}
                              className="w-full bg-noir border border-ivory/15 rounded-sm px-3 py-2.5 text-ivory font-inter text-sm focus:border-gold/50 focus:outline-none transition-colors [color-scheme:dark]"
                            />
                          </div>
                          <div>
                            <label className="block text-ivory/40 text-xs font-inter mb-1.5 uppercase tracking-wider">Thumbnail Path</label>
                            <input
                              type="text"
                              value={couple.thumbnail}
                              onChange={(e) => updateCouple(couple.id, 'thumbnail', e.target.value)}
                              placeholder="/portfolio/couples/slug/photo.jpg"
                              className="w-full bg-noir border border-ivory/15 rounded-sm px-3 py-2.5 text-ivory font-inter text-sm focus:border-gold/50 focus:outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div className="text-ivory/20 text-[10px] font-inter">
                          Slug: <code className="text-gold/60">{couple.id}</code> — Photos folder: <code className="text-gold/60">public/portfolio/couples/{couple.id}/</code>
                        </div>

                        {/* Events */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-ivory/60 text-sm font-inter font-medium uppercase tracking-wider">Events</h4>
                            <button
                              onClick={() => addEvent(couple.id)}
                              className="flex items-center gap-1 text-gold text-xs font-inter hover:underline"
                            >
                              <Plus size={12} /> Add Event
                            </button>
                          </div>

                          {couple.events.map((event, evIdx) => (
                            <div key={evIdx} className="mb-4 p-4 bg-ivory/[0.02] border border-ivory/8 rounded-sm">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <select
                                    value={event.name}
                                    onChange={(e) => updateEventName(couple.id, evIdx, e.target.value)}
                                    className="bg-noir border border-ivory/15 rounded-sm px-2 py-1.5 text-ivory font-inter text-sm focus:border-gold/50 focus:outline-none"
                                  >
                                    <option value="">Select Event</option>
                                    <option value="Engagement">Engagement</option>
                                    <option value="Haldi">Haldi</option>
                                    <option value="Mehendi">Mehendi</option>
                                    <option value="Sangeet">Sangeet</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Reception">Reception</option>
                                    <option value="Pre-Wedding">Pre-Wedding</option>
                                    <option value="Cocktail">Cocktail</option>
                                    <option value="Other">Other</option>
                                  </select>
                                  <span className="text-ivory/30 text-xs font-inter">{event.photos.length} photos</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => bulkAddPhotos(couple.id, evIdx)}
                                    className="p-1.5 text-ivory/30 hover:text-gold transition-colors" title="Bulk add photo paths"
                                  >
                                    <FolderPlus size={14} />
                                  </button>
                                  <button
                                    onClick={() => removeEvent(couple.id, evIdx)}
                                    className="p-1.5 text-ivory/20 hover:text-red-400 transition-colors" title="Remove event"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>

                              {/* Photo list */}
                              {event.photos.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-3">
                                  {event.photos.slice(0, 12).map((photo, pIdx) => (
                                    <div key={pIdx} className="relative group">
                                      <img
                                        src={photo}
                                        alt=""
                                        className="w-full aspect-square object-cover rounded-sm border border-ivory/10"
                                        onError={(e) => { e.target.src = ''; e.target.className = 'w-full aspect-square bg-ivory/5 rounded-sm border border-ivory/10 flex items-center justify-center'; }}
                                      />
                                      <button
                                        onClick={() => removePhoto(couple.id, evIdx, pIdx)}
                                        className="absolute top-1 right-1 w-5 h-5 bg-noir/80 rounded-full flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <X size={10} />
                                      </button>
                                    </div>
                                  ))}
                                  {event.photos.length > 12 && (
                                    <div className="w-full aspect-square bg-ivory/5 rounded-sm border border-ivory/10 flex items-center justify-center text-ivory/30 text-xs font-inter">
                                      +{event.photos.length - 12} more
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Add single photo */}
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder={`/portfolio/couples/${couple.id}/filename.jpg`}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                      addPhotoPath(couple.id, evIdx, e.target.value.trim());
                                      e.target.value = '';
                                    }
                                  }}
                                  className="flex-1 bg-noir border border-ivory/15 rounded-sm px-3 py-2 text-ivory font-inter text-xs focus:border-gold/50 focus:outline-none transition-colors placeholder:text-ivory/20"
                                />
                                <button
                                  onClick={(e) => {
                                    const input = e.target.closest('.flex').querySelector('input');
                                    if (input.value.trim()) {
                                      addPhotoPath(couple.id, evIdx, input.value.trim());
                                      input.value = '';
                                    }
                                  }}
                                  className="px-3 py-2 bg-ivory/5 border border-ivory/15 text-ivory/50 text-xs font-inter rounded-sm hover:border-gold/30 hover:text-gold transition-all"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-10 p-4 bg-ivory/[0.02] border border-ivory/8 rounded-sm">
          <h4 className="text-gold text-xs font-inter font-medium uppercase tracking-wider mb-2">How to add photos</h4>
          <ol className="text-ivory/40 text-xs font-inter space-y-1.5 list-decimal list-inside">
            <li>Copy your couple's photos into: <code className="text-gold/60">public/portfolio/couples/&lt;couple-slug&gt;/</code></li>
            <li>Create a couple entry above and add photo paths referencing those files</li>
            <li>Click "Download data.json" and replace <code className="text-gold/60">public/portfolio/data.json</code> with it</li>
            <li>Your photos will appear on the Portfolio page instantly</li>
          </ol>
        </div>
      </div>
    </main>
  );
};

export default AdminPortfolio;

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ImagePlus, LogOut, Plus, Save, Trash2, X } from 'lucide-react';
import { useRouter } from '../router';

type Tab = 'clients' | 'gallery' | 'testimonials' | 'enquiries' | 'admins';
type ContentTab = Extract<Tab, 'clients' | 'gallery' | 'testimonials'>;
type RecordItem = Record<string, unknown> & { id?: string };
interface ApiResult { success?: boolean; message?: string; data?: unknown; }

const tabs: Tab[] = ['clients', 'gallery', 'testimonials', 'enquiries', 'admins'];
const categories = [
  { value: 'cctv', label: 'CCTV Systems' },
  { value: 'booster', label: 'Signal Boosters' },
  { value: 'gates', label: 'Automatic Gates' },
  { value: 'access', label: 'Access Control' },
  { value: 'equipment', label: 'Security Equipment' },
  { value: 'automation', label: 'Home Automation' },
];
const fields: Record<ContentTab, string[]> = {
  clients: ['name', 'industry', 'image', 'order', 'active'],
  gallery: ['title', 'category', 'image', 'caption', 'order', 'active'],
  testimonials: ['name', 'avatar', 'quote', 'clientReference', 'context', 'rating', 'order', 'active'],
};
const labels: Record<string, string> = {
  name: 'Name', industry: 'Industry or business type', image: 'Image URL', title: 'Gallery title',
  category: 'Equipment category', caption: 'Short description', avatar: 'Reviewer photo URL',
  quote: 'Testimonial text', clientReference: 'Client name or role', context: 'Project and location',
  order: 'Display order', rating: 'Rating (1–5)', active: 'Show on website',
};
const inputClass = 'mt-1.5 w-full rounded-sm border border-rule bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-blue focus:ring-2 focus:ring-blue/10';

export const AdminPage: React.FC = () => {
  const { navigate } = useRouter();
  const [token, setToken] = useState(() => localStorage.getItem('starmax_admin_token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<Tab>('clients');
  const [items, setItems] = useState<RecordItem[]>([]);
  const [selected, setSelected] = useState<RecordItem>({});
  const [notice, setNotice] = useState('');
  const [noticeType, setNoticeType] = useState<'error' | 'success'>('success');
  const [busy, setBusy] = useState(false);

  const request = async (url: string, init: RequestInit = {}): Promise<ApiResult> => {
    const response = await fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...init.headers,
      },
    });
    const result = await response.json().catch(() => ({})) as ApiResult;
    if (response.status === 401) {
      localStorage.removeItem('starmax_admin_token');
      setToken('');
    }
    if (!response.ok) throw new Error(result.message || 'The request could not be completed.');
    return result;
  };

  const loadItems = async (selectedTab: Tab) => {
    const url = selectedTab === 'admins'
      ? '/api/admin/admins'
      : selectedTab === 'enquiries' ? '/api/admin/enquiries' : `/api/admin/content/${selectedTab}`;
    const result = await request(url);
    setItems(Array.isArray(result.data) ? result.data as RecordItem[] : []);
  };

  useEffect(() => { document.title = 'Admin panel | Starmax Systems'; }, []);
  useEffect(() => {
    if (!token) return;
    let live = true;
    setNotice('');
    setSelected({});
    setItems([]);
    setBusy(true);
    loadItems(tab)
      .catch((error: unknown) => { if (live) { setNotice(error instanceof Error ? error.message : 'Could not load this section.'); setNoticeType('error'); } })
      .finally(() => { if (live) setBusy(false); });
    return () => { live = false; };
  }, [tab, token]);

  useEffect(() => {
    if (!token || tab !== 'enquiries') return;
    const refreshTimer = window.setInterval(() => {
      loadItems('enquiries').catch((error: unknown) => {
        setNotice(error instanceof Error ? error.message : 'Could not refresh requests.');
        setNoticeType('error');
      });
    }, 15000);
    return () => window.clearInterval(refreshTimer);
  }, [tab, token]);

  const login = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setNotice('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const result = await response.json().catch(() => ({})) as ApiResult & { data?: { token?: string } };
      if (!response.ok || !result.data?.token) throw new Error(result.message || 'Sign in failed. Check your email and password.');
      localStorage.setItem('starmax_admin_token', result.data.token);
      setToken(result.data.token); setNoticeType('success');
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Sign in failed.'); setNoticeType('error'); }
    finally { setBusy(false); }
  };

  const updateField = (field: string, value: string | number | boolean) => {
    setSelected((current) => ({ ...current, [field]: value }));
  };

  const startNewItem = () => {
    setSelected({ active: true, order: items.length + 1, ...(tab === 'gallery' ? { category: 'cctv' } : {}), ...(tab === 'testimonials' ? { rating: 5 } : {}) });
    setNotice('');
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (tab === 'enquiries' || tab === 'admins') return;
    const contentTab = tab as ContentTab;
    const required = contentTab === 'clients' ? ['name'] : contentTab === 'gallery' ? ['title', 'category', 'image', 'caption'] : ['name', 'quote'];
    if (required.some((field) => !String(selected[field] ?? '').trim())) {
      setNotice('Complete the required fields before saving.'); setNoticeType('error'); return;
    }
    const payload = { ...selected };
    if (contentTab === 'clients' && payload.image) payload.logo = payload.image;
    if (contentTab === 'gallery') payload.categoryLabel = categories.find((item) => item.value === payload.category)?.label || 'Security Equipment';
    setBusy(true); setNotice('');
    try {
      await request(`/api/admin/content/${contentTab}`, { method: 'POST', body: JSON.stringify(payload) });
      await loadItems(contentTab); setSelected({});
      setNotice('Saved and published to the website.'); setNoticeType('success');
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Could not save this item.'); setNoticeType('error'); }
    finally { setBusy(false); }
  };

  const uploadImage = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setNotice('Choose an image file.'); setNoticeType('error'); return; }
    if (file.size > 7 * 1024 * 1024) { setNotice('Images must be 7 MB or smaller.'); setNoticeType('error'); return; }
    setBusy(true); setNotice('Uploading image…');
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error('Could not read this image.'));
        reader.readAsDataURL(file);
      });
      const result = await request('/api/admin/upload', { method: 'POST', body: JSON.stringify({ file: dataUrl, fileName: file.name }) });
      const uploadedImage = (result.data as { url?: unknown } | undefined)?.url;
      if (typeof uploadedImage !== 'string' || !uploadedImage) throw new Error('Image upload completed without returning an image URL.');
      const field = tab === 'testimonials' ? 'avatar' : 'image';
      setSelected((current) => ({ ...current, [field]: uploadedImage, ...(tab === 'clients' ? { logo: uploadedImage } : {}) }));
      setNotice('Image uploaded. Save the item to publish it.'); setNoticeType('success');
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Image upload failed.'); setNoticeType('error'); }
    finally { setBusy(false); }
  };

  const remove = async (id: string) => {
    if (!window.confirm('Delete this item from the website?')) return;
    setBusy(true);
    try {
      await request(`/api/admin/content/${tab}/${encodeURIComponent(id)}`, { method: 'DELETE' });
      setItems((current) => current.filter((item) => item.id !== id));
      if (selected.id === id) setSelected({});
      setNotice('Item deleted.'); setNoticeType('success');
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Delete failed.'); setNoticeType('error'); }
    finally { setBusy(false); }
  };

  const downloadResume = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/careers/${encodeURIComponent(id)}/resume`, { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) {
        const result = await response.json().catch(() => ({})) as ApiResult;
        throw new Error(result.message || 'Could not download this CV.');
      }
      const fileUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = 'candidate-resume';
      document.body.appendChild(link); link.click(); link.remove();
      window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Could not download this CV.'); setNoticeType('error');
    }
  };

  const addAdmin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true); setNotice('');
    try {
      const result = await request('/api/admin/admins', { method: 'POST', body: JSON.stringify({ email: data.get('email'), password: data.get('password') }) });
      form.reset();
      setNotice(result.message || 'Administrator added.'); setNoticeType('success');
      try {
        await loadItems('admins');
      } catch {
        setNotice('Administrator added, but the account list could not be refreshed.');
        setNoticeType('error');
      }
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Could not add administrator.'); setNoticeType('error'); }
    finally { setBusy(false); }
  };

  const signOut = () => { localStorage.removeItem('starmax_admin_token'); setToken(''); setPassword(''); setTab('clients'); };

  if (!token) return (
    <main className="min-h-[70vh] bg-mist flex items-center justify-center px-5 py-12">
      <form onSubmit={login} className="w-full max-w-md bg-white border border-rule p-7 sm:p-9 space-y-5 shadow-sm">
        <p className="label mb-0">Starmax Systems · Administration</p>
        <div><h1 className="text-3xl">Welcome back</h1><p className="mt-2 text-sm text-muted">Sign in to manage website content and customer requests.</p></div>
        <label className="block text-sm font-medium">Admin email<input autoComplete="username" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} /></label>
        <label className="block text-sm font-medium">Password<input autoComplete="current-password" required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className={inputClass} /></label>
        {notice && <p role="alert" className="rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-800">{notice}</p>}
        <button disabled={busy} className="btn solid w-full">{busy ? 'Signing in…' : 'Sign in'}</button>
        <button type="button" onClick={() => navigate('/')} className="w-full text-sm text-muted hover:text-blue">Return to website</button>
      </form>
    </main>
  );

  const contentTab = tab === 'clients' || tab === 'gallery' || tab === 'testimonials';
  const imageField = tab === 'testimonials' ? 'avatar' : 'image';
  const previewImage = String(selected[imageField] || '');

  return (
    <main className="min-h-screen bg-mist py-8 sm:py-10">
      <div className="container-x">
        <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div><p className="label mb-1">Starmax Systems</p><h1 className="text-3xl sm:text-4xl">Admin panel</h1><p className="mt-2 text-sm text-muted">Manage public content and customer requests.</p></div>
          <div className="flex gap-2"><button onClick={() => navigate('/')} className="btn outline">View website <ArrowUpRight className="h-4 w-4" /></button><button onClick={signOut} className="btn outline"><LogOut className="h-4 w-4" /> Sign out</button></div>
        </header>

        <nav className="mb-6 flex gap-2 overflow-x-auto pb-1" aria-label="Admin sections">
          {tabs.map((item) => <button key={item} type="button" onClick={() => setTab(item)} className={`shrink-0 rounded-sm border px-4 py-2.5 text-sm capitalize transition-colors ${tab === item ? 'border-blue bg-blue text-white' : 'border-rule bg-white text-navy hover:border-blue hover:text-blue'}`}>{item}</button>)}
        </nav>

        {notice && <p role={noticeType === 'error' ? 'alert' : 'status'} className={`mb-5 rounded-sm border p-3 text-sm ${noticeType === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-blue/15 bg-white text-navy'}`}>{notice}</p>}

        {tab === 'admins' && <div className="grid items-start gap-6 xl:grid-cols-2"><section className="border border-rule bg-white p-6 sm:p-8"><p className="label">Account access</p><h2 className="text-2xl">Add an administrator</h2><p className="mt-2 text-sm text-muted">Create a separate sign-in for a trusted teammate. Use a unique password with at least 12 characters.</p><form onSubmit={addAdmin} className="mt-6 space-y-4"><label className="block text-sm font-medium">Email address<input name="email" type="email" autoComplete="off" required placeholder="teammate@company.com" className={inputClass} /></label><label className="block text-sm font-medium">Temporary password<input name="password" type="password" autoComplete="new-password" minLength={12} required placeholder="At least 12 characters" className={inputClass} /></label><button disabled={busy} className="btn solid">{busy ? 'Adding…' : 'Add administrator'}</button></form><p className="mt-5 border-t border-rule pt-4 text-xs text-muted">Only the owner account can add administrators. Share the temporary password securely and have the new administrator change it after signing in.</p></section><section className="border border-rule bg-white p-6 sm:p-8"><p className="label">Authorized accounts</p><h2 className="text-2xl">Administrators</h2>{busy && !items.length ? <p className="mt-4 text-sm text-muted">Loading administrators…</p> : items.length ? <ul className="mt-4 divide-y divide-rule">{items.map((admin) => <li key={String(admin.id)} className="flex flex-wrap items-center justify-between gap-2 py-3"><div><p className="font-medium">{String(admin.email || 'Unknown account')}</p><p className="text-xs capitalize text-muted">{String(admin.role || 'admin')}{admin.createdAt ? ` · Added ${new Date(String(admin.createdAt)).toLocaleDateString()}` : ''}</p></div></li>)}</ul> : <p className="mt-4 text-sm text-muted">No administrator accounts were returned.</p>}</section></div>}

        {tab === 'enquiries' && <section className="space-y-3"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-2xl">Enquiries, callbacks & careers</h2><p className="mt-1 text-sm text-muted">New requests refresh automatically every 15 seconds.</p></div><button type="button" disabled={busy} onClick={() => { setBusy(true); loadItems('enquiries').catch((error: unknown) => { setNotice(error instanceof Error ? error.message : 'Could not refresh requests.'); setNoticeType('error'); }).finally(() => setBusy(false)); }} className="btn outline">{busy ? 'Refreshing…' : 'Refresh now'}</button></div>{busy && !items.length ? <p className="border border-rule bg-white p-6 text-sm text-muted">Loading requests…</p> : items.map((item) => <article key={String(item.id)} className="border border-rule bg-white p-5"><div className="flex flex-wrap justify-between gap-2"><div><span className="text-[10px] font-semibold uppercase tracking-wider text-blue">{String(item.kind || 'Enquiry')}{item.emailStatus ? ` · email ${String(item.emailStatus).replace('_', ' ')}` : ''}</span><h2 className="font-semibold">{String(item.subject || item.fullName || 'Website request')}</h2></div><time className="text-xs text-muted">{item.createdAt ? new Date(String(item.createdAt)).toLocaleString() : ''}</time></div><p className="mt-2 text-sm">{String(item.fullName)} · {String(item.email || 'No email')}{item.phone ? ` · ${String(item.phone)}` : ''}</p>{Boolean(item.educationalQualification) && <p className="mt-1 text-sm text-muted">Qualification: {String(item.educationalQualification)}</p>}<p className="text-sm text-muted">{String(item.company || '')}{item.service ? ` · ${String(item.service)}` : ''}{item.preferredTime ? ` · Preferred: ${String(item.preferredTime)}` : ''}</p>{Boolean(item.message) && <p className="mt-3 whitespace-pre-wrap text-sm">{String(item.message)}</p>}{Boolean(item.resumeFileName) && <button type="button" onClick={() => void downloadResume(String(item.id))} className="btn outline mt-3">Download CV · {String(item.resumeFileName)}</button>}</article>)}{!busy && !items.length && <p className="border border-rule bg-white p-6 text-sm text-muted">No enquiries or callback requests yet.</p>}</section>}

        {contentTab && <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-2xl capitalize">{tab} directory</h2><p className="mt-1 text-sm text-muted">Select an item to edit or add a new one.</p></div><button type="button" onClick={startNewItem} className="btn solid"><Plus className="h-4 w-4" /> Add {tab === 'clients' ? 'client' : tab === 'gallery' ? 'gallery item' : 'testimonial'}</button></div>
            {busy && !items.length && <p className="border border-rule bg-white p-5 text-sm text-muted">Loading {tab}…</p>}
            {items.map((item) => <article key={String(item.id)} className={`flex items-center gap-3 border bg-white p-3 sm:p-4 ${selected.id === item.id ? 'border-blue ring-1 ring-blue/20' : 'border-rule'}`}>
              {Boolean(item.image || item.avatar || item.logo) && <img src={String(item.image || item.avatar || item.logo)} alt="" className="h-12 w-16 shrink-0 rounded-sm border border-rule bg-mist object-contain p-1" />}
              <button type="button" onClick={() => { setSelected(item); setNotice(''); }} className="min-w-0 flex-1 text-left"><strong className="block truncate text-sm">{String(item.name || item.title || item.quote || 'Untitled')}</strong><span className="mt-1 block truncate text-xs text-muted">{String(item.industry || item.categoryLabel || item.clientReference || '')}</span></button>
              <span className={`hidden rounded-full px-2 py-1 text-[10px] sm:inline-block ${item.active === false ? 'bg-mist text-muted' : 'bg-emerald-50 text-emerald-700'}`}>{item.active === false ? 'Hidden' : 'Published'}</span>
              <button type="button" onClick={() => void remove(String(item.id))} disabled={busy} aria-label={`Delete ${String(item.name || item.title || 'item')}`} className="rounded-sm p-2 text-muted hover:bg-red-50 hover:text-red-700 disabled:opacity-50"><Trash2 className="h-4 w-4" /></button>
            </article>)}
            {!busy && !items.length && <div className="border border-dashed border-rule bg-white p-8 text-center"><p className="font-medium">No {tab} yet</p><p className="mt-1 text-sm text-muted">Add your first item to publish it on the website.</p><button type="button" onClick={startNewItem} className="btn outline mt-4"><Plus className="h-4 w-4" /> Add {tab === 'clients' ? 'client' : tab === 'gallery' ? 'gallery item' : 'testimonial'}</button></div>}
          </section>

          <section className="border border-rule bg-white p-5 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3"><div><p className="label mb-1">{selected.id ? 'Edit existing content' : 'New website content'}</p><h2 className="text-2xl">{selected.id ? 'Edit item' : 'Add item'}</h2></div>{Object.keys(selected).length > 0 && <button type="button" onClick={() => setSelected({})} className="rounded-sm p-2 text-muted hover:bg-mist" aria-label="Close editor"><X className="h-4 w-4" /></button>}</div>
            {Object.keys(selected).length === 0 ? <div className="rounded-sm bg-mist p-5 text-sm text-muted">Choose an item from the list, or select <strong>Add {tab === 'clients' ? 'client' : tab === 'gallery' ? 'gallery item' : 'testimonial'}</strong> to start a new one.</div> : <form onSubmit={(event) => void save(event)} className="space-y-4">
              {fields[tab].map((field) => <label key={field} className="block text-sm font-medium">{labels[field]}{['quote', 'caption', 'context'].includes(field) ? <textarea required={field === 'quote' || field === 'caption'} rows={field === 'quote' ? 5 : 3} value={String(selected[field] ?? '')} onChange={(event) => updateField(field, event.target.value)} className={inputClass} /> : field === 'category' ? <select required value={String(selected.category ?? 'cctv')} onChange={(event) => updateField('category', event.target.value)} className={inputClass}>{categories.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : field === 'active' ? <span className="mt-2 flex items-center gap-2"><input type="checkbox" checked={selected.active !== false} onChange={(event) => updateField('active', event.target.checked)} className="h-4 w-4 accent-[#1a3bb0]" /><span className="text-sm text-muted">Visible on public website</span></span> : <input required={['name', 'title', 'image'].includes(field) || (tab === 'testimonials' && field === 'quote')} type={field === 'order' || field === 'rating' ? 'number' : 'text'} min={field === 'rating' ? 1 : undefined} max={field === 'rating' ? 5 : undefined} value={String(selected[field] ?? '')} onChange={(event) => updateField(field, field === 'order' || field === 'rating' ? Number(event.target.value) : event.target.value)} placeholder={field.includes('image') || field === 'avatar' ? 'https://…' : ''} className={inputClass} />}</label>)}

              {(tab === 'gallery' || tab === 'testimonials' || tab === 'clients') && <div className="rounded-sm border border-dashed border-rule bg-mist/40 p-4"><label className="flex cursor-pointer flex-wrap items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-sm bg-blue/10 text-blue"><ImagePlus className="h-5 w-5" /></span><span className="flex-1"><strong className="block text-sm">{busy ? 'Uploading…' : 'Upload image to ImageKit'}</strong><span className="mt-0.5 block text-xs text-muted">JPG, PNG or WebP · up to 7 MB</span></span><input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={(event) => { void uploadImage(event.target.files?.[0]); event.currentTarget.value = ''; }} className="sr-only" /></label>{previewImage && <img src={previewImage} alt="Selected upload preview" className="mt-4 max-h-48 w-full rounded-sm border border-rule bg-white object-contain" />}</div>}

              <div className="flex flex-wrap gap-2 border-t border-rule pt-4"><button type="submit" disabled={busy} className="btn solid"><Save className="h-4 w-4" />{busy ? 'Saving…' : selected.id ? 'Save changes' : 'Save and publish'}</button><button type="button" disabled={busy} onClick={startNewItem} className="btn outline">Clear form</button></div>
            </form>}
          </section>
        </div>}
      </div>
    </main>
  );
};

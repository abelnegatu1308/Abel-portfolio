import { useRef, useState, type FormEvent, type ChangeEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight,
  ArrowUpRight,
  GithubLogo,
  Mailbox,
  MapPin,
} from '@phosphor-icons/react';

import { contact } from '../data/content';

interface ContactProps {
  isPreloaded: boolean;
}

type ContactField = 'name' | 'email' | 'message';
type ContactErrors = Partial<Record<ContactField, string>>;
type ContactForm = Record<ContactField, string>;

const initialForm: ContactForm = { name: '', email: '', message: '' };

function validateForm(form: ContactForm): ContactErrors {
  const errors: ContactErrors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!form.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!form.message.trim()) {
    errors.message = 'Please enter a message.';
  } else if (form.message.trim().length < 10) {
    errors.message = 'Your message must be at least 10 characters.';
  }
  return errors;
}

export default function Contact({ isPreloaded }: ContactProps) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [draftUrl, setDraftUrl] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!isPreloaded || !sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      '.contact-reveal',
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      }
    );
  }, { dependencies: [isPreloaded], scope: sectionRef });

  const handleChange = (field: ContactField, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setDraftUrl('');
    setErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    setDraftUrl('');
    if (Object.keys(nextErrors).length > 0) return;

    const subject = `Portfolio enquiry from ${form.name.trim()}`;
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      '',
      form.message.trim(),
    ].join('\n');
    const params = new URLSearchParams({ subject, body });
    setDraftUrl(`mailto:${contact.email}?${params.toString()}`);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-section section-shell"
      aria-labelledby="contact-title"
    >
      <div className="section-container">
        <div className="section-heading contact-reveal">
          <p className="eyebrow"><span className="eyebrow-dot" /> Get in touch</p>
          <h2 id="contact-title">Let&apos;s make something <span>matter.</span></h2>
          <p>
            Have an idea, an opportunity, or an interesting project? Send me a note and let&apos;s
            start a conversation.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-details">
            <a className="contact-detail-card contact-reveal" href={`mailto:${contact.email}`}>
              <span className="contact-detail-icon"><Mailbox size={21} weight="light" /></span>
              <span>
                <small>Email me</small>
                <strong>{contact.email}</strong>
              </span>
              <ArrowUpRight size={17} weight="light" />
            </a>
            <div className="contact-detail-card contact-reveal">
              <span className="contact-detail-icon"><MapPin size={21} weight="light" /></span>
              <span>
                <small>Location</small>
                <strong>{contact.location}</strong>
              </span>
            </div>
            <a
              className="contact-detail-card contact-reveal"
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-detail-icon"><GithubLogo size={21} weight="light" /></span>
              <span>
                <small>GitHub</small>
                <strong>github.com/abelnegatu1308</strong>
              </span>
              <ArrowUpRight size={17} weight="light" />
            </a>
            <p className="contact-note contact-reveal">
              <span className="contact-note-dot" />
              Based in Addis Ababa, working with people everywhere.
            </p>
          </div>

          <div className="contact-form-card contact-reveal">
            <div className="contact-form-heading">
              <span className="contact-form-mark" aria-hidden="true">01</span>
              <div>
                <h3>Send a message</h3>
                <p>Share a little about what you have in mind.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {Object.keys(errors).length > 0 && (
                <p className="form-error-summary" role="alert">
                  Please correct the highlighted fields before creating your email draft.
                </p>
              )}
              <div className="contact-form-grid">
                <div className="form-field">
                  <label htmlFor="contact-name">Your name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleChange('name', event.currentTarget.value)}
                    placeholder="Jane Smith"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && <span className="form-error" id="contact-name-error">{errors.name}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email">Email address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleChange('email', event.currentTarget.value)}
                    placeholder="jane@example.com"
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email && <span className="form-error" id="contact-email-error">{errors.email}</span>}
                </div>

                <div className="form-field form-field--full">
                  <label htmlFor="contact-message">Your message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange('message', event.currentTarget.value)}
                    placeholder="Tell me a little about your project..."
                    rows={5}
                    maxLength={2000}
                    required
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : 'message-count'}
                  />
                  <div className="form-meta">
                    {errors.message
                      ? <span className="form-error" id="contact-message-error">{errors.message}</span>
                      : <span id="message-count">A few details help me get back to you.</span>}
                    <span>{form.message.length}/2000</span>
                  </div>
                </div>
              </div>

              <button className="button-primary contact-submit" type="submit">
                Create email draft <ArrowRight size={18} weight="light" />
              </button>
            </form>

            {draftUrl ? (
              <div className="contact-draft-notice" role="status">
                <p>Your message is ready. This site does not send or store it.</p>
                <a className="text-link" href={draftUrl}>
                  Open draft in your email app <ArrowUpRight size={16} weight="light" />
                </a>
                <p className="contact-draft-fallback">
                  If your email app doesn&apos;t open, write to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
                </p>
              </div>
            ) : (
              <p className="contact-privacy-note">
                Your message stays on your device until you open and send it from your email app.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

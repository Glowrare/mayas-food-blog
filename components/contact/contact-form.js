'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from 'lib/utils';
import Notification from '../ui/notification';

async function sendContactData(contactDetails) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
}
const ContactForm = () => {
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  const nameRef = useRef();
  const emailRef = useRef();
  const msgRef = useRef();

  useEffect(() => {
    if (requestStatus !== 'pending') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [requestStatus]);

  const sendMessageHandler = async (event) => {
    event.preventDefault();

    const newMessage = {
      email: emailRef.current.value,
      name: nameRef.current.value,
      message: msgRef.current.value,
    };

    setRequestStatus('pending');

    try {
      await sendContactData(newMessage);
      setRequestStatus('success');
      nameRef.current.value = '';
      emailRef.current.value = '';
      msgRef.current.value = '';
    } catch (error) {
      setRequestStatus('error');
      setRequestError(error.message);
      return;
    }
  };

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is in its way!',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }
  const labelClass = 'mb-2 block text-sm font-medium text-brand';
  const fieldClass =
    'min-h-12 w-full rounded-md border border-oat bg-canvas px-4 py-3 text-base text-ink focus:border-brand-muted focus:outline-2 focus:outline-offset-2 focus:outline-brand-muted';

  return (
    <section
      aria-labelledby="contact-heading"
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12"
    >
      <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="py-2 lg:py-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            From your kitchen to mine
          </p>
          <h1 id="contact-heading" className="max-w-lg font-editorial text-4xl leading-tight text-brand md:text-5xl lg:text-6xl">
            How can I help you?
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink">
            Have a question about a recipe, an idea to share, or a note for Maya?
            I'd love to hear from you.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Image
              src="/images/site/avatar.jpg"
              alt=""
              width={64}
              height={64}
              loading="eager"
              className="h-16 w-16 rounded-full object-cover object-top"
            />
            <div>
              <p className="font-editorial text-xl text-brand">Maya Reyes</p>
              <p className="mt-1 text-sm text-ink">Maya's Kitchen Notes</p>
            </div>
          </div>
        </div>
        <form
          onSubmit={sendMessageHandler}
          className="space-y-6 rounded-xl border border-oat bg-white/60 p-5 sm:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="min-w-0">
              <label htmlFor="email" className={labelClass}>
                Your Email
              </label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                autoComplete="email"
                required
                className={fieldClass}
              />
            </div>
            <div className="min-w-0">
              <label htmlFor="name" className={labelClass}>
                Your Name
              </label>
              <input
                type="text"
                id="name"
                ref={nameRef}
                autoComplete="name"
                required
                className={fieldClass}
              />
            </div>
          </div>
          <div className="min-w-0">
            <label htmlFor="message" className={labelClass}>
              Your Message
            </label>
            <textarea
              id="message"
              rows="5"
              ref={msgRef}
              required
              className={cn(fieldClass, 'min-h-40 resize-y')}
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-brand px-5 py-3 text-base font-medium text-white hover:bg-ink sm:w-auto"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};
export default ContactForm;

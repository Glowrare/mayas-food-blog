'use client';

import { useEffect, useRef, useState } from 'react';
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
  const labelClass = 'mt-2 mb-1 block font-display font-bold';
  const fieldClass =
    'w-full resize-none rounded-[4px] border border-grey-400 bg-grey-50 p-1 font-[inherit]';

  return (
    <section className="mx-auto my-8 w-[90%] max-w-200 rounded-[6px] bg-grey-100 p-4 text-2xl shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
      <h1 className="my-4 text-left text-[2rem] font-bold md:text-center md:text-[4rem]">
        How can I help you?
      </h1>
      <form onSubmit={sendMessageHandler}>
        <div className="flex flex-wrap gap-x-4">
          <div className="min-w-40 flex-1">
            <label htmlFor="email" className={labelClass}>
              Your Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              required
              className={fieldClass}
            />
          </div>
          <div className="min-w-40 flex-1">
            <label htmlFor="name" className={labelClass}>
              Your Name
            </label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              required
              className={fieldClass}
            />
          </div>
        </div>
        <div className="min-w-40 flex-1">
          <label htmlFor="message" className={labelClass}>
            Your Message
          </label>
          <textarea
            id="message"
            rows="5"
            ref={msgRef}
            required
            className={fieldClass}
          ></textarea>
        </div>
        <div className="mt-4 text-right">
          <button className="rounded-[4px] border border-primary-700 bg-primary-700 px-4 py-2 font-[inherit] text-primary-50 shadow-[0_1px_4px_rgba(0,0,0,0.2)] hover:border-primary-500 hover:bg-primary-500">
            Send Message
          </button>
        </div>
      </form>
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

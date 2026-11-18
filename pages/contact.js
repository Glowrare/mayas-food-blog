import { Fragment } from 'react';
import Head from 'next/head';
import ContactForm from '../components/contact/contact-form';

const ContactPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Contact Maya</title>
        <meta name='description' content='Send Maya a message about recipes, nutrition notes, or collaborations.' />
      </Head>
      <ContactForm />
    </Fragment>
  );
};
export default ContactPage;

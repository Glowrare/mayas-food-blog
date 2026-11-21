import Layout from 'components/layout/layout';
import '../styles/globals.css';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ),
  title: "Welcome to Maya's Kitchen Notes",
  description: 'Weeknight recipes and simple nutrition notes from Maya Reyes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
        <div id="notifications"></div>
      </body>
    </html>
  );
}

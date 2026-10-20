import './globals.css';

export const metadata = {
  title: 'Travel Planner',
  description: 'Trips to urban exploration destinations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

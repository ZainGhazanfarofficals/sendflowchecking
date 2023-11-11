import Link from 'next/link';

export function Sidebar() {
  const sidebarStyle = {
    width: '250px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    background: '#fff',
    height: '100vh', // Adjust the height as needed
  };

  const contentStyle = {
    marginLeft: '250px', // Should match the width of the sidebar
    padding: '16px',
  };

  const listItemStyle = {
    padding: '10px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  };

  return (
    <div>
      <div style={sidebarStyle}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <Link href="/dashboard/analytics">
            <li style={{ ...listItemStyle, ':hover': { background: '#e5e5e5' } }}>Analytics</li>
          </Link>
          <Link href="/dashboard/accounts">
            <li style={{ ...listItemStyle, ':hover': { background: '#e5e5e5' } }}>Accounts</li>
          </Link>
          <Link href="/dashboard/campaigns">
            <li style={{ ...listItemStyle, ':hover': { background: '#e5e5e5' } }}>Campaigns</li>
          </Link>
          <Link href="/dashboard/mailbox">
            <li style={{ ...listItemStyle, ':hover': { background: '#e5e5e5' } }}>Mailbox</li>
          </Link>
          <Link href="/dashboard/settings">
            <li style={{ ...listItemStyle, ':hover': { background: '#e5e5e5' } }}>Settings</li>
          </Link>
        </ul>
      </div>
      <div style={contentStyle}>
        {/* Your main content goes here */}
        <p>Main Content</p>
      </div>
    </div>
  );
}

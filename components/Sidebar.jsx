import Link from 'next/link';

export function Sidebar() {
  const sidebarStyle = {
    width: '250px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    margin:'10px',
    height: '100vh', // Adjust the height as needed
  };

  const listItemStyle = {
    padding: '10px',
    cursor: 'pointer',
    transition: 'background 0.3s',
    display: 'block', // Set the display property to block
  };

  const hoverStyle = {
    background: '#e5e5e5',
  };

  return (
    <div>
      <div style={sidebarStyle}>
        <ul style={{  display: 'flex', flexDirection: 'column'}}>
          <Link href="/dashboard/analytics">
            <li style={{ ...listItemStyle, ...(hoverStyle) }}>Analytics</li>
          </Link>
          <Link href="/dashboard/accounts">
            <li style={{ ...listItemStyle, ...(hoverStyle) }}>Accounts</li>
          </Link>
          <Link href="/dashboard/campaigns">
            <li style={{ ...listItemStyle, ...(hoverStyle) }}>Campaigns</li>
          </Link>
          <Link href="/dashboard/mailbox">
            <li style={{ ...listItemStyle, ...(hoverStyle) }}>Mailbox</li>
          </Link>
          <Link href="/dashboard/settings">
            <li style={{ ...listItemStyle, ...(hoverStyle) }}>Settings</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

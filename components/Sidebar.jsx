import Link from 'next/link';

export function Sidebar() {
  const listItemStyle = {
    padding: '10px',
    cursor: 'pointer',
    transition: 'background 0.3s',
    '&:hover': {
      background: '#e5e5e5',
    },
  };

  return (
    <div style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '16px', background: '#fff' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <Link href="/dashboard/analytics">
          <li style={listItemStyle}>Analytics</li>
        </Link>
        <Link href="/dashboard/accounts">
          <li style={listItemStyle}>Accounts</li>
        </Link>
        <Link href="/dashboard/campaigns">
          <li style={listItemStyle}>Campaigns</li>
        </Link>
        <Link href="/dashboard/mailbox">
          <li style={listItemStyle}>Mailbox</li>
        </Link>
        <Link href="/dashboard/settings">
          <li style={listItemStyle}>Settings</li>
        </Link>
      </ul>
    </div>
  );
}

import {
  Card,
  List,
  ListItem,
} from "@material-tailwind/react";
import Link from 'next/link';

export function Sidebar() 
{

  return (
    <Card className="h-[calc(70vh-2rem)] w-full max-w-[20rem] p-4 shadow-2xl shadow-blue-gray-900 border-primary mt-40 ml-10">
      <List className="gap-8 p-12">
        <Link href="/dashboard/analytics">
       
            <ListItem >Analytics</ListItem>

        </Link>
        <Link  href="/dashboard/accounts">
        
            <ListItem >Accounts</ListItem>
          
        </Link>
        <Link href="/dashboard/campaigns">
      
            <ListItem >Campaigns</ListItem>
      
        </Link>
        <Link href="/dashboard/mailbox">
    
            <ListItem >Mailbox</ListItem>
        
        </Link>
        <Link href="/dashboard/settings">

            <ListItem >Settings</ListItem>

        </Link>
      </List>
    </Card>
  );
}

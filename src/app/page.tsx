import Sidebar from '@/components/navigator/sidebar';
import Workspace from '@/components/workspace/workspace';

import { userData } from './data';

export default function Home() {
  const conversations = [
    'java for beginners crash course with introduction and content',
    'python',
    'golang',
    'deployment'
  ];
  const chat: Chat[] = [
    { human: "Describe human induced climate change", assistant: "Human induced climate change refers to ..." },
    { human: "What steps can be taken to mitigate the human impact", assistant: "To mitigate the human impact ..." }
  ];

  return (
    <main className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r md:block"><Sidebar headings={ conversations } /></div>
      <div className="flex flex-col"><Workspace selectedUser={ userData[0] } messages={ userData[1].messages } isMobile={ false } /></div>
    </main>
  );
}

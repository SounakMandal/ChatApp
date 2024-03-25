import SideNavigator from '@/components/Navigator/SideNavigator';
import Workspace from '@/components/Workspace/Workspace';
import { cn } from '@/lib/utils';

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
    <body className={ cn("flex flex-row h-screen") }>
      <div className={ cn("basis-1/4 bg-slate-900 p-3") }><SideNavigator headings={ conversations } /></div>
      <div className={ cn("basis-3/4 bg-slate-800") }><Workspace chats={ chat } /></div>
    </body>
  );
}

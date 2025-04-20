import {ArrowRight, Check, ChevronsUpDown, Circle, Copy, Edit, ExternalLink, File, HelpCircle, Home, Loader2, Mail, MessageSquare, Moon, Plus, PlusCircle, Search, Server, Settings, Share2, Shield, Sun, Trash, User, X, Workflow, Fire} from 'lucide-react';

const icons = {
  arrowRight: ArrowRight,
  check: Check,
  chevronDown: ChevronsUpDown,
  circle: Circle,
  workflow: Workflow,
  close: X,
  copy: Copy,
  dark: Moon,
  edit: Edit,
  externalLink: ExternalLink,
  file: File,
  help: HelpCircle,
  home: Home,
  light: Sun,
  loader: Loader2,
  mail: Mail,
  messageSquare: MessageSquare,
  plus: Plus,
  plusCircle: PlusCircle,
  search: Search,
  server: Server,
  settings: Settings,
  share: Share2,
  shield: Shield,
  spinner: Loader2,
  trash: Trash,
  user: User,
  fire: FireIcon,
};

function FireIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M14.5 9.5 10 14.5" />
        <path d="M14.5 14.5 10 9.5" />
        <path d="M4 18h1.4c.7 0 1.3.5 1.4 1.2l.1.8H18v-1.1c0-.7-.5-1.3-1.2-1.4l-.8-.1H6v1.1c0 .7.5 1.3 1.2 1.4l.8.1H4z" />
        <path d="M15 12c0-1.6 1.3-3 3-3s3 1.4 3 3c0 1.4-.9 2.5-2.1 2.9a.5.5 0 0 1-.2.1.5.5 0 0 1-.3-.1C15.9 14.5 15 13.4 15 12z" />
      </svg>
    
  );
}

export {icons};

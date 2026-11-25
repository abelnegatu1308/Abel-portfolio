import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiFolder,
  FiCode,
  FiStar,
  FiMail,
  FiGithub,
  FiMenu,
  FiX,
  FiArrowRight,
  FiExternalLink,
  FiMapPin,
  FiCalendar,
  FiSmartphone,
  FiChevronDown,
  FiCamera,
  FiGlobe,
  FiHeart,
  FiLayers,
  FiMonitor,
  FiCpu,
  FiHardDrive,
  FiDatabase,
  FiUsers,
  FiSettings,
  FiTruck,
  FiClipboard,
  FiSearch,
  FiHeadphones,
  FiEye,
  FiCoffee,
  FiGitBranch,
  FiHexagon,
  FiSquare,
} from 'react-icons/fi';
import {
  TbBrandFlutter,
  TbBrandPhp,
  TbBrandPython,
  TbBrandJavascript,
  TbBrandCpp,
  TbCode,
  TbRocket,
} from 'react-icons/tb';
import {
  SiReact,
  SiTailwindcss,
  SiNextdotjs as SiNextjs,
  SiFirebase,
} from 'react-icons/si';

// Icon name string union
export type IconName =
  | 'home'
  | 'user'
  | 'briefcase'
  | 'folder'
  | 'code'
  | 'star'
  | 'mail'
  | 'github'
  | 'linkedin'
  | 'menu'
  | 'x'
  | 'arrow-right'
  | 'external-link'
  | 'map-pin'
  | 'calendar'
  | 'phone'
  | 'chevron-down'
  | 'camera'
  | 'globe'
  | 'heart'
  | 'layers'
  | 'monitor'
  | 'cpu'
  | 'hard-drive'
  | 'database'
  | 'rocket'
  | 'users'
  | 'settings'
  | 'truck'
  | 'clipboard'
  | 'search'
  | 'headphones'
  | 'eye'
  | 'coffee'
  | 'git-branch'
  | 'hexagon'
  | 'square'
  | 'react'
  | 'tailwind'
  | 'nextjs'
  | 'firebase'
  | 'flutter'
  | 'dart'
  | 'php'
  | 'python'
  | 'javascript'
  | 'cpp'
  | 'git'
  | 'vscode';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'inherit', className }) => {
  const common = { size, color, className };

  const r = (Comp: React.ElementType) => <Comp {...common} />;

  switch (name) {
    case 'home':
      return r(FiHome);
    case 'user':
      return r(FiUser);
    case 'briefcase':
      return r(FiBriefcase);
    case 'folder':
      return r(FiFolder);
    case 'code':
      return r(FiCode);
    case 'star':
      return r(FiStar);
    case 'mail':
      return r(FiMail);
    case 'github':
      return r(FiGithub);
    case 'linkedin':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'menu':
      return r(FiMenu);
    case 'x':
      return r(FiX);
    case 'arrow-right':
      return r(FiArrowRight);
    case 'external-link':
      return r(FiExternalLink);
    case 'map-pin':
      return r(FiMapPin);
    case 'calendar':
      return r(FiCalendar);
    case 'phone':
      return r(FiSmartphone);
    case 'chevron-down':
      return r(FiChevronDown);
    case 'camera':
      return r(FiCamera);
    case 'globe':
      return r(FiGlobe);
    case 'heart':
      return r(FiHeart);
    case 'layers':
      return r(FiLayers);
    case 'monitor':
      return r(FiMonitor);
    case 'cpu':
      return r(FiCpu);
    case 'hard-drive':
      return r(FiHardDrive);
    case 'database':
      return r(FiDatabase);
    case 'rocket':
      return r(TbRocket);
    case 'users':
      return r(FiUsers);
    case 'settings':
      return r(FiSettings);
    case 'truck':
      return r(FiTruck);
    case 'clipboard':
      return r(FiClipboard);
    case 'search':
      return r(FiSearch);
    case 'headphones':
      return r(FiHeadphones);
    case 'eye':
      return r(FiEye);
    case 'coffee':
      return r(FiCoffee);
    case 'git-branch':
      return r(FiGitBranch);
    case 'hexagon':
      return r(FiHexagon);
    case 'square':
      return r(FiSquare);
    case 'react':
      return r(SiReact);
    case 'tailwind':
      return r(SiTailwindcss);
    case 'nextjs':
      return r(SiNextjs);
    case 'firebase':
      return r(SiFirebase);
    case 'flutter':
      return <TbBrandFlutter {...common} />;
    case 'dart':
      return <TbCode {...common} />;
    case 'php':
      return <TbBrandPhp {...common} />;
    case 'python':
      return <TbBrandPython {...common} />;
    case 'javascript':
      return <TbBrandJavascript {...common} />;
    case 'cpp':
      return <TbBrandCpp {...common} />;
    case 'git':
      return <TbCode {...common} />;
    case 'vscode':
      return <TbCode {...common} />;
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
  }
};

export default Icon;

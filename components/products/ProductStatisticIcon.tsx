import {
  Apple,
  Chrome,
  CircleHelp,
  Clock,
  Code,
  Coffee,
  Download,
  ExternalLink,
  Gauge,
  Globe,
  Heart,
  Package,
  Play,
  Puzzle,
  Rocket,
  Shield,
  Smartphone,
  Star,
  TrendingUp,
  User,
  Users,
  Zap,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  apple: Apple,
  chrome: Chrome,
  clock: Clock,
  code: Code,
  coffee: Coffee,
  download: Download,
  "external-link": ExternalLink,
  gauge: Gauge,
  globe: Globe,
  heart: Heart,
  package: Package,
  play: Play,
  puzzle: Puzzle,
  rocket: Rocket,
  shield: Shield,
  smartphone: Smartphone,
  star: Star,
  "trending-up": TrendingUp,
  user: User,
  users: Users,
  zap: Zap,
};

function normalizeIconName(name: string) {
  return name.trim().toLowerCase();
}

export default function ProductStatisticIcon({
  name,
  ...props
}: LucideProps & { name: string }) {
  const Icon = icons[normalizeIconName(name)] ?? CircleHelp;

  return <Icon aria-hidden="true" {...props} />;
}

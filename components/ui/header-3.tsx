'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { LucideIcon } from 'lucide-react';
import {
	Smartphone, Bot, Layers, Palette, ShoppingCart,
	Megaphone, Search, Sparkles, Wrench, Zap, Users, Star,
	FileText, Shield, Handshake, Leaf, HelpCircle, BarChart3, ArrowRight,
} from 'lucide-react';

type LinkItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	description?: string;
};

const serviceLinks: LinkItem[] = [
{ title: 'Mobile Apps',      href: '/services/mobile-apps',      icon: Smartphone,    description: 'iOS & Android with React Native' },
	{ title: 'AI Automations',   href: '/services/ai-automations',   icon: Bot,           description: 'Chatbots, pipelines & AI tools'  },
	{ title: 'SaaS MVP',         href: '/services/saas-mvp',         icon: Layers,        description: 'Launch your SaaS in weeks'       },
	{ title: 'UI/UX Design',     href: '/services/ui-ux-design',     icon: Palette,       description: 'Figma design to production'      },
	{ title: 'Ecommerce',        href: '/services/ecommerce',        icon: ShoppingCart,  description: 'Shopify & custom stores'         },
	{ title: 'Lead Gen & Email Deliverability', href: '/services/lead-generation', icon: Megaphone, description: 'Funnels + inbox placement'       },
	{ title: 'SEO',              href: '/services/seo',              icon: Search,        description: 'Rank higher on Google'           },
	{ title: 'GEO',              href: '/services/geo',              icon: Sparkles,      description: 'Get cited by AI engines'         },
	{ title: 'Performance',      href: '/services',                  icon: BarChart3,     description: 'Core Web Vitals & speed'         },
	{ title: 'Maintenance',      href: '/services/maintenance',      icon: Wrench,        description: 'Ongoing support & updates'       },
	{ title: 'Quick Services',   href: '/services/quick-services',   icon: Zap,           description: 'Fast-turnaround tasks'           },
];

const companyLinks: LinkItem[] = [
	{ title: 'About Us',     href: '/about',        icon: Users,     description: 'Our story, team & mission'   },
	{ title: 'Portfolio',    href: '/projects',     icon: Star,      description: 'Client projects & case studies' },
	{ title: 'Testimonials', href: '/testimonials', icon: Handshake, description: 'What our clients say'        },
];

const companyLinks2: LinkItem[] = [
	{ title: 'Blog',             href: '/blog',     icon: Leaf      },
	{ title: 'Help Center',      href: '/contact',  icon: HelpCircle },
	{ title: 'Privacy Policy',   href: '/privacy',  icon: Shield    },
	{ title: 'Terms of Service', href: '/terms',    icon: FileText  },
];

const navLinks = [
	{ label: 'Projects', href: '/projects' },
	{ label: 'Blog',     href: '/blog'     },
];

/* ─── Header ─────────────────────────────────────────────── */

export function Header() {
	const [open, setOpen] = React.useState(false);
	const [mounted, setMounted] = React.useState(false);
	const pathname = usePathname();
	const { scrollY } = useScroll();

	// Smooth scroll-driven transforms
	const navHeight   = useTransform(scrollY, [0, 90], [72, 56]);
	const bgOpacity   = useTransform(scrollY, [0, 90], [0.35, 0.82]);
	const blurPx      = useTransform(scrollY, [0, 90], [12, 28]);
	const shadowAlpha = useTransform(scrollY, [0, 90], [0.15, 0.45]);
	const borderAlpha = useTransform(scrollY, [0, 90], [0.07, 0.14]);
	const topPad      = useTransform(scrollY, [0, 90], [12, 6]);

	React.useEffect(() => { setMounted(true); }, []);
	React.useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => { document.body.style.overflow = ''; };
	}, [open]);

	const motionBackground = useMotionBackground(bgOpacity);
	const motionBoxShadow  = useMotionBoxShadow(shadowAlpha);
	const motionBorder     = useMotionBorder(borderAlpha);
	const motionBlur       = useMotionBlur(blurPx);

	return (
		<header className="sticky top-0 z-50 w-full pointer-events-none">
			<motion.div
				className="mx-auto max-w-[1280px] px-4 pointer-events-auto"
				style={{ paddingTop: topPad, paddingBottom: 0 }}
			>
				<motion.nav
					style={{
						height: navHeight,
						background: motionBackground,
						backdropFilter: motionBlur,
						WebkitBackdropFilter: motionBlur,
						boxShadow: motionBoxShadow,
						border: motionBorder,
					}}
					className="flex items-center justify-between rounded-2xl px-5 overflow-visible"
				>
					{/* ── Logo ── */}
					<Link href="/" className="flex items-center gap-2.5 shrink-0 group">
						<motion.div style={{ scale: useTransform(scrollY, [0, 90], [1, 0.9]) }}>
							<Image
								src="/logos/logo.png"
								alt="TwoPixel"
								width={100}
								height={32}
								className="h-7 w-auto object-contain"
								priority
							/>
						</motion.div>
						<span className="text-foreground font-semibold tracking-tight text-sm hidden sm:block">
							TwoPixel
						</span>
					</Link>

					{/* ── Desktop Nav ── */}
					<NavigationMenu className="hidden md:flex absolute left-1/2 -translate-x-1/2">
						<NavigationMenuList className="gap-0.5">
							{/* Services */}
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground text-sm h-9 px-3 rounded-lg">
									Services
								</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-background/95 backdrop-blur-xl p-1 pr-1.5">
									<ul className="bg-popover grid w-[580px] grid-cols-2 gap-1.5 rounded-xl border border-border/60 p-2 shadow-2xl">
										{serviceLinks.map((item, i) => (
											<li key={i}><ListItem {...item} /></li>
										))}
									</ul>
									<div className="p-2">
										<p className="text-muted-foreground text-xs">
											Not sure what you need?{' '}
											<Link href="/contact" className="text-primary font-medium hover:underline underline-offset-4">
												Talk to us →
											</Link>
										</p>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>

							{/* Company */}
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground text-sm h-9 px-3 rounded-lg">
									Company
								</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-background/95 backdrop-blur-xl p-1 pr-1.5 pb-1.5">
									<div className="grid w-[420px] grid-cols-2 gap-2">
										<ul className="bg-popover space-y-1 rounded-xl border border-border/60 p-2 shadow-2xl">
											{companyLinks.map((item, i) => (
												<li key={i}><ListItem {...item} /></li>
											))}
										</ul>
										<ul className="space-y-1 p-2">
											{companyLinks2.map((item, i) => (
												<li key={i}>
													<NavigationMenuLink
														href={item.href}
														className="flex p-2 hover:bg-accent rounded-lg items-center gap-x-2 transition-colors"
													>
														<item.icon className="text-muted-foreground size-4 shrink-0" />
														<span className="text-sm font-medium text-foreground">{item.title}</span>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>

							{/* Simple links */}
							{navLinks.map((link) => (
								<NavigationMenuItem key={link.href}>
									<NavigationMenuLink asChild>
										<Link
											href={link.href}
											className={cn(
												'relative px-3 h-9 inline-flex items-center text-sm font-medium rounded-lg transition-colors',
												pathname === link.href
													? 'text-foreground'
													: 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
											)}
										>
											{link.label}
											{pathname === link.href && (
												<motion.span
													layoutId="nav-active-pill"
													className="absolute inset-0 rounded-lg bg-accent"
													style={{ zIndex: -1 }}
													transition={{ type: 'spring', stiffness: 380, damping: 30 }}
												/>
											)}
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>

					{/* ── Desktop CTA ── */}
					<div className="hidden md:flex items-center gap-2 shrink-0">
						<Link
							href="/about"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
						>
							About
						</Link>
						<motion.div
							whileHover={{ scale: 1.04 }}
							whileTap={{ scale: 0.97 }}
							transition={{ type: 'spring', stiffness: 400, damping: 20 }}
						>
							<Button
								size="sm"
								className="h-8 px-4 text-sm rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5"
								style={{
									boxShadow: '0 0 16px rgba(168,85,247,0.35)',
								}}
								asChild
							>
								<Link href="/contact">
									Get Started
									<ArrowRight className="w-3.5 h-3.5" />
								</Link>
							</Button>
						</motion.div>
					</div>

					{/* ── Mobile toggle ── */}
					<Button
						size="icon"
						variant="ghost"
						onClick={() => setOpen(!open)}
						className="md:hidden h-8 w-8 text-muted-foreground hover:text-foreground"
						aria-expanded={open}
						aria-label="Toggle menu"
					>
						<MenuToggleIcon open={open} className="size-5" duration={300} />
					</Button>
				</motion.nav>
			</motion.div>

			{/* ── Mobile Menu ── */}
			{mounted && <MobileMenu open={open} setOpen={setOpen} pathname={pathname} />}
		</header>
	);
}

/* ─── Mobile Menu ────────────────────────────────────────── */

function MobileMenu({
	open,
	setOpen,
	pathname,
}: {
	open: boolean;
	setOpen: (v: boolean) => void;
	pathname: string;
}) {
	if (typeof window === 'undefined') return null;

	return createPortal(
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0, y: -8 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -8 }}
					transition={{ duration: 0.2, ease: 'easeOut' }}
					className="fixed top-[calc(56px+12px+8px)] left-4 right-4 z-40 rounded-2xl border border-white/[0.08] bg-background/90 backdrop-blur-2xl shadow-2xl overflow-hidden md:hidden"
				>
					<div className="p-4 flex flex-col gap-1 max-h-[75vh] overflow-y-auto">
						<p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-2 py-1">Services</p>
						{serviceLinks.map((link) => (
							<MobileNavItem key={link.href} {...link} onClose={() => setOpen(false)} />
						))}
						<p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-2 py-1 mt-2">Company</p>
						{[...companyLinks, ...companyLinks2].map((link) => (
							<MobileNavItem key={link.href} {...link} onClose={() => setOpen(false)} />
						))}
					</div>
					<div className="flex gap-2 p-4 border-t border-border/30">
						<Button variant="outline" className="flex-1 rounded-xl bg-transparent" asChild>
							<Link href="/about" onClick={() => setOpen(false)}>About</Link>
						</Button>
						<Button
							className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5"
							style={{ boxShadow: '0 0 16px rgba(168,85,247,0.3)' }}
							asChild
						>
							<Link href="/contact" onClick={() => setOpen(false)}>
								Get Started <ArrowRight className="w-3.5 h-3.5" />
							</Link>
						</Button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body,
	);
}

function MobileNavItem({
	title, description, icon: Icon, href, onClose,
}: LinkItem & { onClose: () => void }) {
	return (
		<Link
			href={href}
			onClick={onClose}
			className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-accent/60 transition-colors"
		>
			<div className="bg-primary/10 border border-primary/20 flex size-8 items-center justify-center rounded-lg shrink-0">
				<Icon className="text-primary size-3.5" />
			</div>
			<div>
				<div className="text-sm font-medium text-foreground leading-tight">{title}</div>
				{description && <div className="text-xs text-muted-foreground leading-tight">{description}</div>}
			</div>
		</Link>
	);
}

/* ─── ListItem ───────────────────────────────────────────── */

function ListItem({ title, description, icon: Icon, className, href, ...props }: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
	return (
		<NavigationMenuLink
			className={cn('w-full flex flex-row gap-x-2 hover:bg-accent hover:text-accent-foreground focus:bg-accent rounded-lg p-2 transition-colors', className)}
			{...props}
			asChild
		>
			<a href={href}>
				<div className="bg-primary/10 border border-primary/20 flex aspect-square size-9 items-center justify-center rounded-lg shrink-0">
					<Icon className="text-primary size-3.5" />
				</div>
				<div className="flex flex-col justify-center">
					<span className="text-sm font-medium text-foreground">{title}</span>
					{description && <span className="text-muted-foreground text-xs leading-tight">{description}</span>}
				</div>
			</a>
		</NavigationMenuLink>
	);
}

/* ─── Motion value helpers ───────────────────────────────── */

function useMotionBackground(opacity: ReturnType<typeof useTransform>) {
	return useTransform(opacity, (v) => `rgba(10, 10, 14, ${v})`);
}

function useMotionBoxShadow(alpha: ReturnType<typeof useTransform>) {
	return useTransform(alpha, (v) =>
		`0 0 0 1px rgba(255,255,255,${(v as number) * 0.18}), 0 8px 32px rgba(0,0,0,${v}), 0 2px 8px rgba(0,0,0,${(v as number) * 0.6})`
	);
}

function useMotionBorder(alpha: ReturnType<typeof useTransform>) {
	return useTransform(alpha, (v) => `1px solid rgba(255,255,255,${v})`);
}

function useMotionBlur(px: ReturnType<typeof useTransform>) {
	return useTransform(px, (v) => `blur(${v}px)`);
}

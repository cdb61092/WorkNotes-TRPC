import { useState } from 'react';
import React from 'react';
import { redirect, useNavigate, useLocation } from 'react-router-dom';
import {
	Navbar as MantineNavbar,
	Center,
	Tooltip,
	UnstyledButton,
	createStyles,
	Stack,
} from '@mantine/core';
import {
	Icon,
	IconHome2,
	IconGauge,
	IconDeviceDesktopAnalytics,
	IconFingerprint,
	IconCalendarStats,
	IconUser,
	IconSettings,
	IconLogout,
	IconSwitchHorizontal,
	IconClipboardText,
} from '@tabler/icons-react';

//@ts-ignore
import logo from '../public/logo-2.png';

const useStyles = createStyles((theme) => ({
	link: {
		width: 50,
		height: 50,
		borderRadius: theme.radius.md,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[5]
					: theme.colors.gray[0],
		},
	},

	active: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({
				variant: 'light',
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
				.color,
		},
	},
}));

interface NavbarLinkProps {
	icon: Icon;
	label: string;
	active?: boolean;
	onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
	const { classes, cx } = useStyles();
	return (
		<Tooltip label={label} position="right" transitionDuration={0}>
			<UnstyledButton
				onClick={onClick}
				className={cx(classes.link, { [classes.active]: active })}
			>
				<Icon stroke={1.5} />
			</UnstyledButton>
		</Tooltip>
	);
}

const mockdata = [
	{ icon: IconHome2, label: 'Home', route: '/' },
	{ icon: IconClipboardText, label: 'Notes', route: '/notes' },
	// { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
	// { icon: IconCalendarStats, label: 'Releases' },
	// { icon: IconUser, label: 'Account' },
	// { icon: IconFingerprint, label: 'Security' },
	// { icon: IconSettings, label: 'Settings' },
];

export function Navbar() {
	const [active, setActive] = useState(2);
	const navigate = useNavigate();
	const location = useLocation();

	const links = mockdata.map((link, index) => (
		<NavbarLink
			{...link}
			key={link.label}
			active={location.pathname === link.route}
			onClick={() => {
				console.log('clicked');
				navigate(link.route);
			}}
		/>
	));

	return (
		<MantineNavbar width={{ base: 80 }} p="md">
			<Center>
				<img src={logo} />
			</Center>
			<MantineNavbar.Section grow mt={50}>
				<Stack justify="center" spacing={0}>
					{links}
				</Stack>
			</MantineNavbar.Section>
			<MantineNavbar.Section>
				<Stack justify="center" spacing={0}>
					<NavbarLink icon={IconSwitchHorizontal} label="Change account" />
					<NavbarLink icon={IconLogout} label="Logout" />
				</Stack>
			</MantineNavbar.Section>
		</MantineNavbar>
	);
}

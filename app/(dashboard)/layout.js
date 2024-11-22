'use client'
import { useState } from 'react';
import 'styles/theme.scss';
import NavbarVertical from '/layouts/navbars/NavbarVertical';
import NavbarTop from '/layouts/navbars/NavbarTop';

export default function DashboardLayout({ children }) {
	const [showMenu, setShowMenu] = useState(true);
	const ToggleMenu = () => setShowMenu(!showMenu);

	return (
		<div id="db-wrapper" className={`${showMenu ? '' : 'toggled'} d-flex flex-column`}>
			<div className="navbar-vertical navbar">
				<NavbarVertical
					showMenu={showMenu}
					onClick={(value) => setShowMenu(value)}
				/>
			</div>
			<div id="page-content" className="d-flex flex-column flex-grow-1">
				<div className="header">
					<NavbarTop
						data={{
							showMenu: showMenu,
							SidebarToggleMenu: ToggleMenu
						}}
					/>
				</div>
				<div className="content-wrapper flex-grow-1">
					{children}
				</div>
			</div>
		</div>
	)
}

import { Form, Link, NavLink, useMatches } from "@remix-run/react";
import Logo from "../util/Logo";

function MainHeader() {
	const matches = useMatches();
	const userId = matches[0]?.data?.userId as string;

	return (
		<header id='main-header'>
			<Logo />
			<nav id='main-nav'>
				<ul>
					<li>
						<NavLink to='/'>Home</NavLink>
					</li>
					<li>
						<NavLink to='/pricing'>Pricing</NavLink>
					</li>
				</ul>
			</nav>
			<nav id='cta-nav'>
				<ul>
					<li>
						{userId && (
							<Form
								method='post'
								action='/logout'
								id='logout-form'
							>
								<button className='cta-alt'>Logout</button>
							</Form>
						)}
						{!userId && (
							<Link
								to='/auth'
								className='cta'
							>
								Login
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainHeader;

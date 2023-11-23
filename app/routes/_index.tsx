import { Link } from "@remix-run/react";
import {
	FaArrowRight,
	FaDollarSign,
	FaChartBar,
} from "react-icons/fa/index.js";
import marketingStyles from "@/styles/marketing.css";

import MainHeader from "../components/navigation/MainHeader";

export function links() {
	return [{ rel: "stylesheet", href: marketingStyles }];
}

export function headers() {
	return {
		"Cache-Control": "max-age=7200",
	};
}

export default function Index() {
	return (
		<>
			<MainHeader />
			<main>
				<section className='marketing-section'>
					<header>
						<FaDollarSign />
						<h2>A Central Space</h2>
					</header>
					<div className='marketing-content'>
						<div className='marketing-image'>
							<img
								src='images/expenses-management.jpg'
								alt='A list of expenses.'
							/>
						</div>
						<div className='marketing-explanation'>
							<p>Manage your expenses in one central place.</p>
							<p>
								<Link
									className='cta'
									to='/expenses'
								>
									<span>Get Started</span>
									<FaArrowRight />
								</Link>
							</p>
						</div>
					</div>
				</section>
				<section className='marketing-section'>
					<header>
						<FaChartBar />
						<h2>Detailed Analytics</h2>
					</header>
					<div className='marketing-content'>
						<p className='marketing-explanation'>
							Benefit from best-in-class analytics to understand your spending
							patterns.
						</p>
						<div className='marketing-image'>
							<img
								src='images/expenses-chart.jpg'
								alt='A demo bar chart.'
							/>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

export const handle = { disableJS: true };

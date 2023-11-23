import { FaTrophy, FaHandshake } from "react-icons/fa/index.js";
import marketingStyles from "@/styles/marketing.css";
import PricingPlan from "@/components/marketing/PricingPlan";
import MainHeader from "@/components/navigation/MainHeader";

const PRICING_PLANS = [
	{
		id: "p1",
		title: "Basic",
		price: "Free forever",
		perks: ["1 User", "Up to 100 expenses/year", "Basic analytics"],
		icon: FaHandshake,
	},
	{
		id: "p2",
		title: "Pro",
		price: "$9.99/month",
		perks: ["Unlimited Users", "Unlimited expenses/year", "Detailed analytics"],
		icon: FaTrophy,
	},
];

export function links() {
	return [{ rel: "stylesheet", href: marketingStyles }];
}

export default function PricingPage() {
	return (
		<>
			<MainHeader />
			<main id='pricing'>
				<h2>Great Product, Simple Pricing</h2>
				<ol id='pricing-plans'>
					{PRICING_PLANS.map((plan) => (
						<li
							key={plan.id}
							className='plan'
						>
							<PricingPlan
								title={plan.title}
								price={plan.price}
								perks={plan.perks}
								icon={plan.icon}
							/>
						</li>
					))}
				</ol>
			</main>
		</>
	);
}

export function headers({
	loaderHeaders,
	parentHeaders,
	actionHeaders,
	errorHeaders,
}: {
	loaderHeaders: Headers;
	parentHeaders: Headers;
	actionHeaders: Headers;
	errorHeaders: Headers;
}) {
	return {
		"Cache-Control": parentHeaders.get("Cache-Control"),
	};
}

export const handle = { disableJS: true };

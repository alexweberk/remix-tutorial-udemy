import { Outlet } from "@remix-run/react";

const MarketingLayout = () => {
	return (
		<>
			<div>MarketingLayout</div>
			<Outlet />
		</>
	);
};

export default MarketingLayout;

export function meta() {
	return [
		{ title: "RemixExpenses - The Complete App" },
		{ description: "See our pricing plans" },
	];
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
		"Cache-Control": "max-age=9600",
	};
}

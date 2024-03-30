"use client";

import React, { useState, useEffect } from "react";
import { Typography, Avatar } from "@material-tailwind/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

export default function Dashboard({ children }) {
	const pathname = usePathname();

	const [userData, setUserData] = useState({});

	useEffect(() => {
		setUserData(JSON.parse(localStorage.getItem("user")));
	}, []);

	return (
		<>
			<div className=" gradient-bg w-screen h-screen -z-10 md:hidden"></div>

			<div className="min-h-screen md:h-screen overflow-hidden flex flex-col md:flex-row bg-brand-background ">
				<nav className=" bg-white w-full max-w-[20vw]  h-screen m-auto border-4 rounded-2xl z-10  flex-col justify-between items-start p-8 gap-5 hidden md:flex ">
					<div>
						<Link href="/dashboard/overview">
							<h1 className="block antialiased tracking-normal  text-5xl leading-tight font-extrabold text-brand-textPrimary">
								<span className="italic">Ez</span>Pay
							</h1>
						</Link>
					</div>
					<div className=" flex flex-col justify-center items-start gap-5 text-brand-textSecondary ">
						<Link
							href="/dashboard/overview"
							className={clsx(
								" hover:bg-brand-accent p-2 w-full rounded-lg group align-middle",
								{
									"bg-brand-accent text-white *:fill-white ":
										pathname === "/dashboard/overview",
								}
							)}
						>
							<svg
								className="-ml-2 w-14 h-8  inline-block group-hover:fill-white"
								viewBox="0 0 90 90"
								fill="#26A269"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M75.9375 25.3125H19.6875C18.9416 25.3125 18.2262 25.0162 17.6988 24.4887C17.1713 23.9613 16.875 23.2459 16.875 22.5C16.875 21.7541 17.1713 21.0387 17.6988 20.5113C18.2262 19.9838 18.9416 19.6875 19.6875 19.6875H67.5C68.2459 19.6875 68.9613 19.3912 69.4887 18.8637C70.0162 18.3363 70.3125 17.6209 70.3125 16.875C70.3125 16.1291 70.0162 15.4137 69.4887 14.8863C68.9613 14.3588 68.2459 14.0625 67.5 14.0625H19.6875C17.4497 14.0625 15.3036 14.9514 13.7213 16.5338C12.1389 18.1161 11.25 20.2622 11.25 22.5V67.5C11.25 69.7378 12.1389 71.8839 13.7213 73.4662C15.3036 75.0486 17.4497 75.9375 19.6875 75.9375H75.9375C77.4293 75.9375 78.8601 75.3449 79.915 74.29C80.9699 73.2351 81.5625 71.8043 81.5625 70.3125V30.9375C81.5625 29.4457 80.9699 28.0149 79.915 26.96C78.8601 25.9051 77.4293 25.3125 75.9375 25.3125ZM75.9375 70.3125H19.6875C18.9416 70.3125 18.2262 70.0162 17.6988 69.4887C17.1713 68.9613 16.875 68.2459 16.875 67.5V30.4559C17.7781 30.776 18.7294 30.9389 19.6875 30.9375H75.9375V70.3125ZM59.0625 49.2188C59.0625 48.3844 59.3099 47.5687 59.7735 46.8749C60.2371 46.1812 60.8959 45.6404 61.6668 45.3211C62.4377 45.0018 63.2859 44.9183 64.1043 45.0811C64.9226 45.2438 65.6744 45.6456 66.2644 46.2356C66.8544 46.8256 67.2562 47.5774 67.4189 48.3957C67.5817 49.2141 67.4982 50.0623 67.1789 50.8332C66.8596 51.6041 66.3188 52.2629 65.6251 52.7265C64.9313 53.1901 64.1156 53.4375 63.2812 53.4375C62.1624 53.4375 61.0893 52.993 60.2981 52.2019C59.507 51.4107 59.0625 50.3376 59.0625 49.2188Z" />
							</svg>{" "}
							<p className=" inline-block group-hover:text-white font-medium text-md">
								Overview
							</p>
						</Link>
						<Link
							href="/dashboard/transaction"
							className={clsx(
								" hover:bg-brand-accent p-2 w-full rounded-lg group align-middle",
								{
									"bg-brand-accent text-white *:fill-white ":
										pathname === "/dashboard/transaction",
								}
							)}
						>
							<svg
								className="-ml-2 w-14 h-8  inline-block group-hover:fill-white"
								viewBox="0 0 90 90"
								fill="#26A269"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M78.75 16.875H11.25C9.75816 16.875 8.32742 17.4676 7.27252 18.5225C6.21763 19.5774 5.625 21.0082 5.625 22.5V67.5C5.625 68.9918 6.21763 70.4226 7.27252 71.4775C8.32742 72.5324 9.75816 73.125 11.25 73.125H78.75C80.2418 73.125 81.6726 72.5324 82.7275 71.4775C83.7824 70.4226 84.375 68.9918 84.375 67.5V22.5C84.375 21.0082 83.7824 19.5774 82.7275 18.5225C81.6726 17.4676 80.2418 16.875 78.75 16.875ZM78.75 22.5V30.9375H11.25V22.5H78.75ZM78.75 67.5H11.25V36.5625H78.75V67.5ZM73.125 59.0625C73.125 59.8084 72.8287 60.5238 72.3012 61.0512C71.7738 61.5787 71.0584 61.875 70.3125 61.875H59.0625C58.3166 61.875 57.6012 61.5787 57.0738 61.0512C56.5463 60.5238 56.25 59.8084 56.25 59.0625C56.25 58.3166 56.5463 57.6012 57.0738 57.0738C57.6012 56.5463 58.3166 56.25 59.0625 56.25H70.3125C71.0584 56.25 71.7738 56.5463 72.3012 57.0738C72.8287 57.6012 73.125 58.3166 73.125 59.0625ZM50.625 59.0625C50.625 59.8084 50.3287 60.5238 49.8012 61.0512C49.2738 61.5787 48.5584 61.875 47.8125 61.875H42.1875C41.4416 61.875 40.7262 61.5787 40.1988 61.0512C39.6713 60.5238 39.375 59.8084 39.375 59.0625C39.375 58.3166 39.6713 57.6012 40.1988 57.0738C40.7262 56.5463 41.4416 56.25 42.1875 56.25H47.8125C48.5584 56.25 49.2738 56.5463 49.8012 57.0738C50.3287 57.6012 50.625 58.3166 50.625 59.0625Z" />
							</svg>{" "}
							<p className=" inline-block group-hover:text-white font-medium text-md">
								Transactions
							</p>
						</Link>
						<Link
							href="/dashboard/bills"
							className={clsx(
								" hover:bg-brand-accent p-2 w-full rounded-lg group align-middle",
								{
									"bg-brand-accent text-white *:fill-white ":
										pathname === "/dashboard/bills",
								}
							)}
						>
							<svg
								className="-ml-2 w-14 h-8  inline-block group-hover:fill-white"
								viewBox="0 0 90 90"
								fill="#26A269"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M78.75 16.875H11.25C9.75816 16.875 8.32742 17.4676 7.27252 18.5225C6.21763 19.5774 5.625 21.0082 5.625 22.5V67.5C5.625 68.9918 6.21763 70.4226 7.27252 71.4775C8.32742 72.5324 9.75816 73.125 11.25 73.125H78.75C80.2418 73.125 81.6726 72.5324 82.7275 71.4775C83.7824 70.4226 84.375 68.9918 84.375 67.5V22.5C84.375 21.0082 83.7824 19.5774 82.7275 18.5225C81.6726 17.4676 80.2418 16.875 78.75 16.875ZM78.75 22.5V30.9375H11.25V22.5H78.75ZM78.75 67.5H11.25V36.5625H78.75V67.5ZM73.125 59.0625C73.125 59.8084 72.8287 60.5238 72.3012 61.0512C71.7738 61.5787 71.0584 61.875 70.3125 61.875H59.0625C58.3166 61.875 57.6012 61.5787 57.0738 61.0512C56.5463 60.5238 56.25 59.8084 56.25 59.0625C56.25 58.3166 56.5463 57.6012 57.0738 57.0738C57.6012 56.5463 58.3166 56.25 59.0625 56.25H70.3125C71.0584 56.25 71.7738 56.5463 72.3012 57.0738C72.8287 57.6012 73.125 58.3166 73.125 59.0625ZM50.625 59.0625C50.625 59.8084 50.3287 60.5238 49.8012 61.0512C49.2738 61.5787 48.5584 61.875 47.8125 61.875H42.1875C41.4416 61.875 40.7262 61.5787 40.1988 61.0512C39.6713 60.5238 39.375 59.8084 39.375 59.0625C39.375 58.3166 39.6713 57.6012 40.1988 57.0738C40.7262 56.5463 41.4416 56.25 42.1875 56.25H47.8125C48.5584 56.25 49.2738 56.5463 49.8012 57.0738C50.3287 57.6012 50.625 58.3166 50.625 59.0625Z" />
							</svg>{" "}
							<p className=" inline-block group-hover:text-white font-medium text-md">
								Bills
							</p>
						</Link>

						<Link
							href="/dashboard/qr"
							className={clsx(
								" hover:bg-brand-accent p-2 w-full rounded-lg group align-middle",
								{
									"bg-brand-accent text-white *:fill-white ":
										pathname === "/dashboard/qr",
								}
							)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="-ml-2 w-14 h-8  inline-block group-hover:fill-white"
								fill="#26A269"
								viewBox="0 0 256 256"
							>
								<path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm0,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48ZM200,40H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-64,72V144a8,8,0,0,1,16,0v32a8,8,0,0,1-16,0Zm80-16a8,8,0,0,1-8,8H184v40a8,8,0,0,1-8,8H144a8,8,0,0,1,0-16h24V144a8,8,0,0,1,16,0v8h24A8,8,0,0,1,216,160Zm0,32v16a8,8,0,0,1-16,0V192a8,8,0,0,1,16,0Z"></path>
							</svg>
							<p className=" inline-block group-hover:text-white font-medium text-md">
								QR Code
							</p>
						</Link>
						<Link
							href="/dashboard/upi"
							className={clsx(
								" hover:bg-brand-accent p-2 w-full rounded-lg group align-middle",
								{
									"bg-brand-accent text-white *:fill-white ":
										pathname === "/dashboard/upi",
								}
							)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="-ml-2 w-14 h-8  inline-block group-hover:fill-white"
								fill="#26A269"
								viewBox="0 0 256 256"
							>
								<path d="M224,40V80a8,8,0,0,1-16,0V48H176a8,8,0,0,1,0-16h40A8,8,0,0,1,224,40ZM80,208H48V176a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H80a8,8,0,0,0,0-16Zm136-40a8,8,0,0,0-8,8v32H176a8,8,0,0,0,0,16h40a8,8,0,0,0,8-8V176A8,8,0,0,0,216,168ZM40,88a8,8,0,0,0,8-8V48H80a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8V80A8,8,0,0,0,40,88ZM80,72h96a8,8,0,0,1,8,8v96a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V80A8,8,0,0,1,80,72Zm8,96h80V88H88Z"></path>
							</svg>
							<p className=" inline-block group-hover:text-white font-medium text-md">
								Make Payments
							</p>
						</Link>
					</div>

					<Link className=" space-y-5 relative" href="/dashboard/qr">
						{userData.photoURL ? (
							<>
								<Avatar
									src={String(userData.photoURL)}
									className=" border-2 border-brand-accent2"
									size="lg"
								></Avatar>
							</>
						) : (
							<>
								<Avatar
									src={userData.displayPicture}
									className=" border-2 border-brand-accent2"
									size="lg"
								></Avatar>
							</>
						)}{" "}
						{userData.displayName ? (
							<h1 className="text-xl font-bold text-brand-textPrimary">
								Welcome {userData.displayName}!
							</h1>
						) : (
							""
						)}
					</Link>
				</nav>

				<div className="md:hidden fixed mx-auto mb-5 flex flex-col w-full h-[18vh] items-center justify-between bg-brand-card p-5 text-base font-bold  z-20">
					<div className=" flex w-full items-center justify-between ">
						<span className=" space-x-4">
							{userData.photoURL ? (
								<>
									<Avatar
										src={String(userData.photoURL)}
										className=" border-2 border-brand-accent2"
										size="lg"
									></Avatar>
								</>
							) : (
								<>
									<Avatar
										src={userData.displayPicture}
										className=" border-2 border-brand-accent2"
										size="lg"
									></Avatar>
								</>
							)}{" "}
							{userData.displayName ? (
								<p className="font-bold text-brand-background inline-block">
									{userData.displayName}
								</p>
							) : (
								""
							)}
						</span>
						<Link href="/dashboard/overview">
							<h1 className="block antialiased tracking-normal  text-xl leading-tight font-extrabold text-brand-background">
								<span className="italic">Ez</span>Pay
							</h1>
						</Link>
					</div>
					<div className="flex justify-center items-center min-w-screen w-full text-sm text-white  gap-4">
						<Link href="/dashboard/overview">
							<p
								className={clsx(
									"hover:underline rounded-lg text-white ",
									{
										"underline ":
											pathname === "/dashboard/overview",
									}
								)}
							>
								Overview
							</p>
						</Link>
						<Link href="/dashboard/transaction">
							<p
								className={clsx(
									"hover:underline rounded-lg text-white",
									{
										"underline ":
											pathname ===
											"/dashboard/transaction",
									}
								)}
							>
								Transactions
							</p>
						</Link>
						<Link href="/dashboard/bills">
							<p
								className={clsx(
									"hover:underline rounded-lg text-white",
									{
										"underline ":
											pathname === "/dashboard/bills",
									}
								)}
							>
								Bills
							</p>
						</Link>

						<Link href="/dashboard/qr">
							<p
								className={clsx(
									"hover:underline rounded-lg text-white",
									{
										"underline ":
											pathname === "/dashboard/qr",
									}
								)}
							>
								QR
							</p>
						</Link>
						<Link href="/dashboard/upi">
							<p
								className={clsx(
									"hover:underline rounded-lg text-white",
									{
										"underline ":
											pathname === "/dashboard/upi",
									}
								)}
							>
								Payment
							</p>
						</Link>
					</div>
				</div>
				<div className=" w-full min-h-screen bg-brand-background flex justify-center items-center mt-[15vh] md:mt-0 z-10 ">
					{children}
				</div>
			</div>
		</>
	);
}

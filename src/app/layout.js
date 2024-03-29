import "./globals.css";
import {
	Open_Sans,
	IBM_Plex_Mono,
	Nunito_Sans,
	DM_Sans,
	Poppins,
} from "next/font/google";

export const open_sans = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	variable: "--font-open_sans",
});

export const ibm_mono = IBM_Plex_Mono({
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-ibm_mono",
});

export const metadata = {
	title: "DigiWallet",
	description: "A digital wallet for the contemporary world",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${ibm_mono.variable} ${open_sans.variable} `}>
				{children}
			</body>
		</html>
	);
}

import Image from "next/image";
import Login from "@/components/login";
export default function Home() {
	return (
		<div className="flex flex-col justify-center items-center mx-auto min-h-screen w-full p-2">
			<Login></Login>
		</div>
	);
}

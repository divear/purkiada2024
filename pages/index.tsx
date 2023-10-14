import Head from "next/head";
import Image from "next/image";

export default function Home() {
	function rezerv() {
		window.location.href = "/hra"
	}
	return (
		<div>
			<div className="intro">
				<h1>Purkiada bug hunt</h1>
				<p>Úloha číslo 4 nebo kolik idk</p>
				<form action="/hra/">
					<input type="text" placeholder="Jméno" />
					<input type="password" placeholder="Heslo" />
					<button onClick={rezerv}>start</button>
				</form>
			</div>
		</div >
	);
}

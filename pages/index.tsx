import Head from "next/head";
import Image from "next/image";
import { app, getFirestore, addDoc, setDoc, collection, doc } from "../components/firebase";
import { use, useEffect, useState } from "react";

var serverDomain: string;
const db = getFirestore(app);

export default function Home() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [err, setErr] = useState("")


	useEffect(() => {
		if (window.location.hostname != "localhost") {
			serverDomain = "https://quotepy.pythonanywhere.com";
		} else {
			serverDomain = "http://127.0.0.1:5000";
		}
		if (!window) return;
	}, []);

	async function sendCont(e: any) {
		e.preventDefault();

		console.log(username)
		console.log(password)

		try {
			console.log("startin")
			localStorage.setItem("username", username)
			localStorage.setItem("password", password)
			console.log("posted");
			console.log(serverDomain)

			const response = await fetch(`${serverDomain}/login?username=${username}&password=${password}&points=0`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				// body: JSON.stringify([username, password, 0]),
			});
			console.log(response)

			location.href = "/hra"
		} catch (e: any) {
			if (!username || !password) {
				setErr("Zadej jméno i heslo!!")
				return
			}
			setErr(
				e.message
			);

			console.error("Error adding document: ", e);
		}
	}

	return (
		<div>
			<div className="intro">


				<div className="container">
					<div className="row">
						<div className="col-md-12 text-center">
							<h4 className="animate-character">Purkiáda bug hunt</h4>
						</div>
					</div>
				</div>


				<p>Úloha číslo 5</p>
				<form onSubmit={(e) => sendCont(e)} className="signin">

					<input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Jméno" />
					<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Heslo" />
					<button type="submit">Start</button>
				</form>
				<h1>{err}</h1>
			</div>
		</div >
	);
}

import Head from "next/head";
import Image from "next/image";
import { app, getFirestore, addDoc, setDoc, collection } from "../components/firebase";
import { useState } from "react";

const db = getFirestore(app);

export default function Home() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [err, setErr] = useState("")

	async function sendCont(e: any) {
		e.preventDefault();

		console.log(username)
		console.log(password)

		try {
			console.log("startin")
			console.log(addDoc)

			const docRef = await addDoc(
				collection(db, username.replaceAll("/", "")),
				{
					username,
					password,
				}
			);
			console.log(docRef)
			// setSent(true);
			// location.href = "/hra"
		} catch (e) {
			setErr(
				"Všechna pole jsou povinná"
			);

			console.error("Error adding document: ", e);
		}
	}

	return (
		<div>
			<div className="intro">
				<h1>Purkiada bug hunt</h1>
				<p>Úloha číslo 5</p>
				<form onSubmit={(e) => sendCont(e)} className="signin">

					<input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Jméno" />
					<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Heslo" />
					<button type="submit">start</button>
				</form>
				<h1>{err}</h1>
			</div>
		</div >
	);
}

import React, { useState, useEffect, useRef } from "react";
import WebCam from "react-webcam";

let ml5;

export default function Home() {
	const modelURL = "https://teachablemachine.withgoogle.com/models/o67qKOlz-/";
	let classifier;
	const videoConstraints = {
		width: 1280,
		height: 720,
		facingMode: "user",
	};

	useEffect(() => {
		ml5 = require("ml5");
		(async () => {
			classifier = await ml5.imageClassifier(modelURL + "model.json");
			webcamRef.current.getScreenshot();
			setTimeout(() => {
				classifyVideo();
			}, 2000);
		})();
	}, []);

	const webcamRef = useRef(null);
	const [label, setLabel] = useState("no one");

	const classifyVideo = () => {
		webcamRef.current.getScreenshot();
		try {
			if (webcamRef.current.canvas && classifier) {
				classifier.classify(webcamRef.current, gotResults);
			} else {
				console.log("no ref yet");
				setTimeout(() => {
					classifyVideo();
				}, 1000);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const gotResults = async (error, results) => {
		if (error) {
			console.error(error.message);
			return;
		}
		const label = results[0].label;
		setLabel(label);
		classifyVideo();
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignContent: "center",
			}}
		>
			<p style={{ fontSize: 50, alignSelf: "center" }}>{label}</p>

			<WebCam
				style={{ alignSelf: "center" }}
				audio={false}
				height={480}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				width={720}
				videoConstraints={videoConstraints}
			/>
		</div>
	);
}

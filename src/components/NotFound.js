import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<article className="not-found-container">
			<h1>Oops! That isn't here (404).</h1>
			<p>Care to try again, starting from the <Link to="/">homepage?</Link></p>
		</article>
	);
};
export default NotFound;

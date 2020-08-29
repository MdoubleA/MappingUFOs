import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
	return (
		<header className="App-header">
			<ul className="Header-container">
				<li key="home"><Link to="/">Home!</Link></li>
				<li key="new-post"><Link to="/new-sighting">Post a sighting</Link></li>
				<li key="MainMap"><Link to="/MainMap">Mapped Sightings</Link></li>
			</ul>
		</header>
	);
};

export default Header;

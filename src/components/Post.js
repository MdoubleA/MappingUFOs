import React from "react";
import { Link } from "react-router-dom";

const Post = ({post}) => {
	let title = post.city + " " + post.country + " " + post.datetime;
	let content = post.comments;
	return (
		<article className="post-container">
			<h1>{title}</h1>
			<div>
				<p>{content}</p>
			</div>
			<div>
				<p>
					<Link to={`/edit/${post.slug}`}> Edit Post </Link>
				</p>
			</div>
		</article>
	);
};
export default Post;


/*
id: 1,
slug: "sighting-1",
datetime : "10/10/1949 21:00",
city : "lackland afb",
state : "tx",
country : "",
shape : "light",
durationinseconds : 7200,
duration : "1-2 hrs",
comments : "1949 Lackland AFB&#44 TX.  Lights racing across the sky &amp; making 90 degree turns on a dime.",
dateposted : "12/16/2005",
latitude : 29.38421,
longitude : -98.581082
*/

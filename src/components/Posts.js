import React from "react";
import { Link } from "react-router-dom";

const Posts = ({posts}) => {
	return (
		<article className="posts-container">
			<h1>Alien Sightings</h1>
			<ol>
				{posts.length < 1 && (
					<li key="empty">There are no sightings yet.</li>
				)}
				{posts.map(
					post => (
						<li key={post.id}>
							<Link to={"/post/" + post.slug}>{post.city} {post.datetime}</Link>
						</li>
				))}
			</ol>
		</article>
	);
};

export default Posts;

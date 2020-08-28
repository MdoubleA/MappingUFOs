import React from "react";


const Messages = ({ type }) => {
	const messages = {
		saved: "Saved post.",
		updated: "Updated post",
		deleted: "Deleted post"
	};

	return (
		<div className={`Message-container-${type}`}>
			<h2 className="Message-inner-container">
				<strong>{messages[type]}</strong>
			</h2>
		</div>
	);
};
export default Messages;

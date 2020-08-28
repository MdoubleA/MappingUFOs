import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Quill from "react-quill";
import 'react-quill/dist/quill.snow.css';

class PostForm extends Component {
	state = {
		post: {
		  id: this.props.post.id,
		  slug: this.props.post.slug,
		  datetime : this.props.post.datetime,
		  city : this.props.post.city,
		  state : this.props.post.state,
		  country : this.props.post.country,
		  shape : this.props.post.shape,
		  durationinseconds : this.props.post.durationinseconds,
		  duration : this.props.post.duration,
		  comments : this.props.post.comments,
		  dateposted : this.props.post.dateposted,
		  latitude : this.props.post.latitude,
		  longitude : this.props.post.longitude
	   },
		isPostSaved: false
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.post.id != this.props.post.id) {
			this.setState({
				post: {
				  id: this.props.post.id,
				  slug: this.props.post.slug,
				  datetime : this.props.post.datetime,
				  city : this.props.post.city,
				  state : this.props.post.state,
				  country : this.props.post.country,
				  shape : this.props.post.shape,
				  durationinseconds : this.props.post.durationinseconds,
				  duration : this.props.post.duration,
				  comments : this.props.post.comments,
				  dateposted : this.props.post.dateposted,
				  latitude : this.props.post.latitude,
				  longitude : this.props.post.longitude
			   }
			});
		}
	};

	inputField(field) {
		let formID = "form-" + field;
		const formLabel = expression => {
			let ret = ""

			switch (expression) {
				case "datetime":
					ret = "Sighting date and time?";
					break;
				case "city":
					ret = "Sighting city?";
					break;
				case "state":
					ret = "Sighting state?";
					break;
				case "country":
					ret = "Sighting country?";
					break;
				case "shape":
					ret = "Shape of UFO?";
					break;
				case "duration":
					ret = "Duration of sighting?";
					break;
				case "comments":
					ret = "Describe the sighting, please:";
					break;
				default:
					ret = "Information";
			}
			return ret;
		}

		const changeState = e => {
			let newValue = e.target.value;
			let newPost = {...this.state.post};
			newPost[field] = newValue;
			this.setState({post: newPost})
		}

		return (
			<p>
				<label htmlFor={formID}>{formLabel(field)}</label>
				<br/>
				<input id={formID} value={this.state.post[field]} onChange={changeState} />
			</p>
		);
	}  // end inputField

	// Functions based to HTML, event handlers, have to be annonymous function.
	handlePostForm = (e) => {
		e.preventDefault();

		if (this.state.post.datetime) {

			// Determine the correct form handler to use.
			if (this.props.addNewPost) {
				this.props.addNewPost(this.state.post);
			}
			else {
				this.props.updatePost(this.state.post);
			}

			console.log(this.state.post);
			this.setState({isPostSaved: true});
		}
		else {
			alert("Datetime is required.");
		}
	}  // end handleAddNewSighting

	render() {
		if (this.state.isPostSaved) {
			return <Redirect to="/" />;
		}
		else {
			return (
				<form className="post-form-container" onSubmit={this.handlePostForm}>
					<h1>Add a sighting</h1>

					{this.inputField("datetime")}
					{this.inputField("city")}
					{this.inputField("state")}
					{this.inputField("country")}
					{this.inputField("shape")}
					{this.inputField("duration")}
					{this.inputField("comments")}

					<p>
						<button type="submit">Post Sighting</button>
					</p>
				</form>
			);
		}
	}
}
export default PostForm;

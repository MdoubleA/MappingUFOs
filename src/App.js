import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import PostForm from "./components/PostForm";
import Messages from "./components/Message";
import MyMap from "./components/MyMap";
import * as SightingData from "./data/ReducedData.json"
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";


class App extends Component {
	state = {
		message: null,
		posts: SightingData.posts
	};  // end state

	createBlankPost = () => {
		let post = {
		  id: null,
		  slug: "",
		  datetime : "",
		  city : "",
		  state : "",
		  country : "",
		  shape : "",
		  durationinseconds : null,
		  duration : "",
		  comments : "",
		  dateposted : "",
		  latitude : null,
		  longitude : null
	   }
	   return post;
	};

	createSlugFromPost = post => {
		return "sighting-" + post.id.toString();
	};

	addNewPost = post => {
		post.id = this.state.posts.length;
		post.slug = this.createSlugFromPost(post);
		this.setState({
			message: "saved",
			posts: [...this.state.posts, post]
		});
		setTimeout(() => {
			this.setState({message: null});
		}, 1600);
		console.log(post);
	};

	updatePost = post => {
		const index = this.state.posts.findIndex(p => p.id === post.id);
		let newPosts = this.state.posts.slice(0, index).concat(this.state.posts.slice(index+1));
		newPosts.push(post);
		newPosts.sort((a,b) => a.id - b.id);


		this.setState({
			message: "updated",
			posts: newPosts
		});
		setTimeout(() => {
			this.setState({message: null})
		}, 1600);
	};

	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					{this.state.message && <Messages type={this.state.message} />}

					<Switch>
						<Route exact path="/" render={() => <Posts posts={this.state.posts}/>} />
						<Route
							path="/post/:postSlug"
							render={
								props => {
									const post = this.state.posts.find(
										post => post.slug === props.match.params.postSlug
									);
									if (post) return <Post post={post}/>;
									else return <NotFound />;
								}
							}/>
						<Route exact path="/new-sighting" render={() => <PostForm post={this.createBlankPost()} addNewPost={this.addNewPost} />} />
						<Route
							path="/edit/:postSlug"
							render={
								props => {
									const post = this.state.posts.find(
										post => post.slug === props.match.params.postSlug
									);
									if (post) return <PostForm post={post} updatePost={this.updatePost} />;
									else return <NotFound />;
								}
						}/>
						<Route exact path="/MainMap" render={() => <MyMap posts={this.state.posts}/>} />


						<Route component={NotFound} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;

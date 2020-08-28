import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import PostForm from "./components/PostForm";
import Messages from "./components/Message";
import MyMap from "./components/MyMap";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";


class App extends Component {
	state = {
		message: null,
		posts: [
			 {
			   id: 0,
			   slug: "sighting-0",
			   datetime : "10/10/1949 20:30",
			   city : "san marcos",
			   state : "tx",
			   country : "us",
			   shape : "cylinder",
			   durationinseconds : 2700,
			   duration : "45 minutes",
			   comments : "This event took place in early fall around 1949-50. It occurred after a Boy Scout meeting in the Baptist Church. The Baptist Church sit",
			   dateposted : "4/27/2004",
			   latitude : 29.8830556,
			   longitude : -97.9411111
			},
			 {
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
			},
			 {
			   id: 2,
			   slug: "sighting-2",
			   datetime : "10/10/1955 17:00",
			   city : "chester (uk/england)",
			   state : "",
			   country : "gb",
			   shape : "circle",
			   durationinseconds : 20,
			   duration : "20 seconds",
			   comments : "Green/Orange circular disc over Chester&#44 England",
			   dateposted : "1/21/2008",
			   latitude : 53.2,
			   longitude : -2.916667
			}
		]  // end posts
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

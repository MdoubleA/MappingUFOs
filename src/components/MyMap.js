import React, {Component} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";

class MyMap extends Component {
	state = {
		viewport: {
			latitude: 42.5929,
			longitude: -46.5044,
			width: "100%",
			height: "100%",
			zoom: 2
		},
		selectedPost: null
	};

	render() {
		return (
			<div className="Main-map-container">
				<ReactMapGL
					{...this.state.viewport}
					mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
					mapStyle="mapbox://styles/mdoublea/ckedchgic1lil19urca4m0ftw"
					onViewportChange={viewport => {this.setState({viewport: viewport})}}
				>
				{this.props.posts.map(post =>
					<Marker key={post.id} latitude={post.latitude} longitude={post.longitude}>
						<button className="alien-marker-btn" onClick={(e) => {
							e.preventDefault();
							this.setState({selectedPost: post});
						}}>
							<img src="/alien.png" />
						</button>
					</Marker>
				)}
				{this.state.selectedPost && (
					<Popup
					latitude={this.state.selectedPost.latitude}
					longitude={this.state.selectedPost.longitude}
					onClose={() => {this.setState({selectedPost: null})}}
					>
						<div>
							<p>{this.state.selectedPost.comments}</p>
						</div>
					</Popup>
				)}
				</ReactMapGL>
			</div>
		);
	};
};
export default MyMap;

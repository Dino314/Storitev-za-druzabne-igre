class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		toggleOwn: false,
		toggleFav: false,
		toggleWish: false,
		togglePlay: false};

    // This binding is necessary to make `this` work in the callback
    this.handleClickOwn = this.handleClickOwn.bind(this);
	this.handleClickFav = this.handleClickFav.bind(this);
	this.handleClickWish = this.handleClickWish.bind(this);
	this.handleClickPlay = this.handleClickPlay.bind(this);
  }
 
	handleClickOwn() {
		this.setState({toggleOwn: !this.state.toggleOwn});
	}
  
	handleClickFav() {
		this.setState({toggleFav: !this.state.toggleFav});
	}
	
	handleClickWish() {
		this.setState({toggleWish: !this.state.toggleWish});
	}
	
	handleClickPlay() {
		this.setState({togglePlay: !this.state.togglePlay});
	}
	
	
	
  render() {
    return (
		<div class="btn-group btn-block pb-3">
				<button onClick={this.handleClickOwn} class="btn" data-toggle="tooltip" title="Imam igro">
					{this.state.toggleOwn ? 'O' : 'X'}
				</button>
				  
				<button onClick={this.handleClickFav} class="btn" data-toggle="tooltip" title="Priljubljena">
					{this.state.toggleFav ? 'O' : 'X'}
				</button>
				<button onClick={this.handleClickWish} class="btn" data-toggle="tooltip" title="Zaželjena">
					{this.state.toggleWish ? 'O' : 'X'}
				</button>
				  
				<button onClick={this.handleClickPlay} class="btn" data-toggle="tooltip" title="Bi igral">
					{this.state.togglePlay ? 'O' : 'X'}
				</button>
		</div>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
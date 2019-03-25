class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    		id: "237182",
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
  
  //
  componentDidMount() {
    var xhr = new XMLHttpRequest();
    //var toggleOwn = false;
    xhr.open("GET", "test2.php?id="+this.state.id, true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var Arr = JSON.parse(xhr.responseText);
          console.log(Arr);
          this.setState({
        	  toggleOwn: Arr[0],
        	  toggleFav: Arr[1],
        	  toggleWish: Arr[2],
        	  togglePlay: Arr[3]
          });
          
        } else {
          console.error(xhr.statusText);
        }
      }
    }.bind(this);
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(null);
  }
 
	handleClickOwn() {
		var xhr = new XMLHttpRequest();
	    //var toggleOwn = false;
	    xhr.open("GET", "updateValues.php?id="+this.state.id+"&value="+this.state.toggleOwn+"&akcija=moja", true);
	    xhr.onload = function (e) {
	      if (xhr.readyState === 4) {
	        if (xhr.status === 200) {
	          var ret = (xhr.responseText);
	          console.log("id: "+this.state.id+", value:"+this.state.toggleOwn+", PHP RESULT: "+ret);
	          this.setState({
	        	  toggleOwn: ret == "true" ? true : false
	          });
	          
	        } else {
	          console.error(xhr.statusText);
	        }
	      }
	    }.bind(this);
	    xhr.onerror = function (e) {
	      console.error(xhr.statusText);
	    };
	    xhr.send(null);
		
		//this.setState({toggleOwn: !this.state.toggleOwn});
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
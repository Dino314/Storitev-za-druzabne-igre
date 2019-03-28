var url = new URL(window.location.href);
var id = url.searchParams.get("igra");

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    		id: id,
		toggleOwn: false,
		toggleFav: false,
		toggleWish: false,
		togglePlay: false};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  
  //get values from database for the initial state
  componentDidMount() {
    var xhr = new XMLHttpRequest();
    //var toggleOwn = false;
    xhr.open("GET", "initializeStates.php?id="+this.state.id, true);
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
 
	handleClick(akcija, toggle) {
		var xhr = new XMLHttpRequest();
	    //var toggleOwn = false;
	    xhr.open("GET", "updateValues.php?id="+this.state.id+"&value="+toggle+"&akcija="+akcija, true);
	    xhr.onload = function (e) {
	      if (xhr.readyState === 4) {
	        if (xhr.status === 200) {
	          var ret = (xhr.responseText);
	          console.log("id: "+this.state.id+", value:"+toggle+", PHP RESULT: "+ret+", "+akcija);
	          
	          if(akcija == "moja"){
		          this.setState({
		        	  toggleOwn: ret == "true" ? true : false
		          });
	          }else if (akcija == "priljubljena"){
	        	  this.setState({
		        	  toggleFav: ret == "true" ? true : false
		          });
	          }else if (akcija == "zazeljena"){
	        	  this.setState({
		        	  toggleWish: ret == "true" ? true : false
		          });
	          }else if (akcija == "biIgral"){
	        	  this.setState({
		        	  togglePlay: ret == "true" ? true : false
		          });
	          
	          }else{
	        	  console.log("this.state Error");
	          }
	          
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
  
	
	
	
	
	
  render() {
    return (
		<div class="btn-group btn-block pb-3">
				<button onClick={() => this.handleClick("moja", this.state.toggleOwn)} class="btn" data-toggle="tooltip" title="Imam igro">
					<img width="70%" src={this.state.toggleOwn ? "/images/OwnB.png" : "/images/OwnW.png"} />
				</button>				  
				<button onClick={() => this.handleClick("priljubljena", this.state.toggleFav)} class="btn" data-toggle="tooltip" title="Priljubljena">
					<img width="70%" src={this.state.toggleFav ? "/images/FavB.png" : "/images/FavW.png"} />
				</button>
				<button onClick={() => this.handleClick("zazeljena", this.state.toggleWish)} class="btn" data-toggle="tooltip" title="Zaželjena">
					<img width="70%" src={this.state.toggleWish ? "/images/WishB.png" : "/images/WishW.png"} />
				</button>				  
				<button onClick={() => this.handleClick("biIgral", this.state.togglePlay)} class="btn" data-toggle="tooltip" title="Bi igral">
					<img width="70%" src={this.state.togglePlay ? "/images/PlayB.png" : "/images/PlayW.png"} />
				</button>
		</div>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);

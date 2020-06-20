import React, {Component} from "react";
class Counter extends Component {
  formatCount = () => {
    const {value: count} = this.props.counter;
    return count === 0 ? "Zero" : count;
  };
  formatBadge = () => {
    const {value: count} = this.props.counter;
    return count === 0 ? " badge badge-warning m-2" : "badge badge-primary m-2";
  };

  render() {
    return (
      <div className="row">
        <div className="col-1">
          <span className={this.formatBadge()}>{this.formatCount()}</span>
        </div>
        <div className="col">
          <button
            onClick={()=>this.props.onHandleDecrement(this.props.counter)}
            className = "btn btn-primary btn-sm m-2"
            disabled = {this.props.counter.value === 0 ? 'disabled' : ''}          
          >
            -
          </button>
          <button
            onClick={()=>this.props.onHandleIncrement(this.props.counter)}
            className="btn btn-secondry btn-sm m-2"
          >
            +
          </button>
          <button onClick={()=>this.props.onDelete(this.props.counter.id)} className="btn btn-danger btn-sm m-2">
            *
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;

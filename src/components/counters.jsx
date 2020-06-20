import React, { Component } from 'react';
import Counter from "./counter";
class Counters extends Component {
    render() { 
        const {onAddCounter, onResetCounter, onCounters, onCounterDelete, onHandleIncrement, onHandleDecrement} = this.props;
        return (
            <div>
                <button onClick={onAddCounter} className="btn btn-primary btn-sm m-2">Add Counter</button>
                <button onClick={onResetCounter} className="btn btn-danger btn-sm m-2">Reset Counters</button>
                {onCounters.map(counter=>
                    <Counter 
                        onDelete = {onCounterDelete} 
                        key={counter.id}
                        counter={counter}
                        onHandleIncrement={onHandleIncrement}
                        onHandleDecrement={onHandleDecrement} 
                     />
                )}
            </div>
        );
    }
}
 
export default 
Counters;
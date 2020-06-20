import React, {Component} from 'react';
class Genre extends Component {
    render() { 
        const {onHandleGenre, id, genre, valueProperty, textProperty} = this.props;
        return ( 
            <nav>
                <ul className="list-group">                
                    {genre.map(gen => (
                         <li 
                            style={{cursor: 'pointer'}} 
                            key={gen[valueProperty]} 
                            onClick={()=>onHandleGenre(gen[valueProperty])} 
                            className={id === gen._id ? "list-group-item active page-link" : "list-group-item page-link"}>
                            {gen[textProperty]}
                        </li>
                   ))}
                </ul>
            </nav>
         );
    }
}
Genre.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}
export default Genre;
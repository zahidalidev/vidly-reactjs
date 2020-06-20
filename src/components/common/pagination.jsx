import React, {Component} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

class Pagination extends Component{
    render(){
        const {totalMovies, pSize, onCurrentPage, currentPage} = this.props;
        const pageSize = Math.ceil(totalMovies/pSize);
        if(pageSize === 1) return null;
        const pages = _.range(1, pageSize+1);
        return(
            <nav>
                <ul className="pagination">{
                    pages.map(page=>(
                        <li key = {page} className={page===currentPage ? "page-item active" : "page-item"}>
                            <a onClick={()=>onCurrentPage(page)} className="page-link">{page}</a>
                        </li>
                    ))
                }
                </ul>
            </nav>

        );
    }
}

Pagination.propTypes = {
    totalMovies: PropTypes.number.isRequired, 
    pSize: PropTypes.number.isRequired, 
    onCurrentPage: PropTypes.func.isRequired, 
    currentPage: PropTypes.number.isRequired
}

export default Pagination
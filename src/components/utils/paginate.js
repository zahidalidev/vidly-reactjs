const Paginate = (currentPage, pageSize, movies) => {

    const itemsLimit = [(currentPage - 1) * pageSize, currentPage * pageSize];
    const movies2 = [...movies];
    const pageMovies = movies2.slice(itemsLimit[0], itemsLimit[1]);
    return (pageMovies);
}
 
export default Paginate;
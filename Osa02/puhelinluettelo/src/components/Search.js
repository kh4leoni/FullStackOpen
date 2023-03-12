

const Search = ({search, handleSearch}) => {
  return (
    <div> search: {" "}
    <input type="text" value={search} onChange={handleSearch}/>
    </div>
  )
}

export default Search